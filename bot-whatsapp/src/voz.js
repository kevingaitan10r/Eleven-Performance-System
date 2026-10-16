// Transcribe notas de voz con Whisper (gratis en Groq)
export async function transcribir(base64, mimetype) {
  const { IA_URL, IA_API_KEY } = process.env;
  const form = new FormData();
  form.append('file', new Blob([Buffer.from(base64, 'base64')], { type: mimetype.split(';')[0] }), 'audio.ogg');
  form.append('model', process.env.IA_MODELO_AUDIO || 'whisper-large-v3-turbo');
  form.append('language', 'es');

  const res = await fetch(`${IA_URL.replace(/\/$/, '')}/audio/transcriptions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${IA_API_KEY}` },
    body: form,
  });
  if (!res.ok) throw new Error(`Error transcribiendo audio (${res.status}): ${await res.text()}`);
  return (await res.json()).text?.trim() || '';
}
