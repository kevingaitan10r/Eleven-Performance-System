import { db } from './db.js';
import { ahoraColombia } from './rutas.js';

// Horario de asesores (hora Colombia). Clave = día de la semana (0 = domingo). [hora inicio, hora fin)
export const HORARIO_ASESORES = { 1: [8, 22], 2: [8, 22], 3: [8, 22], 4: [8, 22], 5: [8, 22], 6: [9, 20] };
// Cuántas reuniones pueden ocurrir a la misma hora (número de asesores disponibles)
const CUPOS = Number(process.env.ASESORES_SIMULTANEOS) || 1;
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const pad = (n) => String(n).padStart(2, '0');
const diaSemana = (fecha) => new Date(`${fecha}T12:00:00Z`).getUTCDay();

export function enHorarioAsesores() {
  const { hora, diaSemana: dia } = ahoraColombia();
  const rango = HORARIO_ASESORES[dia];
  const h = Number(hora.slice(0, 2));
  return !!rango && h >= rango[0] && h < rango[1];
}

/** Horas libres (una reunión por hora) para una fecha YYYY-MM-DD */
export function horasLibres(fecha) {
  const rango = HORARIO_ASESORES[diaSemana(fecha)];
  if (!rango) return [];
  const ahora = ahoraColombia();
  if (fecha < ahora.fecha) return [];

  const ocupadas = {};
  for (const { hora } of db.prepare("SELECT hora FROM citas WHERE fecha = ? AND estado != 'cancelada'").all(fecha)) {
    ocupadas[hora] = (ocupadas[hora] || 0) + 1;
  }
  const libres = [];
  for (let h = rango[0]; h < rango[1]; h++) {
    const hora = `${pad(h)}:00`;
    if (fecha === ahora.fecha && hora <= ahora.hora) continue;
    if ((ocupadas[hora] || 0) < CUPOS) libres.push(hora);
  }
  return libres;
}

/** Disponibilidad de una fecha o, si no se indica, de los próximos días hábiles */
export function disponibilidad(fecha) {
  if (fecha) {
    return [{ fecha, dia: DIAS[diaSemana(fecha)], horas_libres: horasLibres(fecha) }];
  }
  const resultado = [];
  const d = new Date(`${ahoraColombia().fecha}T12:00:00Z`);
  while (resultado.length < 4) {
    const f = d.toISOString().slice(0, 10);
    const horas = horasLibres(f);
    if (horas.length) resultado.push({ fecha: f, dia: DIAS[d.getUTCDay()], horas_libres: horas });
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return resultado;
}

export function crearCita(chatId, fecha, hora, motivo) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || !/^\d{2}:\d{2}$/.test(hora)) {
    return { error: 'Formato inválido: fecha debe ser YYYY-MM-DD y hora HH:MM (24 horas).' };
  }
  if (!horasLibres(fecha).includes(hora)) {
    return { error: 'Ese horario no está disponible.', horas_libres_ese_dia: horasLibres(fecha) };
  }
  const { lastInsertRowid } = db
    .prepare('INSERT INTO citas (chat_id, fecha, hora, motivo, creado) VALUES (?, ?, ?, ?, ?)')
    .run(chatId, fecha, hora, motivo || '', Date.now());
  return { ok: true, id: Number(lastInsertRowid), fecha, dia: DIAS[diaSemana(fecha)], hora };
}

export function proximaCita(chatId) {
  const { fecha } = ahoraColombia();
  return db
    .prepare("SELECT * FROM citas WHERE chat_id = ? AND estado = 'agendada' AND fecha >= ? ORDER BY fecha, hora LIMIT 1")
    .get(chatId, fecha);
}

export function cambiarEstadoCita(id, estado) {
  db.prepare('UPDATE citas SET estado = ? WHERE id = ?').run(estado, id);
  return db.prepare('SELECT * FROM citas WHERE id = ?').get(id);
}

/** Edición manual desde el panel. Permite cualquier hora, pero no dos citas a la vez por encima del cupo. */
export function editarCita(id, { fecha, hora, motivo }) {
  const cita = db.prepare('SELECT * FROM citas WHERE id = ?').get(id);
  if (!cita) return { error: 'Cita no encontrada.' };
  const f = fecha ?? cita.fecha;
  const h = hora ?? cita.hora;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(f) || !/^\d{2}:\d{2}$/.test(h)) return { error: 'Fecha u hora inválida.' };
  const ocupadas = db
    .prepare("SELECT COUNT(*) AS n FROM citas WHERE fecha = ? AND hora = ? AND estado != 'cancelada' AND id != ?")
    .get(f, h, id).n;
  if (ocupadas >= CUPOS) return { error: `Ya hay ${ocupadas === 1 ? 'otra cita' : `${ocupadas} citas`} el ${f} a las ${h}. Elige otra hora.` };
  db.prepare('UPDATE citas SET fecha = ?, hora = ?, motivo = ? WHERE id = ?').run(f, h, motivo ?? cita.motivo, id);
  return db.prepare('SELECT * FROM citas WHERE id = ?').get(id);
}

// ---------- Avisos al cliente cuando su cita cambia desde el panel ----------
const fechaLarga = (fecha) =>
  new Date(`${fecha}T12:00:00Z`).toLocaleDateString('es-CO', { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' }).replace(',', '');
const hora12 = (hora) => {
  const [h, m] = hora.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'a. m.' : 'p. m.'}`;
};
const cuando = (c) => `el *${fechaLarga(c.fecha)} a las ${hora12(c.hora)}* (hora Colombia)`;

/**
 * Texto para avisarle al cliente un cambio en su cita, o null si el cambio no requiere aviso.
 * @param {object} antes cita antes del cambio (null si no aplica)
 * @param {object} despues cita después del cambio (null si se eliminó)
 */
export function textoAvisoCita(antes, despues) {
  if (!despues) {
    if (!antes || antes.estado === 'cancelada') return null;
    return `❌ Hola, te informamos que tu sesión con Eleven Performance programada para ${cuando(antes)} fue cancelada.\n\nSi quieres agendar una nueva, escríbenos por aquí y con gusto te ayudamos. 🙏`;
  }
  if (antes && (antes.fecha !== despues.fecha || antes.hora !== despues.hora) && despues.estado !== 'cancelada') {
    return `📅 Hola, te informamos que tu sesión con Eleven Performance fue *reprogramada* para ${cuando(despues)}.\n\nSi este nuevo horario no te queda bien, escríbenos por aquí y lo ajustamos. 😊`;
  }
  if (antes?.estado !== despues.estado) {
    if (despues.estado === 'confirmada') return `✅ Hola, tu sesión con Eleven Performance quedó *confirmada* para ${cuando(despues)}.\n\n¡Te esperamos! 😊`;
    if (despues.estado === 'cancelada') return `❌ Hola, te informamos que tu sesión con Eleven Performance programada para ${cuando(despues)} fue cancelada.\n\nSi quieres agendar una nueva, escríbenos por aquí y con gusto te ayudamos. 🙏`;
    if (despues.estado === 'agendada' && antes?.estado === 'cancelada') return `📅 Hola, tu sesión con Eleven Performance quedó agendada nuevamente para ${cuando(despues)}. 😊`;
  }
  return null; // cambios de motivo, "realizada" o "no asistió": sin aviso
}

export function eliminarCita(id) {
  return db.prepare('DELETE FROM citas WHERE id = ?').run(id).changes > 0;
}
