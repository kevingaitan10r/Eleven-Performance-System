import { iniciarPanel } from './panel/servidor.js';

iniciarPanel({
  estadoWhatsApp: { conectado: false, numero: '573206051319', qr: null, codigo: null, estado: 'desconectado', desde: null, detalle: 'Modo pruebas' },
  sheetsActivo: false,
  solicitarCodigoVinculacion: () => {},
  avisarCliente: (chatId, texto) => console.log(`[Aviso WhatsApp a ${chatId}]: ${texto}`),
  reconectarWhatsApp: () => console.log('Reconexión solicitada'),
  desvincularWhatsApp: async () => console.log('Desvinculación solicitada'),
  enviarComoAsesor: async (chatId, texto, asesor) => console.log(`[Asesor ${asesor} -> ${chatId}]: ${texto}`)
});
