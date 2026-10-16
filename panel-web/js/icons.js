/* ==========================================================================
   5. RENDERIZADOR DE ICONOS Y NAVEGACIÓN
   ========================================================================= */
const IC = {
  dashboard: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  clients: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><circle cx="17" cy="9" r="2.6"/><path d="M17 14.3c2.4.2 4 1.8 4.5 4.7"/>',
  evals: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="m8.5 12.5 2.2 2.2 4.8-4.8"/>',
  routines: '<path d="M3 9.5v5M6 7v10M18 7v10M21 9.5v5M6 12h12"/>',
  gps: '<circle cx="12" cy="10" r="3"/><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/>',
  nm: '<path d="M3 12h4l2.5-6 4 13 2.5-7H21"/>',
  reports: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6M9 9h2"/>',
  config: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>', trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  back: '<path d="M15 18l-6-6 6-6"/>', download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>',
  power: '<path d="M12 3v9"/><path d="M6.4 6.6a8 8 0 1 0 11.2 0"/>', compare: '<path d="M7 4v16M17 4v16M3 8h8M13 16h8"/>', history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 3"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  upload: '<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>', alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  whatsapp: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  sun: '<circle cx="12" cy="12" r="3.8" stroke-width="2.2"/><path d="M12 2.2v2.5M12 19.3v2.5M2.2 12h2.5M19.3 12h2.5M5.07 5.07l1.77 1.77M17.16 17.16l1.77 1.77M5.07 18.93l1.77-1.77M17.16 6.84l1.77-1.77" stroke-width="2.2"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-width="2.2"/>'
};

const icon = (n, cls) => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="icon-svg ${cls || ""}">${IC[n] || ""}</svg>`;

function themeToggleBtnHTML(extraCls = "") {
  return `
    <button class="theme-toggle-btn ${extraCls}" data-act="toggleTheme" title="Alternar Modo Claro / Oscuro" aria-label="Cambiar tema de color">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon-sun" aria-hidden="true">
        <circle cx="12" cy="12" r="3.8"/>
        <path d="M12 2.2v2.5M12 19.3v2.5M2.2 12h2.5M19.3 12h2.5M5.07 5.07l1.77 1.77M17.16 17.16l1.77 1.77M5.07 18.93l1.77-1.77M17.16 6.84l1.77-1.77"/>
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon-moon" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </button>
  `;
}

const avatarHTML = (c, cls) =>
  c && c.photo
    ? `<span class="avatar photo ${cls || ""}" role="img" aria-label="Foto de ${esc(c.name)}" style="background-image:url('${c.photo}')"></span>`
    : `<span class="avatar ${cls || ""}">${esc(initials(c && c.name))}</span>`;

function getNavGroups() {
  const userIsAdmin = isAdmin();

  return [
    {
      type: "item",
      page: "dashboard",
      title: "Inicio",
      icon: "dashboard"
    },
    userIsAdmin ? {
      type: "group",
      id: "grp_admin",
      title: "Administración & Cobros",
      icon: "config",
      items: [
        { page: "admin-memberships", title: "Membresías & Pagos", icon: "calendar" },
        { page: "chats", title: "Chats & WhatsApp", icon: "whatsapp" },
        { page: "gym", title: "Agenda & Cupos", icon: "calendar" }
      ]
    } : {
      type: "item",
      page: "gym",
      title: "Agenda & Cupos",
      icon: "calendar"
    },
    {
      type: "group",
      id: "grp_athletes",
      title: "Atletas & Físico",
      icon: "clients",
      items: [
        { page: "clients", title: "Deportistas", icon: "clients" },
        { page: "evals", title: "Evaluaciones", icon: "evals" },
        { page: "routines", title: "Rutinas", icon: "routines" }
      ]
    },
    {
      type: "group",
      id: "grp_science",
      title: "Ciencia & Datos",
      icon: "gps",
      items: [
        { page: "gps", title: "GPS & Cinemática", icon: "gps" },
        { page: "nm", title: "Perfil Neuromuscular", icon: "nm" },
        { page: "match", title: "Planillas de Partido", icon: "evals" },
        { page: "import", title: "Importar Excel / GPS", icon: "upload" }
      ]
    },
    {
      type: "item",
      page: "reports",
      title: "Informes & Decks",
      icon: "reports"
    }
  ];
}

const NAV_BOTTOM_ITEM = {
  page: "config",
  title: "Configuración",
  icon: "config"
};

function isItemActive(page, currentPage) {
  if (!currentPage) return page === "dashboard";
  if (page === currentPage) return true;
  if (page === "clients" && currentPage === "client") return true;
  if (page === "reports" && (currentPage === "report-view" || currentPage === "competition-deck")) return true;
  if (page === "admin-memberships" && currentPage === "admin-memberships") return true;
  return false;
}

function isGroupOpen(grp) {
  if (S.ui && S.ui.openNavGroups && typeof S.ui.openNavGroups[grp.id] === "boolean") {
    return S.ui.openNavGroups[grp.id];
  }
  const currentPage = S.view ? S.view.page : "dashboard";
  if (grp.items && grp.items.some(it => isItemActive(it.page, currentPage))) {
    return true;
  }
  return false;
}

const NAV = [
  ["dashboard", "Inicio", "dashboard"],
  ["admin-memberships", "Membresías & Pagos", "calendar"],
  ["chats", "Chats & WhatsApp", "whatsapp"],
  ["gym", "Agenda & Gimnasio", "calendar"],
  ["clients", "Deportistas", "clients"],
  ["evals", "Evaluaciones", "evals"],
  ["routines", "Rutinas", "routines"],
  ["gps", "GPS & Cinemática", "gps"],
  ["nm", "Perfil Neuromuscular", "nm"],
  ["match", "Planillas de Partido", "evals"],
  ["import", "Importar Excel / GPS", "upload"],
  ["reports", "Informes", "reports"],
  ["config", "Configuración", "config"]
];

function go(page, extra) {
  S.view = Object.assign({ page }, extra || {});
  window.scrollTo(0, 0);
  render();
}

function openClient(id, tab) {
  go("client", { clientId: id, tab: tab || "summary" });
}

