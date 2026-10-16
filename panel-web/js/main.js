/* ==========================================================================
   15. DESPACHADOR DE EVENTOS Y ACCIONES DE INTERFAZ
   ========================================================================== */
function setPath(obj, path, val) {
  const ks = path.split(".");
  let o = obj;
  ks.slice(0, -1).forEach(k => o = o[k] = o[k] || {});
  o[ks[ks.length - 1]] = val;
}

const ACTIONS = {
  go: d => go(d.page),
  openClient: d => openClient(d.id, d.tab),
  newClient: () => clientForm(null),
  editClient: d => clientForm(S.clients[d.id]),
  pickPhoto: d => pickPhoto(d.id),
  toggleClient: async d => {
    const c = S.clients[d.id];
    await put("clients", c.id, Object.assign({}, c, { status: c.status === "inactive" ? "active" : "inactive" }));
    toast(c.status === "inactive" ? "Deportista activado." : "Deportista marcado como inactivo.");
  },
  deleteClient: async d => {
    if (!isAdmin()) {
      toast("Permiso denegado: Solo el Administrador (Kevin Gaitán) tiene autorización para eliminar deportistas.", true);
      return;
    }
    const c = S.clients[d.id];
    if (await confirmDialog({ title: "Eliminar Deportista", text: `¿Deseas eliminar a <b>${esc(c.name)}</b> y todo su historial de registros?`, ok: "Eliminar Definitivamente", danger: true })) {
      for (const x of recordsOf(c.id)) await del("records", x.id);
      for (const x of routinesOf(c.id)) await del("routines", x.id);
      for (const x of reportsOf(c.id)) await del("reports", x.id);
      await del("clients", c.id);
      toast("Deportista eliminado.");
      if (S.view.page === "client") go("clients");
    }
  },
  sortClients: d => {
    const f = S.ui.clients;
    if (f.sort === d.k) f.dir *= -1;
    else { f.sort = d.k; f.dir = 1; }
    render();
  },
  setUi: d => { setPath(S.ui, d.path, d.val); render(); },
  tab: d => {
    if (d.test) S.ui.nmTest[S.view.clientId || d.client] = d.test;
    const cid = d.client || S.view.clientId;
    if (S.view.page !== "client") openClient(cid, d.tab);
    else { S.view.tab = d.tab; render(); }
  },
  nmTest: d => { S.ui.nmTest[d.id] = d.test; render(); },
  metricSel: d => { S.ui.metricSel[d.g] = d.k; render(); },
  evalsType: d => { S.ui.evalsType[d.id] = d.type; render(); },
  setMatch: d => { currentMatchView = d.match; render(); },
  toggleAlerts: () => { S.ui.alertsAll = !S.ui.alertsAll; render(); },
  scrollTo: d => { const el = document.getElementById(d.target); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); },
  newRecord: d => recordForm({ clientId: d.client, type: d.type, test: d.test }),
  editRecord: d => recordForm({ recId: d.id }),
  deleteRecord: d => deleteRecord(d.id),
  newRoutine: d => routineForm({ clientId: d.client }),
  editRoutine: d => routineForm({ id: d.id }),
  dupRoutine: d => routineForm({ copy: S.routines[d.id] }),
  deleteRoutine: async d => {
    if (await confirmDialog({ title: "Eliminar Rutina", text: "¿Deseas eliminar esta rutina?", ok: "Eliminar", danger: true })) {
      await del("routines", d.id);
      toast("Rutina eliminada.");
    }
  },
  reportFor: d => { S.ui.rep = defaultBuilder(d.id); go("reports"); },
  repRange: d => { S.ui.rep.from = addDays(S.ui.rep.to || todayISO(), -(+d.days)); render(); },
  generateReport: async () => {
    const b = S.ui.rep;
    if (!S.clients[b.clientId]) return;
    const id = uid("rep");
    const doc = {
      clientId: b.clientId,
      createdAt: new Date().toISOString(),
      date: todayISO(),
      from: b.from,
      to: b.to,
      sections: clone(b.sections),
      cmpPrev: b.sections.compare ? b.cmpPrev : "",
      cmpCurr: b.sections.compare ? b.cmpCurr : "",
      note: b.sections.notes ? b.note.trim() : "",
      demo: false
    };
    await put("reports", id, doc);
    go("report-view", { reportId: id });
    toast("Informe generado exitosamente.");
  },
  viewReport: d => go("report-view", { reportId: d.id }),
  deleteReport: async d => {
    if (await confirmDialog({ title: "Eliminar Informe", text: "¿Eliminar este informe técnico?", ok: "Eliminar", danger: true })) {
      await del("reports", d.id);
      toast("Informe eliminado.");
      if (S.view.page === "report-view") go("reports");
    }
  },
  openCompetitionDeck: d => { if (d && d.id) S.ui.deckClient = d.id; S.ui.deckSlide = 1; go("competition-deck"); },
  openCompetitionDeckForClient: d => { if (d && d.id) S.ui.deckClient = d.id; S.ui.deckSlide = 1; go("competition-deck"); },
  setSlide: d => { S.ui.deckSlide = +d.num; render(); },
  prevSlide: () => { S.ui.deckSlide = Math.max(1, (S.ui.deckSlide || 1) - 1); render(); },
  nextSlide: () => { S.ui.deckSlide = Math.min(8, (S.ui.deckSlide || 1) + 1); render(); },
  toggleSlideView: () => { S.ui.deckMode = (S.ui.deckMode === "all" ? "single" : "all"); render(); },
  exportDeckPDF: () => exportDeckPDF(),
  exportPDF: () => exportPDF(),
  exportHTML: () => exportHTML(),
  theme: d => {
    const t = d.val || (document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("eleven_theme", t); } catch (_) {}
    render();
  },
  toggleTheme: () => {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    const next = cur === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("eleven_theme", next); } catch (_) {}
    render();
    toast(`Modo ${next === "light" ? "Claro" : "Oscuro (Midnight Navy)"} activado.`);
  },
  openAuthModal: d => openAuthModal(d.tab || "signin"),
  closeAuthModal: () => closeAuthModal(),
  switchAuthTab: d => switchAuthTab(d.tab),
  quickLogin: d => quickLoginTrainer(d.user),
  logoutTrainer: () => logoutTrainer(),
  cfgSavePro: async () => {
    const cfg = clone(S.config);
    ["name", "role", "brand", "tagline", "contact"].forEach(k => cfg.professional[k] = $("#cfg-p-" + k).value.trim());
    await saveConfig(cfg);
    toast("Identificación profesional actualizada.");
  },
  cfgSaveRules: async () => {
    const cfg = clone(S.config);
    for (const k of Object.keys(cfg.rules)) {
      const v = parseNum($("#cfg-r-" + k).value);
      if (v != null && v >= 0) cfg.rules[k] = v;
    }
    await saveConfig(cfg);
    toast("Reglas de seguimiento guardadas.");
  },
  exportJSON: () => {
    const data = JSON.stringify({ app: "eleven-performance-hub", version: 2, exportedAt: new Date().toISOString(), config: S.config, clients: S.clients, records: S.records, routines: S.routines, reports: S.reports }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `eleven_hub_backup_${todayISO()}.json`;
    a.click();
    toast("Copia de seguridad descargada.");
  },
  exportCSV: () => {
    const rows = [["Fecha", "Deportista", "Modulo", "Prueba_O_Sesion", "Parametro", "Valor", "Unidad", "Calculado", "Responsable"]];
    Object.values(S.records).sort((a, b) => a.date < b.date ? -1 : 1).forEach(r => {
      const g = typeDef(r.type).group;
      Object.keys(r.values || {}).forEach(k => {
        const d = metricDef(g, k);
        rows.push([r.date, clientName(r.clientId), typeDef(r.type).label, r.test || r.sessionType || "", d.label, String(r.values[k]).replace(".", ","), d.unit, (r.calc || []).includes(k) ? "Sí" : "No", r.professional || ""]);
      });
    });
    const csv = "\uFEFF" + rows.map(r => r.map(x => `"${String(x).replace(/"/g, '""')}"`).join(";")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `eleven_hub_evaluaciones_${todayISO()}.csv`;
    a.click();
    toast("Archivo CSV generado.");
  },
  clearDatabase: async () => {
    if (!isAdmin()) {
      toast("Acceso denegado: Solo el Administrador General puede vaciar la base de datos.", true);
      return;
    }
    if (await confirmDialog({
      title: "Vaciar Base de Datos",
      text: "¿Deseas borrar todos los deportistas y evaluaciones registradas para realizar pruebas limpias desde cero con tus archivos de Excel?",
      ok: "Sí, Vaciar Base de Datos",
      danger: true
    })) {
      localStorage.removeItem(LS_KEY);
      COLS.forEach(c => S[c] = {});
      persistLocal();
      render();
      toast("Base de datos vaciada. Lista para pruebas limpias con tus archivos Excel.");
    }
  },
  loadDemoData: async () => {
    if (!isAdmin()) {
      toast("Acceso denegado: Solo el Administrador General puede cargar datos demo.", true);
      return;
    }
    const init = buildDemoDatasets();
    COLS.forEach(c => S[c] = init[c] || {});
    persistLocal();
    render();
    toast("Datos de demostración cargados.");
  },
  resetFactory: async () => {
    if (await confirmDialog({ title: "Restablecer Base de Datos", text: "¿Restablecer todos los datos iniciales de Santa Fe y Eleven Performance?", ok: "Restablecer", danger: true })) {
      localStorage.removeItem(LS_KEY);
      const init = buildInitialDatasets();
      COLS.forEach(c => S[c] = init[c] || {});
      S.config = clone(DEFAULT_CONFIG);
      persistLocal();
      render();
      toast("Base de datos restablecida a valores maestros.");
    }
  },
  toggleBentoSwitch: (d, el) => {
    el.classList.toggle("on");
    const name = el.getAttribute("aria-label") || d.sensor || "Sensor";
    toast(el.classList.contains("on") ? `${name}: Transmitiendo en tiempo real` : `${name}: En pausa`);
  },
  // ACCIONES GIMNASIO, MEMBRESÍAS & BOT WHATSAPP
  setGymTab: d => {
    if (d.tab === "bot" && !isAdmin()) {
      toast("El módulo de configuración del Bot y Cuentas de Cobro es exclusivo de Kevin Gaitán (Admin).", true);
      return;
    }
    S.ui.gymTab = d.tab;
    render();
  },
  setGymDateToday: () => { S.ui.gymDate = todayISO(); render(); },
  setGymDateDelta: d => { S.ui.gymDate = addDays(S.ui.gymDate || todayISO(), +d.delta); render(); },
  setGymViewMode: d => { S.ui.gymAgendaView = d.mode; render(); },
  setGymWeekDelta: d => { S.ui.gymDate = addDays(S.ui.gymDate || todayISO(), (+d.delta) * 7); render(); },
  setGymMonthDelta: d => {
    const dt = parseD(S.ui.gymDate || todayISO()) || new Date();
    dt.setMonth(dt.getMonth() + (+d.delta));
    S.ui.gymDate = toISO(dt);
    render();
  },
  setGymBlockFilter: d => { S.ui.gymBlockFilter = d.block; render(); },
  jumpToGymDay: d => { S.ui.gymDate = d.date; S.ui.gymAgendaView = "week"; render(); },
  openGymBookingModal: d => gymBookingModal({ date: d.date, time: d.time }),
  cancelGymBooking: async d => {
    const b = S.gymBookings[d.id];
    if (!b) return;
    if (await confirmDialog({
      title: "Cancelar Turno",
      text: `¿Cancelar el turno de <b>${esc(b.nombre)}</b> a las ${esc(b.time)} del ${esc(b.date)}?<br><br>El cupo quedará libre de inmediato para otros alumnos en la web y en WhatsApp.`,
      ok: "Sí, Cancelar y Liberar Cupo",
      danger: true
    })) {
      try {
        const resp = await fetch(`${getBotBaseUrl()}/api/gym/cancelar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: b.dbId || (String(b.id).startsWith("bot_ent_") ? Number(b.id.replace("bot_ent_", "")) : undefined),
            chat_id: b.chatId,
            phone: b.phone,
            nombre: b.nombre,
            motivo: "Cancelado desde la administración del panel web"
          })
        });
        const resData = await resp.json().catch(() => ({}));
        if (resData && resData.aviso_enviado) {
          toast(`✅ Turno cancelado y mensaje enviado por WhatsApp a ${b.nombre}.`);
        } else {
          toast(`Turno de las ${b.time} cancelado. Cupo liberado.`);
        }
      } catch (_) {
        toast(`Turno cancelado localmente.`);
      }

      await del("gymBookings", d.id);
      trySyncBotFromApi().then(() => render());
    }
  },
  openAdminPaymentModal: d => adminPaymentModal(d && d.id ? S.gymMemberships[d.id] : null),
  exportMembershipsCSV: () => exportMembershipsCSV(),
  setAdminMemStatus: d => { S.ui.adminMemStatus = d.status; render(); },
  enviarCobroBot: async d => {
    const m = S.gymMemberships[d.id];
    if (!m) return;
    const cleanPhone = (m.telefono || "").replace(/\D/g, "");
    if (!cleanPhone) {
      toast("El deportista no tiene número de WhatsApp registrado.", true);
      return;
    }
    const msgCobro = redactarMensajeAdminCobro(m);

    const confirmar = await confirmDialog({
      title: "Confirmar Envío Oficial por Bot",
      text: `¿Deseas que el <b>Bot de Eleven Performance</b> envíe el recordatorio de pago directamente al WhatsApp de <b>${esc(m.nombre)}</b> (+57 ${esc(cleanPhone)})?<br><br>
      <div style="padding:12px;background:var(--surface-hover);border-radius:8px;border:1px solid var(--line);font-size:12px;line-height:1.5;color:var(--fg);max-height:160px;overflow-y:auto;white-space:pre-wrap;text-align:left;font-family:sans-serif">
${esc(msgCobro)}
      </div>`,
      ok: "🤖 Enviar Mensaje por Bot",
      danger: false
    });

    if (!confirmar) return;

    toast(`⏳ Enviando mensaje de cobro a ${m.nombre} a través del Bot...`);
    try {
      const resp = await fetch(`${getBotBaseUrl()}/api/mensajes/enviar-directo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefono: cleanPhone,
          texto: msgCobro,
          nombre: m.nombre
        })
      });

      const resData = await resp.json();
      if (!resp.ok) throw new Error(resData.error || "Fallo en el servidor del Bot");

      toast(`✅ ¡Mensaje de cobro enviado por el Bot a ${m.nombre}!`);

      // Agregar al feed de mensajes en memoria si está abierto el chat
      const chatId = (cleanPhone.length === 10 ? "57" + cleanPhone : cleanPhone) + "@c.us";
      if (!S.ui.botMessages) S.ui.botMessages = {};
      if (!S.ui.botMessages[chatId]) S.ui.botMessages[chatId] = [];
      S.ui.botMessages[chatId].push({
        id: uid("msg"),
        autor: "bot",
        texto: msgCobro,
        fecha: Date.now()
      });
      render();
    } catch (err) {
      console.error("Error enviando por el bot:", err);
      if (err.message && err.message.toLowerCase().includes("conectado")) {
        toast("⚠️ El Bot de WhatsApp aún no está vinculado. Ve a la sección 'Chats & WhatsApp' para escanear el código QR o vincular por código.", true);
      } else {
        toast(`⚠️ No se pudo enviar por el bot: ${err.message}`, true);
      }
    }
  },
  refreshGymReport: () => {
    fetchGymReporteMensual(S.ui.gymReportMonth);
    toast("Actualizando reporte mensual...");
  },
  reactivarAlumnoWhatsApp: async d => {
    const { telefono, nombre, mensaje } = d;
    if (!telefono) {
      toast("El alumno no tiene teléfono registrado.", true);
      return;
    }
    const cleanPhone = String(telefono).replace(/\D/g, "");
    const msg = mensaje || `Hola *${nombre}*, ¡te extrañamos en Eleven Performance! 💪⚽ Notamos que llevas unos días sin venir a entrenar. ¿Cuadramos tu próximo turno esta semana? Escríbenos y con gusto te ayudamos 🙌`;

    const confirmar = await confirmDialog({
      title: "Reactivar Alumno por WhatsApp",
      text: `¿Deseas enviar el mensaje de reactivación al WhatsApp de <b>${esc(nombre)}</b> (+57 ${esc(cleanPhone)}) a través del Bot?<br><br>
      <div style="padding:12px;background:var(--surface2);border-radius:8px;border:1px solid var(--line);font-size:12px;color:var(--fg);white-space:pre-wrap;text-align:left">
${esc(msg)}
      </div>`,
      ok: "🤖 Enviar por WhatsApp",
      danger: false
    });

    if (!confirmar) return;

    try {
      toast(`⏳ Enviando mensaje de reactivación a ${nombre}…`);
      const resp = await fetch(`${getBotBaseUrl()}/api/mensajes/enviar-directo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefono: cleanPhone,
          texto: msg,
          nombre
        })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Error en el servidor");
      toast(`✅ ¡Mensaje de reactivación enviado con éxito a ${nombre}!`);
    } catch (e) {
      toast(`⚠️ Error enviando mensaje: ${e.message}`, true);
    }
  },
  openGymMembershipModal: () => gymMembershipModal(null),
  editGymMembership: d => gymMembershipModal(S.gymMemberships[d.id]),
  deleteGymMembership: async d => {
    if (!isAdmin()) {
      toast("Permiso denegado: Solo el Administrador (Kevin Gaitán) puede eliminar membresías.", true);
      return;
    }
    const m = S.gymMemberships[d.id];
    if (!m) return;
    if (await confirmDialog({
      title: "Eliminar Membresía",
      text: `¿Deseas eliminar la membresía de <b>${esc(m.nombre)}</b>?`,
      ok: "Eliminar",
      danger: true
    })) {
      await del("gymMemberships", d.id);
      toast("Membresía eliminada.");
    }
  },
  renewGymMembership: async d => {
    const m = S.gymMemberships[d.id];
    if (!m) return;
    const baseDate = parseD(m.fechaFin) > new Date() ? m.fechaFin : todayISO();
    const nuevaFecha = addDays(baseDate, 30);
    m.fechaFin = nuevaFecha;
    m.updatedAt = new Date().toISOString();
    await put("gymMemberships", m.id, m);
    toast(`Membresía de ${m.nombre} renovada hasta ${fmtDateS(nuevaFecha)} (+30 días).`);
  },
  setGymFilterStatus: d => { S.ui.gymFilterStatus = d.status; render(); },
  saveGymBotConfig: async () => {
    if (!isAdmin()) {
      toast("Permiso denegado: Solo el Administrador (Kevin Gaitán) puede guardar cuentas oficiales y configuración del bot.", true);
      return;
    }
    const cfg = clone(S.config);
    cfg.gym = cfg.gym || {};
    cfg.gym.titular = $("#gym-titular").value.trim();
    cfg.gym.nequi = $("#gym-nequi").value.trim();
    cfg.gym.daviplata = $("#gym-daviplata").value.trim();
    cfg.gym.bancolombia = $("#gym-banco").value.trim();
    cfg.gym.slotsPerHour = parseNum($("#gym-slots").value) || 8;
    cfg.gym.botUrl = $("#gym-boturl").value.trim() || "http://localhost:3000";
    await saveConfig(cfg);
    toast("Cuentas oficiales de cobro y parámetros del bot actualizados.");
  },
  testGymBotPing: async () => {
    const botUrl = (S.config.gym && S.config.gym.botUrl) || "http://localhost:3000";
    toast("Comprobando conexión con Bot WhatsApp en " + botUrl + "...");
    try {
      const resp = await fetch(`${botUrl}/api/gym/disponibilidad`, { signal: AbortSignal.timeout(3000) });
      if (resp.ok) {
        toast("🟢 ¡Bot WhatsApp Conectado y Operativo!");
      } else {
        toast(`⚠️ El servidor respondió con estado ${resp.status}`, true);
      }
    } catch (e) {
      toast("ℹ️ Bot en espera (Para iniciarlo: ejecuta INICIAR-SISTEMA.command)");
    }
  },
  loadGymDemoData: async () => {
    const demoMems = [
      { id: "gm-zapata", nombre: "Alexis Zapata", telefono: "3104567890", documento: "1037645892", planNombre: "Plan Pro Fútbol Alto Rendimiento", valor: 280000, fechaPago: addDays(todayISO(), -5), metodoPago: "Nequi", referencia: "NEQ-839201", fechaInicio: addDays(todayISO(), -5), fechaFin: addDays(todayISO(), 25) },
      { id: "gm-moreno", nombre: "Victor Moreno", telefono: "3118902345", documento: "1020491823", planNombre: "Mensualidad Completa Gimnasio Libre", valor: 120000, fechaPago: addDays(todayISO(), -25), metodoPago: "Daviplata", referencia: "DAV-491029", fechaInicio: addDays(todayISO(), -25), fechaFin: addDays(todayISO(), 5) },
      { id: "gm-torres", nombre: "Daniel Torres", telefono: "3127819034", documento: "1019283746", planNombre: "Entrenamiento Funcional Grupal", valor: 95000, fechaPago: addDays(todayISO(), -35), metodoPago: "Efectivo", referencia: "REC-00124", fechaInicio: addDays(todayISO(), -35), fechaFin: addDays(todayISO(), -5) },
      { id: "gm-olivera", nombre: "Emanuel Olivera", telefono: "3156789012", documento: "94827103", planNombre: "Plan Trimestral All-Access GPS", valor: 320000, fechaPago: addDays(todayISO(), -10), metodoPago: "Bancolombia", referencia: "TRA-847291", fechaInicio: addDays(todayISO(), -10), fechaFin: addDays(todayISO(), 80) },
      { id: "gm-mafla", nombre: "Cristian Mafla", telefono: "3139876543", documento: "1015849302", planNombre: "Plan Pro Monitoreo & Fuerza", valor: 250000, fechaPago: addDays(todayISO(), -28), metodoPago: "Tarjeta", referencia: "TAR-90184", fechaInicio: addDays(todayISO(), -28), fechaFin: addDays(todayISO(), 2) }
    ];
    for (const m of demoMems) {
      await put("gymMemberships", m.id, m);
    }
    const demoBookings = [
      { id: "gb-1", nombre: "Alexis Zapata", phone: "3104567890", date: todayISO(), time: "07:00", tipo: "Personalizado 1 a 1", status: "confirmado", source: "bot" },
      { id: "gb-2", nombre: "Victor Moreno", phone: "3118902345", date: todayISO(), time: "07:00", tipo: "Fuerza / Gym", status: "confirmado", source: "manual" },
      { id: "gb-3", nombre: "Daniel Torres", phone: "3127819034", date: todayISO(), time: "08:00", tipo: "Funcional Grupal", status: "confirmado", source: "bot" },
      { id: "gb-4", nombre: "Emanuel Olivera", phone: "3156789012", date: todayISO(), time: "09:00", tipo: "Fuerza / Gym", status: "confirmado", source: "manual" }
    ];
    for (const b of demoBookings) {
      await put("gymBookings", b.id, b);
    }
    toast("Alumnos, pagos y turnos de demostración cargados.");
  },
  // ACCIONES CHATS & WHATSAPP HUB (CONTROL EN VIVO)
  setWaTab: d => { S.ui.waActiveTab = d.tab; render(); },
  selectChat: async d => {
    S.ui.activeChatId = d.id;
    await fetchChatMessages(d.id);
    render();
    setTimeout(() => {
      const feed = document.getElementById("wa-feed-container");
      if (feed) feed.scrollTop = feed.scrollHeight;
      const inp = document.getElementById("wa-chat-reply-input");
      if (inp) inp.focus();
    }, 40);
  },
  setChatFilterVal: d => { S.ui.chatFilter = d.val; render(); },
  toggleChatBotMode: async d => {
    const chats = S.ui.botChats || [];
    const chat = chats.find(c => c.id === d.id);
    if (!chat) return;
    const actualActivo = chat.bot_activo !== undefined ? Boolean(chat.bot_activo) : (chat.bot_responde !== 0 && chat.bot_responde !== false);
    const nuevoEstado = !actualActivo;
    chat.bot_activo = nuevoEstado ? 1 : 0;
    chat.bot_responde = nuevoEstado ? 1 : 0;

    try {
      await fetch(`${getBotBaseUrl()}/api/chats/${encodeURIComponent(d.id)}/bot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activo: nuevoEstado })
      });
    } catch (e) {}

    toast(nuevoEstado ? "🤖 Bot activado en este chat" : "✋ Bot pausado (Atención humana activa)");
    render();
  },
  insertWaQuickReply: d => {
    const input = document.getElementById("wa-chat-reply-input");
    if (!input) return;
    const templates = {
      planes: "¡Hola! Con gusto te comparto nuestros planes en Eleven Performance:\n🏋️‍♂️ *Plan Mensual Ilimitado (Fuerza & Gym):* $120.000 COP\n🔥 *Plan Funcional & Fuerza Grupal:* $95.000 COP\n⚡ *Plan Personalizado 1 a 1:* $280.000 COP\n🏆 *Plan Trimestral Pro:* $320.000 COP\n\n¿Cuál de ellos se adapta mejor a tu meta?",
      pagos: "¡Hola! Aquí tienes los canales oficiales de pago de Eleven Performance:\n📲 *Nequi:* 3206051319\n📱 *Daviplata:* 3206051319\n🏦 *Bancolombia:* Ahorros 245-891234-01\n👤 *Titular:* Eleven Performance S.A.S.\n\nUna vez realizada la transferencia, envíanos el comprobante por este chat para confirmar tu membresía. 💪",
      horarios: "¡Hola! Nuestros horarios de entrenamiento son de lunes a viernes de 6:00 a.m. a 9:00 p.m. y sábados de 7:00 a.m. a 2:00 p.m. Manejamos un aforo máximo de 8 cupos por hora para garantizar un trabajo técnico de alta calidad.",
      cupo: "¡Listo! Tu turno de entrenamiento ha sido confirmado en el sistema. Recuerda llegar 5 minutos antes para el calentamiento guiado. ¡A darlo todo! 💪⚽"
    };
    const tpl = templates[d.tipo] || "";
    if (tpl) {
      input.value = tpl;
      input.focus();
    }
  },
  sendAdvisorLiveReply: async (d) => {
    const input = document.getElementById("wa-chat-reply-input");
    if (!input) return;
    const texto = input.value.trim();
    if (!texto) return;

    // Limpiar input inmediatamente para una experiencia fluida
    input.value = "";

    const activeId = d.id || S.ui.activeChatId;
    S.ui.botMessages = S.ui.botMessages || {};
    const chatMsgs = S.ui.botMessages[activeId] || [];

    const adminName = (S.user && S.user.name) || (S.config?.professional?.name) || "Kevin Gaitán (Admin)";
    const newMsg = {
      id: "tmp_" + Date.now(),
      chat_id: activeId,
      autor: `asesor:${adminName}`,
      texto,
      fecha: Date.now()
    };
    chatMsgs.push(newMsg);
    S.ui.botMessages[activeId] = chatMsgs;

    // Actualizar previsualización en la lista de chats
    const chat = (S.ui.botChats || []).find(c => c.id === activeId);
    if (chat) {
      chat.ultimo_texto = texto;
      chat.ultimo_autor = newMsg.autor;
      chat.ultimo_mensaje = Date.now();
      chat.bot_activo = 0;
      chat.bot_responde = 0;
    }

    // Actualización visual inmediata en el DOM sin recargar la página completa
    updateFeedMessagesDOM(chatMsgs, true);
    updateSidebarChatsDOM();

    try {
      const resp = await fetch(`${getBotBaseUrl()}/api/chats/${encodeURIComponent(activeId)}/enviar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto })
      });
      if (resp.ok) {
        toast("Mensaje enviado al WhatsApp del cliente.");
      } else {
        toast("Mensaje registrado en el historial.");
      }
    } catch (e) {
      toast("Mensaje guardado localmente en el panel.");
    }

    // Sincronizar en segundo plano para confirmar con la base de datos
    setTimeout(() => livePollChatsAndMessages(), 350);
  },
    deleteChatConversation: async d => {
    if (await confirmDialog({
      title: "Eliminar Chat",
      text: "¿Eliminar esta conversación del panel y reiniciar el historial del bot? (No borra mensajes en el celular)",
      ok: "Eliminar Chat",
      danger: true
    })) {
      try {
        const resp = await fetch(`${getBotBaseUrl()}/api/chats/${encodeURIComponent(d.id)}`, { method: "DELETE" });
        if (!resp.ok) {
          const errData = await resp.json().catch(() => ({}));
          console.error("Fallo al eliminar chat:", errData);
        }
      } catch (e) {
        console.error("Error de red al eliminar chat:", e);
      }
      S.ui.botChats = (S.ui.botChats || []).filter(c => c.id !== d.id);
      S.ui.activeChatId = S.ui.botChats[0] ? S.ui.botChats[0].id : null;
      if (S.ui.botMessages) delete S.ui.botMessages[d.id];
      toast("Conversación eliminada.");
      render();
      setTimeout(async () => {
        try {
          const res = await fetch(`${getBotBaseUrl()}/api/chats`);
          if (res.ok) {
            S.ui.botChats = await res.json();
            if (!S.ui.activeChatId || !S.ui.botChats.some(c => c.id === S.ui.activeChatId)) {
              S.ui.activeChatId = S.ui.botChats[0] ? S.ui.botChats[0].id : null;
            }
            render();
          }
        } catch (_) {}
      }, 400);
    }
  },
  refreshBotLive: async () => {
    toast("Sincronizando con WhatsApp...");
    try {
      await trySyncBotFromApi();
      render();
      toast("Sincronización completa con el bot.");
    } catch (e) {
      toast("Error al sincronizar con el bot.");
    }
  },
  reconnectBotSession: async () => {
    if (await confirmDialog({
      title: "Reconectar WhatsApp",
      text: "¿Deseas reiniciar la conexión del bot? Tardará unos 15 segundos.",
      ok: "Reconectar"
    })) {
      try {
        await fetch(`${getBotBaseUrl()}/api/whatsapp/reconectar`, { method: "POST" });
        toast("Reconectando sesión de WhatsApp...");
      } catch (e) {
        toast("No se pudo contactar el bot local.", true);
      }
    }
  },
  requestPairingCode: async () => {
    const input = $("#input-pairing-phone");
    const num = input ? input.value.trim().replace(/\D/g, "") : "";
    if (!num || num.length < 10) {
      toast("Ingresa un número válido con indicativo (ej: 573001234567)", true);
      return;
    }
    toast(`Solicitando código de vinculación para +${num}...`);
    try {
      const resp = await fetch(`${getBotBaseUrl()}/api/whatsapp/codigo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numero: num })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "No se pudo generar código");
      toast("✅ Código generado con éxito: " + (data.codigo || ""));
      await trySyncBotFromApi();
      render();
    } catch (e) {
      toast("⚠️ " + e.message, true);
    }
  },
  unlinkBotSession: async () => {
    if (await confirmDialog({
      title: "Desvincular WhatsApp",
      text: "¿Cerrar sesión actual de WhatsApp? El bot se reiniciará y mostrará un nuevo código QR limpio para vincular.",
      ok: "Cerrar Sesión",
      danger: true
    })) {
      try {
        await fetch(`${getBotBaseUrl()}/api/whatsapp/desvincular`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clave: "admin" })
        });
        toast("Sesión cerrada. Esperando nuevo código QR...");
        setTimeout(async () => {
          await trySyncBotFromApi();
          render();
        }, 2500);
      } catch (e) {
        toast("No se pudo desvincular.", true);
      }
    }
  },
  saveBotEndpoint: async () => {
    const val = $("#cfg-bot-endpoint")?.value.trim() || "http://localhost:7077";
    S.config.gym = S.config.gym || {};
    S.config.gym.botUrl = val;
    await saveConfig(S.config);
    toast("URL del bot actualizada a: " + val);
    await trySyncBotFromApi();
    render();
  },
  saveBotNumbers: async () => {
    if (!isAdmin()) {
      toast("Permiso denegado: Solo el Administrador (Kevin Gaitán) puede modificar las líneas de WhatsApp y cuentas.", true);
      return;
    }
    const numBot = $("#cfg-num-bot")?.value.trim();
    const numAsesor = $("#cfg-num-asesor")?.value.trim();
    const numPagos = $("#cfg-num-pagos")?.value.trim();
    const bancolombia = $("#cfg-cuenta-bancolombia")?.value.trim();
    const titular = $("#cfg-titular-cuenta")?.value.trim();
    const endpoint = $("#cfg-bot-endpoint")?.value.trim();

    if (endpoint) {
      S.config.gym = S.config.gym || {};
      S.config.gym.botUrl = endpoint;
    }

    toast("Guardando configuración de números en el sistema...");
    try {
      const resp = await fetch(`${getBotBaseUrl()}/api/configuracion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numeroBot: numBot,
          numeroAsesor: numAsesor,
          numeroPagos: numPagos,
          bancolombia,
          titular
        })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Error al guardar configuración");

      if (S.config && S.config.gym) {
        if (numPagos) S.config.gym.nequi = numPagos;
        if (bancolombia) S.config.gym.bancolombia = bancolombia;
        if (titular) S.config.gym.titular = titular;
      }
      await saveConfig(S.config);

      toast("✅ " + (data.mensaje || "Números guardados y sincronizados exitosamente"));
      await trySyncBotFromApi();
      render();
    } catch (e) {
      toast("⚠️ " + e.message, true);
    }
  },
  toggleNavGroup: (d, el) => {
    const gid = d.group;
    S.ui.openNavGroups = S.ui.openNavGroups || {};
    const currentState = isGroupOpen({ id: gid, items: [] });
    S.ui.openNavGroups[gid] = !currentState;
    buildNav();
  },
  toggleNavPin: () => {
    const side = $("#side-nav");
    if (!side) return;
    const isPinned = side.classList.toggle("pinned");
    localStorage.setItem("eleven_nav_pinned", isPinned ? "1" : "0");
    toast(isPinned ? "Menú lateral fijado (abierto)" : "Menú lateral dinámico (se abre al acercar el mouse)");
  }
};

const CHANGE_ACTIONS = {
  cmpSet: (d, el) => {
    const st = S.ui.cmp[d.id] = S.ui.cmp[d.id] || {};
    st[d.k] = el.value;
    if (d.k === "type" || d.k === "test") { st.prev = st.curr = ""; }
    render();
  },
  setGymDateVal: (d, el) => {
    S.ui.gymDate = el.value || todayISO();
    render();
  },
  setGymSearch: (d, el) => {
    S.ui.gymSearch = el.value || "";
    render();
  },
  setChatSearchVal: (d, el) => {
    S.ui.chatSearch = el.value || "";
    render();
  },
  setAdminMemSearch: (d, el) => {
    S.ui.adminMemSearch = el.value || "";
    render();
  },
  setAdminMemMethod: (d, el) => {
    S.ui.adminMemMethod = el.value || "all";
    render();
  },
  setAdminMemSort: (d, el) => {
    S.ui.adminMemSort = el.value || "urgente";
    render();
  }
};

function bindEvents() {
  document.addEventListener("click", e => {
    if (e.target.closest("#modal-root")) return;
    const el = e.target.closest("[data-act]");
    if (!el) return;
    if (el.tagName === "A") e.preventDefault();
    const fn = ACTIONS[el.dataset.act];
    if (fn) {
      e.stopPropagation();
      fn(el.dataset, el);
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && $("#modal-root").innerHTML) {
      closeModal();
    }
  });

  let t;
  const onUi = e => {
    const el = e.target;
    if (el.dataset.ui) {
      setPath(S.ui, el.dataset.ui, el.value);
      if (el.tagName === "TEXTAREA") return;
      clearTimeout(t);
      t = setTimeout(render, el.type === "text" || el.type === "search" ? 120 : 0);
    } else if (el.dataset.uiCheck && e.type === "change") {
      setPath(S.ui, el.dataset.uiCheck, el.checked);
      render();
    } else if (el.dataset.actChange && e.type === "change" && !el.closest("#modal-root")) {
      const f = CHANGE_ACTIONS[el.dataset.actChange];
      if (f) f(el.dataset, el);
    } else if (el.id === "imp-json" && e.type === "change" && el.files[0]) {
      importJSON(el.files[0]);
      el.value = "";
    }
  };

  $("#main").addEventListener("input", e => {
    if (e.target.dataset.ui && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) onUi(e);
    if (e.target.dataset.actChange === "setAdminMemSearch") {
      S.ui.adminMemSearch = e.target.value || "";
      clearTimeout(t);
      t = setTimeout(render, 120);
    }
  });
  $("#main").addEventListener("change", e => {
    if (e.target.dataset.ui || e.target.dataset.uiCheck || e.target.dataset.actChange) onUi(e);
  });
}

async function importJSON(file) {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!data.clients || !data.records) {
      toast("Archivo de respaldo inválido.", true);
      return;
    }
    COLS.forEach(c => S[c] = data[c] || S[c]);
    if (data.config) S.config = Object.assign(clone(DEFAULT_CONFIG), data.config);
    persistLocal();
    render();
    toast("Copia de seguridad restaurada correctamente.");
  } catch (err) {
    toast("Error al leer el archivo JSON.", true);
  }
}

function buildNav() {
  const currentPage = S.view ? S.view.page : "dashboard";
  
  // 1. Sidebar de escritorio en #side-nav .nav (agrupado por secciones y acordeón estilo delta.ai)
  const desktopSideNav = $("#side-nav .nav") || $(".side .nav") || $("aside.side nav");
  if (desktopSideNav) {
    const navGroups = getNavGroups();
    desktopSideNav.innerHTML = navGroups.map(sec => {
      if (sec.type === "item") {
        const active = isItemActive(sec.page, currentPage);
        return `
          <div class="nav-section-item">
            <button class="nav-item-btn ${active ? "active" : ""}" data-act="go" data-page="${sec.page}" title="${esc(sec.title)}" aria-current="${active ? "page" : "false"}">
              <span class="nav-icon">${icon(sec.icon)}</span>
              <span class="nav-label">${esc(sec.title)}</span>
            </button>
          </div>
        `;
      }

      const open = isGroupOpen(sec);
      const hasActive = sec.items && sec.items.some(it => isItemActive(it.page, currentPage));

      return `
        <div class="nav-group ${open ? "open" : ""} ${hasActive ? "has-active" : ""}" data-group="${sec.id}">
          <button class="nav-group-header ${hasActive ? "active-parent" : ""}" data-act="toggleNavGroup" data-group="${sec.id}" title="${esc(sec.title)}">
            <span class="nav-icon">${icon(sec.icon)}</span>
            <span class="nav-label">${esc(sec.title)}</span>
            <span class="nav-chevron">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </span>
          </button>
          <div class="nav-group-items">
            ${sec.items.map(sub => {
              const active = isItemActive(sub.page, currentPage);
              return `
                <button class="nav-sub-item ${active ? "active" : ""}" data-act="go" data-page="${sub.page}" title="${esc(sub.title)}" aria-current="${active ? "page" : "false"}">
                  <span class="nav-sub-dot">•</span>
                  <span class="nav-sub-label">${esc(sub.title)}</span>
                </button>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }).join("");
  }

  // 2. Perfil del Entrenador y Configuración en el pie del Sidebar
  const sideBottom = $("#side-nav .side-bottom") || $(".side .side-bottom") || $("aside.side .side-bottom");
  if (sideBottom) {
    const isSettings = currentPage === "config";
    const u = S.user || DEFAULT_TRAINERS[0];
    const initials = u.avatar || (u.name ? u.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() : "EP");
    sideBottom.innerHTML = `
      <div class="side-user-card" title="Sesión activa: ${esc(u.name)} (${esc(u.role)})">
        <div class="side-user-avatar">${esc(initials)}</div>
        <div class="side-user-info">
          <div class="side-user-name">${esc(u.name)}</div>
          <div class="side-user-role">${esc(u.role)}</div>
          <button type="button" class="side-logout-action" data-act="logoutTrainer" title="Cerrar sesión actual">
            Cerrar Sesión
          </button>
        </div>
      </div>
      <button class="nav-item-btn nav-settings ${isSettings ? "active" : ""}" data-act="go" data-page="config" title="Configuración" aria-current="${isSettings ? "page" : "false"}">
        <span class="nav-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>
          </svg>
        </span>
        <span class="nav-label">Configuración</span>
      </button>
    `;
  }

  // 3. Topbar móvil
  const mobileNav = $(".topbar .nav");
  if (mobileNav) {
    const flatItems = [];
    getNavGroups().forEach(g => {
      if (g.type === "item") flatItems.push(g);
      else if (g.items) g.items.forEach(it => flatItems.push(it));
    });
    flatItems.push(NAV_BOTTOM_ITEM);

    mobileNav.innerHTML = flatItems.map(it => {
      const active = isItemActive(it.page, currentPage);
      return `
        <button class="mobile-nav-btn ${active ? "active" : ""}" data-act="go" data-page="${it.page}" title="${esc(it.title)}">
          ${icon(it.icon)}
          <span>${esc(it.title)}</span>
        </button>
      `;
    }).join("");
  }
}

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", () => {
  initStore();
  initTrainers();
  const savedTheme = localStorage.getItem("eleven_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  S.view = { page: "dashboard" };
  S.ui.openNavGroups = {};
  
  // Restaurar estado pinned si el usuario lo guardó
  if (localStorage.getItem("eleven_nav_pinned") === "1") {
    $("#side-nav")?.classList.add("pinned");
  }

  buildNav();
  bindEvents();
  render();

  // Si no está autenticado, abrir inmediatamente el login obligatorio
  if (!isAuthenticated()) {
    openAuthModal("signin", { force: true });
  } else {
    trySyncBotFromApi();
  }
});
