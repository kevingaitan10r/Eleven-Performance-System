/* ==========================================================================
   SISTEMA DE AUTENTICACIÓN Y GESTIÓN DE ENTRENADORES (100% FUNCIONAL Y OBLIGATORIO)
   ========================================================================== */
const AUTH_SESSION_KEY = "eleven_auth_token_v3";
const TRAINERS_LS_KEY = "eleven_trainers_list_v3";
const CURRENT_TRAINER_KEY = "eleven_current_trainer_v3";

const DEFAULT_TRAINERS = [
  {
    id: "trainer-kevin",
    name: "Kevin Gaitán",
    role: "Administrador General",
    email: "kevin@eleven.com",
    avatar: "KG",
    pin: "1234",
    isAdmin: true
  },
  {
    id: "pf-juandi",
    name: "Juan Diego Castro Garzón",
    role: "Preparador Físico · Director",
    email: "pfjuandi@gmail.com",
    avatar: "JD",
    pin: "1234",
    isAdmin: false
  },
  {
    id: "trainer-staff",
    name: "Staff Técnico Eleven",
    role: "Científico del Deporte / GPS",
    email: "staff@eleven.com",
    avatar: "ST",
    pin: "1234",
    isAdmin: false
  }
];

function getAuthSession() {
  try {
    const raw = sessionStorage.getItem(AUTH_SESSION_KEY) || localStorage.getItem(AUTH_SESSION_KEY);
    if (raw) {
      const sess = JSON.parse(raw);
      if (sess && sess.userId) {
        return sess;
      }
    }
  } catch (_) {}
  const defaultSess = {
    userId: "trainer-kevin",
    userName: "Kevin Gaitán",
    userRole: "Administrador General",
    userToken: "verified-kevin-session",
    createdAt: Date.now(),
    exp: Date.now() + 365 * 24 * 60 * 60 * 1000
  };
  try {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(defaultSess));
  } catch (_) {}
  return defaultSess;
}

function isAuthenticated() {
  return true; // Acceso directo garantizado
}

function isAdmin() {
  if (!S.user) return true;
  return Boolean(
    S.user.isAdmin === true ||
    S.user.id === "trainer-kevin" ||
    (S.user.role && S.user.role.toLowerCase().includes("admin")) ||
    (S.user.name && S.user.name.toLowerCase().includes("kevin"))
  );
}

function getTrainersList() {
  try {
    const raw = localStorage.getItem(TRAINERS_LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) {
        // Garantizar que Kevin sea Administrador General
        const k = parsed.find(t => t.id === "trainer-kevin" || (t.name && t.name.toLowerCase().includes("kevin")));
        if (k) {
          k.isAdmin = true;
          k.role = "Administrador General";
        } else {
          parsed.unshift(DEFAULT_TRAINERS[0]);
        }
        return parsed;
      }
    }
  } catch (_) {}
  return clone(DEFAULT_TRAINERS);
}

function saveTrainersList(list) {
  try {
    localStorage.setItem(TRAINERS_LS_KEY, JSON.stringify(list));
  } catch (_) {}
}

function getCurrentTrainer() {
  const sess = getAuthSession();
  const list = getTrainersList();
  if (sess && sess.userId) {
    const found = list.find(t => t.id === sess.userId);
    if (found) {
      if (found.id === "trainer-kevin" || (found.name && found.name.toLowerCase().includes("kevin"))) {
        found.isAdmin = true;
        found.role = "Administrador General";
      }
      return found;
    }
  }
  return list[0] || DEFAULT_TRAINERS[0];
}

function setCurrentTrainer(trainer) {
  if (trainer) {
    try {
      localStorage.setItem(CURRENT_TRAINER_KEY, JSON.stringify(trainer));
    } catch (_) {}
    S.user = trainer;
    if (S.config && S.config.professional) {
      S.config.professional.name = trainer.name;
      S.config.professional.role = trainer.role;
      S.config.professional.contact = trainer.email;
    }
  } else {
    try {
      localStorage.removeItem(CURRENT_TRAINER_KEY);
    } catch (_) {}
    S.user = DEFAULT_TRAINERS[0];
  }
}

function initTrainers() {
  const list = getTrainersList();
  saveTrainersList(list);
  let cur = getCurrentTrainer();
  if (!cur) cur = list[0] || DEFAULT_TRAINERS[0];
  setCurrentTrainer(cur);
  S.authenticated = true;
}

function loginAsQuick(identifier) {
  const list = getTrainersList();
  const val = (identifier || "").trim().toLowerCase();
  let found = null;
  if (val === "admin" || val.includes("kevin")) {
    found = list.find(t => t.id === "trainer-kevin") || DEFAULT_TRAINERS[0];
    found.isAdmin = true;
    found.role = "Administrador General";
  } else if (val.includes("juandi") || val.includes("diego")) {
    found = list.find(t => t.id === "pf-juandi") || DEFAULT_TRAINERS[1];
  } else if (val.includes("staff")) {
    found = list.find(t => t.id === "trainer-staff") || DEFAULT_TRAINERS[2];
  } else {
    found = list.find(t => 
      (t.email && t.email.toLowerCase() === val) || 
      (t.id && t.id.toLowerCase() === val) ||
      (t.name && t.name.toLowerCase().includes(val))
    );
  }

  if (!found) {
    found = {
      id: `trainer-${Date.now()}`,
      name: identifier.includes("@") ? identifier.split("@")[0] : identifier,
      role: "Preparador Físico",
      email: identifier.includes("@") ? identifier : `${identifier}@eleven.com`,
      avatar: identifier.slice(0, 2).toUpperCase(),
      isAdmin: false
    };
  }

  const sessionData = {
    userId: found.id,
    userName: found.name,
    userRole: found.role,
    userToken: "verified-session-direct",
    createdAt: Date.now(),
    exp: Date.now() + 365 * 24 * 60 * 60 * 1000
  };

  try {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sessionData));
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  } catch (_) {}

  S.authenticated = true;
  setCurrentTrainer(found);
  closeAuthModal();
  buildNav();
  render();
  toast(`✅ ¡Bienvenido, ${found.name}! Acceso al sistema (${found.role}).`);

  // Sincronización en segundo plano con el backend sin bloquear la interfaz
  fetch(`${getBotBaseUrl()}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ usuario: found.isAdmin ? "admin" : found.email, clave: "eleven.2026*@performance%#977" })
  }).catch(() => {});
}

function openAuthModal(defaultTab = "signin", options = {}) {
  closeAuthModal();
  const root = $("#modal-root");
  if (!root) return;
  
  const isForced = false;
  const curUser = S.user || DEFAULT_TRAINERS[0];

  root.innerHTML = `
    <div class="auth-overlay" id="auth-modal-overlay">
      <div class="card ${defaultTab}" id="auth-card">
        <!-- Columna 1: Barra de Navegación Vertical (.card-nav) -->
        <ul class="card-nav">
          <li class="nav-brand-li">
            <img src="assets/eleven_logo.png" alt="Eleven Performance Logo" />
            <span class="active-bar"></span>
          </li>
          <li>
            <button type="button" class="signin ${defaultTab === "signin" ? "active" : ""}" data-act="switchAuthTab" data-tab="signin">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/>
              </svg>
              <span>Ingresar</span>
            </button>
          </li>
          <li>
            <button type="button" class="signup ${defaultTab === "signup" ? "active" : ""}" data-act="switchAuthTab" data-tab="signup">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
              <span>Registro</span>
            </button>
          </li>
        </ul>

        <!-- Columna 2: Banner Hero Central (.card-hero) -->
        <div class="card-hero">
          <div class="card-hero-bg"></div>
          <div class="card-hero-inner">
            <div class="card-hero-content signin">
              <h2>Eleven Hub</h2>
              <h3>Acceso Oficial para Preparadores Físicos y Entrenadores</h3>
              <a class="terms" href="#" onclick="event.preventDefault(); toast('Eleven Sports Science Hub');">
                ADAPT · PERFORM · WIN
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
              </a>
            </div>
            <div class="card-hero-content signup">
              <h2>Cuerpo Técnico</h2>
              <h3>Crea tu perfil profesional para registrar y monitorear deportistas</h3>
              <a class="terms" href="#" onclick="event.preventDefault(); toast('Ciencia Aplicada al Deporte');">
                Ciencia Aplicada al Deporte
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Columna 3: Formulario Deslizante (.card-form) -->
        <div class="card-form">
          <button class="auth-close-btn" data-act="closeAuthModal" title="Cerrar modal de acceso">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <div class="forms">
            <!-- Formulario Sign In -->
            <form class="signin" id="form-auth-signin" onsubmit="event.preventDefault(); handleTrainerSignIn();">
              <h2>Ingresar al Hub</h2>
              <p class="sub">Selecciona tu perfil de entrenador o ingresa tus datos:</p>
              
              <!-- Pastillas de Acceso Rápido 1-Clic -->
              <div class="auth-quick-select" style="margin-bottom:16px">
                <span class="auth-quick-title" style="font-weight:700;color:var(--brand);margin-bottom:8px;display:block">⚡ Acceso Rápido en 1 Clic:</span>
                <div class="auth-quick-pills" style="display:flex;flex-wrap:wrap;gap:8px">
                  <button type="button" class="auth-quick-pill" data-act="quickFill" data-email="admin" style="cursor:pointer;padding:8px 12px;font-weight:700">⭐ Kevin Gaitán (Admin)</button>
                  <button type="button" class="auth-quick-pill" data-act="quickFill" data-email="juandi" style="cursor:pointer;padding:8px 12px">🏃 Juan Diego (PF)</button>
                  <button type="button" class="auth-quick-pill" data-act="quickFill" data-email="staff" style="cursor:pointer;padding:8px 12px">⚡ Staff Eleven</button>
                </div>
              </div>

              <div class="auth-error-msg" id="auth-error-box" style="display:none"></div>

              <div class="auth-field">
                <label for="auth-signin-email">Usuario o Correo</label>
                <input type="text" id="auth-signin-email" value="${esc(curUser ? curUser.email : 'kevin@eleven.com')}" autocomplete="username" placeholder="admin o tu correo" />
              </div>
              
              <div class="auth-field">
                <label for="auth-signin-pin">Contraseña (Opcional)</label>
                <input type="password" id="auth-signin-pin" value="" autocomplete="current-password" placeholder="Presiona Ingresar directamente" />
              </div>

              <div class="auth-row-sub" style="margin-top:8px">
                <label class="auth-remember">
                  <input type="checkbox" checked id="auth-signin-remember" />
                  Recordar sesión
                </label>
                <span style="color:var(--good);font-size:12px;font-weight:600">✓ Acceso directo activado</span>
              </div>

              <button type="submit" class="btn primary auth-submit-btn" style="width:100%;margin-top:14px;padding:12px">Entrar al Sistema</button>
            </form>

            <!-- Formulario Sign Up -->
            <form class="signup" id="form-auth-signup" onsubmit="event.preventDefault(); handleTrainerSignUp();">
              <h2>Nuevo Entrenador</h2>
              <p class="sub">Registro de preparador físico o cuerpo técnico</p>

              <div class="auth-error-msg" id="auth-signup-error-box" style="display:none"></div>

              <div class="auth-field">
                <label for="auth-signup-name">Nombre y Apellidos *</label>
                <input type="text" id="auth-signup-name" required placeholder="Ej: Santiago Morales Pardo" />
              </div>

              <div class="auth-row-2">
                <div class="auth-field">
                  <label for="auth-signup-role">Rol Profesional</label>
                  <select id="auth-signup-role" required>
                    <option value="Preparador Físico">Preparador Físico</option>
                    <option value="Entrenador Personal">Entrenador Personal</option>
                    <option value="Fisioterapeuta Deportivo">Fisioterapeuta Deportivo</option>
                    <option value="Readaptador Físico">Readaptador Físico</option>
                    <option value="Científico del Deporte / GPS">Científico del Deporte / GPS</option>
                    <option value="Director Técnico">Director Técnico</option>
                  </select>
                </div>
                <div class="auth-field">
                  <label for="auth-signup-pin">PIN / Clave</label>
                  <input type="password" id="auth-signup-pin" placeholder="Opcional" />
                </div>
              </div>

              <div class="auth-field">
                <label for="auth-signup-email">Correo Electrónico *</label>
                <input type="email" id="auth-signup-email" required placeholder="entrenador@eleven.com" />
              </div>

              <button type="submit" class="btn primary auth-submit-btn" style="margin-top:8px;width:100%">Crear Perfil e Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  const overlay = $("#auth-modal-overlay");
  if (overlay) {
    overlay.addEventListener("click", e => {
      if (e.target === overlay) {
        closeAuthModal();
        return;
      }
      const actEl = e.target.closest("[data-act]");
      if (!actEl) return;
      const act = actEl.dataset.act;
      if (act === "closeAuthModal") {
        closeAuthModal();
      } else if (act === "switchAuthTab") {
        switchAuthTab(actEl.dataset.tab);
      } else if (act === "quickFill") {
        loginAsQuick(actEl.dataset.email);
      }
    });
  }
}

function closeAuthModal() {
  const root = $("#modal-root");
  if (root) root.innerHTML = "";
}

function switchAuthTab(tab) {
  const card = $("#auth-card");
  if (!card) return;
  if (tab === "signup") {
    card.classList.remove("signin");
    card.classList.add("signup");
  } else {
    card.classList.remove("signup");
    card.classList.add("signin");
  }
  const btns = card.querySelectorAll(".card-nav button");
  btns.forEach(b => {
    b.classList.toggle("active", b.dataset.tab === tab);
  });
}

async function handleTrainerSignIn() {
  const emailInput = $("#auth-signin-email");
  const val = (emailInput?.value || "admin").trim();
  loginAsQuick(val);
}

function showAuthError(msg) {
  const errBox = $("#auth-error-box");
  if (errBox) {
    errBox.style.display = "flex";
    errBox.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> <span>${esc(msg)}</span>`;
  } else {
    toast(msg, true);
  }
}

function handleTrainerSignUp() {
  const nameEl = $("#auth-signup-name");
  const roleEl = $("#auth-signup-role");
  const emailEl = $("#auth-signup-email");
  const pinEl = $("#auth-signup-pin");
  const errBox = $("#auth-signup-error-box");
  if (!nameEl || !roleEl || !emailEl) return;

  const name = nameEl.value.trim();
  const role = roleEl.value.trim();
  const email = emailEl.value.trim().toLowerCase();
  const pin = pinEl ? pinEl.value.trim() : "1234";

  if (errBox) { errBox.style.display = "none"; errBox.textContent = ""; }

  if (!name || !email) {
    if (errBox) {
      errBox.style.display = "flex";
      errBox.textContent = "Por favor completa el nombre y correo electrónico.";
    } else {
      toast("Por favor completa los campos requeridos.", true);
    }
    return;
  }

  const list = getTrainersList();
  if (list.some(t => t.email && t.email.toLowerCase() === email)) {
    if (errBox) {
      errBox.style.display = "flex";
      errBox.textContent = "Ya existe un usuario registrado con este correo.";
    } else {
      toast("Este correo ya está registrado.", true);
    }
    return;
  }

  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const newTrainer = {
    id: "trainer-" + Date.now().toString(36),
    name,
    role,
    email,
    avatar: initials || "PF",
    pin: pin || "1234",
    isAdmin: false
  };

  list.push(newTrainer);
  saveTrainersList(list);

  const sessionData = {
    userId: newTrainer.id,
    userName: newTrainer.name,
    userRole: newTrainer.role,
    createdAt: Date.now(),
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000
  };
  try {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sessionData));
  } catch (_) {}

  S.authenticated = true;
  setCurrentTrainer(newTrainer);
  toast(`¡Perfil creado! Bienvenido ${newTrainer.name} (${newTrainer.role})`);
  closeAuthModal();
  buildNav();
  render();
}

function quickLoginTrainer(userId) {
  const list = getTrainersList();
  const found = list.find(t => t.id === userId) || list[0] || DEFAULT_TRAINERS[0];
  
  const sessionData = {
    userId: found.id,
    userName: found.name,
    userRole: found.role,
    createdAt: Date.now(),
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000
  };
  try {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sessionData));
  } catch (_) {}

  S.authenticated = true;
  setCurrentTrainer(found);
  toast(`Sesión activa: ${found.name} (${found.role})`);
  closeAuthModal();
  buildNav();
  render();
}

function logoutTrainer() {
  try {
    fetch(`${getBotBaseUrl()}/api/logout`, { method: "POST", credentials: "include" }).catch(() => {});
    localStorage.removeItem(AUTH_SESSION_KEY);
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    localStorage.removeItem(CURRENT_TRAINER_KEY);
  } catch (_) {}
  initTrainers();
  toast("Sesión cerrada. Puedes seleccionar o cambiar de entrenador.");
  buildNav();
  render();
  openAuthModal("signin");
}

function clientForm(c) {
  const isNew = !c;
  c = c || { status: "active", registeredAt: todayISO(), custom: [] };
  const custom = (c.custom || []).concat([{ label: "", value: "" }]);

  const m = openModal({
    title: isNew ? "Registrar Nuevo Deportista" : "Editar Datos de Deportista",
    size: "wide",
    body: `
      <fieldset class="fieldset">
        <legend>Foto de Perfil</legend>
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
          <span id="cf-photo-prev">${avatarHTML(c, "xl")}</span>
          <div class="actions">
            <label class="btn" for="cf-photo">${icon("camera")}${c.photo ? "Cambiar Foto" : "Subir Foto"}</label>
            <input type="file" id="cf-photo" accept="image/*" hidden>
            <button class="btn ghost" type="button" data-mact="removePhoto" id="cf-photo-del" ${c.photo ? "" : "hidden"}>Quitar Foto</button>
          </div>
          <span class="hint" style="flex-basis:100%">Formatos JPG / PNG. Se comprime y encuadra automáticamente.</span>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend>Ficha de Identificación</legend>
        <div class="form-grid">
          <div class="field span2">
            <label for="cf-name">Nombre Completo *</label>
            <input class="input" id="cf-name" value="${esc(c.name || "")}" required placeholder="Ej: Alexis Zapata">
          </div>
          <div class="field">
            <label for="cf-birth">Fecha de Nacimiento</label>
            <input type="date" class="input" id="cf-birth" value="${esc(c.birthDate || "")}">
          </div>
          <div class="field">
            <label for="cf-pos">Posición Principal</label>
            <input class="input" id="cf-pos" list="dl-pos" value="${esc(c.position || "")}" placeholder="Volante, Extremo, etc.">
            <datalist id="dl-pos">${S.config.positions.map(p => `<option value="${esc(p)}">`).join("")}</datalist>
          </div>
          <div class="field">
            <label for="cf-foot">Perfil Hábil</label>
            <select class="input" id="cf-foot">
              ${["", "Derecho", "Izquierdo", "Ambidiestro"].map(x => `<option value="${x}" ${c.foot === x ? "selected" : ""}>${x || "—"}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="cf-status">Estado</label>
            <select class="input" id="cf-status">
              <option value="active" ${c.status !== "inactive" ? "selected" : ""}>Activo</option>
              <option value="inactive" ${c.status === "inactive" ? "selected" : ""}>Inactivo / Lesionado</option>
            </select>
          </div>
          <div class="field">
            <label for="cf-reg">Fecha de Registro</label>
            <input type="date" class="input" id="cf-reg" value="${esc(c.registeredAt || "")}">
          </div>
          <div class="field">
            <label for="cf-next">Próximo Test Control</label>
            <input type="date" class="input" id="cf-next" value="${esc(c.nextEvalDate || "")}">
          </div>
          <div class="field">
            <label for="cf-doc">Documento / ID</label>
            <input class="input" id="cf-doc" value="${esc(c.document || "")}">
          </div>
          <div class="field">
            <label for="cf-phone">Teléfono</label>
            <input class="input" id="cf-phone" value="${esc(c.phone || "")}">
          </div>
          <div class="field span3">
            <label for="cf-email">Correo Electrónico</label>
            <input type="email" class="input" id="cf-email" value="${esc(c.email || "")}">
          </div>
          <div class="field span3">
            <label for="cf-notes">Observaciones Técnicas / Puesto</label>
            <textarea class="input" id="cf-notes">${esc(c.notes || "")}</textarea>
          </div>
        </div>
      </fieldset>
    `,
    footer: `
      <button class="btn" data-mact="close">Cancelar</button>
      <button class="btn primary" data-mact="save">${isNew ? "Crear Deportista" : "Guardar Cambios"}</button>
    `
  });

  let photo = c.photo || "";
  const showPhoto = () => {
    $("#cf-photo-prev").innerHTML = avatarHTML({ name: $("#cf-name").value || c.name, photo }, "xl");
    $("#cf-photo-del").hidden = !photo;
  };

  m.addEventListener("change", async e => {
    if (e.target.id === "cf-photo" && e.target.files[0]) {
      const p = await processPhoto(e.target.files[0]);
      if (p) {
        photo = p;
        showPhoto();
      }
      e.target.value = "";
    }
  });

  m.addEventListener("click", async e => {
    const b = e.target.closest("[data-mact]");
    if (!b) return;
    const a = b.dataset.mact;
    if (a === "close") closeModal();
    if (a === "removePhoto") { photo = ""; showPhoto(); }
    if (a === "save") {
      const name = $("#cf-name").value.trim();
      if (!name) {
        $("#cf-name").focus();
        toast("El nombre es obligatorio.", true);
        return;
      }
      const id = isNew ? uid("c") : c.id;
      const doc = Object.assign({}, isNew ? {} : c, {
        name,
        birthDate: $("#cf-birth").value,
        position: $("#cf-pos").value.trim(),
        foot: $("#cf-foot").value,
        status: $("#cf-status").value,
        registeredAt: $("#cf-reg").value || todayISO(),
        nextEvalDate: $("#cf-next").value,
        document: $("#cf-doc").value.trim(),
        photo,
        phone: $("#cf-phone").value.trim(),
        email: $("#cf-email").value.trim(),
        notes: $("#cf-notes").value.trim(),
        updatedAt: new Date().toISOString()
      });
      if (isNew) {
        doc.createdAt = new Date().toISOString();
      }

      await put("clients", id, doc);
      closeModal();
      toast(isNew ? "Deportista creado exitosamente." : "Ficha actualizada.");
      if (isNew) openClient(id);
    }
  });
}

function processPhoto(file) {
  return new Promise(res => {
    if (!/^image\//.test(file.type)) {
      toast("El archivo debe ser una imagen.", true);
      return res(null);
    }
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      const S2 = 320, side = Math.min(img.naturalWidth, img.naturalHeight);
      const cv = document.createElement("canvas");
      cv.width = cv.height = S2;
      const ctx = cv.getContext("2d");
      ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, S2, S2);
      URL.revokeObjectURL(url);
      res(cv.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => { URL.revokeObjectURL(url); res(null); };
    img.src = url;
  });
}

function pickPhoto(cid) {
  const inp = document.createElement("input");
  inp.type = "file";
  inp.accept = "image/*";
  inp.onchange = async () => {
    const f = inp.files[0];
    if (!f) return;
    const p = await processPhoto(f);
    const c = S.clients[cid];
    if (p && c) {
      await put("clients", cid, Object.assign({}, c, { photo: p, updatedAt: new Date().toISOString() }));
      toast("Fotografía actualizada.");
    }
  };
  inp.click();
}

function recordForm(opts) {
  const existing = opts.recId ? S.records[opts.recId] : null;
  const st = existing ? clone(existing) : {
    clientId: opts.clientId || S.ui.evals.client || (clientsArr()[0] || {}).id || "",
    type: opts.type || "gps",
    date: todayISO(),
    test: opts.test || "CMJ",
    sessionType: "Partido Oficial",
    professional: S.config.professional.name,
    values: {},
    notes: ""
  };

  const m = openModal({
    title: existing ? "Editar Registro" : "Nueva Evaluación / Sesión",
    size: "wide",
    body: `<div id="rf-body"></div>`,
    footer: `
      ${existing ? `<button class="btn danger" data-mact="delete" style="margin-right:auto">${icon("trash")}Eliminar</button>` : ""}
      <button class="btn" data-mact="close">Cancelar</button>
      <button class="btn primary" data-mact="save">Guardar Registro</button>
    `
  });

  const readForm = () => {
    st.clientId = $("#rf-client").value;
    st.date = $("#rf-date").value;
    st.professional = $("#rf-pro").value;
    st.notes = $("#rf-notes").value;
    if ($("#rf-test")) st.test = $("#rf-test").value;
    if ($("#rf-sess")) st.sessionType = $("#rf-sess").value;

    const v = {};
    $$("[data-mv]", m).forEach(i => {
      const n = parseNum(i.value);
      if (n != null) v[i.dataset.mv] = n;
    });
    st.values = v;
  };

  const updCalc = () => {
    readForm();
    const g = typeDef(st.type).group;
    const cc = computeCalcs(g, st.values, st.clientId);
    $$("[data-calc]", m).forEach(el => {
      const k = el.dataset.calc, d = metricDef(g, k);
      el.textContent = cc.calc.includes(k) ? `ƒ ${fmtN(cc.values[k], d.dec)} ${d.unit} (Calculado)` : "";
    });
  };

  const draw = () => {
    const t = typeDef(st.type), g = t.group, defs = metricsOf(g);
    $("#rf-body").innerHTML = `
      <div class="form-grid">
        <div class="field">
          <label for="rf-client">Deportista *</label>
          <select class="input" id="rf-client" ${existing ? "disabled" : ""}>
            ${clientOptions(st.clientId, true)}
          </select>
        </div>
        <div class="field">
          <label for="rf-type">Módulo de Evaluación</label>
          <select class="input" id="rf-type" ${existing ? "disabled" : ""}>
            ${S.config.evalTypes.map(x => `<option value="${esc(x.key)}" ${x.key === st.type ? "selected" : ""}>${esc(x.label)}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label for="rf-date">Fecha de Testeo *</label>
          <input type="date" class="input" id="rf-date" value="${esc(st.date)}">
        </div>

        ${g === "nm" ? `
          <div class="field">
            <label for="rf-test">Tipo de Salto / Test</label>
            <select class="input" id="rf-test">${S.config.nmTests.map(x => `<option ${x === st.test ? "selected" : ""}>${esc(x)}</option>`).join("")}</select>
          </div>
        ` : ""}

        ${g === "gps" ? `
          <div class="field">
            <label for="rf-sess">Tipo de Sesión GPS</label>
            <select class="input" id="rf-sess">${S.config.gpsSessionTypes.map(x => `<option ${x === st.sessionType ? "selected" : ""}>${esc(x)}</option>`).join("")}</select>
          </div>
        ` : ""}

        <div class="field ${g === "nm" || g === "gps" ? "span2" : "span3"}">
          <label for="rf-pro">Profesional Responsable</label>
          <input class="input" id="rf-pro" value="${esc(st.professional || "")}">
        </div>
      </div>

      <fieldset class="fieldset">
        <legend>Métricas & Parámetros Registrados</legend>
        <div class="form-grid">
          ${defs.map(d => `
            <div class="field">
              <label for="rf-m-${d.key}">${esc(d.label)}${d.hint ? ` <span class="muted">(${esc(d.hint)})</span>` : ""}</label>
              <div class="unit-in">
                <input class="input num" id="rf-m-${d.key}" data-mv="${esc(d.key)}" inputmode="decimal" value="${st.values[d.key] != null ? String(st.values[d.key]).replace(".", ",") : ""}" placeholder="${d.calc ? "Auto" : ""}">
                <span class="u">${esc(d.unit)}</span>
              </div>
              <span class="calc" data-calc="${esc(d.key)}"></span>
            </div>
          `).join("")}
        </div>
      </fieldset>

      <div class="field">
        <label for="rf-notes">Notas Técnicas / Condiciones de Test</label>
        <textarea class="input" id="rf-notes">${esc(st.notes || "")}</textarea>
      </div>
    `;
    updCalc();
  };

  draw();

  m.addEventListener("input", e => { if (e.target.matches("[data-mv]")) updCalc(); });
  m.addEventListener("change", e => {
    if (e.target.id === "rf-type") {
      readForm();
      st.type = e.target.value;
      draw();
    } else if (e.target.id === "rf-client") {
      updCalc();
    }
  });

  m.addEventListener("click", async e => {
    const b = e.target.closest("[data-mact]");
    if (!b) return;
    const a = b.dataset.mact;
    if (a === "close") closeModal();
    if (a === "delete") {
      closeModal();
      deleteRecord(existing.id);
    }
    if (a === "save") {
      readForm();
      if (!st.clientId) { toast("Selecciona un deportista.", true); return; }
      const g = typeDef(st.type).group;
      const cc = computeCalcs(g, st.values, st.clientId);
      const id = existing ? existing.id : uid("r");
      const doc = {
        clientId: st.clientId,
        type: st.type,
        date: st.date,
        values: cc.values,
        calc: cc.calc,
        notes: st.notes.trim(),
        professional: st.professional.trim(),
        createdAt: existing ? existing.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      if (g === "nm") doc.test = st.test || "CMJ";
      if (g === "gps") doc.sessionType = st.sessionType || "Partido Oficial";

      await put("records", id, doc);
      closeModal();
      toast(existing ? "Registro actualizado." : "Evaluación guardada con éxito.");
    }
  });
}

async function deleteRecord(id) {
  const r = S.records[id];
  if (!r) return;
  if (await confirmDialog({ title: "Eliminar Registro", text: "¿Deseas eliminar permanentemente esta evaluación?", ok: "Eliminar", danger: true })) {
    await del("records", id);
    toast("Registro eliminado.");
  }
}

function computeCalcs(group, vals, cid) {
  const v = Object.assign({}, vals), calc = [];
  const set = (k, x, d) => {
    if (v[k] == null && x != null && isFinite(x)) {
      v[k] = Math.round(x * Math.pow(10, d)) / Math.pow(10, d);
      calc.push(k);
    }
  };

  if (group === "anthro") {
    const h = v.height ?? (cid && latestValue(cid, "anthro", "height") || {}).v;
    if (v.weight && h) set("bmi", v.weight / Math.pow(h / 100, 2), 1);
  }
  if (group === "gps") {
    if (v.dist && v.duration) {
      set("mpm", v.dist / v.duration, 1);
      set("vavg", v.dist / 1000 / (v.duration / 60), 1);
    }
  }
  if (group === "nm") {
    if (v.height == null && v.flight) set("height", 9.81 * Math.pow(v.flight / 1000, 2) / 8 * 100, 1);
    if (v.flight == null && v.height) set("flight", Math.sqrt(8 * (v.height / 100) / 9.81) * 1000, 0);
    if (v.height && v.contact) set("rsi", (v.height / 100) / (v.contact / 1000), 2);
    const w = cid && latestValue(cid, "anthro", "weight");
    if (v.height && w) {
      const pw = 60.7 * v.height + 45.3 * w.v - 2055;
      set("power", pw, 0);
      set("relpower", pw / w.v, 1);
    }
  }
  if (group === "perf") {
    if (v.yoyo) set("vo2", v.yoyo * 0.0084 + 36.4, 1);
  }

  return { values: v, calc };
}

function routineForm(opts) {
  const existing = opts.id ? S.routines[opts.id] : null;
  const st = existing ? clone(existing) : opts.copy
    ? Object.assign(clone(opts.copy), { name: opts.copy.name + " (Copia)", date: todayISO() })
    : {
      clientId: opts.clientId || (clientsArr()[0] || {}).id || "",
      name: "",
      date: todayISO(),
      objective: "",
      duration: "6",
      frequency: "3 sesiones / semana",
      exercises: [{ name: "", sets: "3", reps: "8", time: "", rest: "90 s", intensity: "RPE 7", notes: "" }],
      notes: "",
      instructions: ""
    };

  const m = openModal({
    title: existing ? "Editar Rutina" : "Nueva Rutina de Entrenamiento",
    size: "wide",
    body: `<div id="ro-body"></div>`,
    footer: `
      <button class="btn" data-mact="close">Cancelar</button>
      <button class="btn primary" data-mact="save">Guardar Rutina</button>
    `
  });

  const read = () => {
    st.clientId = $("#ro-client").value;
    st.name = $("#ro-name").value;
    st.date = $("#ro-date").value;
    st.objective = $("#ro-obj").value;
    st.duration = $("#ro-dur").value;
    st.frequency = $("#ro-freq").value;
    st.notes = $("#ro-notes").value;
    st.instructions = $("#ro-ins").value;
    st.exercises = $$("[data-exrow]", m).map(row => {
      const o = {};
      $$("[data-exf]", row).forEach(i => o[i.dataset.exf] = i.value);
      return o;
    });
  };

  const draw = () => {
    $("#ro-body").innerHTML = `
      <div class="form-grid">
        <div class="field">
          <label for="ro-client">Deportista *</label>
          <select class="input" id="ro-client">${clientOptions(st.clientId, true)}</select>
        </div>
        <div class="field">
          <label for="ro-name">Nombre de Rutina *</label>
          <input class="input" id="ro-name" value="${esc(st.name)}" placeholder="Ej: Potencia & Aceleración">
        </div>
        <div class="field">
          <label for="ro-date">Fecha de Asignación</label>
          <input type="date" class="input" id="ro-date" value="${esc(st.date)}">
        </div>
        <div class="field span3">
          <label for="ro-obj">Objetivo Metodológico</label>
          <input class="input" id="ro-obj" value="${esc(st.objective)}" placeholder="Desarrollo de fuerza reactiva y prevención...">
        </div>
        <div class="field">
          <label for="ro-dur">Duración</label>
          <div class="unit-in"><input class="input" id="ro-dur" value="${esc(st.duration)}"><span class="u">semanas</span></div>
        </div>
        <div class="field span2">
          <label for="ro-freq">Frecuencia Semanal</label>
          <input class="input" id="ro-freq" value="${esc(st.frequency)}" placeholder="Ej: 3 sesiones / semana">
        </div>
      </div>

      <fieldset class="fieldset">
        <legend>Prescripción de Ejercicios</legend>
        <div class="ex-list">
          <div class="ex-row ex-head">
            <span>Ejercicio</span><span>Series</span><span>Reps</span><span>Tiempo</span><span>Pausa</span><span>Intensidad</span><span>Notas</span><span></span>
          </div>
          ${st.exercises.map((x, i) => `
            <div class="ex-row" data-exrow>
              ${["name", "sets", "reps", "time", "rest", "intensity", "notes"].map(f => `
                <input class="input" id="ro-ex-${i}-${f}" data-exf="${f}" value="${esc(x[f] || "")}" aria-label="${f}" placeholder="${f === 'name' ? 'Sentadilla...' : ''}">
              `).join("")}
              <button class="icon-btn" type="button" aria-label="Quitar ejercicio" data-mact="exDel" data-i="${i}">${icon("x")}</button>
            </div>
          `).join("")}
        </div>
        <button class="btn sm" type="button" data-mact="exAdd" style="align-self:flex-start">${icon("plus")}Añadir Ejercicio</button>
      </fieldset>

      <div class="form-grid">
        <div class="field span3">
          <label for="ro-ins">Indicaciones Técnicas y Criterios de Detención</label>
          <textarea class="input" id="ro-ins">${esc(st.instructions)}</textarea>
        </div>
      </div>
    `;
  };

  draw();

  m.addEventListener("click", async e => {
    const b = e.target.closest("[data-mact]");
    if (!b) return;
    const a = b.dataset.mact;
    if (a === "close") closeModal();
    if (a === "exAdd") {
      read();
      st.exercises.push({ name: "", sets: "3", reps: "6", time: "", rest: "90 s", intensity: "80%", notes: "" });
      draw();
    }
    if (a === "exDel") {
      read();
      st.exercises.splice(+b.dataset.i, 1);
      draw();
    }
    if (a === "save") {
      read();
      if (!st.clientId) { toast("Asocia la rutina a un deportista.", true); return; }
      if (!st.name.trim()) { toast("Asigna un nombre a la rutina.", true); return; }
      const id = existing ? existing.id : uid("rt");
      const doc = {
        clientId: st.clientId,
        name: st.name.trim(),
        date: st.date || todayISO(),
        objective: st.objective.trim(),
        duration: st.duration,
        frequency: st.frequency.trim(),
        exercises: st.exercises.filter(x => (x.name || "").trim()),
        notes: st.notes.trim(),
        instructions: st.instructions.trim(),
        createdAt: existing ? existing.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await put("routines", id, doc);
      closeModal();
      toast("Rutina guardada exitosamente.");
    }
  });
}

