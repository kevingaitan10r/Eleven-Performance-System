// Usuarios del panel web (equipo de Eleven Performance). Las claves se guardan cifradas con scrypt.
import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';
import { db } from './db.js';

export const ROLES = ['admin', 'empleado'];

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT NOT NULL UNIQUE COLLATE NOCASE,
    nombre TEXT NOT NULL,
    clave_hash TEXT NOT NULL,
    rol TEXT NOT NULL DEFAULT 'empleado',
    activo INTEGER NOT NULL DEFAULT 1,
    creado INTEGER,
    ultimo_acceso INTEGER
  );
`);

function cifrar(clave) {
  const sal = randomBytes(16).toString('hex');
  return `${sal}:${scryptSync(clave, sal, 64).toString('hex')}`;
}

function claveCorrecta(clave, guardada) {
  const [sal, hash] = String(guardada).split(':');
  if (!sal || !hash) return false;
  const calculada = scryptSync(clave, sal, 64);
  const esperada = Buffer.from(hash, 'hex');
  return calculada.length === esperada.length && timingSafeEqual(calculada, esperada);
}

const CAMPOS_PUBLICOS = 'id, usuario, nombre, rol, activo, creado, ultimo_acceso';

export const listarUsuarios = () => db.prepare(`SELECT ${CAMPOS_PUBLICOS} FROM usuarios ORDER BY nombre`).all();
export const obtenerUsuario = (id) => db.prepare(`SELECT ${CAMPOS_PUBLICOS} FROM usuarios WHERE id = ?`).get(id);

// Semilla inicial segura si la tabla está vacía
try {
  const conteo = db.prepare('SELECT COUNT(*) as total FROM usuarios').get()?.total || 0;
  if (conteo === 0) {
    db.prepare('INSERT INTO usuarios (usuario, nombre, clave_hash, rol, creado) VALUES (?, ?, ?, ?, ?)').run(
      'kevin', 'Kevin Gaitán', cifrar(process.env.PANEL_CLAVE || 'eleven.2026*@performance%#977'), 'admin', Date.now()
    );
    db.prepare('INSERT INTO usuarios (usuario, nombre, clave_hash, rol, creado) VALUES (?, ?, ?, ?, ?)').run(
      'juandi', 'Juan Diego Castro Garzón', cifrar('12345678'), 'empleado', Date.now()
    );
    db.prepare('INSERT INTO usuarios (usuario, nombre, clave_hash, rol, creado) VALUES (?, ?, ?, ?, ?)').run(
      'staff', 'Staff Técnico Eleven', cifrar('12345678'), 'empleado', Date.now()
    );
  }
} catch (_) {}

/** Devuelve el usuario si la clave es correcta y está activo */
export function autenticar(usuario, clave) {
  const busqueda = String(usuario || '').trim().toLowerCase();
  let u = db.prepare('SELECT * FROM usuarios WHERE usuario = ?').get(busqueda);
  if (!u && busqueda.includes('@')) {
    const alias = busqueda.split('@')[0];
    u = db.prepare('SELECT * FROM usuarios WHERE usuario = ?').get(alias);
  }
  if (!u && (busqueda === 'kevin gaitan' || busqueda === 'kevin gaitán')) {
    u = db.prepare('SELECT * FROM usuarios WHERE usuario = ?').get('kevin');
  }
  if (!u || !u.activo || !claveCorrecta(clave, u.clave_hash)) return null;
  db.prepare('UPDATE usuarios SET ultimo_acceso = ? WHERE id = ?').run(Date.now(), u.id);
  return obtenerUsuario(u.id);
}

function validar({ usuario, nombre, clave, rol }, esNuevo) {
  if (esNuevo || usuario !== undefined) {
    if (!/^[a-zA-Z0-9._-]{3,30}$/.test(usuario || '')) return 'El usuario debe tener de 3 a 30 caracteres: letras, números, punto, guion o guion bajo (sin espacios).';
    if (String(usuario).toLowerCase() === 'admin') return 'El usuario "admin" está reservado para la cuenta maestra.';
  }
  if ((esNuevo || nombre !== undefined) && !String(nombre || '').trim()) return 'Escribe el nombre del empleado.';
  if ((esNuevo || clave !== undefined) && String(clave || '').length < 8) return 'La clave debe tener al menos 8 caracteres.';
  if (rol !== undefined && !ROLES.includes(rol)) return 'Rol inválido.';
  return null;
}

export function crearUsuario(datos) {
  const error = validar(datos, true);
  if (error) return { error };
  try {
    const { lastInsertRowid } = db
      .prepare('INSERT INTO usuarios (usuario, nombre, clave_hash, rol, creado) VALUES (?, ?, ?, ?, ?)')
      .run(datos.usuario.trim(), datos.nombre.trim().slice(0, 60), cifrar(datos.clave), datos.rol || 'empleado', Date.now());
    return obtenerUsuario(Number(lastInsertRowid));
  } catch (e) {
    if (String(e.message).includes('UNIQUE')) return { error: 'Ya existe un usuario con ese nombre de usuario.' };
    throw e;
  }
}

export function editarUsuario(id, datos) {
  const error = validar(datos, false);
  if (error) return { error };
  if (!obtenerUsuario(id)) return { error: 'Usuario no encontrado.' };
  if (datos.nombre !== undefined) db.prepare('UPDATE usuarios SET nombre = ? WHERE id = ?').run(datos.nombre.trim().slice(0, 60), id);
  if (datos.rol !== undefined) db.prepare('UPDATE usuarios SET rol = ? WHERE id = ?').run(datos.rol, id);
  if (datos.activo !== undefined) db.prepare('UPDATE usuarios SET activo = ? WHERE id = ?').run(datos.activo ? 1 : 0, id);
  if (datos.clave !== undefined) db.prepare('UPDATE usuarios SET clave_hash = ? WHERE id = ?').run(cifrar(datos.clave), id);
  return obtenerUsuario(id);
}

export function eliminarUsuario(id) {
  return db.prepare('DELETE FROM usuarios WHERE id = ?').run(id).changes > 0;
}

/** Cambio de clave hecho por el propio empleado (pide la actual) */
export function cambiarMiClave(id, actual, nueva) {
  const u = db.prepare('SELECT * FROM usuarios WHERE id = ?').get(id);
  if (!u || !claveCorrecta(actual, u.clave_hash)) return { error: 'La clave actual no es correcta.' };
  if (String(nueva || '').length < 8) return { error: 'La nueva clave debe tener al menos 8 caracteres.' };
  db.prepare('UPDATE usuarios SET clave_hash = ? WHERE id = ?').run(cifrar(nueva), id);
  return { ok: true };
}
