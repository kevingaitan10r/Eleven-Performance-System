import { DatabaseSync } from 'node:sqlite';
import { ruta } from './rutas.js';

export const db = new DatabaseSync(process.env.DB_RUTA || ruta('datos', 'eleven.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS chats (
    id TEXT PRIMARY KEY,
    nombre TEXT,
    telefono TEXT,
    bot_activo INTEGER NOT NULL DEFAULT 1,
    pausa_hasta INTEGER,
    ultimo_mensaje INTEGER
  );
  CREATE TABLE IF NOT EXISTS mensajes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id TEXT NOT NULL,
    autor TEXT NOT NULL,          -- 'cliente' | 'bot' | 'asesor:<nombre>'
    texto TEXT NOT NULL,
    fecha INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_mensajes_chat ON mensajes(chat_id, id);
  CREATE TABLE IF NOT EXISTS clientes (
    chat_id TEXT PRIMARY KEY,
    nombre TEXT, telefono TEXT, negocio TEXT, ciudad TEXT, correo TEXT,
    necesidad TEXT, plan_interes TEXT,
    estado TEXT NOT NULL DEFAULT 'nuevo',
    notas TEXT,
    creado INTEGER, actualizado INTEGER
  );
  CREATE TABLE IF NOT EXISTS citas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id TEXT NOT NULL,
    fecha TEXT NOT NULL,          -- YYYY-MM-DD (hora Colombia)
    hora TEXT NOT NULL,           -- HH:MM
    motivo TEXT,
    estado TEXT NOT NULL DEFAULT 'agendada',
    creado INTEGER
  );
  CREATE TABLE IF NOT EXISTS cotizaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id TEXT NOT NULL,
    servicios TEXT NOT NULL,
    total_usd REAL,
    archivo TEXT,
    creado INTEGER
  );
`);

// Columnas agregadas después de la primera versión (se crean si no existen)
for (const sql of [
  'CREATE TABLE IF NOT EXISTS configuracion (clave TEXT PRIMARY KEY, valor TEXT NOT NULL)',
  'ALTER TABLE clientes ADD COLUMN autoriza_datos INTEGER',
  'ALTER TABLE clientes ADD COLUMN fecha_autorizacion INTEGER',
  'ALTER TABLE clientes ADD COLUMN metodo_pago TEXT',
  'ALTER TABLE clientes ADD COLUMN modalidad_contrato TEXT',
]) {
  try { db.exec(sql); } catch {}
}

// ---------- Configuración Global Persistente ----------

export function obtenerConfig(clave, porDefecto = null) {
  try {
    const row = db.prepare('SELECT valor FROM configuracion WHERE clave = ?').get(clave);
    return row?.valor ?? porDefecto;
  } catch {
    return porDefecto;
  }
}

export function guardarConfig(clave, valor) {
  try {
    db.prepare(`
      INSERT INTO configuracion (clave, valor) VALUES (?, ?)
      ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor
    `).run(clave, String(valor));
    return true;
  } catch (e) {
    console.error('Error guardando configuración:', e.message);
    return false;
  }
}

export function listarConfiguraciones() {
  try {
    const filas = db.prepare('SELECT clave, valor FROM configuracion').all();
    const map = {};
    for (const f of filas) map[f.clave] = f.valor;
    return map;
  } catch {
    return {};
  }
}

// ---------- Chats y mensajes ----------

export function registrarChat(id, { nombre, telefono } = {}) {
  db.prepare(`
    INSERT INTO chats (id, nombre, telefono, ultimo_mensaje) VALUES (?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      nombre = COALESCE(excluded.nombre, chats.nombre),
      telefono = COALESCE(excluded.telefono, chats.telefono)
  `).run(id, nombre ?? null, telefono ?? null, Date.now());
}

export function guardarMensaje(chatId, autor, texto) {
  const ahora = Date.now();
  registrarChat(chatId);
  db.prepare('INSERT INTO mensajes (chat_id, autor, texto, fecha) VALUES (?, ?, ?, ?)').run(chatId, autor, texto, ahora);
  db.prepare('UPDATE chats SET ultimo_mensaje = ? WHERE id = ?').run(ahora, chatId);
}

/** Últimos mensajes en formato para la IA */
export function historialIA(chatId, limite) {
  return db
    .prepare('SELECT autor, texto FROM mensajes WHERE chat_id = ? ORDER BY id DESC LIMIT ?')
    .all(chatId, limite)
    .reverse()
    .map((m) => ({ role: m.autor === 'cliente' ? 'user' : 'assistant', content: m.texto }));
}

export function botPuedeResponder(chatId) {
  const c = db.prepare('SELECT bot_activo, pausa_hasta FROM chats WHERE id = ?').get(chatId);
  if (!c) return true;
  if (!c.bot_activo) return false;
  return !c.pausa_hasta || Date.now() > c.pausa_hasta;
}

export function pausarBot(chatId, ms) {
  registrarChat(chatId);
  db.prepare('UPDATE chats SET pausa_hasta = ? WHERE id = ?').run(Date.now() + ms, chatId);
}

export function activarBot(chatId, activo) {
  db.prepare('UPDATE chats SET bot_activo = ?, pausa_hasta = NULL WHERE id = ?').run(activo ? 1 : 0, chatId);
}

// ---------- Clientes (CRM) ----------

const CAMPOS_CLIENTE = ['nombre', 'telefono', 'negocio', 'ciudad', 'correo', 'necesidad', 'plan_interes', 'estado', 'notas', 'metodo_pago', 'modalidad_contrato'];

export function guardarCliente(chatId, datos) {
  const ahora = Date.now();
  db.prepare('INSERT OR IGNORE INTO clientes (chat_id, creado, actualizado) VALUES (?, ?, ?)').run(chatId, ahora, ahora);
  const campos = CAMPOS_CLIENTE.filter((c) => datos[c] !== undefined && datos[c] !== null && String(datos[c]).trim() !== '');
  if (campos.length) {
    db.prepare(`UPDATE clientes SET ${campos.map((c) => `${c} = ?`).join(', ')}, actualizado = ? WHERE chat_id = ?`)
      .run(...campos.map((c) => String(datos[c]).trim()), ahora, chatId);
  }
  return obtenerCliente(chatId);
}

export const obtenerCliente = (chatId) => db.prepare('SELECT * FROM clientes WHERE chat_id = ?').get(chatId);

/** Registra si el cliente autorizó (true) o no (false) el tratamiento de sus datos personales */
export function registrarAutorizacion(chatId, autoriza) {
  const ahora = Date.now();
  db.prepare('INSERT OR IGNORE INTO clientes (chat_id, creado, actualizado) VALUES (?, ?, ?)').run(chatId, ahora, ahora);
  db.prepare('UPDATE clientes SET autoriza_datos = ?, fecha_autorizacion = ?, actualizado = ? WHERE chat_id = ?')
    .run(autoriza ? 1 : 0, ahora, ahora, chatId);
  return obtenerCliente(chatId);
}

// Registro de chats eliminados desde el panel para evitar que reaparezcan
db.exec("CREATE TABLE IF NOT EXISTS chats_eliminados (chat_id TEXT PRIMARY KEY, fecha INTEGER NOT NULL)");
export const marcarChatEliminado = (chatId) =>
  db.prepare("INSERT INTO chats_eliminados (chat_id, fecha) VALUES (?, ?) ON CONFLICT(chat_id) DO UPDATE SET fecha = excluded.fecha").run(chatId, Date.now());
export const fechaEliminado = (chatId) => db.prepare("SELECT fecha FROM chats_eliminados WHERE chat_id = ?").get(chatId)?.fecha || 0;
