import { readFileSync, writeFileSync, renameSync } from 'node:fs';
import { ruta, pesos } from './rutas.js';

const RUTA_CATALOGO = process.env.CATALOGO_RUTA || ruta('conocimiento', 'catalogo.json');

export function guardarCatalogo(lista) {
  const archivo = RUTA_CATALOGO;
  writeFileSync(archivo + '.tmp', JSON.stringify(lista, null, 2) + '\n');
  renameSync(archivo + '.tmp', archivo);
}

export function catalogo() {
  try {
    return JSON.parse(readFileSync(RUTA_CATALOGO, 'utf8'));
  } catch {
    return [];
  }
}

export const cotizables = () => catalogo().filter((s) => s.precio_cop != null);

const precioTexto = (s) => (s.precio_cop != null ? `${pesos(s.precio_cop)} COP` : 'Consultar con preparador físico');

const tituloDe = (punto) => (/^[^:]{2,60}: /.test(punto) ? punto.split(': ')[0] : punto);

/** Explicación completa del plan para la IA */
export function explicacionCompleta(s) {
  return {
    plan: s.nombre,
    precio: precioTexto(s),
    duracion_dias: s.duracion_dias || 30,
    ideal_para: s.ideal,
    incluye: s.incluye,
    resumen: s.resumen,
  };
}

export function catalogoComoTexto() {
  return catalogo()
    .map((s) =>
      `### ${s.nombre} (id: ${s.id})\n` +
      `- Inversión: ${precioTexto(s)}\n` +
      (s.duracion_dias ? `- Vigencia: ${s.duracion_dias} días\n` : '') +
      (s.ideal ? `- Enfoque: ${s.ideal}\n` : '') +
      `- Incluye: ${s.incluye.map(tituloDe).join('; ')}`
    )
    .join('\n\n');
}

// ---------- Encuesta interactiva de WhatsApp ----------

const ICONOS = {
  'plan_mensual_libre': '🏋️‍♂️',
  'plan_funcional': '⚡',
  'plan_personalizado': '🎯',
  'plan_trimestral': '👑'
};
const icono = (id) => ICONOS[id] || '💪';

export const etiquetaPlan = (s) => `${icono(s.id)} ${s.nombre} · ${pesos(s.precio_cop)}`;

export function encuestaPlanes() {
  const planes = catalogo();
  return {
    titulo: '🔥 Planes Eleven Performance. Elige el tuyo para ver detalles y agendar:',
    opciones: planes.map(etiquetaPlan),
  };
}

export function interpretarOpcion(texto) {
  if (!texto) return null;
  const planes = catalogo();
  const plan = planes.find((s) => etiquetaPlan(s) === texto || s.nombre === texto || texto.includes(s.nombre));
  if (plan) return { tipo: 'plan', plan };
  return null;
}

export function detallePlan(s) {
  const lineas = [
    `*${icono(s.id)} ${s.nombre}*`,
    `💰 Tarifa: *${pesos(s.precio_cop)} COP* (${s.duracion_dias || 30} días)`,
    '',
    ...(s.ideal ? [`🎯 *Enfoque:* ${s.ideal}`, ''] : []),
    '*Beneficios incluidos:*',
    ...s.incluye.map((i) => `✅ ${i}`),
    '',
    '¿Te gustaría agendar tu primera sesión de entrenamiento o prefieres los datos de transferencia para activar tu acceso? 💪'
  ];
  return lineas.join('\n');
}
