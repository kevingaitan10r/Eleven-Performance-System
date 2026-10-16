import './log.js';
import net from 'node:net';
import { createRequire } from 'node:module';
import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { ruta } from './rutas.js';

// WhatsApp Web tiene muchos procesos internos (workers) que se abren y cierran solos. Si uno se cierra
// justo cuando Puppeteer registra una función, falla con "Target closed" aunque en la página principal
// la función SÍ quedó registrada; la librería entonces nunca termina de conectar. Se da por buena
// si quedó registrada en la página principal.
{
  const { CdpPage } = createRequire(import.meta.url)('puppeteer-core/lib/cjs/puppeteer/cdp/Page.js');
  const registrar = CdpPage.prototype.exposeFunction;
  CdpPage.prototype.exposeFunction = async function (nombre, fn) {
    try {
      return await registrar.call(this, nombre, fn);
    } catch (e) {
      const mensaje = String(e?.message || e);
      if (!/Target closed|Session closed|detached|already exists/i.test(mensaje)) throw e;
      const quedo = await this.evaluate((n) => typeof window[n] === 'function', nombre).catch(() => false);
      if (quedo) return;
      throw e;
    }
  };
}
import wweb from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { responder } from './ia.js';
import { crearHerramientas, resumenCliente } from './herramientas.js';
import { transcribir } from './voz.js';
import { enHorarioAsesores } from './agenda.js';
import { sheetsActivo, probarConexion, sincronizarCliente } from './sheets.js';
import { encuestaPlanes, interpretarOpcion, detallePlan } from './catalogo.js';
import {
  registrarChat, guardarMensaje, historialIA, botPuedeResponder, pausarBot, guardarCliente, obtenerCliente, db, obtenerConfig,
} from './db.js';
import { iniciarPanel } from './panel/servidor.js';
import { iniciarTunel } from './tunel.js';
import {
  procesarRecordatoriosEntrenamientos, confirmarEntrenamiento, cancelarEntrenamiento, formatearHoraSesion
} from './gimnasio.js';
import { ahoraColombia } from './rutas.js';

const { Client, LocalAuth, MessageMedia, Poll, Message } = wweb;

const MEMORIA = Number(process.env.MEMORIA_MENSAJES) || 20;
const PAUSA_MS = (Number(process.env.PAUSA_HUMANO_HORAS) || 12) * 60 * 60 * 1000;
// Espera antes de responder, para juntar varios mensajes seguidos del cliente en una sola respuesta
const ESPERA_MS = (Number(process.env.ESPERA_SEGUNDOS) || 1.2) * 1000;
const PALABRAS_ASESOR = (process.env.PALABRAS_ASESOR || 'asesor,humano')
  .split(',').map((p) => p.trim().toLowerCase()).filter(Boolean);

export function obtenerNumerosAsesores() {
  const raw = obtenerConfig('ASESOR_NUMEROS', process.env.ASESOR_NUMEROS || '');
  return String(raw || '')
    .split(',')
    .map((n) => n.replace(/\D/g, ''))
    .filter(Boolean);
}

// estado: 'conectando' | 'vinculando' | 'conectado' | 'desconectado'
export const estadoWhatsApp = { conectado: false, qr: null, codigo: null, numero: null, estado: 'conectando', desde: Date.now(), detalle: '' };
const cambiarEstado = (estado, detalle = '') => Object.assign(estadoWhatsApp, { estado, detalle, desde: Date.now() });

const PUERTO_PANEL = Number(process.env.PORT || process.env.PANEL_PUERTO) || 7077;

// Reinicia el programa: el lanzador lo vuelve a encender con una conexión nueva
function reiniciarBot(motivo) {
  console.warn(`🔄 Reiniciando el bot: ${motivo}`);
  setTimeout(() => process.exit(1), 1000);
}

// Si se define el número del bot, se puede vincular con un código de 8 dígitos además de QR
const NUMERO_BOT = (process.env.WHATSAPP_NUMERO_BOT || '').replace(/\D/g, '');

// Versión fija de WhatsApp Web (guardada en .wwebjs_cache). WhatsApp publica versiones nuevas seguido
// y a veces la librería aún no es compatible: si el bot se queda sin conectar, se fija una que funcione.
const VERSION_WA = (process.env.WHATSAPP_WEB_VERSION || '').trim();

export function limpiarBloqueosSesion() {
  const dirSesion = ruta('.sesion', 'session');
  for (const f of ['SingletonLock', 'SingletonSocket', 'SingletonCookie', 'DevToolsActivePort', 'RunningChromeVersion']) {
    try {
      const p = join(dirSesion, f);
      if (existsSync(p)) rmSync(p, { force: true, recursive: true });
    } catch {}
  }
}
limpiarBloqueosSesion();

// Inicializamos el cliente SIEMPRE con soporte de QR activo (sin pairWithPhoneNumber en constructor)
// para garantizar que el código QR esté disponible de inmediato y el bot no se quede trabado.
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: '.sesion' }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
    ],
    ...(process.env.PUPPETEER_EXECUTABLE_PATH ? { executablePath: process.env.PUPPETEER_EXECUTABLE_PATH } : {}),
  },
  ...(VERSION_WA && { webVersion: VERSION_WA, webVersionCache: { type: 'local', path: '.wwebjs_cache' } }),
});

let codigoSolicitadoEnCurso = false;
let autoCodigoIntentado = false;

// Permite solicitar dinámicamente el código de 8 dígitos para un número de celular
export async function solicitarCodigoVinculacion(numero) {
  const numLimpio = String(numero || NUMERO_BOT || '').replace(/\D/g, '');
  if (!numLimpio || numLimpio.length < 10) {
    throw new Error('Número de WhatsApp inválido. Incluye el indicativo de país sin signos (ej: 573001234567)');
  }
  if (estadoWhatsApp.conectado) {
    throw new Error('WhatsApp ya se encuentra conectado');
  }
  if (codigoSolicitadoEnCurso) return estadoWhatsApp.codigo;
  codigoSolicitadoEnCurso = true;
  cambiarEstado('vinculando', `Solicitando código de 8 dígitos para +${numLimpio}...`);
  console.log(`\n⏳ Solicitando código de 8 dígitos a WhatsApp para +${numLimpio}...`);

  try {
    const code = await client.requestPairingCode(numLimpio, true);
    if (code) {
      estadoWhatsApp.codigo = code;
      estadoWhatsApp.numeroBot = numLimpio;
      cambiarEstado('vinculando', `Código de 8 dígitos generado para +${numLimpio}`);
      console.log('\n============================================================');
      console.log(`   CÓDIGO PARA VINCULAR WHATSAPP:  ${code.slice(0, 4)}-${code.slice(4)}`);
      console.log('============================================================');
      console.log(`En tu celular (+${numLimpio}):`);
      console.log('1. Abre WhatsApp > Dispositivos vinculados > Vincular un dispositivo.');
      console.log(`2. Toca "Vincular con el número de teléfono" e ingresa: ${code.slice(0, 4)}-${code.slice(4)}\n`);
      return code;
    }
    return estadoWhatsApp.codigo;
  } catch (err) {
    console.error(`⚠️ No se pudo obtener código para +${numLimpio}:`, err?.message || err);
    cambiarEstado('vinculando', 'Escanea el código QR que aparece en pantalla o en el panel web');
    throw err;
  } finally {
    codigoSolicitadoEnCurso = false;
  }
}

// La librería prepara sus eventos (attachEventListeners) cuando WhatsApp avisa que terminó de sincronizar.
{
  const adjuntar = client.attachEventListeners.bind(client);
  let enCurso = null;
  client.attachEventListeners = (...args) => {
    if (enCurso) {
      console.warn('   (la preparación de WhatsApp ya estaba en curso; se espera la misma)');
      return enCurso;
    }
    enCurso = (async () => {
      for (let intento = 1; ; intento++) {
        try {
          return await adjuntar(...args);
        } catch (e) {
          console.error(`⚠️ Falló la preparación de eventos de WhatsApp (intento ${intento}/3):`, e?.message || e);
          if (intento >= 3) throw e;
          await new Promise((r) => setTimeout(r, 1500));
        }
      }
    })().finally(() => { enCurso = null; });
    return enCurso;
  };
}

client.on('qr', (qr) => {
  estadoWhatsApp.qr = qr;
  if (estadoWhatsApp.estado !== 'vinculando') {
    cambiarEstado('vinculando', 'Esperando que se escanee el QR o se escriba el código');
  }

  console.log('\n============================================================');
  console.log('  📱 VINCULACIÓN DE WHATSAPP (ELEVEN PERFORMANCE)');
  console.log('============================================================');
  console.log('  MÉTODO 1 (Recomendado - 1 clic): Escanea este QR con tu teléfono:');
  console.log('  WhatsApp > Dispositivos vinculados > Vincular un dispositivo.\n');
  qrcode.generate(qr, { small: true });
  console.log(`\n  MÉTODO 2: Panel web con QR interactivo y código de 8 dígitos:`);
  console.log(`  http://localhost:${PUERTO_PANEL}`);
  console.log('============================================================\n');

  // El QR queda listo inmediatamente para escanear en pantalla y en la web.
  // El código de 8 dígitos se puede generar cuando el usuario lo solicite con 1 clic en el panel.
});

client.on('code', (codigo) => {
  estadoWhatsApp.codigo = codigo;
  cambiarEstado('vinculando', `Código de 8 dígitos listo: ${codigo.slice(0, 4)}-${codigo.slice(4)}`);
  console.log('\n============================================================');
  console.log(`   CÓDIGO DE VINCULACIÓN WHATSAPP:  ${codigo.slice(0, 4)}-${codigo.slice(4)}`);
  console.log('============================================================');
  console.log('En el celular: WhatsApp > Dispositivos vinculados > Vincular un dispositivo >');
  console.log(`"Vincular con el número de teléfono" y escribe: ${codigo.slice(0, 4)}-${codigo.slice(4)}\n`);
});

client.on('ready', () => {
  estadoWhatsApp.conectado = true;
  estadoWhatsApp.qr = null;
  estadoWhatsApp.codigo = null;
  estadoWhatsApp.numero = client.info?.wid?.user;
  cambiarEstado('conectado');
  console.log(`✅ WhatsApp conectado (+${estadoWhatsApp.numero}). Escuchando mensajes de Eleven Performance.`);
  engancharVotos().catch((e) => console.error('⚠️ No se pudo activar la lectura de votos:', e?.message || e));
  repararEnvioArchivos()
    .catch((e) => console.error('⚠️ No se pudo aplicar el arreglo de envío de archivos:', e?.message || e));
  // Mensajes que llegaron mientras el bot estaba apagado: se responden ahora
  setTimeout(() => responderPendientes(), 10_000);
});
client.on('auth_failure', (m) => {
  console.error('❌ Falló la autenticación:', m);
  cambiarEstado('desconectado', 'La sesión guardada ya no es válida; hay que vincular de nuevo');
});
// Si WhatsApp se cierra (por ejemplo, se desvinculó el dispositivo desde el celular), el bot se reinicia
// solo: si la sesión sigue válida se reconecta, y si no, en el panel aparece el código para vincular.
client.on('disconnected', (r) => {
  estadoWhatsApp.conectado = false;
  cambiarEstado('desconectado', String(r || ''));
  console.warn('⚠️ WhatsApp desconectado:', r);
  reiniciarBot('WhatsApp se desconectó');
});

// ---------- Envío de mensajes ----------

// Cuántos mensajes está enviando el bot a cada chat. Sirve para distinguir en 'message_create'
// los mensajes del bot de los que escribe una persona desde el celular.
const enviandoBot = new Map();
const marcarEnvio = (chatId, delta) => enviandoBot.set(chatId, Math.max(0, (enviandoBot.get(chatId) || 0) + delta));

async function enviar(chatId, contenido, opciones) {
  marcarEnvio(chatId, +1);
  try {
    return await client.sendMessage(chatId, contenido, opciones);
  } catch (e) {
    marcarEnvio(chatId, -1);
    throw e;
  }
}

async function enviarTexto(chatId, texto, autor = 'bot') {
  await enviar(chatId, texto);
  guardarMensaje(chatId, autor, texto);
}

async function enviarEncuesta(chatId, titulo, opciones) {
  await enviar(chatId, new Poll(titulo, opciones));
  guardarMensaje(chatId, 'bot', `📊 ${titulo}\n${opciones.map((o) => `• ${o}`).join('\n')}`);
}

async function notificarAsesores(texto) {
  const asesores = obtenerNumerosAsesores();
  if (!asesores.length) {
    console.log(`📲 (Sin ASESOR_NUMEROS configurado) Aviso para asesor:\n${texto}`);
    return;
  }
  for (const numero of asesores) {
    try {
      await enviar(`${numero}@c.us`, texto);
    } catch (e) {
      console.error(`No se pudo avisar al asesor ${numero}:`, e.message);
    }
  }
}

// ---------- Mensajes que escribe una persona desde el celular de la empresa ----------

/**
 * Envía un archivo (PDF). WhatsApp Web a veces rechaza archivos hacia chats con id @lid
 * ("Data passed to getter must include an id property"); en ese caso se reintenta al número real del cliente.
 */
async function enviarArchivo(chatId, ruta, nombre, texto) {
  const crear = () => Object.assign(MessageMedia.fromFilePath(ruta), { filename: nombre });
  try {
    await enviar(chatId, crear(), { caption: texto, sendMediaAsDocument: true });
  } catch (e) {
    const numero = chatId.endsWith('@lid') ? await numeroReal(chatId) : null;
    if (!numero) throw e;
    console.warn(`   📄 WhatsApp rechazó el archivo al chat @lid (${e?.message || e}); reintentando al número ${numero}...`);
    marcarEnvio(chatId, +1); // el aviso 'message_create' puede llegar con el id @lid o con el número
    try {
      await client.sendMessage(`${numero}@c.us`, crear(), { caption: texto, sendMediaAsDocument: true });
    } catch (e2) {
      marcarEnvio(chatId, -1);
      throw e2;
    }
  }
}

// ¿Este mensaje saliente lo envió el bot? (lo busca por el id del chat o por su equivalente @lid ↔ número)
function esEnvioDelBot(destino) {
  if ((enviandoBot.get(destino) || 0) > 0) {
    marcarEnvio(destino, -1);
    return true;
  }
  for (const [lid, numero] of cacheNumeros) {
    const otro = destino === lid ? `${numero}@c.us` : destino === `${numero}@c.us` ? lid : null;
    if (otro && (enviandoBot.get(otro) || 0) > 0) {
      marcarEnvio(otro, -1);
      return true;
    }
  }
  return false;
}

client.on('message_create', async (msg) => {
  if (!msg.fromMe) return;
  const chatId = msg.to;
  if (esEnvioDelBot(chatId)) return;
  const asesores = obtenerNumerosAsesores();
  const telDestino = (await numeroReal(chatId)) || chatId.split('@')[0];
  if (!esChatDeCliente(chatId) || asesores.includes(telDestino) || asesores.some((n) => chatId.startsWith(n))) return;
  guardarMensaje(chatId, 'asesor:celular', msg.body || `[${msg.type}]`);
  pausarBot(chatId, PAUSA_MS);
  console.log(`👤 Un humano respondió a ${chatId} (${telDestino}) desde el celular; bot en pausa temporal.`);
});

// ---------- Votos en las encuestas del catálogo ----------

// La librería pierde los votos cuando el chat usa ids @lid (no encuentra la encuesta original).
// Por eso se escucha directamente en WhatsApp Web el registro de votos y se busca la encuesta por su
// código único. También se deja el evento de la librería por si funciona; los duplicados se ignoran.
// ---------- Arreglo del envío de archivos (PDF de cotizaciones) ----------
// La librería arma el mensaje copiando el objeto interno del archivo ({ id: clave, ...mediaOptions }),
// que trae campos privados de WhatsApp (__x_id, parent, mirror…). __x_id pisa el id interno del
// mensaje y WhatsApp falla al calcular el remitente ("Data passed to getter must include an id property").
// Se entrega solo la versión limpia de los datos del archivo (toJSON), sin campos internos.
async function repararEnvioArchivos() {
  const pagina = client.pupPage;
  if (!pagina) return;
  await pagina.evaluate(() => {
    if (window.__archivosEleven) return;
    window.__archivosEleven = true;
    const procesar = window.WWebJS.processMediaData;
    window.WWebJS.processMediaData = async (...args) => {
      const datos = await procesar(...args);
      return typeof datos?.toJSON === 'function' ? { ...datos.toJSON() } : datos;
    };
  });
  console.log('📄 Envío de archivos listo.');
}

let votosExpuestos = false;
async function engancharVotos() {
  const pagina = client.pupPage;
  if (!pagina) return;
  if (!votosExpuestos) {
    await pagina.exposeFunction('onVotoEleven', (v) => procesarVoto(v));
    votosExpuestos = true;
  }
  await pagina.evaluate(() => {
    if (window.__votosEleven) return;
    window.__votosEleven = true;
    const { Msg } = window.require('WAWebCollections');
    window.WWebJS.injectToFunction(
      { module: 'WAWebAddonPollVoteTableMode', function: 'pollVoteTableMode.bulkUpsert' },
      (module, original, ...args) => {
        try {
          for (const voto of args[0] || []) {
            const clave = voto.pollUpdateParentKey;
            const encuesta = Msg.get(clave?._serialized) || Msg.getModelsArray().find((m) => m.id?.id === clave?.id);
            if (!encuesta?.pollOptions) continue;
            const opciones = Array.from(voto.selectedOptionLocalIds || [])
              .map((id) => encuesta.pollOptions.find((o) => o.localId === id)?.name)
              .filter(Boolean);
            window.onVotoEleven({
              chatId: encuesta.id.remote?._serialized || String(encuesta.id.remote),
              deBot: !!encuesta.id.fromMe,
              opciones,
              momento: Number(voto.senderTimestampMs || voto.t * 1000 || Date.now()),
            });
          }
        } catch {}
        const r = original.apply(module, args);
        if (r && typeof r.catch === 'function') r.catch(() => {});
        return r;
      }
    );
  });
  console.log('📊 Escuchando votos de encuestas.');
}

const INICIO = Date.now();
const votosVistos = new Set();

// Respaldo: evento de la librería
client.on('vote_update', (voto) => {
  if (!voto.parentMessage?.fromMe) return;
  procesarVoto({
    chatId: voto.parentMessage.id?.remote || voto.voter,
    deBot: true,
    opciones: (voto.selectedOptions || []).map((o) => o.name).filter(Boolean),
    momento: voto.interractedAtTs,
  });
});

async function procesarVoto({ chatId, deBot, opciones, momento }) {
  try {
    if (!deBot || !opciones?.length || (momento || 0) < INICIO - 60_000 || !esChatDeCliente(chatId)) return;
    const opcion = opciones[opciones.length - 1];
    const clave = `${chatId}|${opcion}|${Math.round((momento || 0) / 1000)}`;
    if (votosVistos.has(clave)) return;
    votosVistos.add(clave);
    if (votosVistos.size > 500) votosVistos.clear();

    console.log(`📊 Voto de ${chatId}: "${opcion}"`);
    guardarMensaje(chatId, 'cliente', `📊 Eligió: ${opcion}`);

    const eleccion = interpretarOpcion(opcion);
    if (!eleccion || !botPuedeResponder(chatId)) return;

    if (eleccion.tipo === 'plan') {
      await enviarTexto(chatId, detallePlan(eleccion.plan));
      guardarCliente(chatId, { plan_interes: eleccion.plan.nombre, estado: 'interesado' });
    }
  } catch (e) {
    console.error('Error procesando voto de encuesta:', e?.message || e);
  }
}

// ---------- Mensajes de clientes ----------

const esChatDeCliente = (id) => id.endsWith('@c.us') || id.endsWith('@lid');
// WhatsApp ahora identifica a muchos contactos con un id privado (@lid); aquí se obtiene su número real
const cacheNumeros = new Map();
async function numeroReal(chatId) {
  if (!chatId.endsWith('@lid')) return chatId.split('@')[0];
  if (cacheNumeros.has(chatId)) return cacheNumeros.get(chatId);
  try {
    const [r] = await client.getContactLidAndPhone([chatId]);
    const numero = r?.pn?.split('@')[0] || null;
    if (numero) cacheNumeros.set(chatId, numero);
    return numero;
  } catch {
    return null;
  }
}

/**
 * Descarga el audio/archivo de un mensaje. La función de la librería falla a veces cuando el mensaje
 * acaba de llegar, así que se reintenta y, si el paso de "preparar" falla, se descarga directo.
 */
async function descargarMedia(msg) {
  // Los audios largos tardan más en estar disponibles: se reintenta durante ~20 segundos
  for (let intento = 1; intento <= 6; intento++) {
    try {
      const media = await msg.downloadMedia();
      if (media?.data) return media;
    } catch {}
    try {
      const datos = await client.pupPage.evaluate(async (msgId, codigo) => {
        const Msg = window.require('WAWebCollections').Msg;
        // Con los ids @lid el mensaje puede estar guardado con otro chat en el id: se busca por su código único
        const m = Msg.get(msgId) || Msg.getModelsArray().find((x) => x.id?.id === codigo);
        if (!m?.directPath || !m.mediaKey) return null;
        if (m.mediaData && m.mediaData.mediaStage !== 'RESOLVED') {
          try { await m.downloadMedia({ downloadEvenIfExpensive: true, rmrReason: 1 }); } catch {}
        }
        const qpl = { addAnnotations() { return this; }, addPoint() { return this; } };
        const buffer = await window.require('WAWebDownloadManager').downloadManager.downloadAndMaybeDecrypt({
          directPath: m.directPath, encFilehash: m.encFilehash, filehash: m.filehash, mediaKey: m.mediaKey,
          mediaKeyTimestamp: m.mediaKeyTimestamp, type: m.type, signal: new AbortController().signal, downloadQpl: qpl,
        });
        return { data: await window.WWebJS.arrayBufferToBase64Async(buffer), mimetype: m.mimetype };
      }, msg.id._serialized, msg.id.id);
      if (datos?.data) return datos;
    } catch (e) {
      if (intento === 6) console.warn(`   no se pudo descargar el audio: ${e?.message || e}`);
    }
    console.log(`   audio aún no disponible (intento ${intento}/6), esperando...`);
    await new Promise((r) => setTimeout(r, 3000));
  }
  console.warn('   diagnóstico de descarga:', JSON.stringify(await diagnosticarMedia(msg.id._serialized, msg.id.id)));
  return null;
}

async function diagnosticarMedia(msgId, codigo) {
  try {
    return await client.pupPage.evaluate(async (msgId, codigo) => {
      const pasos = { msgId };
      const err = (e) => `${e?.name || ''}: ${e?.message || e}`;
      let m;
      try {
        const Msg = window.require('WAWebCollections').Msg;
        m = Msg.get(msgId);
        pasos.enMemoria = !!m;
        if (!m) m = Msg.getModelsArray().find((x) => x.id?.id === codigo);
        pasos.encontradoPorCodigo = !!m;
        if (m) pasos.idReal = m.id?._serialized;
      } catch (e) { pasos.buscar = err(e); }
      if (m) {
        pasos.tipo = m.type;
        pasos.stage = m.mediaData?.mediaStage;
        pasos.tieneDirectPath = !!m.directPath;
        pasos.tieneMediaKey = !!m.mediaKey;
        try { await m.downloadMedia({ downloadEvenIfExpensive: true, rmrReason: 1 }); pasos.preparar = 'ok'; } catch (e) { pasos.preparar = err(e); }
        pasos.stageDespues = m.mediaData?.mediaStage;
        try { pasos.moduloDescarga = !!window.require('WAWebDownloadManager')?.downloadManager; } catch (e) { pasos.moduloDescarga = err(e); }
        try { pasos.blob = !!m.mediaData?.mediaBlob; } catch {}
      }
      return pasos;
    }, msgId, codigo);
  } catch (e) {
    return { fallo: String(e?.message || e) };
  }
}

const TIPOS_MULTIMEDIA = ['image', 'video', 'document', 'sticker', 'location', 'vcard', 'multi_vcard'];
const temporizadores = new Map();
const procesando = new Set();

client.on('message', (msg) => recibirMensaje(msg));

async function recibirMensaje(msg, { recuperado = false } = {}) {
  try {
    console.log(`📩 ${recuperado ? 'Mensaje pendiente (llegó con el bot apagado)' : 'Mensaje'} tipo "${msg.type}" de ${msg.from}`);
    if (!esChatDeCliente(msg.from) || msg.fromMe || msg.isStatus) return;

    // Optimización de respuesta inmediata: consultar primero caché en memoria y base de datos local
    const chatExistente = db.prepare('SELECT nombre, telefono FROM chats WHERE id = ?').get(msg.from);
    let telefono = chatExistente?.telefono;
    let nombre = chatExistente?.nombre || msg._data?.notifyName;

    if (!telefono) {
      telefono = (await numeroReal(msg.from)) || msg._data?.notifyName || msg.from.split('@')[0];
    }

    if (!nombre) {
      try {
        const contacto = await Promise.race([
          msg.getContact(),
          new Promise((r) => setTimeout(() => r(null), 400)),
        ]);
        if (contacto) {
          nombre = contacto.pushname || contacto.name || msg._data?.notifyName;
          if (!telefono && contacto.number) telefono = contacto.number;
        }
      } catch {}
    }

    telefono ||= msg.from.split('@')[0];
    const asesores = obtenerNumerosAsesores();
    if (asesores.includes(telefono)) return; // los asesores no son atendidos por el bot
    registrarChat(msg.from, { nombre, telefono });

    // Convertir el mensaje a texto
    let texto;
    if (msg.type === 'chat') {
      texto = msg.body?.trim();
    } else if (msg.type === 'ptt' || msg.type === 'audio') {
      console.log(`🎤 Nota de voz de ${telefono}, transcribiendo...`);
      const media = await descargarMedia(msg);
      console.log(`   audio descargado: ${media ? `${media.mimetype}, ${Math.round(media.data.length * 0.75 / 1024)} KB` : 'NO se pudo descargar'}`);
      let transcripcion = '';
      if (media) {
        try {
          transcripcion = await transcribir(media.data, media.mimetype);
          console.log(`   transcrito (${transcripcion.length} caracteres)`);
        } catch (e) {
          console.error('   error transcribiendo:', e.message);
        }
      }
      texto = transcripcion ? `🎤 ${transcripcion}` : '';
      if (!texto) {
        guardarMensaje(msg.from, 'cliente', '[nota de voz que no se pudo escuchar]');
        if (botPuedeResponder(msg.from)) {
          await enviarTexto(msg.from, '¡Uy, qué pena! 🙈 No logré escuchar tu audio. ¿Me lo reenvías o me cuentas por escrito? Así te ayudo enseguida.');
        }
        return;
      }
    } else if (TIPOS_MULTIMEDIA.includes(msg.type)) {
      guardarMensaje(msg.from, 'cliente', `[${msg.type}] ${msg.body || ''}`.trim());
      if (botPuedeResponder(msg.from)) {
        await enviarTexto(msg.from, 'Por ahora solo puedo leer mensajes de texto y notas de voz 🙏 ¿Me cuentas por aquí qué necesitas?');
      }
      return;
    } else {
      // avisos internos de WhatsApp (cifrado, llamadas, cambios de seguridad…): se ignoran
      console.log(`   (ignorado: mensaje tipo "${msg.type}" de ${telefono}, hasMedia=${msg.hasMedia})`);
      return;
    }
    if (!texto) return;

    guardarMensaje(msg.from, 'cliente', texto);

    // Reactivación inteligente: si el chat no está desactivado manualmente (bot_activo=1)
    // y el cliente escribe una consulta, turno, o pasan unos minutos, despausar automáticamente
    const chatInfo = db.prepare('SELECT bot_activo, pausa_hasta FROM chats WHERE id = ?').get(msg.from);
    if (chatInfo && chatInfo.bot_activo === 1 && chatInfo.pausa_hasta) {
      const palabrasBot = ['bot', 'asistente', 'agendar', 'turno', 'sesion', 'sesión', 'cupo', 'hola', 'buenas', 'precio', 'plan', 'cuanto', 'cuánto', 'pago', 'sede', 'horario', 'mensualidad', 'membresia', 'membresía'];
      const esConsulta = palabrasBot.some((p) => new RegExp(`\\b${p}\\b`, 'i').test(texto));
      const tiempoPausaRestante = chatInfo.pausa_hasta - Date.now();
      if (esConsulta || tiempoPausaRestante < (PAUSA_MS - 5 * 60 * 1000)) {
        db.prepare('UPDATE chats SET pausa_hasta = NULL WHERE id = ?').run(msg.from);
        console.log(`🤖 Chat ${telefono} (${msg.from}) reactivado automáticamente para responder: "${texto}"`);
      }
    }

    if (!botPuedeResponder(msg.from)) {
      console.log(`⏸️ Chat ${telefono} (${msg.from}) en pausa humana (bot_activo=${chatInfo?.bot_activo}, hasta ${chatInfo?.pausa_hasta ? new Date(chatInfo.pausa_hasta).toLocaleTimeString() : 'indefinido'}). Bot no interviene.`);
      return;
    }

    // Respuesta inteligente e inmediata al recordatorio de 2 horas (Confirmar o Cancelar turno)
    const textoNorm = texto.trim().toLowerCase();
    const esConfirmacion = /^(si|sí|confirmar|confirmo|confirmado|asistiré|asistire|voy|allá estaré|alla estare|cuenta conmigo)[\s!.]*$/i.test(textoNorm)
      || /^(si|sí)\s+(asisto|voy|confirmo)/i.test(textoNorm);
    const esCancelacion = /^(cancelar|cancelo|cancelado|no puedo|no voy|no podré|no podre|liberar cupo)[\s!.]*$/i.test(textoNorm)
      || /^(no\s+(puedo\s+ir|asisto|voy))/i.test(textoNorm);

    if (esConfirmacion || esCancelacion) {
      const hoyCol = ahoraColombia().fecha;
      const sesionTurno = db.prepare(`
        SELECT * FROM entrenamientos
        WHERE chat_id = ? AND fecha = ? AND estado IN ('agendada', 'confirmada')
        ORDER BY hora ASC LIMIT 1
      `).get(msg.from, hoyCol);

      if (sesionTurno) {
        if (esConfirmacion) {
          confirmarEntrenamiento(msg.from, sesionTurno.id);
          const horaTxt = formatearHoraSesion(sesionTurno.hora);
          await enviarTexto(msg.from, `¡Excelente, *${sesionTurno.nombre_alumno || 'Atleta'}*! Asistencia confirmada para las *${horaTxt}*. ¡Nos vemos en Eleven Performance puntualmente! 💪🔥`);
          console.log(`✅ Turno confirmado por WhatsApp para ${msg.from} a las ${sesionTurno.hora}`);
          return;
        } else if (esCancelacion) {
          cancelarEntrenamiento(msg.from, sesionTurno.id, 'Cancelado por el atleta en WhatsApp tras recordatorio');
          const horaTxt = formatearHoraSesion(sesionTurno.hora);
          await enviarTexto(msg.from, `Entendido, *${sesionTurno.nombre_alumno || 'Atleta'}*. Tu cupo para las *${horaTxt}* ha sido cancelado y liberado en el sistema. Puedes volver a agendar en cualquier momento por este chat 🙌`);
          console.log(`❌ Turno cancelado por WhatsApp para ${msg.from} a las ${sesionTurno.hora}`);
          return;
        }
      }
    }

    // El cliente pide hablar con una persona
    if (PALABRAS_ASESOR.some((p) => new RegExp(`\\b${p}\\b`, 'i').test(texto))) {
      pausarBot(msg.from, PAUSA_MS);
      guardarCliente(msg.from, { telefono });
      await enviarTexto(
        msg.from,
        enHorarioAsesores()
          ? 'Listo, en breve un asesor te atenderá por este mismo chat. 🙌'
          : 'Listo, ya dejé tu solicitud 🙌 Nuestros asesores atienden de lunes a viernes de 8:00 a.m. a 10:00 p.m. y sábados de 9:00 a.m. a 8:00 p.m. (hora Colombia). Te escribirán por este chat apenas inicie el horario.'
      );
      await notificarAsesores(`🙋 *Cliente pide hablar con un asesor*\nÚltimo mensaje: "${texto}"\n\n${resumenCliente(msg.from, telefono)}`);
      return;
    }

    // Esperar unos segundos por si el cliente manda más mensajes seguidos
    clearTimeout(temporizadores.get(msg.from));
    temporizadores.set(msg.from, setTimeout(() => atender(msg.from, telefono), ESPERA_MS));
  } catch (err) {
    console.error('Error procesando mensaje:', err?.stack || err?.message || err);
  }
}

// ---------- Mensajes que llegaron con el bot apagado ----------
// Al conectar, se revisan los chats cuyo último mensaje es del cliente. De cada uno se toman los mensajes
// del cliente posteriores a la última respuesta enviada (del bot o de un asesor) y que aún no están en la
// base de datos, y se procesan como si acabaran de llegar: el bot responde una sola vez con todo el contexto.
// No depende de "no leído" (el bot no marca los chats como leídos) y no repite respuestas ya enviadas.
const MAX_DIAS_PENDIENTES = Number(process.env.PENDIENTES_DIAS) || 7;
let revisandoPendientes = false;
async function responderPendientes() {
  if (revisandoPendientes) return;
  revisandoPendientes = true;
  try {
    const limite = Date.now() - MAX_DIAS_PENDIENTES * 24 * 60 * 60 * 1000;
    // Se leen los chats directamente en WhatsApp Web (client.getChats() falla completo si un solo chat da error)
    const candidatos = await client.pupPage.evaluate((limite) => {
      const Chat = window.require('WAWebCollections').Chat;
      return Chat.getModelsArray().map((c) => {
        try {
          const ultimo = c.msgs?.getModelsArray?.().at(-1);
          return { id: c.id?._serialized, grupo: !!c.isGroup, t: c.t, ultimoMio: ultimo ? !!ultimo.id?.fromMe : null };
        } catch { return null; }
      }).filter((c) => c?.id && !c.grupo && c.t * 1000 > limite && c.ultimoMio !== true);
    }, limite);
    const ids = candidatos.map((c) => c.id).filter(esChatDeCliente);
    console.log(`🔎 Revisando ${ids.length} chat(s) con actividad reciente por si quedaron mensajes sin responder…`);
    let total = 0;
    for (const id of ids) {
      let chat = { id: { _serialized: id }, name: '' };
      try {
        // Los mensajes se leen directo en WhatsApp Web: getChatById/fetchMessages fallan con los ids @lid
        const datos = await client.pupPage.evaluate((id) => {
          const c = window.require('WAWebCollections').Chat.get(id);
          if (!c) return { nombre: '', mensajes: [] };
          const mensajes = c.msgs.getModelsArray().slice(-25).map((m) => {
            try { return window.WWebJS.getMessageModel(m); } catch { return null; }
          }).filter(Boolean);
          return { nombre: c.formattedTitle || c.name || '', mensajes };
        }, id);
        chat.name = datos.nombre;
        const mensajes = datos.mensajes.map((m) => new Message(client, m));
        // Solo lo que el cliente escribió después de la última respuesta enviada en este chat
        const ultimaRespuesta = mensajes.findLastIndex((m) => m.fromMe);
        const chatId = mensajes.at(-1)?.from || chat.id._serialized;
        const ultimoGuardado = db.prepare('SELECT MAX(fecha) AS f FROM mensajes WHERE chat_id = ?').get(chatId)?.f || 0;
        const nuevos = mensajes.slice(ultimaRespuesta + 1)
          .filter((m) => !m.fromMe && m.timestamp * 1000 > limite && m.timestamp * 1000 > ultimoGuardado);
        if (!nuevos.length) continue;
        total += nuevos.length;
        console.log(`📬 ${chat.name || chatId}: ${nuevos.length} mensaje(s) sin responder de cuando el bot estaba apagado`);
        for (const m of nuevos) await recibirMensaje(m, { recuperado: true });
        await new Promise((r) => setTimeout(r, 1500)); // sin afán: no responder a todos a la vez
      } catch (e) {
        console.warn(`No se pudieron revisar los mensajes pendientes de ${chat.id?._serialized}: ${e?.message || e}`);
      }
    }
    console.log(total ? `📬 Se están respondiendo ${total} mensaje(s) que llegaron con el bot apagado.` : '📭 No había mensajes pendientes de cuando el bot estaba apagado.');

    // Chats cuyo último mensaje guardado es del cliente (llegó, pero el bot se cayó o falló antes de responder)
    const sinResponder = db.prepare(`
      SELECT m.chat_id, c.telefono FROM mensajes m JOIN chats c ON c.id = m.chat_id
      WHERE m.id IN (SELECT MAX(id) FROM mensajes GROUP BY chat_id) AND m.autor = 'cliente' AND m.fecha > ?`).all(limite);
    let atendidos = 0;
    for (const { chat_id: id, telefono } of sinResponder) {
      if (!botPuedeResponder(id) || temporizadores.has(id) || procesando.has(id)) continue;
      atendidos++;
      temporizadores.set(id, setTimeout(() => atender(id, telefono || id.split('@')[0]), ESPERA_MS + atendidos * 2000));
    }
    if (atendidos) console.log(`📬 ${atendidos} chat(s) tenían mensajes guardados sin respuesta: se responden ahora.`);
  } catch (e) {
    console.error('⚠️ No se pudieron revisar los mensajes pendientes:', e?.stack || e?.message || e);
  } finally {
    revisandoPendientes = false;
  }
}

setInterval(() => {
  if (estadoWhatsApp.conectado) {
    revisarSinRespuesta();
    procesarRecordatoriosEntrenamientos({
      avisarCliente: (chatId, txt) => enviarTexto(chatId, txt)
    }).catch((e) => console.warn('Aviso en recordatorios automáticos:', e.message));
  }
}, 30 * 1000);

async function atender(chatId, telefono) {
  temporizadores.delete(chatId);
  if (procesando.has(chatId)) {
    // Ya se está respondiendo a este chat: se atiende de nuevo al terminar
    temporizadores.set(chatId, setTimeout(() => atender(chatId, telefono), ESPERA_MS));
    return;
  }
  procesando.add(chatId);
  try {
    if (!botPuedeResponder(chatId)) return;
    console.log(`🤔 Preparando respuesta para ${telefono}...`);
    // "Escribiendo..." es solo estético: si falla, se sigue igual
    client.getChatById(chatId).then((chat) => chat.sendStateTyping()).catch(() => {});

    const herramientas = crearHerramientas({
      chatId,
      telefono,
      notificarAsesor: notificarAsesores,
      enviarEncuesta: (titulo, opciones) => enviarEncuesta(chatId, titulo, opciones),
      enviarTexto: (texto) => enviarTexto(chatId, texto),
      enviarDocumento: async (ruta, nombre, texto) => {
        await enviarArchivo(chatId, ruta, nombre, texto);
        // Se registra sin nombre de archivo ni número, para que la IA no lo copie después
        guardarMensaje(chatId, 'bot', '📄 [Se envió la cotización en PDF]');
      },
    });
    const historial = historialIA(chatId, MEMORIA);
    // Si el último mensaje ya es del bot, no hay nada nuevo que responder (evita respuestas dobles
    // cuando el cliente escribió varias veces mientras el bot contestaba)
    if (historial.at(-1)?.role !== 'user') return;
    const respuesta = await responder(historial, herramientas, obtenerCliente(chatId));
    // Si mientras la IA pensaba un humano tomó el chat, no se envía la respuesta
    if (respuesta && botPuedeResponder(chatId)) await enviarTexto(chatId, respuesta);
    console.log(`💬 Respondido a ${telefono}`);
  } catch (err) {
    console.error(`Error respondiendo a ${chatId}:`, err.stack || err.message);
    // El cliente no debe quedarse sin respuesta
    try {
      if (botPuedeResponder(chatId)) {
        await enviarTexto(chatId, 'Disculpa, tuve un inconveniente técnico 🙏 Escríbeme de nuevo en un momento, o escribe *asesor* para hablar con una persona.');
      }
    } catch {}
  } finally {
    procesando.delete(chatId);
  }
}

// ---------- Arranque ----------

// Si ya hay un bot encendido (su panel ocupa el puerto), no se abre un segundo: chocarían entre sí
const yaEncendido = await new Promise((ok) => {
  const s = net.connect(PUERTO_PANEL, '127.0.0.1');
  s.once('connect', () => { s.destroy(); ok(true); });
  s.once('error', () => ok(false));
});
if (yaEncendido) {
  console.log('⚠️ El bot YA está encendido en otra ventana. Esta ventana no hace falta.');
  process.exit(3);
}

iniciarPanel({
  estadoWhatsApp,
  sheetsActivo,
  solicitarCodigoVinculacion,
  // Avisos al cliente (ej. cambios en su cita hechos desde el panel)
  avisarCliente: (chatId, texto) => enviarTexto(chatId, texto),
  reconectarWhatsApp: () => {
    cambiarEstado('conectando', 'Reconectando por solicitud desde el panel');
    reiniciarBot('reconexión pedida desde el panel');
  },
  // Cierra la sesión (el celular deja de tener vinculado el bot) y reinicia para mostrar un código nuevo
  desvincularWhatsApp: async () => {
    cambiarEstado('conectando', 'Cerrando la sesión para vincular de nuevo');
    try {
      await Promise.race([client.logout(), new Promise((r) => setTimeout(r, 15000))]);
    } catch (e) {
      console.warn('No se pudo cerrar la sesión de forma ordenada:', e?.message || e);
    }
    const { rmSync } = await import('node:fs');
    try { rmSync('.sesion', { recursive: true, force: true }); } catch {}
    reiniciarBot('se desvinculó WhatsApp desde el panel');
  },
  enviarComoAsesor: async (chatId, texto, nombreAsesor) => {
    if (!estadoWhatsApp.conectado) throw new Error('WhatsApp no está conectado');
    await enviarTexto(chatId, texto, `asesor:${nombreAsesor}`);
    pausarBot(chatId, PAUSA_MS);
  },
});

// Túnel a internet para el panel (dirección de Vercel → túnel → este PC)
iniciarTunel(PUERTO_PANEL)
  .catch((e) => console.error('⚠️ No se pudo abrir el túnel a internet:', e?.message || e));

if (sheetsActivo) {
  probarConexion()
    .then(() => console.log('✅ Google Sheets conectado.'))
    .catch((e) => console.error('⚠️ No se pudo conectar a Google Sheets:', e.response?.data?.error?.message || e.message));
} else {
  console.log('ℹ️  Google Sheets no configurado (opcional). Ver LEEME.md.');
}

// WhatsApp Web a veces se recarga mientras se prepara; en ese caso se reintenta en vez de cerrar el programa
async function iniciarWhatsApp(intento = 1) {
  try {
    limpiarBloqueosSesion();
    await client.initialize();
  } catch (e) {
    console.warn(`⚠️ WhatsApp no pudo iniciar (intento ${intento}): ${e.message}. Reintentando en 5 segundos...`);
    try {
      await client.destroy();
    } catch {}
    limpiarBloqueosSesion();
    setTimeout(() => iniciarWhatsApp(intento + 1), 5000);
  }
}

// Vigilante: si WhatsApp Web se queda trabado cargando (sin conectar y sin pedir vinculación),
// el programa se cierra y el lanzador (INICIAR-BOT.bat) lo vuelve a encender a los 10 segundos.
setTimeout(() => {
  if (!estadoWhatsApp.conectado && !estadoWhatsApp.qr && !estadoWhatsApp.codigo) {
    console.error('⚠️ WhatsApp no terminó de cargar en 3 minutos. Reiniciando el bot...');
    process.exit(1);
  }
}, 3 * 60 * 1000).unref();

// Un error inesperado no debe apagar el bot ni el panel
process.on('unhandledRejection', (e) => console.error('⚠️ Error no controlado:', e?.message || e));

iniciarWhatsApp();
