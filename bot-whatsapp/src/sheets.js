// Sincroniza clientes, citas y cotizaciones con un Google Sheets compartido por el equipo.
// Si no está configurado (SHEET_ID + credenciales/google.json), simplemente no hace nada.
import { existsSync } from 'node:fs';
import { JWT } from 'google-auth-library';
import { db } from './db.js';
import { ruta } from './rutas.js';

const CREDENCIALES = ruta('credenciales', 'google.json');
const SHEET_ID = process.env.SHEET_ID;

export const sheetsActivo = Boolean(SHEET_ID && existsSync(CREDENCIALES));

const auth = sheetsActivo
  ? new JWT({ keyFile: CREDENCIALES, scopes: ['https://www.googleapis.com/auth/spreadsheets'] })
  : null;

const HOJAS = {
  Clientes: ['ID', 'Nombre', 'Teléfono', 'Negocio', 'Ciudad', 'Correo', 'Necesidad', 'Plan de interés', 'Estado', 'Notas', 'Creado', 'Actualizado', 'Autorización de datos', 'Método de pago', 'Contrato'],
  Citas: ['ID', 'Fecha', 'Hora', 'Cliente', 'Teléfono', 'Motivo', 'Estado', 'Creada'],
  Cotizaciones: ['ID', 'Número', 'Cliente', 'Teléfono', 'Servicios', 'Total USD', 'Fecha'],
};

const fechaTexto = (ms) => (ms ? new Date(ms).toLocaleString('es-CO', { timeZone: 'America/Bogota' }) : '');

async function api(path, method = 'GET', data) {
  const res = await auth.request({
    url: `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}${path}`,
    method,
    data,
  });
  return res.data;
}

let preparado = null;
function prepararHojas() {
  preparado ??= (async () => {
    const info = await api('?fields=sheets.properties.title');
    const existentes = info.sheets.map((s) => s.properties.title);
    const faltantes = Object.keys(HOJAS).filter((h) => !existentes.includes(h));
    if (faltantes.length) {
      await api(':batchUpdate', 'POST', { requests: faltantes.map((title) => ({ addSheet: { properties: { title } } })) });
    }
    for (const [hoja, encabezados] of Object.entries(HOJAS)) {
      await api(`/values/${encodeURIComponent(`${hoja}!A1`)}?valueInputOption=RAW`, 'PUT', { values: [encabezados] });
    }
  })().catch((e) => {
    preparado = null;
    throw e;
  });
  return preparado;
}

/** Inserta o actualiza la fila cuyo ID (columna A) coincide */
async function upsert(hoja, fila) {
  await prepararHojas();
  const col = await api(`/values/${encodeURIComponent(`${hoja}!A:A`)}`);
  const ids = (col.values || []).map((r) => String(r[0]));
  const idx = ids.indexOf(String(fila[0]));
  if (idx >= 0) {
    await api(`/values/${encodeURIComponent(`${hoja}!A${idx + 1}`)}?valueInputOption=USER_ENTERED`, 'PUT', { values: [fila] });
  } else {
    await api(`/values/${encodeURIComponent(`${hoja}!A1`)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, 'POST', { values: [fila] });
  }
}

// Las escrituras se hacen en fila, una tras otra, para no pisarse
let cola = Promise.resolve();
function encolar(tarea) {
  if (!sheetsActivo) return;
  cola = cola.then(tarea).catch((e) => console.error('⚠️ Google Sheets:', e.response?.data?.error?.message || e.message));
}

/** Borra de la hoja la fila cuyo ID (columna A) coincide */
export function eliminarDeHoja(hoja, id) {
  encolar(async () => {
    await prepararHojas();
    const col = await api(`/values/${encodeURIComponent(`${hoja}!A:A`)}`);
    const idx = (col.values || []).map((r) => String(r[0])).indexOf(String(id));
    if (idx < 1) return; // no existe (la fila 0 es el encabezado)
    const info = await api('?fields=sheets.properties(sheetId,title)');
    const sheetId = info.sheets.find((s) => s.properties.title === hoja)?.properties.sheetId;
    if (sheetId === undefined) return;
    await api(':batchUpdate', 'POST', {
      requests: [{ deleteDimension: { range: { sheetId, dimension: 'ROWS', startIndex: idx, endIndex: idx + 1 } } }],
    });
  });
}

// Los teléfonos se escriben con ' para que Sheets no los convierta en número
const tel = (t) => (t ? `'${t}` : '');

export function sincronizarCliente(chatId) {
  encolar(async () => {
    const c = db.prepare('SELECT * FROM clientes WHERE chat_id = ?').get(chatId);
    if (!c) return;
    await upsert('Clientes', [
      c.chat_id, c.nombre, tel(c.telefono), c.negocio, c.ciudad, c.correo, c.necesidad,
      c.plan_interes, c.estado, c.notas, fechaTexto(c.creado), fechaTexto(c.actualizado),
      c.autoriza_datos === 1 ? `Autorizó (${fechaTexto(c.fecha_autorizacion)})` : c.autoriza_datos === 0 ? `No autorizó (${fechaTexto(c.fecha_autorizacion)})` : 'Pendiente',
      c.metodo_pago, c.modalidad_contrato,
    ].map((v) => v ?? ''));
  });
}

export function sincronizarCita(id) {
  encolar(async () => {
    const c = db.prepare(`
      SELECT citas.*, clientes.nombre, clientes.telefono FROM citas
      LEFT JOIN clientes ON clientes.chat_id = citas.chat_id WHERE citas.id = ?`).get(id);
    if (!c) return;
    await upsert('Citas', [c.id, c.fecha, c.hora, c.nombre, tel(c.telefono), c.motivo, c.estado, fechaTexto(c.creado)].map((v) => v ?? ''));
  });
}

export function sincronizarCotizacion(id) {
  encolar(async () => {
    const c = db.prepare(`
      SELECT cotizaciones.*, clientes.nombre, clientes.telefono FROM cotizaciones
      LEFT JOIN clientes ON clientes.chat_id = cotizaciones.chat_id WHERE cotizaciones.id = ?`).get(id);
    if (!c) return;
    await upsert('Cotizaciones', [
      c.id, `COT-${String(c.id).padStart(4, '0')}`, c.nombre, tel(c.telefono),
      JSON.parse(c.servicios).join(', '), c.total_usd, fechaTexto(c.creado),
    ].map((v) => v ?? ''));
  });
}

export async function probarConexion() {
  if (!sheetsActivo) return false;
  await prepararHojas();
  return true;
}
