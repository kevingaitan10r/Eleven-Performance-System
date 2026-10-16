// Copia todo lo que el bot muestra en pantalla al archivo datos/bot.log (útil para revisar errores)
import { appendFileSync, mkdirSync } from 'node:fs';
import { format } from 'node:util';
import { fileURLToPath } from 'node:url';

const archivo = fileURLToPath(new URL('../datos/bot.log', import.meta.url));
mkdirSync(fileURLToPath(new URL('../datos', import.meta.url)), { recursive: true });

for (const nivel of ['log', 'warn', 'error']) {
  const original = console[nivel].bind(console);
  console[nivel] = (...args) => {
    original(...args);
    const texto = format(...args);
    if (/[▄█▀]{5}/.test(texto)) return; // no guardar los QR
    const hora = new Date().toLocaleString('sv-SE', { timeZone: 'America/Bogota' });
    try {
      appendFileSync(archivo, `[${hora}] ${nivel === 'log' ? '' : nivel.toUpperCase() + ' '}${texto}\n`);
    } catch {}
  };
}
