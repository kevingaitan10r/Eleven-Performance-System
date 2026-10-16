// Túnel opcional para acceso remoto
export const estadoTunel = { activo: false, url: null, error: null };

export async function iniciarTunel(puerto) {
  const tipo = (process.env.TUNEL || '').trim().toLowerCase();
  if (tipo === 'cloudflare') return tunelCloudflare(puerto);
  if (tipo === 'ngrok') return tunelNgrok(puerto);
  console.log('ℹ️  Modo local activo: el panel web y el bot funcionan en http://localhost:' + puerto);
  return null;
}

async function alAbrir(url) {
  Object.assign(estadoTunel, { activo: true, url, error: null });
  console.log('\n============================================================');
  console.log('  🌍 ENLACE PÚBLICO CLOUDFLARE ACTIVO:');
  console.log(`  👉 ${url}`);
  console.log('============================================================\n');
  try {
    const { writeFileSync } = await import('node:fs');
    writeFileSync(new URL('../tunel-url.txt', import.meta.url), url, 'utf8');
  } catch {}
}

async function tunelCloudflare(puerto) {
  try {
    const { Tunnel } = await import('cloudflared');
    const t = Tunnel.quick(`http://localhost:${puerto}`);
    const url = await Promise.race([
      new Promise((r) => t.once('url', r)),
      new Promise((_, r) => setTimeout(() => r(new Error('Cloudflare no entregó dirección en 60 s')), 60_000)),
    ]);
    await alAbrir(url);
    return url;
  } catch (e) {
    console.error('⚠️ Error iniciando túnel Cloudflare:', e.message);
    return null;
  }
}

async function tunelNgrok(puerto) {
  const authtoken = process.env.NGROK_AUTHTOKEN;
  if (!authtoken) {
    console.warn('⚠️ Falta NGROK_AUTHTOKEN en el .env');
    return null;
  }
  try {
    const ngrok = await import('@ngrok/ngrok');
    const listener = await ngrok.forward({
      addr: puerto,
      authtoken,
      domain: process.env.NGROK_DOMINIO || undefined,
    });
    const url = listener.url();
    await alAbrir(url);
    return url;
  } catch (e) {
    console.error('⚠️ Error iniciando túnel ngrok:', e.message);
    return null;
  }
}
