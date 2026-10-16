import { db, obtenerConfig } from './db.js';
import { ahoraColombia, pesos } from './rutas.js';

// ============================================================================
// CONFIGURACIÓN DE OPERACIÓN DEL GIMNASIO (ELEVEN PERFORMANCE GYM)
// ============================================================================
export const HORARIOS_GYM = {
  1: [6, 22], // Lunes: 6 AM a 10 PM
  2: [6, 22], // Martes
  3: [6, 22], // Miércoles
  4: [6, 22], // Jueves
  5: [6, 22], // Viernes
  6: [7, 16], // Sábado: 7 AM a 4 PM
  0: [8, 13], // Domingo: 8 AM a 1 PM
};

export const CUPOS_POR_TURNO = Number(process.env.GYM_CUPOS_HORA) || 8;
export const HORAS_ANTICIPACION_CANCELAR = 2; // Cancelar con min 2 horas de anticipación

export const DISCIPLINAS = [
  'Fuerza & Acondicionamiento',
  'Entrenamiento Funcional',
  'Alto Rendimiento Deportivo',
  'Entrenamiento Personalizado (1 a 1)',
  'Readaptación Física'
];

export const CUENTAS_PAGO = {
  get nequi() { return obtenerConfig('NEQUI_NUMERO', process.env.NEQUI_NUMERO || '320 605 1319'); },
  get daviplata() { return obtenerConfig('DAVIPLATA_NUMERO', process.env.DAVIPLATA_NUMERO || '320 605 1319'); },
  get bancolombia() { return obtenerConfig('BANCOLOMBIA_CUENTA', process.env.BANCOLOMBIA_CUENTA || 'Ahorros 245-000123-89'); },
  get titular() { return obtenerConfig('TITULAR_CUENTA', process.env.TITULAR_CUENTA || 'Eleven Performance S.A.S.'); }
};

const pad = (n) => String(n).padStart(2, '0');
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const diaSemana = (fecha) => new Date(`${fecha}T12:00:00Z`).getUTCDay();

// Inicializar tablas en la base de datos si no existen
db.exec(`
  CREATE TABLE IF NOT EXISTS membresias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id TEXT NOT NULL UNIQUE,
    nombre_alumno TEXT,
    telefono TEXT,
    plan_nombre TEXT NOT NULL DEFAULT 'Plan Mensual Ilimitado',
    fecha_inicio TEXT NOT NULL,
    fecha_vencimiento TEXT NOT NULL,
    valor_cop REAL NOT NULL DEFAULT 120000,
    estado_pago TEXT NOT NULL DEFAULT 'al_dia', -- 'al_dia' | 'por_vencer' | 'vencido' | 'pendiente'
    medio_pago TEXT,
    ultimo_recordatorio INTEGER,
    notas TEXT,
    creado INTEGER,
    actualizado INTEGER
  );

  CREATE TABLE IF NOT EXISTS entrenamientos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id TEXT NOT NULL,
    nombre_alumno TEXT,
    fecha TEXT NOT NULL,          -- YYYY-MM-DD
    hora TEXT NOT NULL,           -- HH:MM
    tipo TEXT NOT NULL DEFAULT 'Fuerza & Acondicionamiento',
    estado TEXT NOT NULL DEFAULT 'agendada', -- 'agendada' | 'confirmada' | 'asistio' | 'cancelada'
    motivo_cancelacion TEXT,
    recordatorio_enviado INTEGER DEFAULT 0,
    confirmado INTEGER DEFAULT 0,
    creado INTEGER
  );

  CREATE TABLE IF NOT EXISTS pagos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id TEXT,
    nombre_alumno TEXT,
    telefono TEXT,
    plan_nombre TEXT,
    monto REAL NOT NULL,
    medio_pago TEXT NOT NULL DEFAULT 'Nequi',
    referencia TEXT,
    fecha_pago TEXT NOT NULL,
    fecha_inicio TEXT,
    fecha_vencimiento TEXT,
    notas TEXT,
    creado INTEGER
  );
`);

// Migraciones automáticas seguras para bases de datos existentes
try { db.exec('ALTER TABLE entrenamientos ADD COLUMN recordatorio_enviado INTEGER DEFAULT 0'); } catch (_) {}
try { db.exec('ALTER TABLE entrenamientos ADD COLUMN confirmado INTEGER DEFAULT 0'); } catch (_) {}

// ============================================================================
// GESTIÓN DE HORARIOS Y CUPOS DE ENTRENAMIENTO
// ============================================================================

/** Retorna los cupos libres por cada hora hábil de una fecha */
export function turnosLibres(fecha) {
  const d = diaSemana(fecha);
  const rango = HORARIOS_GYM[d];
  if (!rango) return [];
  const ahora = ahoraColombia();
  if (fecha < ahora.fecha) return [];

  // Conteo de reservas activas
  const reservasPorHora = {};
  for (const row of db.prepare("SELECT hora, COUNT(*) as total FROM entrenamientos WHERE fecha = ? AND estado = 'agendada' GROUP BY hora").all(fecha)) {
    reservasPorHora[row.hora] = row.total;
  }

  const turnos = [];
  for (let h = rango[0]; h < rango[1]; h++) {
    const hora = `${pad(h)}:00`;
    if (fecha === ahora.fecha && hora <= ahora.hora) continue;
    const ocupados = reservasPorHora[hora] || 0;
    const libres = Math.max(0, CUPOS_POR_TURNO - ocupados);
    if (libres > 0) {
      turnos.push({ hora, cupos_libres: libres, cupos_totales: CUPOS_POR_TURNO });
    }
  }
  return turnos;
}

/** Disponibilidad para los próximos 4 días */
export function consultarDisponibilidadGym(fecha) {
  if (fecha) {
    return [{ fecha, dia: DIAS[diaSemana(fecha)], turnos: turnosLibres(fecha) }];
  }
  const resultado = [];
  const d = new Date(`${ahoraColombia().fecha}T12:00:00Z`);
  let intentos = 0;
  while (resultado.length < 4 && intentos < 8) {
    const f = d.toISOString().slice(0, 10);
    const turnos = turnosLibres(f);
    if (turnos.length) {
      resultado.push({ fecha: f, dia: DIAS[d.getUTCDay()], turnos });
    }
    d.setUTCDate(d.getUTCDate() + 1);
    intentos++;
  }
  return resultado;
}

/** Agendar sesión de entrenamiento */
export function agendarEntrenamiento(chatId, nombreAlumno, fecha, hora, tipo = 'Fuerza & Acondicionamiento') {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || !/^\d{2}:\d{2}$/.test(hora)) {
    return { error: 'Formato inválido. La fecha debe ser YYYY-MM-DD y la hora HH:MM (ej. 08:00 o 18:00).' };
  }

  // Validar si el alumno ya tiene sesión agendada a esa misma hora
  const existe = db.prepare("SELECT id FROM entrenamientos WHERE chat_id = ? AND fecha = ? AND hora = ? AND estado = 'agendada'").get(chatId, fecha, hora);
  if (existe) {
    return { error: `Ya tienes una sesión de entrenamiento agendada para el ${fecha} a las ${hora}.` };
  }

  // Validar cupo disponible
  const ocupados = db.prepare("SELECT COUNT(*) as total FROM entrenamientos WHERE fecha = ? AND hora = ? AND estado = 'agendada'").get(fecha, hora).total;
  if (ocupados >= CUPOS_POR_TURNO) {
    return { error: `El turno de las ${hora} el día ${fecha} ya no tiene cupos disponibles. Elige otra hora.`, turnos_libres: turnosLibres(fecha) };
  }

  const res = db.prepare(`
    INSERT INTO entrenamientos (chat_id, nombre_alumno, fecha, hora, tipo, estado, creado)
    VALUES (?, ?, ?, ?, ?, 'agendada', ?)
  `).run(chatId, nombreAlumno || 'Alumno', fecha, hora, tipo, Date.now());

  return {
    ok: true,
    id: Number(res.lastInsertRowid),
    nombre: nombreAlumno,
    fecha,
    dia: DIAS[diaSemana(fecha)],
    hora,
    tipo,
    cupos_restantes: CUPOS_POR_TURNO - (ocupados + 1)
  };
}

/** Consultar próximas sesiones agendadas del alumno */
export function proximosEntrenamientos(chatId) {
  const { fecha } = ahoraColombia();
  return db.prepare(`
    SELECT * FROM entrenamientos
    WHERE chat_id = ? AND estado = 'agendada' AND fecha >= ?
    ORDER BY fecha ASC, hora ASC
    LIMIT 5
  `).all(chatId, fecha);
}

/** Cancelar entrenamiento */
export function cancelarEntrenamiento(chatId, idEntrenamiento, motivo = 'Cancelado por el alumno') {
  let cita;
  if (idEntrenamiento) {
    cita = db.prepare("SELECT * FROM entrenamientos WHERE id = ? AND chat_id = ? AND estado = 'agendada'").get(idEntrenamiento, chatId);
  } else {
    // Si no indica ID, cancelar la más próxima
    const { fecha } = ahoraColombia();
    cita = db.prepare("SELECT * FROM entrenamientos WHERE chat_id = ? AND estado = 'agendada' AND fecha >= ? ORDER BY fecha ASC, hora ASC LIMIT 1").get(chatId, fecha);
  }

  if (!cita) {
    return { error: 'No tienes entrenamientos activos programados para cancelar.' };
  }

  db.prepare(`
    UPDATE entrenamientos
    SET estado = 'cancelada', motivo_cancelacion = ?
    WHERE id = ?
  `).run(motivo, cita.id);

  return {
    ok: true,
    id: cita.id,
    fecha: cita.fecha,
    hora: cita.hora,
    tipo: cita.tipo,
    mensaje: `Sesión de ${cita.tipo} del ${cita.fecha} a las ${cita.hora} ha sido cancelada con éxito.`
  };
}

// ============================================================================
// GESTIÓN DE MEMBRESÍAS Y RECORDATORIOS DE COBRO
// ============================================================================

/** Reprogramar entrenamiento (cambiar fecha y hora) */
export function reprogramarEntrenamiento(idEntrenamiento, nuevaFecha, nuevaHora) {
  const cita = db.prepare("SELECT * FROM entrenamientos WHERE id = ?").get(idEntrenamiento);
  if (!cita) {
    return { error: "Entrenamiento no encontrado" };
  }
  db.prepare("UPDATE entrenamientos SET fecha = ?, hora = ? WHERE id = ?").run(nuevaFecha, nuevaHora, idEntrenamiento);
  return {
    ok: true,
    id: idEntrenamiento,
    fechaAnterior: cita.fecha,
    horaAnterior: cita.hora,
    nuevaFecha,
    nuevaHora,
    nombre: cita.nombre_alumno,
    telefono: cita.telefono,
    chatId: cita.chat_id
  };
}

/** Obtener membresía de un alumno por chatId */
export function obtenerMembresia(chatId) {
  return db.prepare('SELECT * FROM membresias WHERE chat_id = ?').get(chatId);
}

/** Registrar o actualizar membresía */
export function guardarMembresia(chatId, datos) {
  const ahora = Date.now();
  const actual = obtenerMembresia(chatId);

  if (actual) {
    db.prepare(`
      UPDATE membresias SET
        nombre_alumno = COALESCE(?, nombre_alumno),
        telefono = COALESCE(?, telefono),
        plan_nombre = COALESCE(?, plan_nombre),
        fecha_inicio = COALESCE(?, fecha_inicio),
        fecha_vencimiento = COALESCE(?, fecha_vencimiento),
        valor_cop = COALESCE(?, valor_cop),
        estado_pago = COALESCE(?, estado_pago),
        medio_pago = COALESCE(?, medio_pago),
        notas = COALESCE(?, notas),
        actualizado = ?
      WHERE chat_id = ?
    `).run(
      datos.nombre_alumno ?? null,
      datos.telefono ?? null,
      datos.plan_nombre ?? null,
      datos.fecha_inicio ?? null,
      datos.fecha_vencimiento ?? null,
      datos.valor_cop ?? null,
      datos.estado_pago ?? null,
      datos.medio_pago ?? null,
      datos.notas ?? null,
      ahora,
      chatId
    );
  } else {
    db.prepare(`
      INSERT INTO membresias (
        chat_id, nombre_alumno, telefono, plan_nombre, fecha_inicio, fecha_vencimiento,
        valor_cop, estado_pago, medio_pago, notas, creado, actualizado
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      chatId,
      datos.nombre_alumno || 'Alumno',
      datos.telefono || '',
      datos.plan_nombre || 'Plan Mensual Ilimitado',
      datos.fecha_inicio || ahoraColombia().fecha,
      datos.fecha_vencimiento || sumarDias(ahoraColombia().fecha, 30),
      datos.valor_cop || 120000,
      datos.estado_pago || 'al_dia',
      datos.medio_pago || 'Nequi',
      datos.notas || '',
      ahora,
      ahora
    );
  }
  return obtenerMembresia(chatId);
}

/** Consultar estado de mensualidad (para el bot de WhatsApp) */
export function estadoMensualidad(chatId) {
  const mem = obtenerMembresia(chatId);
  if (!mem) {
    return {
      tiene_membresia: false,
      mensaje: 'Aún no tienes una membresía activa registrada en Eleven Performance Gym.'
    };
  }

  const { fecha: hoy } = ahoraColombia();
  const diffDias = Math.ceil((new Date(mem.fecha_vencimiento) - new Date(hoy)) / (1000 * 60 * 60 * 24));

  let estadoTexto = 'Al día';
  let estadoClave = 'al_dia';
  if (diffDias < 0) {
    estadoTexto = `Vencida hace ${Math.abs(diffDias)} días`;
    estadoClave = 'vencido';
  } else if (diffDias === 0) {
    estadoTexto = 'Vence HOY';
    estadoClave = 'por_vencer';
  } else if (diffDias <= 3) {
    estadoTexto = `Vence en ${diffDias} días`;
    estadoClave = 'por_vencer';
  }

  return {
    tiene_membresia: true,
    plan: mem.plan_nombre,
    vencimiento: mem.fecha_vencimiento,
    dias_restantes: diffDias,
    valor_mensualidad: pesos(mem.valor_cop),
    estado: estadoTexto,
    estado_clave: estadoClave
  };
}

/** Generar texto de recordatorio de cobro listo para WhatsApp */
export function redactarRecordatorioPago(chatId) {
  const mem = obtenerMembresia(chatId);
  if (!mem) return null;

  const { fecha: hoy } = ahoraColombia();
  const diff = Math.ceil((new Date(mem.fecha_vencimiento) - new Date(hoy)) / (1000 * 60 * 60 * 24));
  const nombre = mem.nombre_alumno || 'Atleta';
  const valor = pesos(mem.valor_cop);

  let encabezado = '';
  if (diff < 0) {
    encabezado = `⚠️ *Aviso de Mensualidad Vencida*`;
  } else if (diff === 0) {
    encabezado = `🔔 *Tu mensualidad vence HOY*`;
  } else {
    encabezado = `📢 *Recordatorio de Próximo Vencimiento*`;
  }

  return `🏋️‍♂️ *Eleven Performance Gym*
${encabezado}

Hola *${nombre}*, te recordamos el estado de tu suscripción:

• *Plan:* ${mem.plan_nombre}
• *Vencimiento:* ${mem.fecha_vencimiento}
• *Valor mensual:* ${valor}

💳 *Medios de pago oficiales:*
• *Nequi:* ${CUENTAS_PAGO.nequi}
• *Daviplata:* ${CUENTAS_PAGO.daviplata}
• *Bancolombia:* ${CUENTAS_PAGO.bancolombia}
• *Titular:* ${CUENTAS_PAGO.titular}

Al realizar tu transferencia, por favor envíanos el comprobante por este chat para renovar tus accesos y asegurar tus cupos de entrenamiento. ¡A seguir entrenando fuerte! 💪🔥`;
}

/** Listar todas las membresías por cobrar o vigentes para el panel */
export function listarMembresiasGym() {
  const { fecha: hoy } = ahoraColombia();
  const rows = db.prepare('SELECT * FROM membresias ORDER BY fecha_vencimiento ASC').all();
  return rows.map(m => {
    const diff = Math.ceil((new Date(m.fecha_vencimiento) - new Date(hoy)) / (1000 * 60 * 60 * 24));
    let estado = 'al_dia';
    if (diff < 0) estado = 'vencido';
    else if (diff <= 3) estado = 'por_vencer';
    return { ...m, dias_restantes: diff, estado_calculado: estado };
  });
}

/** Renovar mensualidad (+30 días) */
export function renovarMensualidad(chatId, medioPago = 'Nequi') {
  const mem = obtenerMembresia(chatId);
  if (!mem) return { error: 'Membresía no encontrada.' };

  const { fecha: hoy } = ahoraColombia();
  const fechaBase = mem.fecha_vencimiento > hoy ? mem.fecha_vencimiento : hoy;
  const nuevoVencimiento = sumarDias(fechaBase, 30);

  db.prepare(`
    UPDATE membresias SET
      fecha_vencimiento = ?,
      estado_pago = 'al_dia',
      medio_pago = ?,
      actualizado = ?
    WHERE chat_id = ?
  `).run(nuevoVencimiento, medioPago, Date.now(), chatId);

  return { ok: true, nuevo_vencimiento: nuevoVencimiento };
}

function sumarDias(fechaStr, dias) {
  const d = new Date(`${fechaStr}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dias);
  return d.toISOString().slice(0, 10);
}

/** Formatea la fecha de la sesión a formato legible en español */
export function formatearFechaSesion(fechaStr) {
  try {
    const [y, m, d] = String(fechaStr).split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    return date.toLocaleDateString('es-CO', {
      timeZone: 'UTC',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).replace(',', '');
  } catch (_) {
    return fechaStr;
  }
}

/** Formatea la hora militar (HH:MM) a formato 12 horas con a. m. / p. m. */
export function formatearHoraSesion(horaStr) {
  try {
    const [h, m] = String(horaStr).split(':').map(Number);
    return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'a. m.' : 'p. m.'}`;
  } catch (_) {
    return horaStr;
  }
}

/** Redacta el mensaje oficial de cancelación de sesión para WhatsApp */
export function redactarAvisoCancelacionSesion(sesion, motivo) {
  const nombre = sesion.nombre_alumno && sesion.nombre_alumno !== 'Atleta' ? sesion.nombre_alumno : '';
  const saludo = nombre ? `Hola *${nombre}*, ` : 'Hola, ';
  const fechaTexto = formatearFechaSesion(sesion.fecha);
  const horaTexto = formatearHoraSesion(sesion.hora);
  const tipo = sesion.tipo || 'entrenamiento';
  const razon = motivo && !/panel|alumno|cancelado desde/i.test(motivo)
    ? `\n\n*Motivo:* ${motivo}`
    : '';

  return `⚠️ *Sesión de Entrenamiento Cancelada*\n\n` +
    `${saludo}te informamos que tu sesión de *${tipo}* programada para el *${fechaTexto} a las ${horaTexto}* ha sido cancelada desde la administración de *Eleven Performance*.${razon}\n\n` +
    `Tu cupo ha sido liberado en el sistema. Si deseas reprogramar tu entrenamiento para otro horario o tienes alguna duda, escríbenos por este mismo chat y con gusto te ayudamos. 💪⚽\n\n` +
    `*Eleven Performance* · _ADAPT · PERFORM · WIN_`;
}

/** Resuelve el ID o teléfono de WhatsApp válido del atleta */
export function resolverDestinoWhatsApp(chatId, phoneAlternativo) {
  const id = String(chatId || '').trim();
  if (id.endsWith('@c.us') || id.endsWith('@lid')) return id;

  let raw = String(phoneAlternativo || id).replace(/\D/g, '');
  if (raw.length === 10 && raw.startsWith('3')) raw = '57' + raw;
  if (raw.length >= 11 && raw.length <= 15) return `${raw}@c.us`;

  if (id) {
    const c = db.prepare('SELECT telefono FROM chats WHERE id = ?').get(id)
      || db.prepare('SELECT telefono FROM clientes WHERE chat_id = ?').get(id);
    if (c?.telefono) {
      let t = String(c.telefono).replace(/\D/g, '');
      if (t.length === 10 && t.startsWith('3')) t = '57' + t;
      if (t.length >= 11) return `${t}@c.us`;
    }
  }
  return null;
}

// ============================================================================
// RECORDATORIOS AUTOMÁTICOS (2 HORAS ANTES) Y CONFIRMACIÓN INTERACTIVA
// ============================================================================

/** Confirma la asistencia a un entrenamiento */
export function confirmarEntrenamiento(chatId, idEntrenamiento) {
  let sesion;
  if (idEntrenamiento) {
    sesion = db.prepare("SELECT * FROM entrenamientos WHERE id = ? AND chat_id = ? AND estado IN ('agendada', 'confirmada')").get(idEntrenamiento, chatId);
  } else {
    const { fecha } = ahoraColombia();
    sesion = db.prepare("SELECT * FROM entrenamientos WHERE chat_id = ? AND fecha >= ? AND estado IN ('agendada', 'confirmada') ORDER BY fecha ASC, hora ASC LIMIT 1").get(chatId, fecha);
  }

  if (!sesion) {
    return { error: 'No tienes un entrenamiento pendiente para confirmar hoy.' };
  }

  db.prepare("UPDATE entrenamientos SET confirmado = 1, estado = 'confirmada' WHERE id = ?").run(sesion.id);
  return {
    ok: true,
    id: sesion.id,
    fecha: sesion.fecha,
    hora: sesion.hora,
    tipo: sesion.tipo,
    nombre: sesion.nombre_alumno,
    mensaje: `¡Excelente! Turno de ${sesion.tipo} para las ${formatearHoraSesion(sesion.hora)} confirmado con éxito.`
  };
}

/** Revisa entrenamientos de hoy y envía recordatorio interactivo 2 horas antes */
export async function procesarRecordatoriosEntrenamientos({ avisarCliente }) {
  if (typeof avisarCliente !== 'function') return;
  const ahora = ahoraColombia();
  const hoy = ahora.fecha;

  const aMinutos = (h) => {
    const [hh, mm] = String(h || '00:00').split(':').map(Number);
    return hh * 60 + mm;
  };
  const minActual = aMinutos(ahora.hora);

  const sesiones = db.prepare(`
    SELECT e.*, c.telefono,
      COALESCE(NULLIF(e.nombre_alumno, 'Atleta'), c.nombre, e.nombre_alumno, 'Atleta') AS nombre_mostrado
    FROM entrenamientos e
    LEFT JOIN chats c ON c.id = e.chat_id
    WHERE e.fecha = ?
      AND e.estado IN ('agendada', 'confirmada')
      AND (e.recordatorio_enviado IS NULL OR e.recordatorio_enviado = 0)
  `).all(hoy);

  for (const s of sesiones) {
    const minSesion = aMinutos(s.hora);
    const difMin = minSesion - minActual;

    // Ventana óptima: entre 45 y 135 minutos antes (aprox. 1 a 2 horas previas)
    if (difMin >= 45 && difMin <= 135) {
      const destino = resolverDestinoWhatsApp(s.chat_id, s.telefono);
      if (!destino) continue;

      const horaFormateada = formatearHoraSesion(s.hora);
      const nombre = s.nombre_mostrado || 'Atleta';
      const tipo = s.tipo || 'Entrenamiento';

      const texto =
`🔔 *Recordatorio de Turno — Eleven Performance* 🏋️‍♂️

Hola *${nombre}*, te recordamos tu sesión de *${tipo}* programada para hoy a las *${horaFormateada}*.

Por favor indícanos si asistirás para asegurar tu cupo:
👉 Responde *CONFIRMAR* o *SI* para asegurar tu asistencia.
👉 Responde *CANCELAR* si no puedes venir para liberar el cupo a otro atleta.

_ADAPT · PERFORM · WIN_ 💪⚽`;

      try {
        await avisarCliente(destino, texto);
        db.prepare('UPDATE entrenamientos SET recordatorio_enviado = 1 WHERE id = ?').run(s.id);
        console.log(`⏰ Recordatorio de 2 horas enviado a ${destino} (${nombre}) para el turno de las ${s.hora}`);
      } catch (err) {
        console.warn(`Error enviando recordatorio a ${destino}:`, err?.message);
      }
    }
  }
}

// ============================================================================
// GESTIÓN FORMAL DE PAGOS Y RECAUDO
// ============================================================================

/** Registra un pago de membresía en la tabla formal de pagos */
export function registrarPagoGym(datos) {
  const ahora = Date.now();
  const fechaHoy = ahoraColombia().fecha;
  const fechaPago = datos.fecha_pago || fechaHoy;
  const fechaInicio = datos.fecha_inicio || fechaPago;
  const fechaVencimiento = datos.fecha_vencimiento || sumarDias(fechaInicio, datos.dias || 30);
  const monto = Number(datos.monto || datos.valor || 120000);
  const medio = String(datos.medio_pago || datos.metodoPago || 'Nequi').trim();

  const res = db.prepare(`
    INSERT INTO pagos (
      chat_id, nombre_alumno, telefono, plan_nombre, monto, medio_pago,
      referencia, fecha_pago, fecha_inicio, fecha_vencimiento, notas, creado
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    datos.chat_id || '',
    datos.nombre_alumno || datos.nombre || 'Atleta',
    datos.telefono || '',
    datos.plan_nombre || datos.planNombre || 'Plan Mensual Ilimitado',
    monto,
    medio,
    datos.referencia || '',
    fechaPago,
    fechaInicio,
    fechaVencimiento,
    datos.notas || '',
    ahora
  );

  // Sincronizar o crear membresía
  if (datos.chat_id) {
    guardarMembresia(datos.chat_id, {
      nombre_alumno: datos.nombre_alumno || datos.nombre,
      telefono: datos.telefono,
      plan_nombre: datos.plan_nombre || datos.planNombre,
      fecha_inicio: fechaInicio,
      fecha_vencimiento: fechaVencimiento,
      valor_cop: monto,
      estado_pago: 'al_dia',
      medio_pago: medio,
      notas: datos.notas
    });
  }

  return { ok: true, id: Number(res.lastInsertRowid), fechaPago, fechaVencimiento, monto };
}

export function listarPagosGym(limite = 50) {
  return db.prepare('SELECT * FROM pagos ORDER BY fecha_pago DESC, id DESC LIMIT ?').all(limite);
}

// ============================================================================
// REPORTE MENSUAL: INGRESOS, ASISTENCIA Y ALUMNOS QUE DEJAN DE VENIR (DESERCIÓN)
// ============================================================================

export function generarReporteMensualGym(mesAnioFiltro) {
  const hoyCol = ahoraColombia();
  const mesFiltro = mesAnioFiltro || hoyCol.fecha.slice(0, 7); // 'YYYY-MM'

  // 1. INGRESOS DEL MES
  let pagosMes = db.prepare("SELECT * FROM pagos WHERE fecha_pago LIKE ?").all(`${mesFiltro}%`);
  
  // Si no hay filas directas en pagos todavía, computar desde membresías que iniciaron en el mes
  if (!pagosMes.length) {
    const memsMes = db.prepare("SELECT * FROM membresias WHERE fecha_inicio LIKE ?").all(`${mesFiltro}%`);
    pagosMes = memsMes.map(m => ({
      id: m.id,
      chat_id: m.chat_id,
      nombre_alumno: m.nombre_alumno,
      telefono: m.telefono,
      plan_nombre: m.plan_nombre,
      monto: m.valor_cop,
      medio_pago: m.medio_pago || 'Nequi',
      fecha_pago: m.fecha_inicio
    }));
  }

  const totalIngresos = pagosMes.reduce((acc, p) => acc + (Number(p.monto) || 0), 0);
  const desgloseMedios = {};
  for (const p of pagosMes) {
    const m = (p.medio_pago || 'Nequi').trim();
    desgloseMedios[m] = (desgloseMedios[m] || 0) + (Number(p.monto) || 0);
  }

  // 2. ASISTENCIA Y CONTROL DE ENTRENAMIENTOS DEL MES
  const entrenosMes = db.prepare("SELECT * FROM entrenamientos WHERE fecha LIKE ?").all(`${mesFiltro}%`);
  const totalSesiones = entrenosMes.length;
  const agendadas = entrenosMes.filter(e => e.estado === 'agendada').length;
  const confirmadas = entrenosMes.filter(e => e.estado === 'confirmada').length;
  const asistidas = entrenosMes.filter(e => e.estado === 'asistio').length;
  const canceladas = entrenosMes.filter(e => e.estado === 'cancelada').length;
  const efectivas = confirmadas + asistidas;
  const tasaCumplimiento = totalSesiones > 0 ? Math.round((efectivas / totalSesiones) * 100) : 0;

  // 3. ATLETAS QUE DEJAN DE VENIR (RIESGO DE DESERCIÓN / RETENCIÓN)
  const todasMembresias = db.prepare("SELECT * FROM membresias").all();
  const fechaLimiteActividad = sumarDias(hoyCol.fecha, -14); // sin entrenar hace más de 14 días

  const alumnosEnRiesgo = [];

  for (const m of todasMembresias) {
    const ultimoEntreno = db.prepare(`
      SELECT fecha, hora, tipo FROM entrenamientos
      WHERE chat_id = ? AND estado IN ('agendada', 'confirmada', 'asistio')
      ORDER BY fecha DESC, hora DESC LIMIT 1
    `).get(m.chat_id);

    const diffVencimiento = Math.ceil((new Date(m.fecha_vencimiento) - new Date(hoyCol.fecha)) / (1000 * 60 * 60 * 24));
    let diasSinEntrenar = null;
    let fechaUltimo = null;

    if (ultimoEntreno) {
      fechaUltimo = ultimoEntreno.fecha;
      diasSinEntrenar = Math.ceil((new Date(hoyCol.fecha) - new Date(ultimoEntreno.fecha)) / (1000 * 60 * 60 * 24));
    } else {
      diasSinEntrenar = 30; // Nunca ha reservado turno
    }

    const estaVencido = diffVencimiento < 0;
    const inactivoEntrenando = diasSinEntrenar >= 10;

    if (inactivoEntrenando || estaVencido) {
      const nombre = m.nombre_alumno || 'Atleta';
      let motivoRiesgo = '';
      if (estaVencido && inactivoEntrenando) {
        motivoRiesgo = `Membresía vencida hace ${Math.abs(diffVencimiento)} días y ${diasSinEntrenar} días sin entrenar`;
      } else if (estaVencido) {
        motivoRiesgo = `Membresía vencida hace ${Math.abs(diffVencimiento)} días sin renovación`;
      } else {
        motivoRiesgo = `${diasSinEntrenar} días consecutivos sin reservar turnos`;
      }

      const mensajeSugerido =
`Hola *${nombre}*, ¡te extrañamos en Eleven Performance! 💪⚽

Notamos que llevas unos días sin venir a entrenar. Queremos saber cómo estás y ayudarte a retomar tus sesiones de entrenamiento.

¿Te agendamos tu próximo turno esta semana? Escríbenos y cuadramos tu cupo 🙌🔥`;

      alumnosEnRiesgo.push({
        id: m.id,
        chat_id: m.chat_id,
        nombre,
        telefono: m.telefono || '',
        plan_nombre: m.plan_nombre,
        fecha_vencimiento: m.fecha_vencimiento,
        dias_sin_entrenar: diasSinEntrenar,
        fecha_ultimo_entreno: fechaUltimo,
        motivo_riesgo: motivoRiesgo,
        mensaje_sugerido: mensajeSugerido
      });
    }
  }

  // Ordenar los de mayor riesgo primero
  alumnosEnRiesgo.sort((a, b) => (b.dias_sin_entrenar || 0) - (a.dias_sin_entrenar || 0));

  return {
    mes: mesFiltro,
    generado_en: new Date().toISOString(),
    ingresos: {
      total: totalIngresos,
      total_formateado: pesos(totalIngresos),
      cantidad_pagos: pagosMes.length,
      por_medio_pago: desgloseMedios,
      detalle_pagos: pagosMes
    },
    asistencia: {
      total_sesiones: totalSesiones,
      agendadas,
      confirmadas,
      asistidas,
      canceladas,
      tasa_cumplimiento: tasaCumplimiento
    },
    retencion: {
      total_en_riesgo: alumnosEnRiesgo.length,
      alumnos_en_riesgo: alumnosEnRiesgo
    }
  };
}
