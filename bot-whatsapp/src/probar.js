// Prueba el bot desde la terminal, sin WhatsApp: npm run probar
// Usa una base de datos aparte (datos/prueba.db) y no escribe en Google Sheets.
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { fileURLToPath } from 'node:url';

process.env.DB_RUTA ??= fileURLToPath(new URL('../datos/prueba.db', import.meta.url));
process.env.SHEET_ID = '';

const { responder } = await import('./ia.js');
const { crearHerramientas } = await import('./herramientas.js');
const { guardarMensaje, historialIA, obtenerCliente } = await import('./db.js');

const chatId = 'prueba-terminal';
const herramientas = crearHerramientas({
  chatId,
  telefono: '573000000000',
  enviarDocumento: async (ruta) => console.log(`   📎 [PDF enviado al cliente: ${ruta}]`),
  notificarAsesor: async (texto) => console.log(`   📲 [WhatsApp al asesor]\n${texto.replace(/^/gm, '      ')}`),
  enviarEncuesta: async (titulo, opciones) => console.log(`   📊 [Encuesta] ${titulo}\n${opciones.map((o) => `      ○ ${o}`).join('\n')}`),
});

const rl = readline.createInterface({ input, output });
console.log('Escribe como si fueras un cliente (Ctrl+C para salir).\n');

while (true) {
  const texto = await rl.question('Cliente: ');
  if (!texto.trim()) continue;
  guardarMensaje(chatId, 'cliente', texto);
  try {
    const r = await responder(historialIA(chatId, 20), herramientas, obtenerCliente(chatId));
    guardarMensaje(chatId, 'bot', r);
    console.log(`Bot: ${r}\n`);
  } catch (e) {
    console.error(e.message);
  }
}
