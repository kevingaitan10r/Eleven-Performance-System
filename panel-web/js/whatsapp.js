/* ==========================================================================
   12A. VISTA: CHATS & WHATSAPP HUB (CONTROL EN VIVO ELEVEN PERFORMANCE)
   ========================================================================== */
function getBotBaseUrl() {
  const stored = (typeof localStorage !== "undefined" && localStorage.getItem("eleven_bot_url")) || "";
  if (stored && stored.trim()) return stored.trim().replace(/\/$/, "");
  const configUrl = S.config && S.config.gym && S.config.gym.botUrl;
  if (configUrl && configUrl.trim()) return configUrl.trim().replace(/\/$/, "");
  if (typeof window !== "undefined" && window.location && window.location.origin) {
    if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1" && !window.location.hostname.endsWith(".vercel.app")) {
      return window.location.origin;
    }
  }
  return "https://shell-suggestions-similar-labour.trycloudflare.com";
}

function fmtTimeChat(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return pad(d.getHours()) + ":" + pad(d.getMinutes());
}

function getDefaultDemoChats() {
  const now = Date.now();
  return [
    {
      id: "573104567890@c.us",
      nombre: "Alexis Zapata",
      telefono: "573104567890",
      nombre_cliente: "Alexis Zapata",
      ultimo_mensaje: now - 1000 * 60 * 12,
      ultimo_texto: "¡Listo Alexis! Turno confirmado para mañana a las 07:00 a.m. Te quedan 7 cupos libres en la sala. 💪",
      ultimo_autor: "bot",
      bot_responde: 1,
      estado: "interesado",
      mensajes: [
        { id: 1, autor: "cliente", texto: "Hola, buenos días! Quiero saber cuántos cupos hay mañana a las 7 am?", fecha: now - 1000 * 60 * 18 },
        { id: 2, autor: "bot", texto: "¡Hola Alexis! 👋 Para mañana a las 07:00 a.m. tenemos 7 cupos libres disponibles de 8. ¿Deseas que reserve tu turno?", fecha: now - 1000 * 60 * 16 },
        { id: 3, autor: "cliente", texto: "Sí por favor, agéndame en Personalizado 1 a 1", fecha: now - 1000 * 60 * 14 },
        { id: 4, autor: "bot", texto: "¡Listo Alexis! Turno confirmado para mañana a las 07:00 a.m. Te quedan 7 cupos libres en la sala. 💪 ¡Nos vemos en el entrenamiento!", fecha: now - 1000 * 60 * 12 }
      ]
    },
    {
      id: "573118902345@c.us",
      nombre: "Victor Moreno",
      telefono: "573118902345",
      nombre_cliente: "Victor Moreno",
      ultimo_mensaje: now - 1000 * 60 * 45,
      ultimo_texto: "Tu plan Mensualidad Completa vence el 28 oct 2026 ($120.000 COP). Recuerda que puedes transferir a Nequi o Bancolombia.",
      ultimo_autor: "bot",
      bot_responde: 1,
      estado: "cliente",
      mensajes: [
        { id: 1, autor: "cliente", texto: "Buenas tardes, me recuerdan cuándo se me vence la mensualidad?", fecha: now - 1000 * 60 * 48 },
        { id: 2, autor: "bot", texto: "Hola Victor! 👋 Tu plan Mensualidad Completa vence el 28 oct 2026 ($120.000 COP). Recuerda que puedes transferir a Nequi o Bancolombia.", fecha: now - 1000 * 60 * 45 }
      ]
    },
    {
      id: "573127819034@c.us",
      nombre: "Daniel Torres",
      telefono: "573127819034",
      nombre_cliente: "Daniel Torres",
      ultimo_mensaje: now - 1000 * 60 * 85,
      ultimo_texto: "Hola Daniel, ya tomé tu chat. Cuéntame con qué te puedo colaborar hoy? Vamos a revisar esa articulación antes de cargar peso.",
      ultimo_autor: "asesor:Juan Diego Castro",
      bot_responde: 0,
      estado: "asesor",
      mensajes: [
        { id: 1, autor: "cliente", texto: "Hola, tengo una molestia en la rodilla y necesito consultar con el profe Juan Diego antes de agendar", fecha: now - 1000 * 60 * 95 },
        { id: 2, autor: "bot", texto: "Comprendo Daniel. Pausando el asistente virtual para que el preparador físico revise tu caso en breve. ✋", fecha: now - 1000 * 60 * 90 },
        { id: 3, autor: "asesor:Juan Diego Castro", texto: "Hola Daniel, ya tomé tu chat. Cuéntame con qué te puedo colaborar hoy? Vamos a revisar esa articulación antes de cargar peso.", fecha: now - 1000 * 60 * 85 }
      ]
    },
    {
      id: "573156789012@c.us",
      nombre: "Emanuel Olivera",
      telefono: "573156789012",
      nombre_cliente: "Emanuel Olivera",
      ultimo_mensaje: now - 1000 * 60 * 190,
      ultimo_texto: "Tu turno de las 08:00 a.m. ha sido cancelado con éxito y el cupo fue liberado. Esperamos verte pronto!",
      ultimo_autor: "bot",
      bot_responde: 1,
      estado: "cliente",
      mensajes: [
        { id: 1, autor: "cliente", texto: "Profe, se me presentó un inconveniente y no alcanzo a llegar a las 8 am hoy", fecha: now - 1000 * 60 * 195 },
        { id: 2, autor: "bot", texto: "Entendido Emanuel. Tu turno de las 08:00 a.m. ha sido cancelado con éxito y el cupo fue liberado. Esperamos verte pronto!", fecha: now - 1000 * 60 * 190 }
      ]
    }
  ];
}

// ==========================================
// CONTROL DE WHATSAPP EN TIEMPO REAL (ELEVEN PERFORMANCE)
// ==========================================

function fmtWaText(str) {
  if (!str) return "";
  let s = esc(str);
  // Negrita *texto*
  s = s.replace(/\*([^*\n]+)\*/g, "<b>$1</b>");
  // Cursiva _texto_
  s = s.replace(/_([^_\n]+)_/g, "<i>$1</i>");
  // Tachado ~texto~
  s = s.replace(/~([^~\n]+)~/g, "<del>$1</del>");
  // Bloques de código
  s = s.replace(/```([^`]+)```/g, "<pre style='background:rgba(0,0,0,0.25);padding:4px;border-radius:4px'><code>$1</code></pre>");
  // Enlaces web
  s = s.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:#53BDEB;text-decoration:underline">$1</a>');
  return s;
}

async function fetchChatMessages(chatId) {
  if (!chatId) return [];
  S.ui.botMessages = S.ui.botMessages || {};
  try {
    const res = await fetch(`${getBotBaseUrl()}/api/chats/${encodeURIComponent(chatId)}/mensajes`, { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const msgs = await res.json();
      if (Array.isArray(msgs)) {
        S.ui.botMessages[chatId] = msgs;
        return msgs;
      }
    }
  } catch (e) {}
  return S.ui.botMessages[chatId] || [];
}

function renderFeedMessagesHTML(messages) {
  if (!messages || messages.length === 0) {
    return `
      <div style="margin:auto;text-align:center;color:var(--muted);padding:40px 20px">
        <div style="font-size:42px;margin-bottom:8px">💬</div>
        <b style="color:var(--fg);font-size:15px">Conversación en Vivo</b>
        <p style="font-size:13px;max-width:320px;margin:6px auto 0 auto">
          No hay mensajes previos en este chat. Escribe un mensaje abajo para comunicarte con el cliente por WhatsApp.
        </p>
      </div>
    `;
  }
  return messages.map(m => {
    const isClient = m.autor === "cliente";
    const isBot = m.autor === "bot";
    const isAdvisor = !isClient && !isBot;
    const tipo = isClient ? "cliente" : (isBot ? "bot" : "asesor");
    const hora = m.fecha ? fmtTimeChat(m.fecha) : "";
    const advisorName = isAdvisor ? (m.autor.replace(/^asesor:/, "") || "Asesor") : "";
    const senderBadge = isBot ? "🤖 Eleven Bot" : (isAdvisor ? `👤 ${esc(advisorName)}` : "");

    let contentHTML = fmtWaText(m.texto);
    if ((m.texto || "").startsWith("📊")) {
      contentHTML = `<div class="wa-interactive-badge">📊 Encuesta interactiva enviada</div>${contentHTML}`;
    } else if ((m.texto || "").includes("[nota de voz")) {
      contentHTML = `<div class="wa-interactive-badge" style="background:rgba(83,189,235,0.18);color:#53BDEB">🎙️ Nota de voz (WhatsApp)</div>${contentHTML}`;
    } else if ((m.texto || "").includes("[Se envió la cotización en PDF]")) {
      contentHTML = `<div class="wa-interactive-badge" style="background:rgba(214,166,78,0.18);color:var(--accent)">📄 Documento PDF enviado</div>${contentHTML}`;
    }

    return `
      <div class="wa-msg ${tipo}" data-msg-id="${esc(m.id || "")}">
        ${senderBadge ? `<div class="wa-msg-sender">${senderBadge}</div>` : ""}
        <div class="wa-msg-text">${contentHTML}</div>
        <div class="wa-msg-meta">
          <span>${hora}</span>
          ${!isClient ? `<svg width="15" height="15" viewBox="0 0 16 16" fill="#53BDEB"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.063-.51z"/></svg>` : ""}
        </div>
      </div>
    `;
  }).join("");
}

function renderChatListItemsHTML(chats, activeId, filter = "all", q = "") {
  filter = filter || S.ui.chatFilter || "all";
  q = (q !== undefined ? q : (S.ui.chatSearch || "")).toLowerCase().trim();

  const filteredChats = (chats || []).filter(c => {
    if (q) {
      const match = `${c.nombre_cliente || ""} ${c.nombre || ""} ${c.telefono || ""}`.toLowerCase().includes(q);
      if (!match) return false;
    }
    const cBot = c.bot_responde !== undefined ? Boolean(c.bot_responde) : Boolean(c.bot_activo);
    if (filter === "espera") return !cBot;
    if (filter === "bot") return cBot;
    return true;
  });

  if (filteredChats.length === 0) {
    return `
      <div style="padding:28px 16px;text-align:center;color:var(--muted);font-size:13px">
        No se encontraron conversaciones
      </div>
    `;
  }

  return filteredChats.map(c => {
    const isSel = activeId && activeId === c.id;
    const cBot = c.bot_responde !== undefined ? Boolean(c.bot_responde) : Boolean(c.bot_activo);
    const timeStr = c.ultimo_mensaje ? fmtTimeChat(c.ultimo_mensaje) : "";
    const isBotPrev = c.ultimo_autor === "bot" || (c.ultimo_autor || "").startsWith("asesor");
    const name = c.nombre_cliente || c.nombre || (c.telefono ? `+${String(c.telefono).replace(/\D/g, "")}` : "Contacto WhatsApp");

    return `
      <div class="wa-chat-item ${isSel ? "active" : ""}" data-act="selectChat" data-id="${esc(c.id)}">
        <span class="avatar sm">${esc(initials(name))}</span>
        <div class="body">
          <div class="top">
            <span class="name">${esc(name)}</span>
            <span class="time">${esc(timeStr)}</span>
          </div>
          <div class="preview">${isBotPrev ? "↪ " : ""}${esc(c.ultimo_texto || "Conversación iniciada")}</div>
          <div class="tags">
            <span class="wa-tag ${cBot ? "bot" : "human"}">${cBot ? "🤖 Bot activo" : "👤 Asesor"}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function updateFeedMessagesDOM(messages, forceScroll = false) {
  const feed = document.getElementById("wa-feed-container");
  if (!feed) return;
  const isNearBottom = (feed.scrollHeight - feed.scrollTop - feed.clientHeight) < 120;
  feed.innerHTML = renderFeedMessagesHTML(messages);
  if (forceScroll || isNearBottom) {
    feed.scrollTop = feed.scrollHeight;
  }
}

function updateSidebarChatsDOM() {
  const listEl = document.getElementById("wa-chat-list-container");
  if (!listEl) return;
  const chats = S.ui.botChats || [];
  listEl.innerHTML = renderChatListItemsHTML(chats, S.ui.activeChatId);
}

async function livePollChatsAndMessages() {
  if (!S.view || S.view.page !== "chats" || (S.ui.waActiveTab && S.ui.waActiveTab !== "chats")) return;
  const botUrl = getBotBaseUrl();
  try {
    const [estRes, chRes] = await Promise.all([
      fetch(`${botUrl}/api/estado`, { signal: AbortSignal.timeout(2000) }),
      fetch(`${botUrl}/api/chats`, { signal: AbortSignal.timeout(2000) })
    ]);
    if (estRes.ok) {
      S.ui.waStatus = await estRes.json();
      S.ui.gymBotConnected = true;
    }
    if (chRes.ok) {
      const liveChats = await chRes.json();
      if (Array.isArray(liveChats)) {
        const prevSig = (S.ui.botChats || []).map(c => `${c.id}:${c.ultimo_mensaje}:${c.bot_activo}`).join("|");
        const nextSig = liveChats.map(c => `${c.id}:${c.ultimo_mensaje}:${c.bot_activo}`).join("|");
        S.ui.botChats = liveChats;
        if (!S.ui.activeChatId || !liveChats.some(c => c.id === S.ui.activeChatId)) {
          S.ui.activeChatId = liveChats[0].id;
        }
        if (prevSig !== nextSig) {
          updateSidebarChatsDOM();
        }
      }
    }

    const activeId = S.ui.activeChatId || (S.ui.botChats && S.ui.botChats[0]?.id);
    if (activeId) {
      const msgRes = await fetch(`${botUrl}/api/chats/${encodeURIComponent(activeId)}/mensajes`, { signal: AbortSignal.timeout(2000) });
      if (msgRes.ok) {
        const liveMsgs = await msgRes.json();
        if (Array.isArray(liveMsgs)) {
          S.ui.botMessages = S.ui.botMessages || {};
          const currentMsgs = S.ui.botMessages[activeId] || [];
          const currLastId = currentMsgs.length ? currentMsgs[currentMsgs.length - 1].id : null;
          const nextLastId = liveMsgs.length ? liveMsgs[liveMsgs.length - 1].id : null;

          if (currentMsgs.length !== liveMsgs.length || currLastId !== nextLastId) {
            S.ui.botMessages[activeId] = liveMsgs;
            updateFeedMessagesDOM(liveMsgs);
          }
        }
      }
    }
  } catch (e) {
    // Polling background silencioso
  }
}

async function syncLiveGymBookings(liveEntrenamientos) {
  if (!Array.isArray(liveEntrenamientos)) return false;
  S.gymBookings = S.gymBookings || {};
  let changed = false;

  // 1. Eliminar reservas que venían de WhatsApp y ya no están en SQLite (fueron canceladas o borradas)
  const activeBotKeys = new Set(liveEntrenamientos.map(e => `bot_ent_${e.id}`));
  for (const [key, b] of Object.entries(S.gymBookings)) {
    if (b && b.source === "bot" && !activeBotKeys.has(key)) {
      delete S.gymBookings[key];
      await del("gymBookings", key).catch(() => {});
      changed = true;
    }
  }

  // 2. Insertar / sincronizar los turnos agendados en WhatsApp
  for (const e of liveEntrenamientos) {
    const key = `bot_ent_${e.id}`;
    const nombre = e.nombre_mostrado || e.nombre_alumno || "Atleta";
    const existing = S.gymBookings[key];
    if (
      !existing ||
      existing.date !== e.fecha ||
      existing.time !== e.hora ||
      existing.nombre !== nombre ||
      existing.tipo !== e.tipo
    ) {
      const booking = {
        id: key,
        dbId: e.id,
        chatId: e.chat_id,
        nombre,
        phone: e.telefono || "",
        date: e.fecha,
        time: e.hora,
        tipo: e.tipo || "Fuerza",
        status: "confirmado",
        source: "bot",
        createdAt: new Date(e.creado || Date.now()).toISOString()
      };
      S.gymBookings[key] = booking;
      await put("gymBookings", key, booking).catch(() => {});
      changed = true;
    }
  }

  return changed;
}

async function trySyncBotFromApi() {
  const botUrl = getBotBaseUrl();
  try {
    const [estRes, chRes, cfgRes, gymRes] = await Promise.all([
      fetch(`${botUrl}/api/estado`, { signal: AbortSignal.timeout(2000), credentials: "include" }),
      fetch(`${botUrl}/api/chats`, { signal: AbortSignal.timeout(2000), credentials: "include" }),
      fetch(`${botUrl}/api/configuracion`, { signal: AbortSignal.timeout(2000), credentials: "include" }).catch(() => null),
      fetch(`${botUrl}/api/gym/entrenamientos`, { signal: AbortSignal.timeout(2000), credentials: "include" }).catch(() => null)
    ]);
    if (estRes && estRes.ok) {
      S.ui.waStatus = await estRes.json();
      S.ui.gymBotConnected = true;
      if (S.ui.waStatus && S.ui.waStatus.yo && (!S.authenticated || !S.user)) {
        const yo = S.ui.waStatus.yo;
        const isAdm = yo.rol === "admin" || yo.usuario === "admin";
        const userObj = {
          id: isAdm ? "trainer-kevin" : `trainer-${yo.id}`,
          name: yo.nombre || "Usuario Eleven",
          role: isAdm ? "Administrador General" : "Preparador Físico",
          email: yo.usuario && yo.usuario.includes("@") ? yo.usuario : `${yo.usuario}@eleven.com`,
          avatar: isAdm ? "KG" : "PF",
          isAdmin: isAdm
        };
        S.authenticated = true;
        setCurrentTrainer(userObj);
        closeAuthModal();
        buildNav();
        render();
      }
    }
    if (chRes && chRes.ok) {
      const liveChats = await chRes.json();
      if (liveChats && Array.isArray(liveChats)) {
        S.ui.botChats = liveChats;
        if (!S.ui.activeChatId || !liveChats.some(c => c.id === S.ui.activeChatId)) {
          S.ui.activeChatId = liveChats[0].id;
        }
      }
    }
    if (cfgRes && cfgRes.ok) {
      S.ui.botConfig = await cfgRes.json();
    }
    if (gymRes && gymRes.ok) {
      const liveEntrenamientos = await gymRes.json();
      if (Array.isArray(liveEntrenamientos)) {
        const bookingsChanged = await syncLiveGymBookings(liveEntrenamientos);
        if (bookingsChanged && S.view && S.view.page === "gym") {
          render();
        }
      }
    }
    if (S.ui.activeChatId) {
      await fetchChatMessages(S.ui.activeChatId);
    }
  } catch (e) {
    S.ui.gymBotConnected = false;
  }
}

function chatsAdminView() {
  if (!window._waPollingActive) {
    window._waPollingActive = true;
    setInterval(async () => {
      if (S.view && S.view.page === "chats") {
        await livePollChatsAndMessages();
      }
    }, 1500);
  }

  if (!S.ui.botChats) {
    S.ui.botChats = [];
    S.ui.activeChatId = S.ui.botChats[0].id;
    trySyncBotFromApi().then(() => {
      render();
      setTimeout(() => {
        const feed = document.getElementById("wa-feed-container");
        if (feed) feed.scrollTop = feed.scrollHeight;
      }, 50);
    });
  }

  const activeTab = S.ui.waActiveTab || "chats";
  const st = S.ui.waStatus || {};
  const chats = S.ui.botChats || [];
  const activeId = S.ui.activeChatId || (chats[0] ? chats[0].id : null);
  const activeChat = chats.find(c => c.id === activeId) || chats[0];

  // Insignia de estado
  let waPill = `<span class="pill off">🔴 Bot local en espera (${esc(getBotBaseUrl())})</span>`;
  if (st.whatsapp) {
    waPill = `<span class="pill on"><span class="wa-live-dot"></span> 🟢 WhatsApp En Vivo (+${esc(st.numero || st.numeroBot || "")})</span>`;
  } else if (st.qr || st.codigo) {
    waPill = `<span class="pill" style="color:var(--warn);background:rgba(230,162,60,0.15)">📲 Esperando Vinculación (QR / Código)</span>`;
  } else if (S.ui.gymBotConnected) {
    waPill = `<span class="pill" style="color:var(--accent);background:rgba(0,180,216,0.15)">🟡 Motor WhatsApp Conectándose...</span>`;
  }

  return `
    <div class="page-head" style="margin-bottom:16px">
      <div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px">
          <h1 style="margin:0;font-size:26px">Control de Chats & WhatsApp</h1>
          ${waPill}
        </div>
        <div class="sub">Conversaciones en tiempo real con WhatsApp. El bot responde de forma autónoma o tú puedes intervenir directamente como asesor.</div>
      </div>
      <div class="actions">
        <button class="btn sm" data-act="refreshBotLive">${icon("history")} Sincronizar Ahora</button>
        <button class="btn primary sm" data-act="setWaTab" data-tab="conexion">${icon("power")} Panel de Conexión & QR</button>
      </div>
    </div>

    <!-- TABS SUPERIORES -->
    <div class="gym-toolbar" style="margin-bottom:16px">
      <div class="gym-tabs">
        <button class="gym-tab-btn ${activeTab === "chats" ? "active" : ""}" data-act="setWaTab" data-tab="chats">
          ${icon("whatsapp")} 💬 Conversaciones en Vivo (${chats.length})
        </button>
        <button class="gym-tab-btn ${activeTab === "conexion" ? "active" : ""}" data-act="setWaTab" data-tab="conexion">
          ${icon("power")} 📲 Estado de WhatsApp & QR en Pantalla
        </button>
      </div>
    </div>

    ${activeTab === "chats" ? renderChatsTabHTML(chats, activeChat) : renderConexionTabHTML(st)}
  `;
}

function renderChatsTabHTML(chats, activeChat) {
  const filter = S.ui.chatFilter || "all";
  const messages = (activeChat && (S.ui.botMessages && S.ui.botMessages[activeChat.id] || activeChat.mensajes)) || [];
  const botActivo = activeChat ? (activeChat.bot_responde !== undefined ? Boolean(activeChat.bot_responde) : Boolean(activeChat.bot_activo)) : false;
  const contactName = activeChat ? (activeChat.nombre_cliente || activeChat.nombre || (activeChat.telefono ? `+${String(activeChat.telefono).replace(/\D/g, "")}` : "Contacto WhatsApp")) : "";

  // Auto-scroll después de renderizar el contenedor
  setTimeout(() => {
    const feed = document.getElementById("wa-feed-container");
    if (feed) feed.scrollTop = feed.scrollHeight;
  }, 40);

  return `
    <div class="wa-chats-layout">
      <!-- PANEL IZQUIERDO: LISTA DE CHATS EN VIVO -->
      <div class="wa-chat-sidebar">
        <div class="wa-sidebar-header">
          <div class="search" style="flex:auto">
            ${icon("search")}
            <input type="search" class="input sm" placeholder="Buscar atleta, teléfono o chat..." value="${esc(S.ui.chatSearch || "")}" data-act-change="setChatSearchVal">
          </div>
          <div class="seg" style="width:100%;display:flex">
            <button style="flex:1;text-align:center;padding:5px 8px;font-size:12px" data-act="setChatFilterVal" data-val="all" aria-pressed="${filter === "all"}">Todos</button>
            <button style="flex:1;text-align:center;padding:5px 8px;font-size:12px" data-act="setChatFilterVal" data-val="espera" aria-pressed="${filter === "espera"}">👤 Asesor</button>
            <button style="flex:1;text-align:center;padding:5px 8px;font-size:12px" data-act="setChatFilterVal" data-val="bot" aria-pressed="${filter === "bot"}">🤖 Bot</button>
          </div>
        </div>

        <div class="wa-chat-list" id="wa-chat-list-container">
          ${renderChatListItemsHTML(chats, activeChat ? activeChat.id : null, filter, S.ui.chatSearch)}
        </div>
      </div>

      <!-- PANEL DERECHO: CONVERSACIÓN EN VIVO ELEVEN PERFORMANCE / WHATSAPP -->
      <div class="wa-conv-panel">
        ${!activeChat ? `
          <div style="margin:auto;text-align:center;color:var(--muted);padding:40px 20px">
            <div style="font-size:48px;margin-bottom:12px">💬</div>
            <b style="font-size:16px;color:var(--fg)">Selecciona una conversación</b>
            <p style="font-size:13px;max-width:340px;margin:8px auto 0 auto">
              Verás la conversación en tiempo real tal como ocurre en WhatsApp. Podrás intervenir o dejar que el bot responda automáticamente.
            </p>
          </div>
        ` : `
          <!-- CABECERA DEL CHAT ACTIVO -->
          <div class="wa-conv-header" id="wa-conv-header">
            <div style="display:flex;align-items:center;gap:12px">
              <span class="avatar sm">${esc(initials(contactName))}</span>
              <div>
                <b style="font-size:15px;color:var(--fg)">${esc(contactName)}</b>
                <div style="font-size:12px;color:var(--muted);display:flex;align-items:center;gap:6px;margin-top:2px">
                  <span>+${esc((activeChat.telefono || "").replace(/\D/g, ""))}</span>
                  <span>·</span>
                  <span class="wa-tag ${botActivo ? "bot" : "human"}">
                    ${botActivo ? "🤖 Eleven Bot respondiendo" : "👤 En atención humana"}
                  </span>
                  <span>·</span>
                  <span style="display:inline-flex;align-items:center;gap:4px;color:var(--good);font-size:11px">
                    <span class="wa-live-dot" style="width:6px;height:6px"></span> En Vivo
                  </span>
                </div>
              </div>
            </div>

            <div class="actions" id="wa-conv-header-actions">
              <button class="btn sm ${botActivo ? "ghost" : "primary"}" data-act="toggleChatBotMode" data-id="${esc(activeChat.id)}" title="Alternar entre Bot automático y atención humana">
                ${botActivo ? "✋ Tomar Chat (Pausar Bot)" : "🤖 Devolver al Bot"}
              </button>
              <button class="icon-btn sm" data-act="deleteChatConversation" data-id="${esc(activeChat.id)}" style="color:var(--bad)" title="Eliminar conversación del panel">
                ${icon("trash")}
              </button>
            </div>
          </div>

          <!-- FEED DE MENSAJES CON AUTO-SCROLL Y SIN PARPADEO -->
          <div class="wa-conv-feed" id="wa-feed-container">
            ${renderFeedMessagesHTML(messages)}
          </div>

          <!-- CHIPS DE RESPUESTA RÁPIDA -->
          <div class="wa-quick-replies">
            <button class="wa-quick-chip" data-act="insertWaQuickReply" data-tipo="planes">⚡ Planes & Tarifas</button>
            <button class="wa-quick-chip" data-act="insertWaQuickReply" data-tipo="pagos">💳 Datos de Pago</button>
            <button class="wa-quick-chip" data-act="insertWaQuickReply" data-tipo="horarios">📍 Sede & Horarios</button>
            <button class="wa-quick-chip" data-act="insertWaQuickReply" data-tipo="cupo">✅ Confirmar Cupo</button>
          </div>

          <!-- BARRA DE RESPUESTA EN DIRECTO (ENTER PARA ENVIAR) -->
          <div class="wa-conv-footer">
            <textarea
              class="wa-conv-input"
              id="wa-chat-reply-input"
              placeholder="Escribe un mensaje como asesor... (Presiona Enter para enviar, Shift+Enter para salto de línea)"
              onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();document.getElementById('btn-send-wa-reply')?.click();}"
            ></textarea>
            <button class="btn primary" id="btn-send-wa-reply" data-act="sendAdvisorLiveReply" data-id="${esc(activeChat.id)}">
              ${icon("whatsapp")} Enviar
            </button>
          </div>
        `}
      </div>
    </div>
  `;
}

function renderConexionTabHTML(st) {
  const botUrl = getBotBaseUrl();
  const cfg = S.ui.botConfig || {};
  const conectado = Boolean(st.whatsapp);
  const qr = st.qr;
  const codigo = st.codigo;
  const isStarting = !conectado && !qr && !codigo && S.ui.gymBotConnected;

  const currentBotNum = cfg.numeroBot || st.numeroBot || "573206051319";
  const currentAdvisorNum = cfg.numeroAsesor || "573206051319";
  const currentPayNum = cfg.numeroPagos || (S.config.gym && S.config.gym.nequi) || "3206051319";
  const currentBancolombia = cfg.bancolombia || (S.config.gym && S.config.gym.bancolombia) || "Ahorros 245-891234-01";
  const currentTitular = cfg.titular || (S.config.gym && S.config.gym.titular) || "Eleven Performance S.A.S.";

  return `
    <div class="grid g2" style="margin-bottom:20px">
      <!-- PANEL PRINCIPAL DE ESTADO & VINCULACIÓN -->
      <section class="panel" style="position:relative;overflow:hidden">
        <div class="panel-head">
          <div>
            <h3>Vinculación de WhatsApp (Eleven Performance)</h3>
            <span class="muted small">Escaneo directo con cámara o código numérico de 8 dígitos</span>
          </div>
          <span class="badge ${conectado ? "badge-good" : (qr || codigo ? "badge-warn" : (isStarting ? "badge-warn" : "badge-gray"))}">
            ${conectado ? "🟢 Conectado" : (qr || codigo ? "📲 Esperando Vinculación" : (isStarting ? "⏳ Iniciando..." : "🔴 Desconectado"))}
          </span>
        </div>

        <div class="wa-status-box" style="margin-bottom:20px;padding:20px;border-radius:12px;background:var(--surface2)">
          ${conectado ? `
            <div style="display:flex;align-items:center;gap:18px">
              <div style="font-size:44px;line-height:1">🟢</div>
              <div style="flex:1">
                <div style="font-size:22px;font-weight:800;color:var(--good);margin-bottom:4px">WhatsApp Conectado y Operativo</div>
                <div style="font-size:15px;color:var(--fg)">Línea vinculada: <b>+${esc(st.numero || currentBotNum)}</b></div>
                <div class="hint" style="margin-top:6px;font-size:13px;color:var(--muted)">
                  El agente inteligente de Eleven Performance está respondiendo mensajes y sincronizando entrenamientos en tiempo real.
                </div>
              </div>
            </div>
          ` : (qr || codigo ? `
            <div>
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
                <span style="font-size:32px">📲</span>
                <div>
                  <div style="font-size:20px;font-weight:800;color:var(--warn)">Listo para Vincular WhatsApp</div>
                  <div style="font-size:13px;color:var(--muted)">Selecciona la forma más rápida y cómoda para ti:</div>
                </div>
              </div>

              <!-- CONTENEDOR DE OPCIONES DE VINCULACIÓN -->
              <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:16px;margin-top:14px">
                <!-- OPCIÓN 1: QR -->
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;display:flex;flex-direction:column;align-items:center;text-align:center">
                  <div style="font-size:14px;font-weight:700;color:var(--fg);margin-bottom:8px">
                    📸 Método 1: Escanear QR (Recomendado)
                  </div>
                  <p style="font-size:12px;color:var(--muted);margin:0 0 12px 0">
                    Abre WhatsApp en tu celular > <b>Dispositivos vinculados</b> > <b>Vincular un dispositivo</b> y apunta con la cámara:
                  </p>
                  ${qr ? `
                    <div style="background:#fff;padding:10px;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,0.25);border:2px solid rgba(255,255,255,0.8)">
                      <img src="${qr}" width="210" height="210" alt="Código QR WhatsApp" style="display:block;border-radius:4px">
                    </div>
                    <span class="hint" style="font-size:11px;margin-top:8px">🔄 Se actualiza automáticamente cada ~20s</span>
                  ` : `
                    <div style="padding:40px 20px;color:var(--muted);font-size:13px">Generando código QR...</div>
                  `}
                </div>

                <!-- OPCIÓN 2: CÓDIGO DE 8 DÍGITOS -->
                <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;display:flex;flex-direction:column;justify-content:space-between">
                  <div>
                    <div style="font-size:14px;font-weight:700;color:var(--fg);margin-bottom:8px">
                      🔢 Método 2: Código de 8 Dígitos (Emparejamiento Directo)
                    </div>
                    <p style="font-size:12px;color:var(--muted);margin:0 0 12px 0">
                      Vincula sin cámara introduciendo un código de 8 dígitos directamente en WhatsApp:
                    </p>

                    ${codigo ? `
                      <div style="background:var(--surface2);border:1px dashed var(--accent);border-radius:8px;padding:14px;text-align:center;margin-bottom:12px">
                        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--accent);margin-bottom:4px">Código de Vinculación</div>
                        <div style="font-size:28px;font-family:var(--f-mono);font-weight:800;letter-spacing:4px;color:#fff">
                          ${esc(codigo.slice(0, 4))}-${esc(codigo.slice(4))}
                        </div>
                      </div>
                      <div style="font-size:12px;color:var(--fg2);line-height:1.4;margin-bottom:12px">
                        En WhatsApp: <b>Dispositivos vinculados</b> > <b>Vincular un dispositivo</b> > toca <b>"Vincular con el número de teléfono"</b> y escribe ese código.
                      </div>
                    ` : `
                      <div style="margin-bottom:12px">
                        <label for="input-pairing-phone" style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">Escribe tu número de celular (con indicativo, ej: 573206051319)</label>
                        <input class="input" id="input-pairing-phone" placeholder="573206051319" value="${esc(currentBotNum)}" style="font-size:13px">
                      </div>
                      <button class="btn sm primary" data-act="requestPairingCode" style="width:100%">
                        ${icon("whatsapp")} Solicitar Código de 8 Dígitos
                      </button>
                    `}
                  </div>

                  ${codigo ? `
                    <div style="margin-top:12px;border-top:1px solid var(--border);padding-top:10px">
                      <input class="input" id="input-pairing-phone" placeholder="Cambiar número (ej: 57300...)" value="${esc(currentBotNum)}" style="font-size:12px;margin-bottom:6px">
                      <button class="btn sm ghost" data-act="requestPairingCode" style="width:100%">
                        🔄 Generar nuevo código para otro número
                      </button>
                    </div>
                  ` : ""}
                </div>
              </div>
            </div>
          ` : (isStarting ? `
            <div style="display:flex;align-items:center;gap:16px">
              <div style="font-size:36px">⏳</div>
              <div style="flex:1">
                <div style="font-size:18px;font-weight:800;color:var(--warn);margin-bottom:4px">Iniciando Motor de WhatsApp...</div>
                <p style="font-size:13px;color:var(--fg2);margin:0">
                  El servicio local está activo. El navegador Chromium está cargando WhatsApp Web. El código QR aparecerá aquí en unos segundos automáticamente...
                </p>
              </div>
            </div>
          ` : `
            <div style="display:flex;align-items:flex-start;gap:16px">
              <div style="font-size:40px;line-height:1">🔴</div>
              <div style="flex:1">
                <div style="font-size:19px;font-weight:800;color:var(--bad);margin-bottom:4px">Bot Desconectado</div>
                <p style="font-size:13px;color:var(--muted);margin:0 0 12px 0">
                  No se detecta respuesta del microservicio del bot en <code>${esc(botUrl)}</code>.
                </p>
                <div style="background:var(--surface);padding:14px;border-radius:8px;font-size:12.5px;color:var(--fg2);line-height:1.6;border:1px solid var(--border)">
                  <b>Cómo encenderlo:</b><br>
                  1. Abre la carpeta <b>Eleven-Performance-System</b> en tu Escritorio.<br>
                  2. Haz doble clic en <b>INICIAR-SISTEMA.command</b>.<br>
                  3. Al abrirse la terminal, este panel se sincronizará automáticamente.
                </div>
              </div>
            </div>
          `))}
        </div>

        <div class="actions" style="gap:10px;flex-wrap:wrap">
          <button class="btn primary sm" data-act="refreshBotLive">${icon("history")} Sincronizar / Comprobar Estado</button>
          <button class="btn sm" data-act="reconnectBotSession">${icon("power")} 🔄 Reconectar Sesión</button>
          <button class="btn danger sm" data-act="unlinkBotSession">${icon("x")} 🔗 Desvincular / Limpiar Sesión</button>
        </div>
      </section>

      <!-- CAMBIO DE NÚMEROS Y CONFIGURACIÓN DINÁMICA DIRECTA DESDE EL PANEL -->
      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>📱 Configuración de Números & Recaudo</h3>
            <span class="muted small">Modifica los números directamente aquí sin depender de scripts ni reiniciar archivos</span>
          </div>
          <span class="badge badge-accent">En Vivo</span>
        </div>

        <div class="form-grid">
          <div class="field span3">
            <label for="cfg-num-bot">📱 Número de WhatsApp del Bot</label>
            <input class="input" id="cfg-num-bot" value="${esc(currentBotNum)}" placeholder="573206051319">
            <span class="hint">Número oficial que atiende el bot en WhatsApp (con indicativo, ej: 573206051319).</span>
          </div>

          <div class="field span3">
            <label for="cfg-num-asesor">🔔 Número del Entrenador / Asesor (Alertas)</label>
            <input class="input" id="cfg-num-asesor" value="${esc(currentAdvisorNum)}" placeholder="573206051319">
            <span class="hint">Recibe alertas por WhatsApp cuando un cliente solicita humano o agenda cita.</span>
          </div>

          <div class="field span3">
            <label for="cfg-num-pagos">💳 Número Nequi / Daviplata (Pagos)</label>
            <input class="input" id="cfg-num-pagos" value="${esc(currentPayNum)}" placeholder="3206051319">
            <span class="hint">Número que envía el bot a los clientes para cobrar mensualidades y planes.</span>
          </div>

          <div class="field span3">
            <label for="cfg-cuenta-bancolombia">🏦 Cuenta Bancolombia</label>
            <input class="input" id="cfg-cuenta-bancolombia" value="${esc(currentBancolombia)}" placeholder="Ahorros 245-891234-01">
            <span class="hint">Número y tipo de cuenta bancaria oficial de recaudo.</span>
          </div>

          <div class="field span3">
            <label for="cfg-titular-cuenta">👤 Titular de la Cuenta</label>
            <input class="input" id="cfg-titular-cuenta" value="${esc(currentTitular)}" placeholder="Eleven Performance S.A.S.">
            <span class="hint">Nombre o razón social titular registrada para transferencias.</span>
          </div>

          <div class="field span3">
            <label for="cfg-bot-endpoint">🌐 URL del Servidor Unificado</label>
            <input class="input" id="cfg-bot-endpoint" value="${esc(botUrl)}" placeholder="http://localhost:7077">
            <span class="hint">Servicio unificado Eleven Performance (por defecto http://localhost:7077).</span>
          </div>
        </div>

        <div class="actions" style="margin-top:16px;justify-content:flex-end">
          <button class="btn primary" data-act="saveBotNumbers">
            💾 Guardar y Aplicar Números en Vivo
          </button>
        </div>

        <div style="margin-top:16px;padding:12px;border-radius:8px;background:var(--surface2);font-size:12px;color:var(--fg2);line-height:1.5">
          <b>✨ Cero Dependencia de Scripts:</b><br>
          Al hacer clic en <b>"Guardar y Aplicar Números en Vivo"</b>, los cambios se guardan de forma permanente en la base de datos del sistema (SQLite) y en la memoria del bot al instante. No necesitas reiniciar ni editar ningún archivo.
        </div>
      </section>
    </div>
  `;
}

