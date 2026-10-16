// Servidor Web Unificado de Eleven Performance: Control de WhatsApp, Atletas (CRM), Turnos de Gimnasio y Panel Web
import express from 'express';
import { timingSafeEqual, randomBytes } from 'node:crypto';
import QRCode from 'qrcode';
import { db, activarBot, guardarCliente, marcarChatEliminado, obtenerConfig, guardarConfig, registrarChat, guardarMensaje, pausarBot } from '../db.js';
import { cambiarEstadoCita, editarCita, eliminarCita, textoAvisoCita } from '../agenda.js';
import { ESTADOS_CLIENTE } from '../herramientas.js';
import { sincronizarCliente, sincronizarCita, eliminarDeHoja } from '../sheets.js';
import { catalogo, guardarCatalogo } from '../catalogo.js';
import {
  ROLES, autenticar, listarUsuarios, obtenerUsuario, crearUsuario, editarUsuario, eliminarUsuario, cambiarMiClave,
} from '../usuarios.js';
import { ruta, ahoraColombia, actualizarArchivoEnv } from '../rutas.js';
import {
  consultarDisponibilidadGym, agendarEntrenamiento, cancelarEntrenamiento, reprogramarEntrenamiento, redactarAvisoCancelacionSesion, resolverDestinoWhatsApp,
  listarMembresiasGym, redactarRecordatorioPago, renovarMensualidad,
  confirmarEntrenamiento, registrarPagoGym, listarPagosGym, generarReporteMensualGym
} from '../gimnasio.js';

const ESTADOS_CITA = ['agendada', 'confirmada', 'realizada', 'cancelada', 'no asistió'];
const INACTIVIDAD_MS = 8 * 60 * 60 * 1000;
const MAX_FALLOS = 5;
const BLOQUEO_MS = 5 * 60 * 1000;
const DESBLOQUEO_USUARIOS_MS = 10 * 60 * 1000;

const MAESTRA = { id: 0, usuario: 'admin', nombre: 'Administrador Eleven', rol: 'admin', activo: 1 };

function ipCliente(req) {
  const cadena = String(req.headers['x-forwarded-for'] || '').split(',').map((s) => s.trim()).filter(Boolean);
  return cadena.length ? cadena[cadena.length - 1] : req.ip;
}

const iguales = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};

export function iniciarPanel({ estadoWhatsApp, sheetsActivo, enviarComoAsesor, reconectarWhatsApp, desvincularWhatsApp, avisarCliente, solicitarCodigoVinculacion }) {
  const claveConfigurada = process.env.PANEL_CLAVE;
  if (!claveConfigurada || claveConfigurada === 'admin123' || claveConfigurada === 'cambia_esta_clave') {
    if (process.env.NODE_ENV === 'production' || process.env.TUNEL) {
      console.error('\n❌ ERROR CRÍTICO DE SEGURIDAD: Debes definir una PANEL_CLAVE segura en .env antes de exponer el servidor a internet.');
      process.exit(1);
    } else {
      console.warn('\n⚠️ ADVERTENCIA DE SEGURIDAD: PANEL_CLAVE no configurada o usa valor débil (admin123). Configúrala en bot-whatsapp/.env\n');
    }
  }
  const CLAVE = claveConfigurada || 'admin123';
  const PUERTO = Number(process.env.PORT || process.env.PANEL_PUERTO) || 7077;

  const app = express();
  app.use(express.json());

  // CORS restrictivo para localhost, mismo host y dominios autorizados
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowed = [
      'http://localhost:7077',
      'http://127.0.0.1:7077',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      process.env.DOMINIO_PERMITIDO,
      process.env.DOMINIO_PANEL,
      process.env.NGROK_DOMINIO ? `https://${process.env.NGROK_DOMINIO}` : null,
    ].filter(Boolean);

    const host = req.headers.host;
    let permitido = false;

    if (!origin) {
      permitido = true; // Solicitud directa sin encabezado Origin (mismo servidor o backend directo)
    } else {
      let isAllowedOrigin = false;
      try {
        const hostname = new URL(origin).hostname;
        isAllowedOrigin =
          hostname === 'localhost' ||
          hostname === '127.0.0.1' ||
          hostname.endsWith('.vercel.app') ||
          hostname.endsWith('.trycloudflare.com') ||
          hostname.endsWith('.ngrok-free.app') ||
          hostname.endsWith('.ngrok-free.dev') ||
          (host && (origin === `http://${host}` || origin === `https://${host}`)) ||
          allowed.includes(origin);
      } catch (_) {}

      if (isAllowedOrigin) {
        permitido = true;
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      }
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

    if (req.method === 'OPTIONS') {
      return permitido ? res.status(204).end() : res.status(403).end();
    }
    next();
  });

  // Sesiones de usuario
  db.exec('CREATE TABLE IF NOT EXISTS sesiones (token TEXT PRIMARY KEY, usuario_id INTEGER NOT NULL, expira INTEGER NOT NULL)');
  const tokenDe = (req) => (req.headers.cookie || '').match(/(?:^|;\s*)eleven_sesion=([a-f0-9]{64})(?:;|$)/)?.[1];

  function leerSesion(req) {
    const token = tokenDe(req);
    if (!token) return null;
    const s = db.prepare('SELECT * FROM sesiones WHERE token = ?').get(token);
    const ahora = Date.now();
    if (!s || s.expira < ahora) {
      if (s) db.prepare('DELETE FROM sesiones WHERE token = ?').run(token);
      return null;
    }
    if (s.expira - ahora < INACTIVIDAD_MS - 60_000) {
      db.prepare('UPDATE sesiones SET expira = ? WHERE token = ?').run(ahora + INACTIVIDAD_MS, token);
    }
    const u = s.usuario_id === 0 ? MAESTRA : obtenerUsuario(s.usuario_id);
    return u?.activo ? u : null;
  }

  const intentos = new Map();

  // Limpieza periódica de intentos expirados para evitar fugas de memoria
  setInterval(() => {
    const ahora = Date.now();
    for (const [ip, reg] of intentos.entries()) {
      if (reg.hasta < ahora && ahora - (reg.ultimo || 0) > BLOQUEO_MS) {
        intentos.delete(ip);
      }
    }
  }, 15 * 60 * 1000).unref();

  app.post('/api/login', (req, res) => {
    const ip = ipCliente(req);
    const ahora = Date.now();
    const registro = intentos.get(ip);
    if (registro?.hasta > ahora) {
      const min = Math.ceil((registro.hasta - ahora) / 60000);
      console.warn(`🚨 [SEGURIDAD] Intento de login bloqueado por exceso de fallos desde IP: ${ip}`);
      return res.status(429).json({ error: `Demasiados intentos fallidos. Bloqueado por seguridad durante ${min} minuto(s).` });
    }

    const { usuario, clave } = req.body || {};
    let u = null;
    if (usuario === 'admin' && iguales(clave, CLAVE)) u = MAESTRA;
    else u = autenticar(usuario, clave);

    if (!u) {
      const fallos = (registro?.fallos || 0) + 1;
      const bloqueado = fallos >= MAX_FALLOS;
      intentos.set(ip, {
        fallos,
        hasta: bloqueado ? ahora + BLOQUEO_MS : 0,
        ultimo: ahora
      });
      if (bloqueado) {
        console.warn(`🚨 [SEGURIDAD] IP ${ip} BLOQUEADA por ${BLOQUEO_MS / 60000} minutos tras ${MAX_FALLOS} intentos fallidos de login.`);
      }
      const restantes = Math.max(0, MAX_FALLOS - fallos);
      return res.status(401).json({
        error: bloqueado
          ? 'Demasiados intentos fallidos. Acceso bloqueado temporalmente por 5 minutos.'
          : `Usuario o clave incorrectos. Te quedan ${restantes} intento(s) antes del bloqueo temporal.`
      });
    }

    intentos.delete(ip);
    const token = randomBytes(32).toString('hex');
    db.prepare('INSERT INTO sesiones (token, usuario_id, expira) VALUES (?, ?, ?)').run(token, u.id, Date.now() + INACTIVIDAD_MS);
    res.setHeader('Set-Cookie', `eleven_sesion=${token}; HttpOnly; SameSite=None; Secure; Path=/`);
    res.json({ ok: true, usuario: { id: u.id, usuario: u.usuario, nombre: u.nombre, rol: u.rol } });
  });

  app.post('/api/logout', (req, res) => {
    const token = tokenDe(req);
    if (token) db.prepare('DELETE FROM sesiones WHERE token = ?').run(token);
    res.setHeader('Set-Cookie', 'eleven_sesion=; HttpOnly; SameSite=None; Secure; Path=/; Max-Age=0');
    res.json({ ok: true });
  });

  // Middleware para autenticar llamadas /api (por defecto da acceso de admin local si no hay sesión)
  app.use('/api', (req, res, next) => {
    req.usuario = leerSesion(req) || { id: 1, usuario: 'admin', nombre: 'Administrador Eleven', rol: 'admin' };
    next();
  });

  const soloAdmin = (req, res, next) =>
    req.usuario.rol === 'admin' ? next() : res.status(403).json({ error: 'Solo un administrador puede hacer esto.' });

  // ----- Estado de WhatsApp y del Sistema -----
  async function respuestaEstado(req, res) {
    const { id, usuario, nombre, rol } = req.usuario;
    res.json({
      yo: { id, usuario, nombre, rol },
      whatsapp: estadoWhatsApp.conectado,
      numero: estadoWhatsApp.numero,
      qr: estadoWhatsApp.qr ? await QRCode.toDataURL(estadoWhatsApp.qr, { margin: 1, width: 260 }) : null,
      codigo: estadoWhatsApp.codigo,
      waEstado: estadoWhatsApp.estado,
      waDesde: estadoWhatsApp.desde,
      waDetalle: estadoWhatsApp.detalle,
      numeroBot: obtenerConfig('WHATSAPP_NUMERO_BOT', process.env.WHATSAPP_NUMERO_BOT || '573206051319'),
      sheets: sheetsActivo,
      estadosCliente: ESTADOS_CLIENTE,
      estadosCita: ESTADOS_CITA,
      roles: ROLES,
    });
  }

  app.get('/api/estado', respuestaEstado);
  app.get('/api/whatsapp/estado', respuestaEstado);

  // ----- Configuración Dinámica de Números (sin depender de editar scripts ni reiniciar) -----
  app.get('/api/configuracion', (_req, res) => {
    res.json({
      numeroBot: obtenerConfig('WHATSAPP_NUMERO_BOT', process.env.WHATSAPP_NUMERO_BOT || '573206051319'),
      numeroAsesor: obtenerConfig('ASESOR_NUMEROS', process.env.ASESOR_NUMEROS || '573206051319'),
      numeroPagos: obtenerConfig('NEQUI_NUMERO', process.env.NEQUI_NUMERO || '320 605 1319'),
      bancolombia: obtenerConfig('BANCOLOMBIA_CUENTA', process.env.BANCOLOMBIA_CUENTA || 'Ahorros 245-891234-01'),
      titular: obtenerConfig('TITULAR_CUENTA', process.env.TITULAR_CUENTA || 'Eleven Performance S.A.S.'),
      nombreEmpresa: process.env.NOMBRE_EMPRESA || 'Eleven Performance',
    });
  });

  app.post('/api/configuracion', (req, res) => {
    try {
      const { numeroBot, numeroAsesor, numeroPagos, bancolombia, titular } = req.body || {};

      const normalizar = (val) => {
        if (!val) return '';
        let d = String(val).replace(/\D/g, '');
        if (d.length === 10 && d.startsWith('3')) d = '57' + d;
        return d;
      };

      if (numeroBot) {
        const norm = normalizar(numeroBot);
        guardarConfig('WHATSAPP_NUMERO_BOT', norm);
        process.env.WHATSAPP_NUMERO_BOT = norm;
        actualizarArchivoEnv('WHATSAPP_NUMERO_BOT', norm);
      }
      if (numeroAsesor) {
        const norm = normalizar(numeroAsesor);
        guardarConfig('ASESOR_NUMEROS', norm);
        process.env.ASESOR_NUMEROS = norm;
        actualizarArchivoEnv('ASESOR_NUMEROS', norm);
      }
      if (numeroPagos) {
        const val = String(numeroPagos).trim();
        guardarConfig('NEQUI_NUMERO', val);
        guardarConfig('DAVIPLATA_NUMERO', val);
        process.env.NEQUI_NUMERO = val;
        process.env.DAVIPLATA_NUMERO = val;
        actualizarArchivoEnv('NEQUI_NUMERO', `"${val}"`);
        actualizarArchivoEnv('DAVIPLATA_NUMERO', `"${val}"`);
      }
      if (bancolombia) {
        const val = String(bancolombia).trim();
        guardarConfig('BANCOLOMBIA_CUENTA', val);
        process.env.BANCOLOMBIA_CUENTA = val;
        actualizarArchivoEnv('BANCOLOMBIA_CUENTA', `"${val}"`);
      }
      if (titular) {
        const val = String(titular).trim();
        guardarConfig('TITULAR_CUENTA', val);
        process.env.TITULAR_CUENTA = val;
        actualizarArchivoEnv('TITULAR_CUENTA', `"${val}"`);
      }

      console.log(`⚙️ Configuración de números actualizada desde el panel: Bot=${process.env.WHATSAPP_NUMERO_BOT}, Asesor=${process.env.ASESOR_NUMEROS}, Pagos=${process.env.NEQUI_NUMERO}`);

      res.json({
        ok: true,
        mensaje: 'Números actualizados en el sistema exitosamente.',
        config: {
          numeroBot: process.env.WHATSAPP_NUMERO_BOT,
          numeroAsesor: process.env.ASESOR_NUMEROS,
          numeroPagos: process.env.NEQUI_NUMERO,
          bancolombia: process.env.BANCOLOMBIA_CUENTA,
          titular: process.env.TITULAR_CUENTA,
        }
      });
    } catch (e) {
      res.status(500).json({ error: e.message || 'Error guardando configuración' });
    }
  });

  // Reconectar WhatsApp
  app.post('/api/whatsapp/reconectar', soloAdmin, (req, res) => {
    console.log(`🔄 ${req.usuario.nombre} solicitó reconectar WhatsApp`);
    res.json({ ok: true, mensaje: 'Reconectando cliente de WhatsApp…' });
    reconectarWhatsApp?.();
  });

  // Solicitar código de vinculación por número (8 dígitos)
  app.post('/api/whatsapp/codigo', async (req, res) => {
    try {
      let numero = req.body?.numero || obtenerConfig('WHATSAPP_NUMERO_BOT', process.env.WHATSAPP_NUMERO_BOT || '573206051319');
      let d = String(numero).replace(/\D/g, '');
      if (d.length === 10 && d.startsWith('3')) d = '57' + d;
      if (!d) {
        return res.status(400).json({ error: 'Ingresa un número telefónico con indicativo de país (ej: 573206051319)' });
      }
      // Actualizar automáticamente la configuración para futuros arranques
      guardarConfig('WHATSAPP_NUMERO_BOT', d);
      process.env.WHATSAPP_NUMERO_BOT = d;
      actualizarArchivoEnv('WHATSAPP_NUMERO_BOT', d);

      if (typeof solicitarCodigoVinculacion !== 'function') {
        return res.status(500).json({ error: 'El solicitador de códigos no está disponible en este momento.' });
      }
      const codigo = await solicitarCodigoVinculacion(d);
      res.json({ ok: true, codigo, numero: d, mensaje: `Código generado para +${d}: ${codigo.slice(0, 4)}-${codigo.slice(4)}` });
    } catch (e) {
      res.status(500).json({ error: e?.message || 'Error solicitando código de vinculación' });
    }
  });

  // Desvincular WhatsApp
  app.post('/api/whatsapp/desvincular', soloAdmin, (req, res) => {
    console.log(`🔗 ${req.usuario.nombre} desvinculó sesión de WhatsApp`);
    res.json({ ok: true, mensaje: 'Sesión cerrada. Generando nuevo código QR y código de vinculación…' });
    desvincularWhatsApp?.();
  });

  // ----- Chats y Mensajería -----
  app.get('/api/chats', (_req, res) => {
    res.json(db.prepare(`
      SELECT chats.*, 
        CASE WHEN chats.bot_activo = 1 AND (chats.pausa_hasta IS NULL OR chats.pausa_hasta <= ?) THEN 1 ELSE 0 END AS bot_responde,
        clientes.nombre AS nombre_cliente, clientes.estado,
        (SELECT texto FROM mensajes WHERE chat_id = chats.id ORDER BY id DESC LIMIT 1) AS ultimo_texto,
        (SELECT autor FROM mensajes WHERE chat_id = chats.id ORDER BY id DESC LIMIT 1) AS ultimo_autor
      FROM chats
      LEFT JOIN clientes ON clientes.chat_id = chats.id
      WHERE EXISTS (SELECT 1 FROM mensajes WHERE chat_id = chats.id)
      ORDER BY chats.ultimo_mensaje DESC
    `).all(Date.now()));
  });

  app.get('/api/chats/:id/mensajes', (req, res) => {
    res.json(db.prepare('SELECT * FROM mensajes WHERE chat_id = ? ORDER BY id ASC').all(req.params.id));
  });

  app.post('/api/chats/:id/enviar', async (req, res) => {
    const texto = String(req.body?.texto ?? '').trim();
    if (!texto) return res.status(400).json({ error: 'El mensaje está vacío' });
    const autorNombre = req.usuario?.nombre || 'Kevin Gaitán (Admin)';
    try {
      if (enviarComoAsesor) {
        await enviarComoAsesor(req.params.id, texto, autorNombre);
      } else {
        guardarMensaje(req.params.id, `asesor:${autorNombre}`, texto);
        pausarBot(req.params.id, 1000 * 60 * 60 * 12);
      }
      res.json({ ok: true, enviado_wa: true });
    } catch (e) {
      console.warn(`Aviso de envío por WhatsApp (${req.params.id}):`, e?.message);
      // Asegurar que siempre quede registrado en la base de datos local
      try {
        guardarMensaje(req.params.id, `asesor:${autorNombre}`, texto);
        pausarBot(req.params.id, 1000 * 60 * 60 * 12);
      } catch (_) {}
      res.json({ ok: true, enviado_wa: false, advertencia: e?.message });
    }
  });

  // Envío directo desde el Bot hacia un número de WhatsApp (Cobros de membresías, recordatorios)
  app.post('/api/mensajes/enviar-directo', async (req, res) => {
    const { telefono, texto, nombre } = req.body || {};
    const txt = String(texto ?? '').trim();
    if (!txt) return res.status(400).json({ error: 'El mensaje está vacío' });
    if (!telefono) return res.status(400).json({ error: 'Falta el número de teléfono' });

    let cleanPhone = String(telefono).replace(/\D/g, '');
    if (cleanPhone.length === 10) cleanPhone = '57' + cleanPhone;
    const chatId = `${cleanPhone}@c.us`;

    try {
      try {
        registrarChat(chatId, { nombre: nombre || '', telefono: cleanPhone });
      } catch (_) {}

      if (enviarComoAsesor) {
        await enviarComoAsesor(chatId, txt, req.usuario?.nombre || 'Kevin Gaitán (Admin)');
      } else if (avisarCliente) {
        await avisarCliente(chatId, txt);
      } else {
        guardarMensaje(chatId, `asesor:${req.usuario?.nombre || 'Kevin Gaitán (Admin)'}`, txt);
      }
      res.json({ ok: true, mensaje: `Mensaje de cobro enviado por el Bot a +${cleanPhone}` });
    } catch (e) {
      console.error('Error enviando mensaje directo por bot:', e);
      try {
        guardarMensaje(chatId, `asesor:${req.usuario?.nombre || 'Kevin Gaitán (Admin)'}`, txt);
      } catch (_) {}
      res.json({ ok: true, advertencia: e?.message, mensaje: `Mensaje registrado en el historial de +${cleanPhone}` });
    }
  });

  const cambiarEstadoBot = (req, res) => {
    const { activo } = req.body || {};
    activarBot(req.params.id, activo !== false);
    res.json({ ok: true, bot_activo: activo !== false });
  };
  app.patch('/api/chats/:id/bot', cambiarEstadoBot);
  app.post('/api/chats/:id/bot', cambiarEstadoBot);

  app.delete('/api/chats/:id', (req, res) => {
    const id = req.params.id;
    const msgDeleted = db.prepare('DELETE FROM mensajes WHERE chat_id = ?').run(id).changes;
    const chatDeleted = db.prepare('DELETE FROM chats WHERE id = ?').run(id).changes;
    try { marcarChatEliminado(id); } catch (_) {}
    console.log(`🗑️ Chat eliminado del panel: ${id} (${msgDeleted} mensajes eliminados)`);
    res.json({ ok: true, mensajes: msgDeleted, chat: chatDeleted });
  });

  // ----- CRM Atletas / Clientes -----
  app.get('/api/clientes', (_req, res) => {
    res.json(db.prepare('SELECT * FROM clientes ORDER BY actualizado DESC, creado DESC').all());
  });

  app.post('/api/clientes', soloAdmin, (req, res) => {
    const { chat_id, nombre, telefono, necesidad, plan_interes, estado } = req.body || {};
    if (!chat_id) return res.status(400).json({ error: 'Falta chat_id' });
    const cliente = guardarCliente(chat_id, { nombre, telefono, necesidad, plan_interes, estado });
    sincronizarCliente(chat_id);
    res.json(cliente);
  });

  app.patch('/api/clientes/:id', (req, res) => {
    const c = guardarCliente(req.params.id, req.body || {});
    sincronizarCliente(req.params.id);
    res.json(c);
  });

  app.delete('/api/clientes/:id', soloAdmin, (req, res) => {
    const id = req.params.id;
    db.prepare('DELETE FROM clientes WHERE chat_id = ?').run(id);
    db.prepare('DELETE FROM mensajes WHERE chat_id = ?').run(id);
    db.prepare('DELETE FROM chats WHERE id = ?').run(id);
    eliminarDeHoja('Clientes', id);
    res.json({ ok: true });
  });

  // ----- Gimnasio y Entrenamientos (Eleven Performance Hub) -----
  app.get('/api/gym/entrenamientos', (req, res) => {
    try {
      const { fecha } = req.query;
      let sql = `
        SELECT e.*, c.telefono,
          COALESCE(NULLIF(e.nombre_alumno, 'Atleta'), c.nombre, e.nombre_alumno, 'Atleta') AS nombre_mostrado
        FROM entrenamientos e
        LEFT JOIN chats c ON c.id = e.chat_id
        WHERE e.estado = 'agendada'
      `;
      const params = [];
      if (fecha) {
        sql += ' AND e.fecha = ?';
        params.push(fecha);
      }
      sql += ' ORDER BY e.fecha ASC, e.hora ASC';
      const rows = db.prepare(sql).all(...params);
      res.json(rows);
    } catch (e) {
      res.status(500).json({ error: e?.message });
    }
  });

  app.get('/api/gym/disponibilidad', (req, res) => {
    try {
      const fecha = req.query.fecha || ahoraColombia().fecha;
      const turnos = consultarDisponibilidadGym(fecha);
      res.json(turnos);
    } catch (e) {
      res.status(500).json({ error: e?.message });
    }
  });

  app.post('/api/gym/agendar', (req, res) => {
    try {
      const { chat_id, nombre, fecha, hora, tipo, telefono } = req.body || {};
      if (!fecha || !hora) {
        return res.status(400).json({ error: 'Faltan campos: fecha, hora' });
      }
      let cleanPhone = String(telefono || '').replace(/\D/g, '');
      const cId = chat_id || (cleanPhone ? `${cleanPhone}@c.us` : `web_${Date.now()}`);
      if (cleanPhone && !chat_id) {
        try { registrarChat(cId, { nombre: nombre || '', telefono: cleanPhone }); } catch (_) {}
      }
      const resultado = agendarEntrenamiento(cId, nombre || 'Atleta', fecha, hora, tipo || 'Fuerza');
      res.json(resultado);
    } catch (e) {
      res.status(500).json({ error: e?.message });
    }
  });

  app.post('/api/gym/cancelar', async (req, res) => {
    try {
      const { chat_id, entrenamiento_id, id, motivo, phone, notificar } = req.body || {};
      const entId = entrenamiento_id || id;
      let resultado;
      let sesion = null;

      if (entId) {
        sesion = db.prepare('SELECT * FROM entrenamientos WHERE id = ?').get(entId);
        if (sesion) {
          resultado = cancelarEntrenamiento(sesion.chat_id, entId, motivo || 'Cancelado desde panel web');
        } else {
          resultado = { ok: true, mensaje: 'Turno ya cancelado o liberado' };
        }
      } else if (chat_id) {
        sesion = db.prepare("SELECT * FROM entrenamientos WHERE chat_id = ? AND estado = 'agendada' ORDER BY fecha ASC, hora ASC LIMIT 1").get(chat_id);
        resultado = cancelarEntrenamiento(chat_id, null, motivo || 'Cancelado desde panel web');
      } else {
        return res.status(400).json({ error: 'Falta chat_id o entrenamiento_id' });
      }

      // Si tenemos la sesión y avisarCliente está disponible, enviar mensaje por WhatsApp
      let avisoEnviado = false;
      let avisoDestino = null;
      if (sesion && notificar !== false && avisarCliente) {
        const destino = resolverDestinoWhatsApp(sesion.chat_id, phone);
        if (destino) {
          try {
            const textoAviso = redactarAvisoCancelacionSesion(sesion, motivo);
            await avisarCliente(destino, textoAviso);
            avisoEnviado = true;
            avisoDestino = destino;
            console.log(`📢 Aviso de cancelación de sesión enviado por WhatsApp a ${destino} (${sesion.nombre_alumno || 'Atleta'})`);
          } catch (errAviso) {
            console.warn(`⚠️ Error enviando aviso de cancelación por WhatsApp a ${destino}:`, errAviso?.message);
          }
        } else {
          console.log(`ℹ️ Sesión cancelada, pero no tiene número o WhatsApp asociado (${sesion.chat_id}).`);
        }
      }

      res.json({ ...resultado, aviso_enviado: avisoEnviado, destino: avisoDestino });
    } catch (e) {
      res.status(500).json({ error: e?.message });
    }
  });

  app.post('/api/gym/reprogramar', (req, res) => {
    try {
      const { id, fecha, hora } = req.body || {};
      if (!id || !fecha || !hora) return res.status(400).json({ error: "Faltan parámetros id, fecha o hora" });
      const dbId = String(id).startsWith("bot_ent_") ? Number(id.replace("bot_ent_", "")) : Number(id);
      const resultado = reprogramarEntrenamiento(dbId, fecha, hora);
      res.json(resultado);
    } catch (e) {
      res.status(500).json({ error: e?.message });
    }
  });

  app.get('/api/gym/membresias', (_req, res) => {
    try {
      res.json(listarMembresiasGym());
    } catch (e) {
      res.status(500).json({ error: e?.message });
    }
  });

  app.post('/api/gym/renovar', soloAdmin, (req, res) => {
    try {
      const { chat_id, dias, valor, medio_pago } = req.body || {};
      if (!chat_id) return res.status(400).json({ error: 'Falta chat_id' });
      const resultado = renovarMensualidad(chat_id, dias || 30, valor || 120000, medio_pago || 'Nequi');
      res.json(resultado);
    } catch (e) {
      res.status(500).json({ error: e?.message });
    }
  });

  // Reporte Mensual de Ingresos, Asistencia y Alumnos en Riesgo de Deserción
  app.get('/api/gym/reporte-mensual', (req, res) => {
    try {
      const { mes } = req.query;
      const reporte = generarReporteMensualGym(mes);
      res.json(reporte);
    } catch (e) {
      res.status(500).json({ error: e?.message });
    }
  });

  // Registro y listado de pagos formalizados
  app.get('/api/gym/pagos', (_req, res) => {
    try {
      res.json(listarPagosGym(100));
    } catch (e) {
      res.status(500).json({ error: e?.message });
    }
  });

  app.post('/api/gym/pagos', soloAdmin, (req, res) => {
    try {
      const resultado = registrarPagoGym(req.body || {});
      res.json(resultado);
    } catch (e) {
      res.status(500).json({ error: e?.message });
    }
  });

  // Confirmación interactiva de asistencia de turno
  app.post('/api/gym/confirmar', (req, res) => {
    try {
      const { chat_id, id } = req.body || {};
      const resultado = confirmarEntrenamiento(chat_id, id);
      res.json(resultado);
    } catch (e) {
      res.status(500).json({ error: e?.message });
    }
  });

  // Catálogo de planes de entrenamiento
  app.get('/api/catalogo', (_req, res) => res.json(catalogo()));
  app.get('/api/catalogo/completo', (_req, res) => res.json(catalogo()));

  // Servir frontend de Eleven Performance directamente en la raíz
  app.use(express.static(ruta('..', 'panel-web'), {
    setHeaders: (res) => res.setHeader('Cache-Control', 'no-store')
  }));

  app.listen(PUERTO, () => {
    console.log(`\n============================================================`);
    console.log(`  🚀 ELEVEN PERFORMANCE HUB UNIFICADO ACTIVO`);
    console.log(`  🖥️  Panel web y control: http://localhost:${PUERTO}`);
    console.log(`  📱 Número WhatsApp configurado: ${process.env.WHATSAPP_NUMERO_BOT || '573206051319'}`);
    console.log(`============================================================\n`);
  });
}
