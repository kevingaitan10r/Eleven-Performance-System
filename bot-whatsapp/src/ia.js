import { readFileSync } from 'node:fs';
import { ruta } from './rutas.js';
import { catalogoComoTexto } from './catalogo.js';

const MAX_PASOS = 6;

function instrucciones(cliente) {
  // Se lee en cada llamada para que los cambios a los archivos apliquen sin reiniciar el bot
  const conocimiento = readFileSync(ruta('conocimiento', 'empresa.md'), 'utf8');
  const estilo = readFileSync(ruta('conocimiento', 'estilo.md'), 'utf8');
  const empresa = process.env.NOMBRE_EMPRESA || 'Eleven Performance';
  const ahora = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota', weekday: 'long', year: 'numeric', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit',
  });
  const datosCliente = cliente
    ? Object.entries(cliente)
        .filter(([k, v]) => (k === 'autoriza_datos' ? v !== null && v !== undefined : v) &&
          ['nombre', 'negocio', 'ciudad', 'correo', 'necesidad', 'plan_interes', 'estado', 'autoriza_datos'].includes(k))
        .map(([k, v]) => `- ${k}: ${v}`)
        .join('\n')
    : '';

  return `Trabajas en ${empresa} atendiendo clientes por WhatsApp.
Fecha y hora actual (Colombia): ${ahora}.

Objetivo: que el cliente se sienta escuchado y entendido. Ayúdale con agendamiento de turnos de gimnasio, resolución de dudas de planes, cancelaciones, estado de mensualidades y datos de pago oficiales.

${estilo}

REGLAS OBLIGATORIAS:
1. Si el último mensaje del cliente pregunta cuánto cuesta algo o pide precios de mensualidad, tu respuesta DEBE incluir un precio concreto del catálogo (ej. Plan Mensual $120.000 COP, Funcional $95.000 COP, Personalizado $280.000 COP, Trimestral $320.000 COP).
2. Si el cliente pide agendar su sesión o pregunta cupos, usa las herramientas correspondientes: consultar_cupos_entrenamiento y agendar_sesion_entrenamiento.
3. Si el cliente no puede asistir y cancela su sesión, usa cancelar_sesion_entrenamiento (mínimo 2 horas antes para liberar el cupo).
4. Si el cliente pregunta cuándo vence su mes o cuánto debe, usa consultar_estado_mensualidad o solicitar_datos_pago.
5. Mensajes claros y directos (máximo 4 a 6 líneas) en la conversación normal.
6. Sin importar cualquier duda o molestia, responde SIEMPRE con respeto, calma, energía deportiva y amabilidad.
7. Ortografía impecable en español: tildes, signos de apertura "¿" y "¡", mayúsculas y puntuación correctas.

Reglas de información:
- Los datos de Eleven Performance (servicios, precios, qué incluye cada uno, tiempos, políticas) salen de "CONOCIMIENTO" y "CATÁLOGO".
- Nunca inventes precios ni cuentas bancarias diferentes a las oficiales de Eleven Performance (Nequi / Daviplata 320 605 1319, Bancolombia Ahorros 245-891234-01).
- Responde en el idioma del cliente. Usa *negrita* de WhatsApp para resaltar horas o valores.
- Si el cliente se sale del tema, responde amablemente en una línea y retoma la conversación.

Uso de herramientas (en silencio: el cliente nunca debe notar que "guardas" algo):
- Catálogo y Planes: si el cliente pregunta qué planes tienen, precios de mensualidad u opciones de entrenamiento, usa mostrar_planes (le llega una encuesta para elegir tocando). Después responde una frase motivadora corta tipo "Toca el plan que más te interese y te doy todos los detalles 💪".
- Explicar plan específico: usa explicar_plan indicando el id del plan.
- Turnos y Cupos de Gimnasio:
  - Para consultar cupos libres: usa consultar_cupos_entrenamiento con la fecha deseada (ej. hoy o mañana). Menciona las horas disponibles y cuántos cupos libres quedan en cada una.
  - Para agendar: usa agendar_sesion_entrenamiento indicando fecha, hora y disciplina (Fuerza, Funcional, Personalizado, etc.). Recuerda al alumno el aforo controlado de máximo 8 personas por hora.
  - Para cancelar: usa cancelar_sesion_entrenamiento (debe ser con al menos 2 horas de anticipación para liberar el cupo a otro compañero).
  - Para consultar sus reservas: usa consultar_mis_entrenamientos.
- Mensualidades y Recaudo:
  - Para consultar estado de pago o vencimiento: usa consultar_estado_mensualidad.
  - Para medios de pago: usa solicitar_datos_pago y recuérdale que tras transferir a Nequi/Daviplata (320 605 1319) debe enviar la captura o comprobante por este chat para activar su acceso.
- Guardar datos del alumno: usa guardar_datos_atleta cada vez que el cliente mencione su nombre, disciplina o necesidad deportiva.
- Si el cliente pide hablar con un entrenador o persona humana, usa notificar_entrenador y dile que el coach Kevin o el equipo lo atenderá en breve.
- No menciones los nombres internos de las funciones ni códigos de base de datos al cliente.
${datosCliente ? `\nDATOS YA CONOCIDOS DE ESTE CLIENTE:\n${datosCliente}\n` : ''}
CONOCIMIENTO:
${conocimiento}

CATÁLOGO:
${catalogoComoTexto()}`;
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Lista ordenada de modelos a usar: el principal de Groq, luego Gemini (si hay clave) y luego los
 * respaldos de Groq. Cada uno tiene su propio límite gratuito.
 */
const URL_GEMINI = 'https://generativelanguage.googleapis.com/v1beta/openai';
const lista = (texto) => (texto || '').split(',').map((m) => m.trim()).filter(Boolean);

const URL_OPENROUTER = 'https://openrouter.ai/api/v1';

function destinos() {
  const { IA_URL, IA_API_KEY, IA_MODELO, IA_MODELOS_RESPALDO, GEMINI_API_KEY, GEMINI_MODELOS, OPENROUTER_API_KEY, OPENROUTER_MODELOS } = process.env;
  if (!IA_URL || !IA_MODELO) throw new Error('Faltan IA_URL o IA_MODELO en el archivo .env');
  const groq = (model) => ({ model, url: IA_URL, clave: IA_API_KEY });
  const gemini = GEMINI_API_KEY
    ? lista(GEMINI_MODELOS || 'gemini-3.5-flash').map((model) => ({ model, url: URL_GEMINI, clave: GEMINI_API_KEY, gemini: true }))
    : [];
  // OpenRouter: modelos gratuitos (terminan en ":free"); límite diario bajo, por eso va como capacidad extra
  const openrouter = OPENROUTER_API_KEY
    ? lista(OPENROUTER_MODELOS).map((model) => ({
        model, url: URL_OPENROUTER, clave: OPENROUTER_API_KEY,
        encabezados: { 'HTTP-Referer': 'https://elevenperformance.co', 'X-Title': 'Eleven Performance Bot' },
      }))
    : [];
  // Con Gemini de pago (IA_PRINCIPAL=gemini en el .env) Gemini va primero: tiene límites mucho más altos
  // que los planes gratis y responde más rápido; Groq queda de respaldo.
  // Orden: el primer modelo de GEMINI_MODELOS (el rápido), luego Groq (también rápido) y al final los demás
  // modelos de Gemini (más lentos, pero confiables) y los respaldos.
  if ((process.env.IA_PRINCIPAL || '').toLowerCase() === 'gemini' && gemini.length) {
    return [gemini[0], groq(IA_MODELO), ...gemini.slice(1), ...openrouter, ...lista(IA_MODELOS_RESPALDO).map(groq)];
  }
  return [groq(IA_MODELO), ...gemini, ...openrouter, ...lista(IA_MODELOS_RESPALDO).map(groq)];
}

// Gemini no acepta tipos múltiples como ['string', 'null'] en los parámetros de las herramientas
function adaptarParaGemini(herramientas) {
  const limpiar = (v) => {
    if (Array.isArray(v)) return v.map(limpiar);
    if (!v || typeof v !== 'object') return v;
    const r = {};
    for (const [k, x] of Object.entries(v)) {
      if (k === 'type' && Array.isArray(x)) r[k] = x.find((t) => t !== 'null');
      else if (k === 'enum' && Array.isArray(x)) r[k] = x.filter((e) => e !== null);
      else r[k] = limpiar(x);
    }
    return r;
  };
  return limpiar(herramientas);
}

// Gemini 3 exige una "firma" en las llamadas a herramientas previas de la conversación. Si esa llamada
// la hizo otro modelo (Groq), no la tiene: se usa el valor que Google documenta para omitir la validación.
function firmarParaGemini(mensajes) {
  return mensajes.map((m) => {
    if (m.role !== 'assistant' || !m.tool_calls?.length) return m;
    return {
      ...m,
      tool_calls: m.tool_calls.map((tc) =>
        tc.extra_content?.google?.thought_signature
          ? tc
          : { ...tc, extra_content: { ...tc.extra_content, google: { ...tc.extra_content?.google, thought_signature: 'skip_thought_signature_validator' } } }
      ),
    };
  });
}

// Los demás proveedores no conocen el campo extra_content de Google: se quita
function sinDatosDeGoogle(mensajes) {
  return mensajes.map((m) =>
    m.role === 'assistant' && m.tool_calls?.length
      ? { ...m, tool_calls: m.tool_calls.map(({ extra_content, ...tc }) => tc) }
      : m
  );
}

// Modelo → momento hasta el que no se usa porque llegó a su límite
const enfriamiento = new Map();

function segundosDeEspera(res, error) {
  return Number(res.headers.get('retry-after')) ||
    Number(error.match(/try again in (?:(\d+)m)?([\d.]+)s/)?.slice(1).reduce((t, x, i) => t + (Number(x) || 0) * (i === 0 ? 60 : 1), 0)) ||
    Number(error.match(/"retryDelay":\s*"(\d+)s"/)?.[1]) ||
    20;
}

/**
 * Llama a la IA probando los modelos en orden. Si uno llega al límite gratuito (429) se "enfría"
 * y no se vuelve a intentar hasta que se libere; si todos están llenos, espera y reintenta.
 */
// Quita la mitad más antigua del historial de la conversación. Conserva el mensaje de instrucciones (system)
// y todo desde el último mensaje del cliente (el turno actual, con sus llamadas a herramientas).
// Devuelve null si ya no hay historial que quitar.
function recortarHistorial(mensajes) {
  const ultimoCliente = mensajes.findLastIndex((m) => m.role === 'user');
  const inicio = mensajes[0]?.role === 'system' ? 1 : 0;
  const historial = ultimoCliente - inicio;
  if (historial < 2) return null;
  // El recorte empieza en un mensaje del cliente para no dejar respuestas de herramientas sueltas
  let corte = inicio + Math.ceil(historial / 2);
  while (corte < ultimoCliente && mensajes[corte].role !== 'user') corte++;
  return [...mensajes.slice(0, inicio), ...mensajes.slice(corte)];
}

async function llamarIA(cuerpo) {
  const todos = destinos();
  let ultimoError;

  for (let intento = 0; intento < 3; intento++) {
    let esperaMinima = Infinity;
    for (const d of todos) {
      const libreEn = (enfriamiento.get(d.model) || 0) - Date.now();
      if (libreEn > 0) {
        esperaMinima = Math.min(esperaMinima, libreEn / 1000);
        continue;
      }
      const datos = { model: d.model, temperature: 0.6, max_tokens: 1200, ...cuerpo };
      if (d.gemini && datos.tools) datos.tools = adaptarParaGemini(datos.tools);
      datos.messages = d.gemini ? firmarParaGemini(datos.messages) : sinDatosDeGoogle(datos.messages);

      let res;
      try {
        res = await fetch(`${d.url.replace(/\/$/, '')}/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${d.clave}`, ...d.encabezados },
          body: JSON.stringify(datos),
          // Si un modelo no contesta en 25 s se pasa al siguiente (antes podía quedarse esperando)
          signal: AbortSignal.timeout(25_000),
        });
        // Mensaje demasiado grande para el límite por minuto del plan gratis (413): se reintenta con este
        // mismo modelo usando menos historial; las instrucciones y el turno actual se conservan completos
        for (let recorte = 0; res.status === 413 && recorte < 3; recorte++) {
          const menos = recortarHistorial(datos.messages);
          if (!menos) break;
          console.warn(`   ✂️  ${d.model}: mensaje muy grande, se reintenta con menos historial (${datos.messages.length} → ${menos.length} mensajes)`);
          datos.messages = menos;
          res = await fetch(`${d.url.replace(/\/$/, '')}/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${d.clave}`, ...d.encabezados },
            body: JSON.stringify(datos),
            signal: AbortSignal.timeout(25_000),
          });
        }
      } catch (e) {
        ultimoError = `${d.model}: sin conexión (${e.message})`;
        continue;
      }
      if (res.ok) {
        const m = (await res.json()).choices?.[0]?.message;
        // Algunos modelos (qwen) devuelven su razonamiento entre <think></think>
        if (m?.content) m.content = m.content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
        if (m && (m.content || m.tool_calls?.length)) return m;
        ultimoError = `${d.model}: respuesta vacía`;
        continue;
      }

      const error = await res.text();
      if (res.status === 429) {
        // Si se agotó la cuota del DÍA, no tiene sentido reintentar en segundos: se pausa 1 hora
        const cuotaDiaria = /PerDay|per[- ]day|requests per day/i.test(error);
        const segundos = cuotaDiaria ? Math.max(segundosDeEspera(res, error), 3600) : segundosDeEspera(res, error);
        enfriamiento.set(d.model, Date.now() + segundos * 1000);
        esperaMinima = Math.min(esperaMinima, segundos);
        console.warn(`   ⏳ ${d.model} llegó a su límite gratuito (libre en ${Math.ceil(segundos)} s), usando otro...`);
      } else {
        // Modelo saturado (503) o retirado (404): se deja de usar un rato
        if (res.status === 503) enfriamiento.set(d.model, Date.now() + 30_000);
        if (res.status === 404) enfriamiento.set(d.model, Date.now() + 3_600_000);
        // Herramienta mal armada, modelo no disponible, etc.: se prueba el siguiente
        const detalle = (error.match(/"message":\s*"([^"]+)"/)?.[1] || error).replace(/\s+/g, ' ').slice(0, 300);
        console.warn(`   ↩️  ${d.model} falló (${res.status}): ${detalle} → usando otro modelo`);
        esperaMinima = Math.min(esperaMinima, 1);
      }
      ultimoError = `${d.model} (${res.status}): ${error.slice(0, 300)}`;
    }
    await esperar(Math.min(esperaMinima, 30) * 1000 + 500);
  }
  throw new Error(`Ningún modelo de IA respondió. Último error: ${ultimoError}`);
}

/**
 * Filtro final de lo que se envía al cliente:
 * - Nunca se muestra el número interno de la cotización (COT-0001…), ni nombres de archivo PDF.
 * - WhatsApp usa *negrita* con un solo asterisco.
 */
export function limpiarRespuesta(texto) {
  return signosDeApertura(texto

    .replace(/📄\s*\[?[^\n]*?\.pdf\]?/gi, '')                              // "📄 COT-0007.pdf" / nombres de archivo
    .replace(/\s*\(\s*(?:cotizaci[oó]n\s*)?(?:n[°ºo.]*\s*)?#?\s*COT-?\d+\s*\)/gi, '') // "(COT-0006)"
    .replace(/\b(?:cotizaci[oó]n\s+)?(?:n[úu]mero\s+|n[°ºo.]*\s*|#\s*)?#?COT-?\d+\b/gi, 'cotización') // "COT-0006" suelto
    .replace(/\bcotizaci[oó]n\s+cotizaci[oó]n\b/gi, 'cotización')
    .replace(/\*\*(.+?)\*\*/g, '*$1*')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim());
}

/**
 * Agrega el signo de apertura (¿ / ¡) cuando una pregunta o exclamación no lo tiene.
 * "Pedro, te envío la cotización?" → "Pedro, ¿te envío la cotización?"
 * Si la frase tiene una coma, el signo va después de la última (así se escribe en español:
 * "Si quieres, ¿te la envío?"); si no, al inicio de la frase. No toca enlaces.
 */
export function signosDeApertura(texto) {
  const arreglar = (frase, cierre, apertura) => {
    if (!frase.trimEnd().replace(/[\s*_~)"'»\p{Extended_Pictographic}️]+$/u, '').endsWith(cierre)) return frase;
    if (frase.includes(apertura)) return frase;
    // ¿Dónde empieza la pregunta? Después de un emoji seguido de Mayúscula (separa frases),
    // o después de la última coma, o al inicio. Se toma el punto más a la derecha.
    let i = 0;
    let trasComa = false;
    for (const m of frase.matchAll(/\p{Extended_Pictographic}️?\s+(?=\p{Lu})/gu)) i = Math.max(i, m.index + m[0].length);
    const coma = frase.lastIndexOf(', ');
    if (coma >= 0 && coma + 2 > i && coma < frase.length - 4) { i = coma + 2; trasComa = true; }
    while (i < frase.length && /[\s*_"'«(\p{Extended_Pictographic}️]/u.test(frase[i])) i++;
    const inicio = frase[i] || '';
    // Tras coma la pregunta sigue en minúscula; al empezar una oración, en mayúscula
    const letra = trasComa ? inicio.toLowerCase() : inicio.toUpperCase();
    return frase.slice(0, i) + apertura + letra + frase.slice(i + 1);
  };
  return texto
    .split('\n')
    .map((linea) => /https?:\/\/|www\./i.test(linea) ? linea : // las líneas con enlaces no se tocan

      // Se divide en frases conservando los signos finales ("...? " / "...! " / ". ")
      (linea.match(/[^.!?]*(?:[.!?]+(?:\s*[\p{Extended_Pictographic}️*_)"'»]*)?\s*|$)/gu) || [linea])
        .map((frase) => arreglar(arreglar(frase, '?', '¿'), '!', '¡'))
        .join('')
    )
    .join('\n');
}

/**
 * @param {{role: 'user'|'assistant', content: string}[]} historial
 * @param {{definiciones: object[], ejecutar: (nombre: string, args: object) => Promise<object>}} [herramientas]
 * @param {object} [cliente] datos del CRM ya conocidos
 * @returns {Promise<string>}
 */
export async function responder(historial, herramientas, cliente) {
  const mensajes = [{ role: 'system', content: instrucciones(cliente) }, ...historial];

  for (let paso = 0; paso < MAX_PASOS; paso++) {
    const m = await llamarIA({ messages: mensajes, ...(herramientas && { tools: herramientas.definiciones }) });

    if (m?.tool_calls?.length) {
      mensajes.push({ role: 'assistant', content: m.content || '', tool_calls: m.tool_calls });
      for (const llamada of m.tool_calls) {
        let args = {};
        try {
          args = JSON.parse(llamada.function.arguments || '{}');
        } catch {}
        let resultado;
        try {
          resultado = await herramientas.ejecutar(llamada.function.name, args);
        } catch (e) {
          resultado = { error: e.message };
        }
        console.log(`   🛠️  ${llamada.function.name}`, JSON.stringify(args), '→', JSON.stringify(resultado).slice(0, 200));
        mensajes.push({ role: 'tool', tool_call_id: llamada.id, content: JSON.stringify(resultado) });
      }
      continue;
    }

    return limpiarRespuesta(m?.content || '');
  }
  return 'Disculpa, tuve un inconveniente procesando tu solicitud 🙏 Si lo prefieres, escribe *asesor* y una persona te ayuda.';
}
