import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';

export const RAIZ = fileURLToPath(new URL('..', import.meta.url));
export const ruta = (...partes) => join(RAIZ, ...partes);

export const DIR_DATOS = ruta('datos');
mkdirSync(DIR_DATOS, { recursive: true });

/** Fecha y hora actual en Colombia: { fecha: 'YYYY-MM-DD', hora: 'HH:MM', diaSemana: 0-6 } */
export function ahoraColombia() {
  const [fecha, hora] = new Date().toLocaleString('sv-SE', { timeZone: 'America/Bogota' }).split(' ');
  return { fecha, hora: hora.slice(0, 5), diaSemana: new Date(`${fecha}T12:00:00Z`).getUTCDay() };
}

export const pesos = (n) => `$${Number(n).toLocaleString('es-CO')} COP`;

/** Actualiza una variable en el archivo .env de forma persistente */
export function actualizarArchivoEnv(clave, valor) {
  try {
    const envPath = ruta('.env');
    if (!existsSync(envPath)) return false;
    let contenido = readFileSync(envPath, 'utf8');
    const regex = new RegExp(`^${clave}=.*$`, 'm');
    const nuevaLinea = `${clave}=${valor}`;
    if (regex.test(contenido)) {
      contenido = contenido.replace(regex, nuevaLinea);
    } else {
      contenido += `\n${nuevaLinea}`;
    }
    writeFileSync(envPath, contenido, 'utf8');
    return true;
  } catch (e) {
    console.error(`Error actualizando .env (${clave}):`, e.message);
    return false;
  }
}
