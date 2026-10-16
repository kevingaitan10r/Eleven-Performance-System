import { db, guardarCliente, obtenerCliente } from './db.js';
import { catalogo, encuestaPlanes, explicacionCompleta, detallePlan } from './catalogo.js';
import {
  consultarDisponibilidadGym, agendarEntrenamiento, cancelarEntrenamiento,
  proximosEntrenamientos, estadoMensualidad, redactarRecordatorioPago, CUENTAS_PAGO
} from './gimnasio.js';

export const ESTADOS_CLIENTE = ['nuevo', 'interesado', 'activo', 'mensualidad al dia', 'por vencer', 'vencido', 'inactivo'];
const DATOS_PERSONALES = ['nombre', 'telefono', 'ciudad', 'correo'];

export function resumenCliente(chatId, telefono) {
  const c = obtenerCliente(chatId) || {};
  return [
    `🏃 Atleta: ${c.nombre || 'Sin nombre registrado'} (${c.telefono || telefono || chatId})`,
    c.necesidad && `🎯 Disciplina / Objetivo: ${c.necesidad}`,
    c.plan_interes && `📦 Plan de Interés: ${c.plan_interes}`,
    `📊 Estado: ${c.estado || 'nuevo'}`,
  ].filter(Boolean).join('\n');
}

/**
 * @param {{
 *   chatId: string, telefono?: string,
 *   notificarAsesor: (texto: string) => Promise<void>,
 *   enviarEncuesta: (titulo: string, opciones: string[]) => Promise<void>,
 *   enviarTexto: (texto: string) => Promise<void>,
 * }} ctx
 */
export function crearHerramientas(ctx) {
  const definiciones = [
    {
      type: 'function',
      function: {
        name: 'mostrar_planes',
        description: 'Envía al usuario los planes y membresías de Eleven Performance como encuesta interactiva de WhatsApp. Úsala cuando pregunten qué planes hay, precios o membresías disponibles.',
        parameters: { type: 'object', properties: {} },
      },
    },
    {
      type: 'function',
      function: {
        name: 'explicar_plan',
        description: 'Devuelve la explicación detallada de un plan de entrenamiento específico (Fuerza & Gym libre, Funcional, Personalizado 1 a 1, Trimestral). Úsala cuando el atleta pida detalles o diferencias de un plan.',
        parameters: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              enum: catalogo().map((s) => s.id),
              description: 'ID del plan de entrenamiento'
            }
          },
          required: ['id'],
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'guardar_datos_atleta',
        description: 'Guarda en el sistema los datos del atleta apenas los mencione en la conversación (nombre, deporte/objetivo, correo).',
        parameters: {
          type: 'object',
          properties: {
            nombre: { type: ['string', 'null'], description: 'Nombre completo del atleta' },
            objetivo_deportivo: { type: ['string', 'null'], description: 'Objetivo deportivo, disciplina o necesidad física' },
            correo: { type: ['string', 'null'], description: 'Correo electrónico' },
            plan_interes: { type: ['string', 'null'], description: 'Plan que le interesa' },
            estado: { type: 'string', enum: ESTADOS_CLIENTE },
          },
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'consultar_cupos_entrenamiento',
        description: 'Consulta los horarios y cupos libres en el gimnasio (máximo 8 cupos por hora). Si no se indica fecha, devuelve los cupos de hoy o los próximos días.',
        parameters: {
          type: 'object',
          properties: {
            fecha: { type: ['string', 'null'], description: 'Fecha en formato YYYY-MM-DD (ej: 2026-10-09). Si no se envía, consulta hoy.' }
          },
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'agendar_sesion_entrenamiento',
        description: 'Agenda una sesión de entrenamiento para el atleta. Requiere fecha (YYYY-MM-DD), hora (HH:MM formato 24 horas, ej: 07:00, 18:00) y modalidad (Fuerza, Funcional, Personalizado).',
        parameters: {
          type: 'object',
          properties: {
            fecha: { type: 'string', description: 'YYYY-MM-DD' },
            hora: { type: 'string', description: 'HH:MM en formato 24 horas' },
            tipo: { type: 'string', description: 'Modalidad: Fuerza, Funcional, Personalizado, etc.' },
          },
          required: ['fecha', 'hora'],
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'cancelar_sesion_entrenamiento',
        description: 'Cancela la próxima sesión agendada del atleta y libera inmediatamente el cupo en el gimnasio. Debe realizarse con mínimo 2 horas de anticipación.',
        parameters: {
          type: 'object',
          properties: {
            motivo: { type: ['string', 'null'], description: 'Motivo por el cual no puede asistir' },
          },
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'consultar_mis_entrenamientos',
        description: 'Consulta los próximos entrenamientos agendados del atleta para recordarle sus horarios.',
        parameters: { type: 'object', properties: {} },
      },
    },
    {
      type: 'function',
      function: {
        name: 'consultar_estado_mensualidad',
        description: 'Consulta la vigencia de la membresía del atleta: fecha de vencimiento, días restantes, valor a pagar y estado.',
        parameters: { type: 'object', properties: {} },
      },
    },
    {
      type: 'function',
      function: {
        name: 'solicitar_datos_pago',
        description: 'Envía las cuentas oficiales de Eleven Performance (Nequi / Daviplata 320 605 1319 y Bancolombia) y recuerda enviar el comprobante.',
        parameters: { type: 'object', properties: {} },
      },
    },
    {
      type: 'function',
      function: {
        name: 'notificar_entrenador',
        description: 'Notifica directamente al WhatsApp del entrenador o administrador de Eleven Performance (+57 320 605 1319) cuando el atleta requiera atención personalizada o soporte especial.',
        parameters: {
          type: 'object',
          properties: {
            motivo: { type: 'string', description: 'Motivo de la notificación' },
            resumen: { type: 'string', description: 'Resumen claro de la consulta del atleta' },
          },
          required: ['motivo', 'resumen'],
        },
      },
    },
  ];

  async function ejecutar(nombre, args) {
    const { chatId } = ctx;
    switch (nombre) {
      case 'mostrar_planes': {
        const e = encuestaPlanes();
        await ctx.enviarEncuesta(e.titulo, e.opciones);
        return {
          ok: true,
          encuesta_enviada: true,
          nota: 'Ya se envió la encuesta con los planes oficiales de Eleven Performance. Invita al atleta a tocar una opción para darle detalles.'
        };
      }

      case 'explicar_plan': {
        const p = catalogo().find((x) => x.id === args.id);
        return p ? explicacionCompleta(p) : { error: 'Plan no encontrado en el catálogo de Eleven Performance' };
      }

      case 'guardar_datos_atleta': {
        const plan = catalogo().find((s) => s.id === args.plan_interes);
        const dataGuardar = {
          nombre: args.nombre || undefined,
          necesidad: args.objetivo_deportivo || undefined,
          correo: args.correo || undefined,
          plan_interes: plan?.nombre || args.plan_interes || undefined,
          estado: args.estado || 'interesado',
        };
        const cliente = guardarCliente(chatId, dataGuardar);
        return { ok: true, cliente };
      }

      case 'consultar_cupos_entrenamiento': {
        return { disponibilidad: consultarDisponibilidadGym(args.fecha) };
      }

      case 'agendar_sesion_entrenamiento': {
        const cliente = obtenerCliente(chatId) || {};
        const chatRow = db.prepare('SELECT nombre, telefono FROM chats WHERE id = ?').get(chatId) || {};
        const nombreAtleta = args.nombre || cliente.nombre || chatRow.nombre || 'Atleta';
        if (nombreAtleta && nombreAtleta !== 'Atleta' && !cliente.nombre) {
          try { guardarCliente(chatId, { nombre: nombreAtleta }); } catch (_) {}
        }
        const r = agendarEntrenamiento(chatId, nombreAtleta, args.fecha, args.hora, args.tipo || 'Fuerza');
        if (r.ok) {
          await ctx.notificarAsesor(`🏋️‍♂️ *Nuevo entrenamiento agendado*\n${nombreAtleta} - ${r.fecha} a las ${r.hora} (${r.tipo})\nCupos restantes en ese turno: ${r.cupos_restantes}`);
        }
        return r;
      }

      case 'cancelar_sesion_entrenamiento': {
        const cliente = obtenerCliente(chatId) || {};
        const chatRow = db.prepare('SELECT nombre, telefono FROM chats WHERE id = ?').get(chatId) || {};
        const nombreAtleta = args.nombre || cliente.nombre || chatRow.nombre || 'Atleta';
        const r = cancelarEntrenamiento(chatId, null, args.motivo);
        if (r.ok) {
          await ctx.notificarAsesor(`⚠️ *Entrenamiento cancelado*\n${nombreAtleta} canceló su sesión del ${r.fecha} a las ${r.hora}\nMotivo: ${args.motivo || 'No especificado'}`);
        }
        return r;
      }

      case 'consultar_mis_entrenamientos': {
        return { entrenamientos: proximosEntrenamientos(chatId) };
      }

      case 'consultar_estado_mensualidad': {
        return { membresia: estadoMensualidad(chatId) };
      }

      case 'solicitar_datos_pago': {
        const recordatorio = redactarRecordatorioPago(chatId);
        if (recordatorio) {
          await ctx.enviarTexto(recordatorio);
          return { ok: true, mensaje_enviado: true };
        }
        return { cuentas_oficiales: CUENTAS_PAGO };
      }

      case 'notificar_entrenador': {
        await ctx.notificarAsesor(
          `🔔 *AVISO ELEVEN PERFORMANCE*\n*Motivo:* ${args.motivo}\n*Detalle:* ${args.resumen}\n\n${resumenCliente(chatId, ctx.telefono)}`
        );
        return { ok: true, entrenador_notificado: true };
      }

      default:
        return { error: `Herramienta desconocida: ${nombre}` };
    }
  }

  return { definiciones, ejecutar };
}
