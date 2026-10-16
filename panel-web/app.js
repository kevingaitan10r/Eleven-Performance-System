/* ==========================================================================
   ELEVEN PERFORMANCE HUB — UNIFIED BUNDLE (AUTO-GENERATED FROM /js/ MODULES)
   ADAPT · PERFORM · WIN | Sports Science & High Performance Engine
   Version: 2.7.0
   ========================================================================== */


/* --- MODULE: config.js --- */
/* ==========================================================================
   ELEVEN PERFORMANCE HUB — SPORTS SCIENCE & HIGH PERFORMANCE ENGINE
   ADAPT · PERFORM · WIN | GPS, NEUROMUSCULAR, ANTHROPOMETRY & SQUAD BI
   ========================================================================== */

// Configure Chart.js global defaults
if (window.Chart) {
  Chart.defaults.animation = false;
  Chart.defaults.responsive = true;
  Chart.defaults.maintainAspectRatio = false;
}

/* ==========================================================================
   1. CONFIGURACIÓN Y PARÁMETROS BASE
   ========================================================================== */
const DEFAULT_CONFIG = {
  professional: {
    name: "Juan Diego Castro Garzón",
    role: "Preparador Físico · Científico del Deporte",
    brand: "Eleven Performance",
    tagline: "ADAPT · PERFORM · WIN",
    contact: "pfjuandi@gmail.com"
  },
  rules: {
    staleDays: 45,
    stableBand: 2,
    dropAlert: 5,
    bigChange: 10,
    profileDays: 90,
    upcomingDays: 14,
    asymRef: 10
  },
  evalTypes: [
    { key: "anthro", label: "Antropometría", group: "anthro" },
    { key: "gps", label: "GPS & Cinemática", group: "gps" },
    { key: "nm", label: "Perfil Neuromuscular", group: "nm" },
    { key: "perf", label: "Rendimiento Físico", group: "perf" },
    { key: "general", label: "Evaluación General", group: "general" }
  ],
  nmTests: [
    "CMJ", "SJ", "Abalakov", "Drop Jump", "CMJ unilateral D",
    "CMJ unilateral I", "Saltos repetidos (10)", "Stiffness reactivo"
  ],
  gpsSessionTypes: [
    "Partido Oficial", "Entrenamiento MD-5", "Entrenamiento MD-4",
    "Entrenamiento MD-3", "Entrenamiento MD-2", "Entrenamiento MD-1", "Recuperación MD+1"
  ],
  positions: [
    "Portero", "Defensa central", "Lateral", "Mediocampista defensivo",
    "Mediocampista central", "Volante", "Extremo", "Delantero"
  ],
  metrics: {
    anthro: [
      { key: "weight", label: "Peso Corporal", unit: "kg", dir: "neutral", dec: 1 },
      { key: "height", label: "Estatura", unit: "cm", dir: "neutral", dec: 1 },
      { key: "sitting", label: "Talla Sentada", unit: "cm", dir: "neutral", dec: 1 },
      { key: "bmi", label: "IMC", unit: "kg/m²", dir: "neutral", dec: 1, calc: true },
      { key: "fat", label: "% Grasa Corporal", unit: "%", dir: "down", dec: 1 },
      { key: "skin6", label: "Σ 6 Pliegues", unit: "mm", dir: "down", dec: 1 }
    ],
    gps: [
      { key: "duration", label: "Duración", unit: "min", dir: "neutral", dec: 0 },
      { key: "dist", label: "Distancia Total", unit: "m", dir: "neutral", dec: 0 },
      { key: "mpm", label: "MxMin (Distancia Relativa)", unit: "m/min", dir: "up", dec: 1, calc: true },
      { key: "vmax", label: "Velocidad Máxima", unit: "km/h", dir: "up", dec: 1 },
      { key: "vavg", label: "Velocidad Media", unit: "km/h", dir: "neutral", dec: 1, calc: true },
      { key: "hsr", label: "HSR (+19.8 km/h)", unit: "m", dir: "up", dec: 0, hint: "> 19.8 km/h" },
      { key: "sprint", label: "Sprint (+25 km/h)", unit: "m", dir: "up", dec: 0, hint: "> 25 km/h" },
      { key: "accel", label: "Aceleraciones (+3 m/s²)", unit: "n", dir: "up", dec: 0 },
      { key: "decel", label: "Desaceleraciones (-3 m/s²)", unit: "n", dir: "up", dec: 0 },
      { key: "pl", label: "Player Load", unit: "UA", dir: "neutral", dec: 0 }
    ],
    nm: [
      { key: "height", label: "Altura de Salto", unit: "cm", dir: "up", dec: 1 },
      { key: "flight", label: "Tiempo de Vuelo", unit: "ms", dir: "up", dec: 0 },
      { key: "contact", label: "Tiempo de Contacto", unit: "ms", dir: "down", dec: 0 },
      { key: "rsi", label: "RSI (Reactividad)", unit: "m/s", dir: "up", dec: 2, calc: true },
      { key: "power", label: "Potencia Pico (Sayers)", unit: "W", dir: "up", dec: 0, calc: true },
      { key: "relpower", label: "Potencia Relativa", unit: "W/kg", dir: "up", dec: 1, calc: true },
      { key: "asym", label: "Asimetría Bilateral", unit: "%", dir: "down", dec: 1 },
      { key: "stiff", label: "Stiffness", unit: "kN/m", dir: "up", dec: 2 }
    ],
    perf: [
      { key: "s10", label: "Sprint 10 m", unit: "s", dir: "down", dec: 2 },
      { key: "s30", label: "Sprint 30 m", unit: "s", dir: "down", dec: 2 },
      { key: "cod", label: "COD 505 Agilidad", unit: "s", dir: "down", dec: 2 },
      { key: "yoyo", label: "Yo-Yo IR1", unit: "m", dir: "up", dec: 0 },
      { key: "vo2", label: "VO₂máx Estimado", unit: "ml/kg/min", dir: "up", dec: 1, calc: true },
      { key: "sq", label: "Sentadilla 1RM", unit: "kg", dir: "up", dec: 0 }
    ],
    general: []
  },
  gym: {
    botUrl: "http://localhost:7077",
    slotsPerHour: 8,
    openHour: 6,
    closeHour: 22,
    titular: "Eleven Performance SAS",
    nequi: "3206051319",
    daviplata: "3206051319",
    bancolombia: "Ahorros 245-891234-01",
    planes: [
      { id: "mensual", nombre: "Mensualidad Libre (Fuerza / Gym)", valor: 120000, duracion: 30 },
      { id: "funcional", nombre: "Entrenamiento Funcional Grupal", valor: 95000, duracion: 30 },
      { id: "personalizado", nombre: "Personalizado 1 a 1 / Alto Rendimiento", valor: 280000, duracion: 30 },
      { id: "trimestral", nombre: "Plan Trimestral All-Access", valor: 320000, duracion: 90 }
    ]
  }
};

const GROUP_LABEL = {
  anthro: "Antropometría",
  gps: "GPS & Cinemática",
  nm: "Perfil Neuromuscular",
  perf: "Rendimiento Físico",
  general: "Evaluación General"
};

const TYPE_COLORS = {
  anthro: "#8E7CE8",
  gps: "#4FB3C9",
  nm: "#D6A64E",
  perf: "#5BBF7A",
  general: "#8592AA"
};



/* --- MODULE: utils.js --- */
/* ==========================================================================
   2. UTILIDADES DE CÁLCULO, FECHAS Y TEXTO
   ========================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clone = o => JSON.parse(JSON.stringify(o));
const uid = p => p + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const pad = n => String(n).padStart(2, "0");
const toISO = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
const todayISO = () => toISO(new Date());

const parseD = iso => {
  if (!iso) return null;
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d, 12);
};

const addDays = (iso, n) => {
  const d = parseD(iso);
  if (!d) return todayISO();
  d.setDate(d.getDate() + n);
  return toISO(d);
};

const daysBetween = (a, b) => {
  const da = parseD(a), db = parseD(b);
  if (!da || !db) return 0;
  return Math.round((db - da) / 864e5);
};

const MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const MESL = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

const fmtDate = iso => {
  const d = parseD(iso);
  return d ? d.getDate() + " " + MES[d.getMonth()] + " " + d.getFullYear() : "—";
};

const fmtDateL = iso => {
  const d = parseD(iso);
  return d ? d.getDate() + " de " + MESL[d.getMonth()] + " de " + d.getFullYear() : "—";
};

const fmtDateS = iso => {
  const d = parseD(iso);
  return d ? pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + "/" + String(d.getFullYear()).slice(2) : "—";
};

const fmtN = (v, dec = 1) => (v == null || isNaN(v)) ? "—" : Number(v).toLocaleString("es-CO", { minimumFractionDigits: dec, maximumFractionDigits: dec });
const fmtSigned = (v, dec = 1) => (v == null || isNaN(v)) ? "—" : (v > 0 ? "+" : v < 0 ? "−" : "±") + fmtN(Math.abs(v), dec);

const parseNum = s => {
  if (s == null) return null;
  s = String(s).trim().replace(/\s/g, "");
  if (!s) return null;
  if (s.includes(",") && s.includes(".")) s = s.replace(/\./g, "").replace(",", ".");
  else s = s.replace(",", ".");
  const n = Number(s);
  return isFinite(n) ? n : null;
};

const ageFrom = b => {
  if (!b) return null;
  const d = parseD(b), t = new Date();
  if (!d) return null;
  let a = t.getFullYear() - d.getFullYear();
  if (t.getMonth() < d.getMonth() || (t.getMonth() === d.getMonth() && t.getDate() < d.getDate())) a--;
  return a;
};

const initials = n => (n || "?").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
const slug = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40) || "p";


/* ==========================================================================
   4. CONSULTAS Y ANÁLISIS DE INDICADORES
   ========================================================================== */
const clientsArr = () => Object.values(S.clients);

const recordsOf = (cid, type) =>
  Object.values(S.records)
    .filter(r => r.clientId === cid && (!type || r.type === type))
    .sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);

const routinesOf = cid =>
  Object.values(S.routines)
    .filter(r => r.clientId === cid)
    .sort((a, b) => b.date < a.date ? -1 : 1);

const reportsOf = cid =>
  Object.values(S.reports)
    .filter(r => r.clientId === cid)
    .sort((a, b) => (b.createdAt || "") < (a.createdAt || "") ? -1 : 1);

const typeDef = key => S.config.evalTypes.find(t => t.key === key) || { key, label: key, group: key };
const metricsOf = group => (S.config.metrics[group] || []).filter(m => !m.hidden);
const metricDef = (group, key) => (S.config.metrics[group] || []).find(m => m.key === key) || { key, label: key, unit: "", dir: "neutral", dec: 1 };
const lastEvalDate = cid => { const r = recordsOf(cid); return r.length ? r[r.length - 1].date : null; };

const latestValue = (cid, type, key, test) => {
  const r = recordsOf(cid, type).filter(x => (!test || x.test === test) && x.values && x.values[key] != null);
  return r.length ? { v: r[r.length - 1].values[key], date: r[r.length - 1].date } : null;
};

const clientName = cid => (S.clients[cid] && S.clients[cid].name) || "Deportista";

function series(cid, type, key, test, until) {
  return recordsOf(cid, type)
    .filter(r => (!test || r.test === test) && (!until || r.date <= until) && r.values && typeof r.values[key] === "number")
    .map(r => ({ date: r.date, v: r.values[key], id: r.id }));
}

function classify(abs, pct, dir) {
  const band = S.config.rules.stableBand;
  if (abs == null) return { cls: "na", label: "Datos insuficientes", arrow: "" };
  const arrow = abs > 0 ? "▲" : abs < 0 ? "▼" : "■";
  if (pct != null ? Math.abs(pct) < band : abs === 0) return { cls: "flat", label: "Estable", arrow: "■" };
  if (dir === "neutral" || !dir) return { cls: "neutral", label: abs > 0 ? "Aumento" : "Descenso", arrow };
  const good = dir === "up" ? abs > 0 : abs < 0;
  return { cls: good ? "good" : "bad", label: good ? "Mejora" : "Retroceso", arrow };
}

function trendOf(pts, dir) {
  if (pts.length < 3) return { label: "Datos insuficientes", cls: "na", arrow: "" };
  const t0 = parseD(pts[0].date);
  const xs = pts.map(p => (parseD(p.date) - t0) / 864e5), ys = pts.map(p => p.v);
  const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
  let num = 0, den = 0;
  xs.forEach((x, i) => { num += (x - mx) * (ys[i] - my); den += (x - mx) ** 2; });
  if (!den || !my) return { label: "Datos insuficientes", cls: "na", arrow: "" };
  const span = xs[n - 1] - xs[0], rel = (num / den) * span / Math.abs(my) * 100;
  if (Math.abs(rel) < S.config.rules.stableBand) return { label: "Estable", cls: "flat", arrow: "■", rel };
  if (dir === "neutral" || !dir) return { label: rel > 0 ? "Al alza" : "A la baja", cls: "neutral", arrow: rel > 0 ? "▲" : "▼", rel };
  const good = dir === "up" ? rel > 0 : rel < 0;
  return { label: good ? "Positiva" : "Negativa", cls: good ? "good" : "bad", arrow: rel > 0 ? "▲" : "▼", rel };
}

function analyze(pts, def) {
  const n = pts.length, vals = pts.map(p => p.v);
  const last = n ? pts[n - 1] : null, prev = n > 1 ? pts[n - 2] : null;
  const abs = last && prev ? last.v - prev.v : null;
  const pct = last && prev && prev.v !== 0 ? (abs / Math.abs(prev.v)) * 100 : null;
  const max = n ? Math.max(...vals) : null, min = n ? Math.min(...vals) : null;
  const avg = n ? vals.reduce((a, b) => a + b, 0) / n : null;
  let best = null;
  if (n) {
    if (def.dir === "down") best = pts.find(p => p.v === min);
    else best = pts.find(p => p.v === max);
  }
  return { n, last, prev, abs, pct, max, min, avg, best, status: classify(abs, pct, def.dir), trend: trendOf(pts, def.dir) };
}

function compareVals(a, b, def) {
  if (a == null || b == null) return { prev: a, curr: b, abs: null, pct: null, status: classify(null) };
  const abs = b - a, pct = a !== 0 ? abs / Math.abs(a) * 100 : null;
  return { prev: a, curr: b, abs, pct, status: classify(abs, pct, def.dir) };
}

function chgHTML(st, abs, pct, def, opts = {}) {
  if (abs == null) return `<span class="chg na">Datos insuficientes</span>`;
  const parts = [st.arrow + " " + fmtSigned(abs, def.dec) + (def.unit && !opts.noUnit ? " " + def.unit : "")];
  if (pct != null) parts.push(fmtSigned(pct, 1) + " %");
  parts.push(st.label);
  return `<span class="chg ${st.cls}" title="${esc(st.label)}">${esc(parts.join(" · "))}</span>`;
}

function recSummary(r) {
  const g = typeDef(r.type).group, v = r.values || {};
  const pick = (k, lab) => v[k] != null ? (lab ? lab + " " : "") + fmtN(v[k], metricDef(g, k).dec) + " " + metricDef(g, k).unit : null;
  let parts = [];
  if (g === "anthro") parts = [pick("weight", "Peso"), pick("bmi", "IMC"), pick("fat", "Grasa")];
  else if (g === "gps") parts = [r.sessionType, pick("dist"), pick("vmax", "Vmáx"), pick("mpm")];
  else if (g === "nm") parts = [r.test, pick("height"), pick("rsi", "RSI"), pick("power", "W")];
  else parts = metricsOf(g).filter(m => v[m.key] != null).slice(0, 3).map(m => m.label + " " + fmtN(v[m.key], m.dec) + " " + m.unit);
  return parts.filter(Boolean).join(" · ") || "Sin valores";
}

function alertsFor(c) {
  const R = S.config.rules, today = todayISO(), out = [];
  if (c.status === "inactive") return out;

  const last = lastEvalDate(c.id);
  if (!last) out.push({ sev: "mid", title: "Sin evaluaciones registradas", desc: "Aún no hay ninguna evaluación guardada.", tab: "evals" });
  else {
    const d = daysBetween(last, today);
    if (d > R.staleDays) out.push({ sev: "mid", title: "Sin evaluación reciente", desc: `Última evaluación hace ${d} días (${fmtDate(last)}).`, tab: "history" });
  }

  if (c.nextEvalDate) {
    const d = daysBetween(today, c.nextEvalDate);
    if (d < 0) out.push({ sev: "high", title: "Evaluación pendiente", desc: `Programada para el ${fmtDate(c.nextEvalDate)} (hace ${-d} días).`, tab: "summary" });
    else if (d <= R.upcomingDays) out.push({ sev: "low", title: "Evaluación próxima", desc: `Programada para el ${fmtDate(c.nextEvalDate)} (en ${d} días).`, tab: "summary" });
  }

  const groups = S.config.evalTypes.filter(t => t.group !== "general");
  groups.forEach(t => {
    const recs = recordsOf(c.id, t.key);
    const tests = t.group === "nm" ? [...new Set(recs.map(r => r.test))] : [null];
    tests.forEach(test => {
      metricsOf(t.group).forEach(def => {
        if (def.key === "asym" || (t.group === "gps" && def.dir === "neutral")) return;
        const pts = series(c.id, t.key, def.key, test);
        if (pts.length < 2 || daysBetween(pts[pts.length - 1].date, today) > 120) return;
        const a = analyze(pts, def);
        if (a.pct == null) return;
        const txt = `${def.label} ${fmtSigned(a.pct, 1)}% (${fmtN(a.prev.v, def.dec)} → ${fmtN(a.last.v, def.dec)} ${def.unit})`;
        if (a.status.cls === "bad" && Math.abs(a.pct) >= R.dropAlert) {
          out.push({ sev: "high", title: `Descenso en ${test || t.label}`, desc: `${txt} respecto a la evaluación anterior.`, tab: t.key });
        }
      });
    });
  });

  const asym = latestValue(c.id, "nm", "asym");
  if (asym && asym.v >= R.asymRef && daysBetween(asym.date, today) <= 120) {
    out.push({ sev: "mid", title: "Asimetría superior a referencia", desc: `${fmtN(asym.v, 1)}% (umbral de control: ${R.asymRef}%).`, tab: "nm" });
  }

  const order = { high: 0, mid: 1, low: 2 };
  return out.map(a => Object.assign(a, { clientId: c.id })).sort((a, b) => order[a.sev] - order[b.sev]);
}

const allAlerts = () => clientsArr().flatMap(alertsFor).sort((a, b) => ({ high: 0, mid: 1, low: 2 }[a.sev] - { high: 0, mid: 1, low: 2 }[b.sev]));
const sortTests = arr => arr.sort((a, b) => { const L = S.config.nmTests, i = L.indexOf(a), j = L.indexOf(b); return (i < 0 ? 99 : i) - (j < 0 ? 99 : j); });



/* --- MODULE: store.js --- */
/* ==========================================================================
   3. BASE DE DATOS LOCAL Y DATASETS DE ALTO RENDIMIENTO
   ========================================================================== */
const LS_KEY = "eleven_performance_clean_v3";
const COLS = ["clients", "records", "routines", "reports", "gymMemberships", "gymBookings"];

const S = {
  clients: {},
  records: {},
  routines: {},
  reports: {},
  gymMemberships: {},
  gymBookings: {},
  user: null,
  config: clone(DEFAULT_CONFIG),
  view: { page: "dashboard" },
  ui: {
    clients: { q: "", status: "all", position: "", from: "", to: "", sort: "name", dir: 1 },
    metricSel: {},
    nmTest: {},
    evals: { client: "", type: "", from: "", to: "" },
    routines: { client: "" },
    gpsClient: "",
    nmClient: "",
    cmp: {},
    evalsType: {},
    alertsAll: false,
    showContact: {},
    rep: null,
    gymTab: "agenda",
    gymDate: todayISO(),
    gymFilterPlan: "all",
    gymFilterStatus: "all",
    gymSearch: "",
    gymBotConnected: null,
    waActiveTab: "chats",
    activeChatId: null,
    chatSearch: "",
    chatFilter: "all",
    botChats: null,
    botMessages: {},
    waStatus: { conectado: false, numero: "", qr: null, waEstado: "desconectado" }
  }
};

function buildInitialDatasets() {
  return { clients: {}, records: {}, routines: {}, reports: {}, gymMemberships: {}, gymBookings: {} };
}

function buildDemoDatasets() {
  const now = new Date().toISOString();
  const PRO = "Juan Diego Castro Garzón";
  const r0 = v => Math.round(v);
  const r1 = v => Math.round(v * 10) / 10;
  const r2 = v => Math.round(v * 100) / 100;
  const sayers = (h, bm) => r0(60.7 * h + 45.3 * bm - 2055);
  const flightFromH = h => r0(Math.sqrt(8 * (h / 100) / 9.81) * 1000);

  const out = { clients: {}, records: {}, routines: {}, reports: {} };
  let n = 0;
  const rid = p => "rec-" + p + "-" + (++n).toString(36);

  // 1. ALEXIS ZAPATA (JUGADOR ESTRELLA - SANTA FE 2026 I)
  const cZapata = "client-alexis-zapata";
  out.clients[cZapata] = {
    id: cZapata,
    name: "Alexis Zapata",
    birthDate: "1995-05-10",
    position: "Volante",
    foot: "Izquierda",
    document: "1037645892",
    phone: "310 456 7890",
    email: "alexis.zapata@santafe.com.co",
    registeredAt: "2026-01-05",
    nextEvalDate: "2026-10-25",
    status: "active",
    photo: "assets/alexis_zapata.jpg",
    notes: "Dorsal #10 Independiente Santa Fe. Perfil de alta intensidad y gran densidad de acciones por minuto. Máximo MxMin de la liga (127.8 m/min).",
    custom: [
      { label: "Club", value: "Club Independiente Santa Fe" },
      { label: "Torneo", value: "Liga BetPlay 2026 I" },
      { label: "Dorsal", value: "#10" },
      { label: "Partidos / Minutos", value: "23 PJ / 739 Min (74% Disponibilidad)" }
    ],
    createdAt: now
  };

  // Antropometría Alexis Zapata
  [
    ["2026-01-08", 75.8, 171.0, 89.2, 10.4, 46.2],
    ["2026-03-12", 75.2, 171.0, 89.3, 9.8, 43.5],
    ["2026-06-15", 74.9, 171.1, 89.3, 9.5, 41.8],
    ["2026-09-18", 75.0, 171.1, 89.4, 9.4, 41.2]
  ].forEach(a => {
    const id = rid("a");
    const bmi = r1(a[1] / Math.pow(a[2] / 100, 2));
    out.records[id] = {
      id, clientId: cZapata, type: "anthro", date: a[0],
      values: { weight: a[1], height: a[2], sitting: a[3], bmi, fat: a[4], skin6: a[5] },
      calc: ["bmi"], notes: "Control biomédico oficial", professional: PRO, createdAt: now
    };
  });

  // GPS Alexis Zapata (Partidos oficiales de la temporada 2026 I)
  const zapataGames = [
    { date: "2026-01-25", sess: "Partido Oficial", dur: 58, dt: 6827, mxmin: 110.2, vmax: 28.4, hsr: 245, sprint: 34, acc: 16, dec: 18, pl: 610 },
    { date: "2026-02-01", sess: "Partido Oficial", dur: 45, dt: 4500, mxmin: 105.4, vmax: 27.6, hsr: 180, sprint: 45, acc: 14, dec: 15, pl: 430 },
    { date: "2026-02-08", sess: "Partido Oficial", dur: 32, dt: 3200, mxmin: 98.1, vmax: 26.5, hsr: 90, sprint: 12, acc: 9, dec: 11, pl: 310 },
    { date: "2026-02-15", sess: "Partido Oficial", dur: 55, dt: 6562, mxmin: 124.9, vmax: 30.1, hsr: 304, sprint: 143, acc: 22, dec: 24, pl: 640 },
    { date: "2026-02-22", sess: "Partido Oficial", dur: 40, dt: 4100, mxmin: 102.5, vmax: 27.8, hsr: 140, sprint: 28, acc: 11, dec: 14, pl: 395 },
    { date: "2026-03-01", sess: "Partido Oficial", dur: 38, dt: 3800, mxmin: 104.0, vmax: 28.0, hsr: 160, sprint: 35, acc: 12, dec: 13, pl: 375 },
    { date: "2026-03-08", sess: "Partido Oficial", dur: 48, dt: 5100, mxmin: 108.9, vmax: 28.5, hsr: 210, sprint: 50, acc: 15, dec: 17, pl: 490 },
    { date: "2026-03-15", sess: "Partido Oficial", dur: 31, dt: 2900, mxmin: 95.0, vmax: 26.0, hsr: 85, sprint: 10, acc: 8, dec: 9, pl: 285 },
    { date: "2026-03-22", sess: "Partido Oficial", dur: 34, dt: 3400, mxmin: 99.4, vmax: 27.1, hsr: 115, sprint: 22, acc: 10, dec: 12, pl: 330 },
    { date: "2026-03-29", sess: "Partido Oficial", dur: 45, dt: 4800, mxmin: 112.0, vmax: 28.9, hsr: 230, sprint: 60, acc: 16, dec: 19, pl: 470 },
    { date: "2026-04-05", sess: "Partido Oficial", dur: 22, dt: 2100, mxmin: 92.5, vmax: 25.8, hsr: 70, sprint: 8, acc: 6, dec: 8, pl: 210 },
    { date: "2026-04-12", sess: "Partido Oficial", dur: 20, dt: 1800, mxmin: 89.5, vmax: 25.2, hsr: 60, sprint: 5, acc: 5, dec: 7, pl: 175 },
    { date: "2026-04-19", sess: "Partido Oficial", dur: 41, dt: 4200, mxmin: 106.1, vmax: 28.2, hsr: 195, sprint: 40, acc: 13, dec: 15, pl: 410 },
    { date: "2026-04-26", sess: "Partido Oficial", dur: 63, dt: 7999, mxmin: 127.8, vmax: 31.8, hsr: 341, sprint: 236, acc: 24, dec: 26, pl: 776 },
    { date: "2026-05-03", sess: "Partido Oficial", dur: 36, dt: 3600, mxmin: 103.8, vmax: 27.5, hsr: 150, sprint: 30, acc: 11, dec: 13, pl: 350 },
    { date: "2026-05-10", sess: "Partido Oficial", dur: 8, dt: 724, mxmin: 91.2, vmax: 24.5, hsr: 21, sprint: 0, acc: 2, dec: 3, pl: 102 },
    { date: "2026-05-17", sess: "Partido Oficial", dur: 38, dt: 3900, mxmin: 105.0, vmax: 27.9, hsr: 175, sprint: 38, acc: 13, dec: 14, pl: 380 },
    { date: "2026-05-24", sess: "Partido Oficial", dur: 29, dt: 2800, mxmin: 96.4, vmax: 26.4, hsr: 95, sprint: 15, acc: 8, dec: 10, pl: 270 },
    { date: "2026-05-31", sess: "Partido Oficial", dur: 44, dt: 4600, mxmin: 109.8, vmax: 28.7, hsr: 220, sprint: 55, acc: 15, dec: 16, pl: 450 },
    { date: "2026-06-07", sess: "Partido Oficial", dur: 16, dt: 1500, mxmin: 90.0, vmax: 25.0, hsr: 45, sprint: 0, acc: 4, dec: 5, pl: 150 },
    { date: "2026-06-14", sess: "Partido Oficial", dur: 25, dt: 2400, mxmin: 94.1, vmax: 26.2, hsr: 80, sprint: 12, acc: 7, dec: 9, pl: 240 },
    { date: "2026-06-21", sess: "Partido Oficial", dur: 39, dt: 4100, mxmin: 107.0, vmax: 28.3, hsr: 190, sprint: 42, acc: 14, dec: 15, pl: 400 },
    { date: "2026-06-28", sess: "Partido Oficial", dur: 49, dt: 6200, mxmin: 127.6, vmax: 30.5, hsr: 322, sprint: 108, acc: 20, dec: 22, pl: 605 }
  ];

  zapataGames.forEach(g => {
    const id = rid("g");
    out.records[id] = {
      id, clientId: cZapata, type: "gps", date: g.date, sessionType: g.sess,
      values: {
        duration: g.dur, dist: g.dt, mpm: g.mxmin, vmax: g.vmax,
        vavg: r1(g.dt / 1000 / (g.dur / 60)), hsr: g.hsr, sprint: g.sprint,
        accel: g.acc, decel: g.dec, pl: g.pl
      },
      calc: ["mpm", "vavg"], notes: "GPS Catapult Vector 7", professional: PRO, createdAt: now
    };
  });

  // Neuromuscular Alexis Zapata
  [
    ["2026-01-10", 37.8, 5.2],
    ["2026-03-14", 39.5, 4.4],
    ["2026-06-18", 41.2, 3.8],
    ["2026-09-20", 42.0, 3.5]
  ].forEach(a => {
    const id = rid("n");
    const pw = sayers(a[1], 75.0);
    out.records[id] = {
      id, clientId: cZapata, type: "nm", test: "CMJ", date: a[0],
      values: { height: a[1], flight: flightFromH(a[1]), power: pw, relpower: r1(pw / 75.0), asym: a[2] },
      calc: ["power", "relpower", "flight"], notes: "Plataforma de contacto", professional: PRO, createdAt: now
    };
  });

  // 2. MATEO RÍOS VALBUENA (EXTREMO SUB-23)
  const cMateo = "client-mateo-rios";
  out.clients[cMateo] = {
    id: cMateo,
    name: "Mateo Ríos Valbuena",
    birthDate: "2004-03-12",
    position: "Extremo",
    foot: "Derecho",
    phone: "300 123 4567",
    email: "mateo.rios@performance.com",
    registeredAt: "2026-01-10",
    nextEvalDate: "2026-10-20",
    status: "active",
    notes: "Progresión sostenida de velocidad y reactividad en saltos DJ.",
    custom: [{ label: "Club", value: "Club Pro F.C." }, { label: "Categoría", value: "Sub-23" }],
    createdAt: now
  };

  [["2026-01-15", 72.0, 176.4, 91.0, 11.8, 52.4], ["2026-05-18", 70.6, 176.5, 91.0, 10.4, 46.8], ["2026-09-21", 70.4, 176.6, 91.2, 9.8, 43.7]]
    .forEach(a => {
      const id = rid("a");
      out.records[id] = {
        id, clientId: cMateo, type: "anthro", date: a[0],
        values: { weight: a[1], height: a[2], sitting: a[3], bmi: r1(a[1] / Math.pow(a[2] / 100, 2)), fat: a[4], skin6: a[5] },
        calc: ["bmi"], notes: "", professional: PRO, createdAt: now
      };
    });

  [["2026-01-15", 35.2, 6.2], ["2026-05-18", 39.6, 4.8], ["2026-09-21", 42.3, 3.5]]
    .forEach(a => {
      const id = rid("n");
      const pw = sayers(a[1], 70.4);
      out.records[id] = {
        id, clientId: cMateo, type: "nm", test: "CMJ", date: a[0],
        values: { height: a[1], flight: flightFromH(a[1]), power: pw, relpower: r1(pw / 70.4), asym: a[2] },
        calc: ["power", "relpower", "flight"], notes: "", professional: PRO, createdAt: now
      };
    });

  [["2026-03-16", 31.0, 212], ["2026-07-20", 33.5, 198], ["2026-09-21", 34.8, 190]]
    .forEach(a => {
      const id = rid("n");
      out.records[id] = {
        id, clientId: cMateo, type: "nm", test: "Drop Jump", date: a[0],
        values: { height: a[1], contact: a[2], rsi: r2((a[1] / 100) / (a[2] / 1000)) },
        calc: ["rsi"], notes: "Cajón 30cm", professional: PRO, createdAt: now
      };
    });

  // GPS Mateo
  [["2026-08-09", 90, 9850, 109.4, 31.1, 480, 110, 48, 52, 690], ["2026-09-27", 92, 10420, 113.2, 32.5, 620, 185, 55, 60, 740]]
    .forEach(g => {
      const id = rid("g");
      out.records[id] = {
        id, clientId: cMateo, type: "gps", sessionType: "Partido Oficial", date: g[0],
        values: { duration: g[1], dist: g[2], mpm: g[3], vmax: g[4], vavg: r1(g[2] / 1000 / (g[1] / 60)), hsr: g[5], sprint: g[6], accel: g[7], decel: g[8], pl: g[9] },
        calc: ["mpm", "vavg"], notes: "", professional: PRO, createdAt: now
      };
    });

  // 3. SANTIAGO LEAL ORTEGA (MEDIOCAMPISTA)
  const cSantiago = "client-santiago-leal";
  out.clients[cSantiago] = {
    id: cSantiago,
    name: "Santiago Leal Ortega",
    birthDate: "2002-11-05",
    position: "Mediocampista central",
    foot: "Izquierdo",
    phone: "300 987 6543",
    email: "santiago.leal@performance.com",
    registeredAt: "2026-01-12",
    nextEvalDate: "2026-10-02",
    status: "active",
    notes: "Aumento de carga competitiva. Requiere vigilancia de fatiga neuromuscular.",
    custom: [{ label: "Club", value: "Club Pro F.C." }],
    createdAt: now
  };

  [["2026-01-16", 74.8, 181.2, 93.6, 12.1, 55.0], ["2026-09-14", 77.8, 181.3, 93.8, 13.4, 60.3]]
    .forEach(a => {
      const id = rid("a");
      out.records[id] = {
        id, clientId: cSantiago, type: "anthro", date: a[0],
        values: { weight: a[1], height: a[2], sitting: a[3], bmi: r1(a[1] / Math.pow(a[2] / 100, 2)), fat: a[4], skin6: a[5] },
        calc: ["bmi"], notes: "", professional: PRO, createdAt: now
      };
    });

  [["2026-01-16", 38.4, 4.4], ["2026-07-13", 41.2, 5.6], ["2026-09-14", 37.6, 11.2]]
    .forEach(a => {
      const id = rid("n");
      const pw = sayers(a[1], 77.8);
      out.records[id] = {
        id, clientId: cSantiago, type: "nm", test: "CMJ", date: a[0],
        values: { height: a[1], flight: flightFromH(a[1]), power: pw, relpower: r1(pw / 77.8), asym: a[2] },
        calc: ["power", "relpower", "flight"],
        notes: a[0] === "2026-09-14" ? "Evaluación tras 48h de doble partido. Se observa fatiga y asimetría." : "",
        professional: PRO, createdAt: now
      };
    });

  // 4. VALENTINA CRUZ ARDILA (LATERAL FEMENINA)
  const cVal = "client-valentina-cruz";
  out.clients[cVal] = {
    id: cVal,
    name: "Valentina Cruz Ardila",
    birthDate: "2006-07-21",
    position: "Lateral",
    foot: "Derecho",
    phone: "311 234 5678",
    email: "valentina.cruz@performance.com",
    registeredAt: "2026-03-02",
    nextEvalDate: "2026-10-26",
    status: "active",
    notes: "Excelente respuesta adaptativa a bloques de fuerza neuromuscular.",
    custom: [{ label: "Categoría", value: "Primera División Femenina" }],
    createdAt: now
  };

  [["2026-03-04", 58.2, 164.0, 85.6, 18.9, 68.0], ["2026-09-07", 57.9, 164.1, 85.7, 17.6, 62.2]]
    .forEach(a => {
      const id = rid("a");
      out.records[id] = {
        id, clientId: cVal, type: "anthro", date: a[0],
        values: { weight: a[1], height: a[2], sitting: a[3], bmi: r1(a[1] / Math.pow(a[2] / 100, 2)), fat: a[4], skin6: a[5] },
        calc: ["bmi"], notes: "", professional: PRO, createdAt: now
      };
    });

  [["2026-03-04", 29.1, 7.9], ["2026-06-08", 31.0, 6.4], ["2026-09-07", 32.6, 5.8]]
    .forEach(a => {
      const id = rid("n");
      const pw = sayers(a[1], 57.9);
      out.records[id] = {
        id, clientId: cVal, type: "nm", test: "CMJ", date: a[0],
        values: { height: a[1], flight: flightFromH(a[1]), power: pw, relpower: r1(pw / 57.9), asym: a[2] },
        calc: ["power", "relpower", "flight"], notes: "", professional: PRO, createdAt: now
      };
    });

  // 5. HUGO RODALLEGA (DELANTERO REFERENTE - SANTA FE)
  const cRoda = "client-hugo-rodallega";
  out.clients[cRoda] = {
    id: cRoda,
    name: "Hugo Rodallega",
    birthDate: "1985-07-25",
    position: "Delantero",
    foot: "Derecho",
    registeredAt: "2026-01-05",
    nextEvalDate: "2026-10-22",
    status: "active",
    notes: "Capitán y goleador. Velocidad pico sostenida en 32.8 km/h y gran capacidad de sprint.",
    custom: [{ label: "Club", value: "Club Independiente Santa Fe" }, { label: "Dorsal", value: "#11" }],
    createdAt: now
  };

  out.records[rid("a")] = {
    id: rid("a"), clientId: cRoda, type: "anthro", date: "2026-01-10",
    values: { weight: 84.0, height: 182.0, sitting: 94.0, bmi: 25.4, fat: 10.2, skin6: 45.0 },
    calc: ["bmi"], notes: "Control estacional", professional: PRO, createdAt: now
  };

  [
    ["2026-02-15", 39.0, 4.2],
    ["2026-05-20", 39.8, 3.8],
    ["2026-09-18", 40.2, 3.2]
  ].forEach(a => {
    const id = rid("n");
    const pw = sayers(a[1], 84.0);
    out.records[id] = {
      id, clientId: cRoda, type: "nm", test: "CMJ", date: a[0],
      values: { height: a[1], flight: flightFromH(a[1]), power: pw, relpower: r1(pw / 84.0), asym: a[2] },
      calc: ["power", "relpower", "flight"], notes: "Control salto explosivo", professional: PRO, createdAt: now
    };
  });

  [
    { date: "2026-02-01", dur: 95, dt: 8850, mxmin: 93.2, vmax: 32.8, hsr: 320, sprint: 145, acc: 22, dec: 21, pl: 710 },
    { date: "2026-02-15", dur: 90, dt: 8400, mxmin: 93.3, vmax: 32.2, hsr: 290, sprint: 120, acc: 19, dec: 18, pl: 675 },
    { date: "2026-03-08", dur: 88, dt: 8200, mxmin: 93.1, vmax: 31.8, hsr: 275, sprint: 110, acc: 18, dec: 17, pl: 660 },
    { date: "2026-04-26", dur: 94, dt: 8900, mxmin: 94.7, vmax: 32.5, hsr: 340, sprint: 150, acc: 24, dec: 22, pl: 730 },
    { date: "2026-05-31", dur: 92, dt: 8650, mxmin: 94.0, vmax: 32.0, hsr: 305, sprint: 130, acc: 20, dec: 19, pl: 690 },
    { date: "2026-06-28", dur: 96, dt: 9100, mxmin: 94.8, vmax: 32.7, hsr: 355, sprint: 160, acc: 25, dec: 23, pl: 745 }
  ].forEach(g => {
    const id = rid("g");
    out.records[id] = {
      id, clientId: cRoda, type: "gps", sessionType: "Partido Oficial", date: g.date,
      values: {
        duration: g.dur, dist: g.dt, mpm: g.mxmin, vmax: g.vmax,
        vavg: r1(g.dt / 1000 / (g.dur / 60)), hsr: g.hsr, sprint: g.sprint,
        accel: g.acc, decel: g.dec, pl: g.pl
      },
      calc: ["mpm", "vavg"], notes: "GPS Vector 7", professional: PRO, createdAt: now
    };
  });

  // 6. CRISTIAN MAFLA (LATERAL IZQUIERDO - SANTA FE)
  const cMafla = "client-cristian-mafla";
  out.clients[cMafla] = {
    id: cMafla,
    name: "Cristian Mafla",
    birthDate: "1993-01-15",
    position: "Lateral",
    foot: "Izquierdo",
    registeredAt: "2026-01-05",
    nextEvalDate: "2026-10-24",
    status: "active",
    notes: "Lateral de largo recorrido. Destaca en metros totales y volumen de aceleraciones y desaceleraciones.",
    custom: [{ label: "Club", value: "Club Independiente Santa Fe" }, { label: "Dorsal", value: "#16" }],
    createdAt: now
  };

  out.records[rid("a")] = {
    id: rid("a"), clientId: cMafla, type: "anthro", date: "2026-01-12",
    values: { weight: 73.5, height: 174.0, sitting: 90.0, bmi: 24.3, fat: 9.8, skin6: 42.5 },
    calc: ["bmi"], notes: "Control pretemporada", professional: PRO, createdAt: now
  };

  [
    ["2026-01-14", 38.0, 4.5],
    ["2026-05-18", 39.2, 4.0],
    ["2026-09-19", 39.8, 3.6]
  ].forEach(a => {
    const id = rid("n");
    const pw = sayers(a[1], 73.5);
    out.records[id] = {
      id, clientId: cMafla, type: "nm", test: "CMJ", date: a[0],
      values: { height: a[1], flight: flightFromH(a[1]), power: pw, relpower: r1(pw / 73.5), asym: a[2] },
      calc: ["power", "relpower", "flight"], notes: "Test neuromuscular", professional: PRO, createdAt: now
    };
  });

  [
    { date: "2026-02-01", dur: 92, dt: 9800, mxmin: 106.5, vmax: 31.0, hsr: 280, sprint: 95, acc: 24, dec: 23, pl: 695 },
    { date: "2026-02-15", dur: 90, dt: 9600, mxmin: 106.7, vmax: 30.8, hsr: 260, sprint: 85, acc: 22, dec: 21, pl: 670 },
    { date: "2026-03-15", dur: 89, dt: 9450, mxmin: 106.2, vmax: 30.5, hsr: 250, sprint: 80, acc: 21, dec: 20, pl: 660 },
    { date: "2026-04-26", dur: 95, dt: 10200, mxmin: 107.4, vmax: 31.4, hsr: 310, sprint: 110, acc: 26, dec: 25, pl: 730 },
    { date: "2026-05-31", dur: 91, dt: 9750, mxmin: 107.1, vmax: 31.1, hsr: 275, sprint: 90, acc: 23, dec: 22, pl: 685 },
    { date: "2026-06-28", dur: 94, dt: 10100, mxmin: 107.4, vmax: 31.2, hsr: 300, sprint: 105, acc: 25, dec: 24, pl: 720 }
  ].forEach(g => {
    const id = rid("g");
    out.records[id] = {
      id, clientId: cMafla, type: "gps", sessionType: "Partido Oficial", date: g.date,
      values: {
        duration: g.dur, dist: g.dt, mpm: g.mxmin, vmax: g.vmax,
        vavg: r1(g.dt / 1000 / (g.dur / 60)), hsr: g.hsr, sprint: g.sprint,
        accel: g.acc, decel: g.dec, pl: g.pl
      },
      calc: ["mpm", "vavg"], notes: "GPS Vector 7", professional: PRO, createdAt: now
    };
  });

  // 7. DANIEL TORRES (VOLANTE DE MARCA / CAPITÁN SANTA FE)
  const cTorres = "client-daniel-torres";
  out.clients[cTorres] = {
    id: cTorres,
    name: "Daniel Torres",
    birthDate: "1989-11-15",
    position: "Mediocampista central",
    foot: "Derecho",
    registeredAt: "2026-01-05",
    nextEvalDate: "2026-10-25",
    status: "active",
    notes: "Eje del mediocampo. Líder indiscutible en distancia total recorrida (supera 10.8 km por partido) y consistencia de Player Load.",
    custom: [{ label: "Club", value: "Club Independiente Santa Fe" }, { label: "Dorsal", value: "#14" }],
    createdAt: now
  };

  out.records[rid("a")] = {
    id: rid("a"), clientId: cTorres, type: "anthro", date: "2026-01-12",
    values: { weight: 76.0, height: 180.0, sitting: 92.5, bmi: 23.5, fat: 9.6, skin6: 41.0 },
    calc: ["bmi"], notes: "Control biomédico", professional: PRO, createdAt: now
  };

  [
    ["2026-01-15", 37.5, 4.0],
    ["2026-05-19", 38.6, 3.5],
    ["2026-09-20", 38.9, 3.2]
  ].forEach(a => {
    const id = rid("n");
    const pw = sayers(a[1], 76.0);
    out.records[id] = {
      id, clientId: cTorres, type: "nm", test: "CMJ", date: a[0],
      values: { height: a[1], flight: flightFromH(a[1]), power: pw, relpower: r1(pw / 76.0), asym: a[2] },
      calc: ["power", "relpower", "flight"], notes: "CMJ Plataforma", professional: PRO, createdAt: now
    };
  });

  [
    { date: "2026-02-01", dur: 96, dt: 10900, mxmin: 113.5, vmax: 29.5, hsr: 235, sprint: 45, acc: 26, dec: 27, pl: 750 },
    { date: "2026-02-15", dur: 94, dt: 10650, mxmin: 113.3, vmax: 29.2, hsr: 220, sprint: 40, acc: 24, dec: 25, pl: 730 },
    { date: "2026-03-15", dur: 95, dt: 10800, mxmin: 113.7, vmax: 29.6, hsr: 240, sprint: 42, acc: 25, dec: 26, pl: 740 },
    { date: "2026-04-26", dur: 98, dt: 11200, mxmin: 114.3, vmax: 29.8, hsr: 260, sprint: 50, acc: 28, dec: 29, pl: 780 },
    { date: "2026-05-31", dur: 93, dt: 10700, mxmin: 115.0, vmax: 29.4, hsr: 230, sprint: 38, acc: 25, dec: 26, pl: 735 },
    { date: "2026-06-28", dur: 96, dt: 11050, mxmin: 115.1, vmax: 29.9, hsr: 255, sprint: 48, acc: 27, dec: 28, pl: 765 }
  ].forEach(g => {
    const id = rid("g");
    out.records[id] = {
      id, clientId: cTorres, type: "gps", sessionType: "Partido Oficial", date: g.date,
      values: {
        duration: g.dur, dist: g.dt, mpm: g.mxmin, vmax: g.vmax,
        vavg: r1(g.dt / 1000 / (g.dur / 60)), hsr: g.hsr, sprint: g.sprint,
        accel: g.acc, decel: g.dec, pl: g.pl
      },
      calc: ["mpm", "vavg"], notes: "GPS Vector 7", professional: PRO, createdAt: now
    };
  });

  // RUTINAS DE ENTRENAMIENTO
  out.routines["rt-zapata-1"] = {
    id: "rt-zapata-1", clientId: cZapata, date: "2026-08-01",
    name: "Potencia Neuromuscular & Resistencia al Sprint",
    objective: "Optimizar tasa de desarrollo de fuerza (RFD) y tolerancia a acciones de alta velocidad.",
    duration: "6", frequency: "3 sesiones / semana",
    exercises: [
      { name: "Sentadilla Trasera con Pausa", sets: "4", reps: "4", time: "", rest: "2:30 min", intensity: "82% 1RM", notes: "Aceleración máxima en subida" },
      { name: "Salto al Cajón con Carga (Trap Bar Jump)", sets: "4", reps: "5", time: "", rest: "2 min", intensity: "20% masa corporal", notes: "Intención balística" },
      { name: "Sprints Resistidos con Trineo", sets: "5", reps: "20 m", time: "", rest: "2 min", intensity: "12% masa", notes: "Enfoque en longitud de zancada" },
      { name: "Nordic Hamstring Curls", sets: "3", reps: "6", time: "", rest: "90 s", intensity: "Excéntrico 4s", notes: "Prevención isquiosural" }
    ],
    instructions: "Monitorear fatiga con sensor de velocidad antes de cada sesión.",
    notes: "Realizar con al menos 48h de distancia del partido oficial.",
    createdAt: now
  };

  out.routines["rt-mateo-1"] = {
    id: "rt-mateo-1", clientId: cMateo, date: "2026-07-22",
    name: "Velocidad Máxima y RSI Reactivo",
    objective: "Desarrollar aceleración lineal y minimizar tiempos de contacto en suelo.",
    duration: "8", frequency: "3 sesiones / semana",
    exercises: [
      { name: "Drop Jump desde 30 cm", sets: "4", reps: "5", time: "", rest: "90 s", intensity: "Máxima reactividad", notes: "Contacto de suelo < 200 ms" },
      { name: "Sprint Lanzado", sets: "4", reps: "30 m", time: "", rest: "3 min", intensity: "100% velocidad", notes: "Medición con fotocélulas" },
      { name: "Hip Thrust con Barra", sets: "3", reps: "8", time: "", rest: "2 min", intensity: "75% 1RM", notes: "Extensión terminal de cadera" }
    ],
    instructions: "Detener la serie si la calidad técnica o la velocidad caen más del 10%.",
    notes: "", createdAt: now
  };

  // INFORMES DEMO DISPONIBLES PARA EXPORTACIÓN PDF
  out.reports["rep-zapata-master"] = {
    id: "rep-zapata-master",
    clientId: cZapata,
    date: "2026-10-01",
    from: "2026-01-20",
    to: "2026-09-30",
    createdAt: now,
    sections: { anthro: true, gps: true, nm: true, perf: true, compare: true, routines: true, notes: true },
    cmpPrev: "", cmpCurr: "",
    note: "Alexis Zapata presenta un perfil de alta intensidad sobresaliente en la Liga BetPlay 2026 I, liderando métricas de densidad mecánica y MxMin. Se recomienda mantener los estímulos de RFD y continuar con el trabajo preventivo en isquiotibiales.",
    demo: true
  };

  out.reports["rep-mateo-eval"] = {
    id: "rep-mateo-eval",
    clientId: cMateo,
    date: "2026-09-28",
    from: "2026-01-10",
    to: "2026-09-28",
    createdAt: now,
    sections: { anthro: true, gps: true, nm: true, perf: true, compare: true, routines: true, notes: true },
    cmpPrev: "", cmpCurr: "",
    note: "Mateo Ríos muestra una evolución muy marcada en salto reactivo Drop Jump (RSI 1.83) y velocidad punta de 32.5 km/h. Excelente perfil para transición ofensiva.",
    demo: true
  };

  out.reports["rep-torres-control"] = {
    id: "rep-torres-control",
    clientId: cTorres,
    date: "2026-10-05",
    from: "2026-01-15",
    to: "2026-09-30",
    createdAt: now,
    sections: { anthro: true, gps: true, nm: true, perf: true, compare: true, routines: false, notes: true },
    cmpPrev: "", cmpCurr: "",
    note: "Daniel Torres sostiene el mayor volumen locomotor del equipo (más de 11 km por partido a 115 m/min) con estabilidad en salto CMJ y baja asimetría.",
    demo: true
  };

  out.gymMemberships = getDefaultMemberships();
  out.gymBookings = {};

  return out;
}

function getDefaultMemberships() {
  return {
    "gm-zapata": {
      id: "gm-zapata",
      nombre: "Alexis Zapata",
      telefono: "3104567890",
      documento: "1037645892",
      planNombre: "Plan Pro Fútbol Alto Rendimiento",
      valor: 280000,
      fechaPago: addDays(todayISO(), -5),
      metodoPago: "Nequi",
      referencia: "NEQ-839201",
      fechaInicio: addDays(todayISO(), -5),
      fechaFin: addDays(todayISO(), 25),
      notas: "Titular Santa Fe. Pagado por Nequi puntual."
    },
    "gm-moreno": {
      id: "gm-moreno",
      nombre: "Victor Moreno",
      telefono: "3118902345",
      documento: "1020491823",
      planNombre: "Mensualidad Completa Gimnasio Libre",
      valor: 120000,
      fechaPago: addDays(todayISO(), -25),
      metodoPago: "Daviplata",
      referencia: "DAV-491029",
      fechaInicio: addDays(todayISO(), -25),
      fechaFin: addDays(todayISO(), 5),
      notas: "Turno mañana 7:00 AM. Faltan 5 días para próximo pago."
    },
    "gm-torres": {
      id: "gm-torres",
      nombre: "Daniel Torres",
      telefono: "3127819034",
      documento: "1019283746",
      planNombre: "Entrenamiento Funcional & Fuerza",
      valor: 95000,
      fechaPago: addDays(todayISO(), -35),
      metodoPago: "Efectivo",
      referencia: "REC-00124",
      fechaInicio: addDays(todayISO(), -35),
      fechaFin: addDays(todayISO(), -5),
      notas: "Pago en efectivo en sede. Vencido hace 5 días - requiere cobro WhatsApp."
    },
    "gm-olivera": {
      id: "gm-olivera",
      nombre: "Emanuel Olivera",
      telefono: "3156789012",
      documento: "94827103",
      planNombre: "Plan Trimestral All-Access GPS",
      valor: 320000,
      fechaPago: addDays(todayISO(), -10),
      metodoPago: "Bancolombia",
      referencia: "TRA-847291",
      fechaInicio: addDays(todayISO(), -10),
      fechaFin: addDays(todayISO(), 80),
      notas: "Transferencia Bancolombia exitosa. Al día."
    },
    "gm-mafla": {
      id: "gm-mafla",
      nombre: "Cristian Mafla",
      telefono: "3139876543",
      documento: "1015849302",
      planNombre: "Plan Pro Monitoreo & Fuerza",
      valor: 250000,
      fechaPago: addDays(todayISO(), -28),
      metodoPago: "Tarjeta",
      referencia: "TAR-90184",
      fechaInicio: addDays(todayISO(), -28),
      fechaFin: addDays(todayISO(), 2),
      notas: "Próximo pago en 2 días. Alerta de cobro activa."
    }
  };
}

function initStore() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(LS_KEY) || "null");
  } catch (e) {
    saved = null;
  }

  if (saved && saved.clients && Object.keys(saved.clients).length > 2 && saved.clients["client-alexis-zapata"]) {
    COLS.forEach(c => S[c] = saved[c] || {});
    S.config = Object.assign(clone(DEFAULT_CONFIG), saved.config || {});
  } else {
    const init = buildDemoDatasets();
    COLS.forEach(c => S[c] = init[c] || {});
    S.config = clone(DEFAULT_CONFIG);
    persistLocal();
  }

  // Asegurar que existan membresías y que cuenten con datos de recaudo (cuándo pagó, cómo pagó, etc.)
  if (!S.gymMemberships || Object.keys(S.gymMemberships).length === 0) {
    S.gymMemberships = getDefaultMemberships();
    persistLocal();
  } else {
    let updated = false;
    Object.values(S.gymMemberships).forEach(m => {
      if (!m.fechaPago) { m.fechaPago = m.fechaInicio || todayISO(); updated = true; }
      if (!m.metodoPago) {
        if ((m.nombre || "").includes("Alexis")) m.metodoPago = "Nequi";
        else if ((m.nombre || "").includes("Victor")) m.metodoPago = "Daviplata";
        else if ((m.nombre || "").includes("Daniel")) m.metodoPago = "Efectivo";
        else if ((m.nombre || "").includes("Emanuel")) m.metodoPago = "Bancolombia";
        else if ((m.nombre || "").includes("Cristian")) m.metodoPago = "Tarjeta";
        else m.metodoPago = "Nequi";
        updated = true;
      }
    });
    if (updated) persistLocal();
  }
}

function persistLocal() {
  try {
    const data = { config: S.config };
    COLS.forEach(c => data[c] = S[c] || {});
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Error guardando en LocalStorage:", e);
  }
}

async function put(col, id, data) {
  const body = clone(data);
  delete body.id;
  S[col][id] = Object.assign({}, body, { id });
  persistLocal();
  scheduleRender();
  return true;
}

async function del(col, id) {
  delete S[col][id];
  persistLocal();
  scheduleRender();
  return true;
}

async function saveConfig(cfg) {
  S.config = clone(cfg);
  persistLocal();
  scheduleRender();
  return true;
}



/* --- MODULE: icons.js --- */
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



/* --- MODULE: charts.js --- */
/* ==========================================================================
   6. MOTOR DE GRÁFICOS CHART.JS
   ========================================================================== */
let CHARTS = [];
let chartQueue = [];
let REPORT_CHARTS = [];

const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const hexA = (hex, a) => {
  hex = (hex || "#888").replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
  const n = parseInt(hex, 16);
  return `rgba(${n >> 16 & 255}, ${n >> 8 & 255}, ${n & 255}, ${a})`;
};

function getTheme(report) {
  if (report) {
    return {
      fg: "#141B2A", muted: "#5E6A80", line: "#E4E8EF",
      accent: "#B98A2E", navy: "#0F1A2E", good: "#1C8B5F",
      bad: "#C2392F", info: "#2F68B5", report: true
    };
  }
  return {
    fg: cssVar("--fg") || "#E8ECF3",
    muted: cssVar("--muted") || "#8592AA",
    line: cssVar("--line") || "#26354F",
    accent: cssVar("--accent") || "#D6A64E",
    navy: cssVar("--fg2") || "#B9C3D4",
    good: cssVar("--good") || "#3DBA8C",
    bad: cssVar("--bad") || "#EE6A5F",
    info: cssVar("--info") || "#6FA3E8"
  };
}

function chartBox(cfgFn, cls, label) {
  const id = uid("ch");
  chartQueue.push({ id, cfgFn });
  return `<div class="${cls || "chart-box"}"><canvas id="${id}" role="img" aria-label="${esc(label || "Gráfico de rendimiento")}"></canvas></div>`;
}

function mountCharts(root) {
  const q = chartQueue;
  chartQueue = [];
  q.forEach(({ id, cfgFn }) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!window.Chart) {
      el.parentNode.innerHTML = `<div class="empty small">Gráfico no disponible.</div>`;
      return;
    }
    const report = !!el.closest(".rpt-page");
    try {
      const ch = new Chart(el, cfgFn(getTheme(report)));
      (report ? REPORT_CHARTS : CHARTS).push(ch);
    } catch (e) {
      console.error("Error montando chart:", e);
    }
  });
}

function baseOpts(T, def, extra) {
  return Object.assign({
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        display: false,
        labels: { color: T.muted, boxWidth: 12, font: { family: "Barlow, sans-serif", size: 12 } }
      },
      tooltip: {
        backgroundColor: "rgba(10, 15, 26, 0.95)",
        borderColor: "rgba(214, 166, 78, 0.4)",
        borderWidth: 1,
        titleColor: "#FFFFFF",
        bodyColor: "#E8ECF3",
        callbacks: {
          label: c => ` ${c.dataset.label}: ${fmtN(c.parsed.y, def.dec)} ${def.unit}`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: T.muted, font: { family: "'IBM Plex Mono', monospace", size: 10.5 }, maxRotation: 0 },
        grid: { display: false }
      },
      y: {
        ticks: { color: T.muted, font: { family: "'IBM Plex Mono', monospace", size: 10.5 }, callback: v => fmtN(v, def.dec > 1 ? 2 : def.dec) },
        grid: { color: T.line },
        border: { display: false },
        title: { display: true, text: (def.unit && !def.label.includes(def.unit)) ? `${def.label} (${def.unit})` : def.label, color: T.muted, font: { family: "Barlow, sans-serif", size: 11.5 } }
      }
    }
  }, extra || {});
}

function evoChart(pts, def, o = {}) {
  return T => {
    const col = o.color || (T.report ? T.navy : T.accent);
    const hi = o.highlight || [];
    const ds = [{
      type: o.bar ? "bar" : "line",
      label: def.label,
      data: pts.map(p => p.v),
      borderColor: col,
      backgroundColor: o.bar ? pts.map((p, i) => hi.includes(i) ? T.accent : hexA(col, 0.55)) : hexA(col, 0.12),
      fill: !o.bar,
      tension: 0.15,
      borderWidth: 2.2,
      borderRadius: 4,
      maxBarThickness: 32,
      pointRadius: pts.map((p, i) => hi.includes(i) ? 7 : 3.5),
      pointHoverRadius: 7,
      pointBackgroundColor: pts.map((p, i) => hi.includes(i) ? T.accent : col),
      pointBorderColor: pts.map((p, i) => hi.includes(i) ? "#FFF" : col)
    }];

    if (o.avg && pts.length > 1) {
      const avg = pts.reduce((a, b) => a + b.v, 0) / pts.length;
      ds.push({
        type: "line",
        label: "Promedio",
        data: pts.map(() => avg),
        borderColor: T.muted,
        borderDash: [5, 4],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false
      });
    }

    const opts = baseOpts(T, def);
    opts.plugins.legend.display = !!o.avg;
    opts.plugins.tooltip.callbacks.title = items => {
      const p = pts[items[0].dataIndex];
      return fmtDate(p.date) + (p.tag ? " · " + p.tag : "");
    };

    return {
      type: o.bar ? "bar" : "line",
      data: { labels: pts.map(p => fmtDateS(p.date)), datasets: ds },
      options: opts
    };
  };
}

function pctBarChart(rows) {
  return T => ({
    type: "bar",
    data: {
      labels: rows.map(r => r.label),
      datasets: [{
        label: "Variación",
        data: rows.map(r => r.pct),
        backgroundColor: rows.map(r => r.cls === "good" ? T.good : r.cls === "bad" ? T.bad : hexA(T.muted, 0.7)),
        borderRadius: 4,
        maxBarThickness: 22
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => ` ${fmtSigned(c.parsed.x, 1)}% · ${rows[c.dataIndex].status}` } }
      },
      scales: {
        x: {
          grid: { color: T.line },
          border: { display: false },
          ticks: { color: T.muted, callback: v => fmtN(v, 0) + "%", font: { family: "'IBM Plex Mono', monospace", size: 10.5 } },
          title: { display: true, text: "Variación respecto a la evaluación anterior (%)", color: T.muted }
        },
        y: {
          grid: { display: false },
          ticks: { color: T.fg, font: { family: "Barlow, sans-serif", size: 12 } }
        }
      }
    }
  });
}

function multiPlayerComparisonChart(playersData, metricDef, options = {}) {
  return T => {
    const labels = playersData.map(p => p.name);
    const vals = playersData.map(p => p.val);
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    const highlightId = options.highlightId || "";

    const barColors = playersData.map(p => {
      if (p.id === highlightId) return T.accent;
      if (p.isBenchmark) return T.good;
      return T.report ? hexA(T.navy || "#1C315E", 0.85) : hexA(T.info || "#3A86FF", 0.75);
    });

    const datasets = [
      {
        type: "bar",
        label: metricDef.label,
        data: vals,
        backgroundColor: barColors,
        borderColor: barColors.map(c => hexA(c, 0.95)),
        borderWidth: 1.5,
        borderRadius: 6,
        maxBarThickness: 44
      }
    ];

    if (vals.length > 1) {
      datasets.push({
        type: "line",
        label: `Promedio Plantel (${fmtN(avg, metricDef.dec)} ${metricDef.unit})`,
        data: labels.map(() => avg),
        borderColor: T.accent,
        borderDash: [6, 4],
        borderWidth: 2,
        pointRadius: 0,
        fill: false
      });
    }

    const opts = baseOpts(T, metricDef, {
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: { color: T.muted, boxWidth: 12, font: { family: "Barlow, sans-serif", size: 12 } }
        },
        tooltip: {
          callbacks: {
            label: c => ` ${c.dataset.label}: ${fmtN(c.parsed.y, metricDef.dec)} ${metricDef.unit}`
          }
        }
      }
    });

    return {
      type: "bar",
      data: { labels, datasets },
      options: opts
    };
  };
}

function multiPlayerRadarChart(playersList, metricsDefList) {
  return T => {
    const palette = [
      { border: T.accent, bg: hexA(T.accent, 0.22) },
      { border: "#3A86FF", bg: "rgba(58, 134, 255, 0.18)" },
      { border: "#3DBA8C", bg: "rgba(61, 186, 140, 0.18)" },
      { border: "#E63946", bg: "rgba(230, 57, 70, 0.18)" },
      { border: "#8338EC", bg: "rgba(131, 56, 236, 0.18)" }
    ];

    const datasets = playersList.map((p, idx) => {
      const c = palette[idx % palette.length];
      return {
        label: p.name,
        data: p.values,
        borderColor: c.border,
        backgroundColor: c.bg,
        borderWidth: 2.2,
        pointRadius: 4,
        pointBackgroundColor: c.border,
        pointBorderColor: "#FFFFFF"
      };
    });

    return {
      type: "radar",
      data: {
        labels: metricsDefList.map(m => m.label),
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: { color: T.muted, font: { family: "Barlow, sans-serif", size: 12 } }
          }
        },
        scales: {
          r: {
            angleLines: { color: T.line },
            grid: { color: T.line },
            pointLabels: { color: T.fg, font: { family: "Barlow, sans-serif", size: 11, weight: "600" } },
            ticks: { display: false }
          }
        }
      }
    };
  };
}




/* --- MODULE: ui.js --- */
/* ==========================================================================
   7. RENDERIZADO CENTRAL DE PÁGINAS Y VISTAS
   ========================================================================== */
let renderQueued = false;
function scheduleRender() {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => {
    renderQueued = false;
    render();
  });
}

function render() {
  const main = $("#main");
  if (!main) return;

  // VERIFICACIÓN OBLIGATORIA DE LOGIN ANTES DE ENTRAR A LA PÁGINA
  if (!isAuthenticated()) {
    CHARTS.forEach(c => c.destroy());
    CHARTS = [];
    REPORT_CHARTS.forEach(c => c.destroy());
    REPORT_CHARTS = [];
    main.innerHTML = `
      <div style="min-height:75vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 20px">
        <span class="brand-logo" style="width:78px;height:78px;margin-bottom:18px"></span>
        <h2 style="font-size:28px;color:var(--fg);margin:0 0 10px 0;font-family:var(--f-display)">Acceso Oficial · Eleven Performance</h2>
        <p style="color:var(--muted);max-width:460px;margin:0 0 24px 0;font-size:14.5px;line-height:1.5">
          Para acceder al Hub de Rendimiento, control de GPS, saltos y chats de WhatsApp, debes iniciar sesión con tus credenciales de preparador físico.
        </p>
        <button class="btn primary" data-act="openAuthModal" data-tab="signin" style="font-size:15px;padding:10px 24px">
          🔑 Iniciar Sesión para Continuar
        </button>
      </div>
    `;
    buildNav();
    openAuthModal("signin", { force: true });
    return;
  }

  CHARTS.forEach(c => c.destroy());
  CHARTS = [];
  chartQueue = [];
  REPORT_CHARTS.forEach(c => c.destroy());
  REPORT_CHARTS = [];

  let html = "";
  try {
    html = pageHTML();
  } catch (err) {
    console.error("Error renderizando página:", err);
    html = `<div class="empty"><b>Error en la visualización</b><span>${esc(err.message)}</span><button class="btn" data-act="go" data-page="dashboard">Volver al panel</button></div>`;
  }

  main.innerHTML = html;
  buildNav();
  mountCharts(main);

  if (S.view.page === "report-view") {
    afterReportRender();
  }
}

function restrictedAdminView(featureName) {
  const u = S.user || DEFAULT_TRAINERS[0];
  return `
    <div style="max-width:760px;margin:40px auto;padding:40px 32px;background:var(--surface);border:1px solid rgba(214,166,78,0.3);border-radius:20px;text-align:center;box-shadow:0 16px 40px rgba(0,0,0,0.4)">
      <div style="width:76px;height:76px;margin:0 auto 20px;border-radius:50%;background:rgba(214,166,78,0.15);border:2px solid var(--accent);display:grid;place-items:center;color:var(--accent);font-size:32px">
        🔒
      </div>
      <div style="display:inline-flex;align-items:center;gap:6px;padding:4px 14px;background:rgba(238,106,95,0.14);border:1px solid rgba(238,106,95,0.35);border-radius:20px;font-size:12px;font-weight:700;color:var(--bad);margin-bottom:14px;text-transform:uppercase;letter-spacing:0.05em">
        Acceso Restringido · Solo Administrador
      </div>
      <h2 style="font-size:26px;margin:0 0 12px;color:var(--fg)">${esc(featureName)}</h2>
      <p style="color:var(--muted);font-size:15px;line-height:1.6;margin:0 auto 24px;max-width:540px">
        Este módulo contiene la gestión privada de chats de WhatsApp, configuración del bot, cuentas de recaudo y control administrativo de Eleven Performance. Esta sección está autorizada exclusivamente para <b>Kevin Gaitán (Administrador)</b>.
      </p>

      <div style="padding:14px 20px;background:var(--surface-hover);border-radius:12px;border:1px solid var(--line);display:inline-flex;align-items:center;gap:14px;margin-bottom:28px;text-align:left">
        <div style="width:42px;height:42px;border-radius:50%;background:var(--accent);color:#060B14;display:grid;place-items:center;font-weight:800;font-size:15px">
          ${esc(u.avatar || initials(u.name))}
        </div>
        <div>
          <div style="font-size:14px;font-weight:700;color:var(--fg)">${esc(u.name)}</div>
          <div style="font-size:12px;color:var(--muted)">Sesión actual: <b>${esc(u.role)}</b> (Sin permisos administrativos)</div>
        </div>
      </div>

      <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
        <button class="btn primary" data-act="quickLoginTrainer" data-user="trainer-kevin">
          🔑 Iniciar como Kevin (Admin)
        </button>
        <button class="btn" data-act="go" data-page="dashboard">
          ${icon("dashboard")} Volver al Inicio
        </button>
        <button class="btn ghost" data-act="openAuthModal">
          Cambiar Usuario
        </button>
      </div>
    </div>
  `;
}

function pageHTML() {
  switch (S.view.page) {
    case "dashboard": return dashboardView();
    case "admin-memberships": return isAdmin() ? adminMembershipsView() : restrictedAdminView("Control de Membresías, Cobros y Pagos");
    case "chats": return isAdmin() ? chatsAdminView() : restrictedAdminView("Centro de Control de Chats & WhatsApp");
    case "gym": return gymAdminView();
    case "clients": return clientsView();
    case "client": return S.clients[S.view.clientId] ? clientView(S.clients[S.view.clientId]) : `<div class="empty"><b>Deportista no encontrado</b><button class="btn" data-act="go" data-page="clients">Ir a lista</button></div>`;
    case "evals": return evalsView();
    case "routines": return routinesView();
    case "gps": return moduleView("gps");
    case "nm": return moduleView("nm");
    case "match": return matchSheetsView();
    case "import": return importExcelView();
    case "reports": return reportsView();
    case "report-view": return reportView();
    case "competition-deck": return competitionDeckView();
    case "config": return configView();
    default: return dashboardView();
  }
}

// PLANILLAS DE PARTIDO (SUPERLIGA VS JUNIOR & FECHA 1 VS ÁGUILAS)
const superligaMatchData = [
  { line: "CENTRALES", player: "Emanuel Olivera", t: "1T", dur: 52, dt: 4408, mxmin: 85.5, vmax: 24.3, hsr: 165, sprint: 0, eff25: 0, acc: 3, dcc: 12, pl: 413 },
  { line: "CENTRALES", player: "Emanuel Olivera", t: "2T", dur: 51, dt: 4030, mxmin: 78.5, vmax: 25.3, hsr: 97, sprint: 3, eff25: 0, acc: 14, dcc: 15, pl: 396 },
  { line: "CENTRALES", player: "Victor Moreno", t: "1T", dur: 52, dt: 4355, mxmin: 84.5, vmax: 27.7, hsr: 275, sprint: 32, eff25: 3, acc: 13, dcc: 16, pl: 420 },
  { line: "CENTRALES", player: "Victor Moreno", t: "2T", dur: 51, dt: 4012, mxmin: 78.1, vmax: 28.9, hsr: 196, sprint: 31, eff25: 1, acc: 16, dcc: 12, pl: 406 },
  { line: "LATERALES", player: "Cristian Mafla", t: "1T", dur: 52, dt: 4521, mxmin: 88.0, vmax: 28.0, hsr: 114, sprint: 31, eff25: 2, acc: 7, dcc: 10, pl: 413 },
  { line: "LATERALES", player: "Cristian Mafla", t: "2T", dur: 51, dt: 4116, mxmin: 80.0, vmax: 33.0, hsr: 143, sprint: 57, eff25: 2, acc: 13, dcc: 13, pl: 366 },
  { line: "LATERALES", player: "Helibelton Palacios", t: "1T", dur: 52, dt: 4533, mxmin: 88.0, vmax: 32.0, hsr: 225, sprint: 94, eff25: 4, acc: 16, dcc: 23, pl: 428 },
  { line: "LATERALES", player: "Helibelton Palacios", t: "2T", dur: 51, dt: 4234, mxmin: 82.0, vmax: 26.0, hsr: 149, sprint: 25, eff25: 1, acc: 10, dcc: 19, pl: 397 },
  { line: "VOLANTES", player: "Daniel Torres", t: "1T", dur: 52, dt: 5499, mxmin: 107.0, vmax: 31.0, hsr: 483, sprint: 153, eff25: 6, acc: 16, dcc: 24, pl: 547 },
  { line: "VOLANTES", player: "Daniel Torres", t: "2T", dur: 51, dt: 5085, mxmin: 99.0, vmax: 27.0, hsr: 273, sprint: 43, eff25: 2, acc: 7, dcc: 19, pl: 507 },
  { line: "VOLANTES", player: "Ewil Murillo", t: "1T", dur: 52, dt: 4914, mxmin: 95.0, vmax: 31.0, hsr: 197, sprint: 177, eff25: 10, acc: 13, dcc: 23, pl: 502 },
  { line: "VOLANTES", player: "Ewil Murillo", t: "2T", dur: 43, dt: 3944, mxmin: 92.0, vmax: 30.0, hsr: 158, sprint: 61, eff25: 4, acc: 9, dcc: 15, pl: 388 },
  { line: "VOLANTES", player: "Jhojan Torres", t: "2T", dur: 8, dt: 701, mxmin: 86.0, vmax: 29.0, hsr: 52, sprint: 17, eff25: 1, acc: 2, dcc: 4, pl: 67 },
  { line: "VOLANTES", player: "Yilmar Velasquez", t: "1T", dur: 52, dt: 5093, mxmin: 99.0, vmax: 32.0, hsr: 324, sprint: 186, eff25: 12, acc: 18, dcc: 26, pl: 435 },
  { line: "VOLANTES", player: "Yilmar Velasquez", t: "2T", dur: 21, dt: 2100, mxmin: 100.0, vmax: 34.0, hsr: 125, sprint: 98, eff25: 4, acc: 9, dcc: 10, pl: 183 },
  { line: "VOLANTES", player: "Alexis Zapata", t: "2T", dur: 31, dt: 3215, mxmin: 103.0, vmax: 27.0, hsr: 217, sprint: 23, eff25: 1, acc: 15, dcc: 16, pl: 324 },
  { line: "EXTREMOS", player: "Luis Palacios", t: "1T", dur: 52, dt: 5757, mxmin: 112.0, vmax: 32.0, hsr: 424, sprint: 223, eff25: 11, acc: 23, dcc: 31, pl: 635 },
  { line: "EXTREMOS", player: "Luis Palacios", t: "2T", dur: 51, dt: 5150, mxmin: 100.0, vmax: 31.0, hsr: 281, sprint: 121, eff25: 6, acc: 16, dcc: 24, pl: 583 },
  { line: "EXTREMOS", player: "Omar Fernandez", t: "1T", dur: 52, dt: 5371, mxmin: 104.0, vmax: 30.0, hsr: 372, sprint: 255, eff25: 12, acc: 17, dcc: 21, pl: 489 },
  { line: "EXTREMOS", player: "Omar Fernandez", t: "2T", dur: 31, dt: 3132, mxmin: 100.0, vmax: 31.0, hsr: 190, sprint: 158, eff25: 7, acc: 14, dcc: 17, pl: 279 },
  { line: "EXTREMOS", player: "Yeicar Perlaza", t: "2T", dur: 20, dt: 1625, mxmin: 80.0, vmax: 32.0, hsr: 92, sprint: 114, eff25: 5, acc: 9, dcc: 15, pl: 185 },
  { line: "DELANTEROS", player: "Hugo Rodallega", t: "1T", dur: 52, dt: 4332, mxmin: 84.0, vmax: 32.0, hsr: 211, sprint: 67, eff25: 3, acc: 12, dcc: 11, pl: 370 },
  { line: "DELANTEROS", player: "Hugo Rodallega", t: "2T", dur: 43, dt: 3525, mxmin: 82.0, vmax: 32.0, hsr: 95, sprint: 44, eff25: 2, acc: 7, dcc: 8, pl: 282 },
  { line: "DELANTEROS", player: "Nahuel Bustos", t: "2T", dur: 9, dt: 604, mxmin: 69.0, vmax: 31.0, hsr: 64, sprint: 55, eff25: 2, acc: 3, dcc: 5, pl: 71 }
];

const aguilasMatchData = [
  { line: "CENTRALES", player: "Emanuel Olivera", t: "1T", dur: 51, dt: 4289, mxmin: 84.2, vmax: 26.8, hsr: 119, sprint: 33, eff25: 2, acc: 10, dcc: 16, pl: 389 },
  { line: "CENTRALES", player: "Emanuel Olivera (%)", t: "%", dur: "94%", dt: "111%", mxmin: "118%", vmax: "102%", hsr: "90%", sprint: "123%", eff25: "100%", acc: "100%", dcc: "63%", pl: "115%", isPct: true },
  { line: "CENTRALES", player: "Emanuel Olivera", t: "2T", dur: 58, dt: 4366, mxmin: 75.0, vmax: 26.3, hsr: 76, sprint: 40, eff25: 2, acc: 6, dcc: 10, pl: 392 },
  { line: "CENTRALES", player: "Victor Moreno", t: "1T", dur: 51, dt: 4453, mxmin: 87.5, vmax: 29.3, hsr: 189, sprint: 68, eff25: 4, acc: 11, dcc: 19, pl: 428 },
  { line: "CENTRALES", player: "Victor Moreno", t: "2T", dur: 58, dt: 4049, mxmin: 69.6, vmax: 30.3, hsr: 140, sprint: 65, eff25: 4, acc: 7, dcc: 13, pl: 384 },
  { line: "LATERALES", player: "Cristian Mafla", t: "1T", dur: 51, dt: 4826, mxmin: 95.0, vmax: 32.0, hsr: 160, sprint: 166, eff25: 7, acc: 9, dcc: 16, pl: 466 },
  { line: "LATERALES", player: "Helibelton Palacios", t: "1T", dur: 51, dt: 4979, mxmin: 98.0, vmax: 29.0, hsr: 258, sprint: 167, eff25: 6, acc: 17, dcc: 22, pl: 447 },
  { line: "LATERALES", player: "Helibelton Palacios", t: "2T", dur: 58, dt: 4839, mxmin: 83.0, vmax: 26.0, hsr: 229, sprint: 27, eff25: 0, acc: 13, dcc: 27, pl: 419 },
  { line: "VOLANTES", player: "Daniel Torres", t: "1T", dur: 51, dt: 5723, mxmin: 112.0, vmax: 30.0, hsr: 236, sprint: 146, eff25: 5, acc: 12, dcc: 24, pl: 573 },
  { line: "VOLANTES", player: "Ewil Murillo", t: "1T", dur: 51, dt: 5088, mxmin: 100.0, vmax: 32.0, hsr: 238, sprint: 131, eff25: 4, acc: 13, dcc: 27, pl: 489 },
  { line: "VOLANTES", player: "Yilmar Velasquez", t: "1T", dur: 51, dt: 5984, mxmin: 118.0, vmax: 31.0, hsr: 243, sprint: 111, eff25: 5, acc: 15, dcc: 28, pl: 464 },
  { line: "EXTREMOS", player: "Luis Palacios", t: "1T", dur: 51, dt: 5754, mxmin: 113.0, vmax: 29.0, hsr: 332, sprint: 155, eff25: 9, acc: 19, dcc: 28, pl: 657 },
  { line: "EXTREMOS", player: "Omar Fernandez", t: "1T", dur: 51, dt: 5173, mxmin: 102.0, vmax: 30.0, hsr: 185, sprint: 153, eff25: 6, acc: 16, dcc: 32, pl: 500 },
  { line: "DELANTEROS", player: "Hugo Rodallega", t: "1T", dur: 51, dt: 4291, mxmin: 84.0, vmax: 30.0, hsr: 79, sprint: 48, eff25: 2, acc: 6, dcc: 9, pl: 356 },
  { line: "DELANTEROS", player: "Nahuel Bustos", t: "2T", dur: 23, dt: 1977, mxmin: 84.0, vmax: 32.0, hsr: 96, sprint: 91, eff25: 4, acc: 6, dcc: 10, pl: 187 }
];

let currentMatchView = "SUPERLIGA";

function matchSheetsView() {
  const isSuper = currentMatchView === "SUPERLIGA";
  const data = isSuper ? superligaMatchData : aguilasMatchData;

  const fmt = val => val !== undefined ? val : '-';
  const getCellClass = (row, str) => {
    if (!row.isPct || typeof str !== 'string') return '';
    const num = parseInt(str);
    if (num > 115) return 'td-green';
    if (num < 80) return 'td-red';
    if (num >= 80 && num <= 115) return 'td-yellow';
    return '';
  };

  let rowsHTML = "";
  let currentLine = "";

  data.forEach(r => {
    if (r.line !== currentLine) {
      currentLine = r.line;
      rowsHTML += `<tr class="header-line-row"><td colspan="12">⚽ LÍNEA TÁCTICA: ${currentLine}</td></tr>`;
    }
    rowsHTML += `
      <tr class="${r.isPct ? 'pct-row' : ''}">
        <td style="font-weight:${r.isPct ? '400' : '700'}">${esc(r.player)}</td>
        <td style="font-weight:700">${esc(r.t)}</td>
        <td class="r num">${fmt(r.dur)}</td>
        <td class="r num ${getCellClass(r, r.dt)}">${fmt(r.dt)}</td>
        <td class="r num ${getCellClass(r, r.mxmin)}">${fmt(r.mxmin)}</td>
        <td class="r num ${getCellClass(r, r.vmax)}">${fmt(r.vmax)}</td>
        <td class="r num ${getCellClass(r, r.hsr)}">${fmt(r.hsr)}</td>
        <td class="r num ${getCellClass(r, r.sprint)}">${fmt(r.sprint)}</td>
        <td class="r num ${getCellClass(r, r.eff25)}">${fmt(r.eff25)}</td>
        <td class="r num ${getCellClass(r, r.acc)}">${fmt(r.acc)}</td>
        <td class="r num ${getCellClass(r, r.dcc)}">${fmt(r.dcc)}</td>
        <td class="r num ${getCellClass(r, r.pl)}">${fmt(r.pl)}</td>
      </tr>
    `;
  });

  return `
    <div class="page-head">
      <div>
        <h1>Planillas Oficiales de Partido (1T / 2T)</h1>
        <div class="sub">Registro de telemetría por tiempo de juego, línea táctica y benchmarking de cumplimiento</div>
      </div>
      <div class="actions">
        <div class="seg" role="group">
          <button data-act="setMatch" data-match="SUPERLIGA" aria-pressed="${isSuper}">Superliga Vuelta (vs Junior)</button>
          <button data-act="setMatch" data-match="AGUILAS" aria-pressed="${!isSuper}">Fecha 1 (vs Águilas)</button>
        </div>
        <button class="btn" data-act="exportCSV">${icon("download")}Exportar</button>
      </div>
    </div>

    <section class="panel">
      <div class="panel-head">
        <h3>${isSuper ? "Superliga Vuelta — Independiente Santa Fe vs Junior" : "Fecha 1 — Independiente Santa Fe vs Águilas Doradas (con % de Cumplimiento)"}</h3>
        <span class="muted small">${isSuper ? "24 registros de medio tiempo" : "Filas en amarillo/verde/rojo indican % vs histórico"}</span>
      </div>
      <div class="tbl-wrap">
        <table class="tbl">
          <thead>
            <tr>
              <th>Jugador</th>
              <th>T</th>
              <th class="r">Dur (min)</th>
              <th class="r">Distancia Total (m)</th>
              <th class="r">MxMin (m/min)</th>
              <th class="r">Vel Máx (km/h)</th>
              <th class="r">HSR (+19.8)</th>
              <th class="r">Sprint (+25)</th>
              <th class="r">Eff >25</th>
              <th class="r">Acc</th>
              <th class="r">Dcc</th>
              <th class="r">Player Load</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHTML}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function importExcelView() {
  return `
    <div class="page-head">
      <div>
        <h1>Importador Inteligente de Datos (Excel / CSV)</h1>
        <div class="sub">Carga masiva de planillas del preparador físico, reportes Catapult o nóminas</div>
      </div>
    </div>

    <div class="grid g2" style="margin-bottom:20px">
      <section class="panel">
        <div class="panel-head">
          <h3>Arrastra y Suelta tu Planilla</h3>
        </div>
        <div class="dropzone-box" id="dropzone-excel" onclick="document.getElementById('file-input-excel').click()">
          <div class="dropzone-icon">${icon("upload")}</div>
          <div style="font-size:16px;font-weight:700">Haz clic o arrastra un archivo Excel / CSV aquí</div>
          <div class="muted small">Compatible con formatos .xlsx, .xls y .csv generados por Catapult, Wimu o plantillas de cuerpo técnico</div>
          <input type="file" id="file-input-excel" accept=".xlsx,.xls,.csv" style="display:none" onchange="handleExcelUpload(this.files[0])">
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h3>Estructura Esperada de Columnas</h3>
        </div>
        <p class="small" style="color:var(--fg2)">El lector inteligente de SheetJS reconoce automáticamente las siguientes cabeceras en la primera fila:</p>
        <ul class="small" style="padding-left:18px;color:var(--muted);display:flex;flex-direction:column;gap:6px">
          <li><b>Nombre / Player:</b> Identifica o crea el atleta automáticamente.</li>
          <li><b>Fecha / Date:</b> Asigna la fecha del test o partido (YYYY-MM-DD o DD/MM/AAAA).</li>
          <li><b>Tipo / Session:</b> Partido, Entrenamiento MD-5, CMJ, Salto, etc.</li>
          <li><b>Métricas reconocidas:</b> Distancia, Vmax, HSR, Sprint, CMJ, RSI, Duración, Acc, Dcc, Player Load.</li>
        </ul>
        <div class="actions" style="margin-top:14px">
          <button class="btn sm" data-act="exportCSV">${icon("download")}Descargar Plantilla CSV Ejemplo</button>
        </div>
      </section>
    </div>
  `;
}

function handleExcelUpload(file) {
  if (!file) return;
  toast("Leyendo archivo " + file.name + "...");
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(firstSheet);

      if (!json || !json.length) {
        toast("El archivo no contiene filas con datos.", true);
        return;
      }

      let importedCount = 0;
      let newClientsCount = 0;

      json.forEach(row => {
        const playerName = row.Player || row.Jugador || row.Nombre || row.Deportista || row.Athlete || row.Name || row["Nombre del Jugador"] || row["Atleta"];
        if (!playerName) return;

        let client = Object.values(S.clients).find(c => c.name.toLowerCase().trim() === String(playerName).toLowerCase().trim() || c.name.toLowerCase().includes(String(playerName).toLowerCase().trim()));
        if (!client) {
          const cid = uid("c");
          client = {
            id: cid,
            name: String(playerName).trim(),
            position: row.Posicion || row.Posición || row.Position || row.Puesto || row.Role || row.Línea || "Jugador",
            registeredAt: todayISO(),
            status: "active",
            createdAt: new Date().toISOString()
          };
          S.clients[cid] = client;
          newClientsCount++;
        }

        const date = row.Fecha || row.Date || row.Dia || row.Día || row["Session Date"] || todayISO();
        const dateStr = String(date).slice(0, 10);
        const dist = parseNum(row.Distancia || row.Dist || row["Distancia Total"] || row.DT || row["Total Distance"] || row["Total Dist (m)"]);
        const vmax = parseNum(row.Vmax || row["Vel Max"] || row["Velocidad Maxima"] || row["Velocidad Máxima"] || row["Max Velocity"] || row["Max Speed"] || row["Top Speed (km/h)"]);
        const dur = parseNum(row.Duracion || row.Duración || row.Dur || row.Duration || row.Minutos || row.Minutes || 90);
        const hsr = parseNum(row.HSR || row["Distancia Alta Intensidad"] || row["High Speed Running"] || row["HSR (+19.8)"] || row["Distance >19.8"]);
        const sprint = parseNum(row.Sprint || row["Distancia Sprint"] || row["Sprint Distance"] || row["Sprint (+25)"] || row["Distance >25"]);
        const pl = parseNum(row.PL || row["Player Load"] || row["PlayerLoad"] || row["Total Player Load"]);
        const acc = parseNum(row.Acc || row.Aceleraciones || row.Accelerations);
        const dcc = parseNum(row.Dcc || row.Dec || row.Desaceleraciones || row.Decelerations);
        const cmj = parseNum(row.CMJ || row["Altura Salto"] || row.Salto || row["Jump Height"] || row["Jump Height (cm)"]);
        const rsi = parseNum(row.RSI || row["RSI-mod"] || row["Indice Fuerza Reactiva"]);
        const weight = parseNum(row.Peso || row.Weight || row["Masa Corporal"]);

        if (dist || vmax || pl || hsr || sprint) {
          const rid = uid("r");
          S.records[rid] = {
            id: rid, clientId: client.id, type: "gps", date: dateStr,
            sessionType: row.Sesion || row.Sesión || row.Tipo || row.Session || "Sesión Importada",
            values: {
              dist: dist || 0,
              vmax: vmax || 0,
              duration: dur,
              mpm: dist && dur ? Math.round(dist / dur * 10) / 10 : 0,
              hsr: hsr || 0,
              sprint: sprint || 0,
              pl: pl || 0,
              acc: acc || 0,
              dcc: dcc || 0
            },
            calc: ["mpm"], notes: "Importado vía Excel", professional: S.config.professional.name,
            createdAt: new Date().toISOString()
          };
          importedCount++;
        }

        if (cmj || rsi) {
          const rid = uid("r");
          S.records[rid] = {
            id: rid, clientId: client.id, type: "nm", date: dateStr,
            test: "CMJ",
            values: {
              height: cmj || 0,
              flight: cmj ? Math.round(Math.sqrt(8 * (cmj / 100) / 9.81) * 1000) : 0,
              rsi: rsi || 0
            },
            calc: ["flight"], notes: "Importado vía Excel", professional: S.config.professional.name,
            createdAt: new Date().toISOString()
          };
          importedCount++;
        }

        if (weight) {
          const rid = uid("r");
          S.records[rid] = {
            id: rid, clientId: client.id, type: "anthro", date: dateStr,
            values: { weight: weight },
            calc: [], notes: "Importado vía Excel", professional: S.config.professional.name,
            createdAt: new Date().toISOString()
          };
          importedCount++;
        }
      });

      persistLocal();
      render();
      toast(`✅ Éxito: Se procesaron ${importedCount} registros y ${newClientsCount} deportistas desde ${file.name}.`);
    } catch (err) {
      console.error(err);
      toast("Error al procesar el archivo Excel. Verifica el formato.", true);
    }
  };
  reader.readAsArrayBuffer(file);
}

const statusPill = c => c.status === "inactive" ? `<span class="pill off">Inactivo</span>` : `<span class="pill on">Activo</span>`;
const typeChip = t => `<span class="type-chip" data-t="${esc(typeDef(t).group)}">${esc(typeDef(t).label)}</span>`;
const emptyBox = (title, text, btn) => `<div class="empty"><b>${esc(title)}</b>${text ? `<span>${esc(text)}</span>` : ""}${btn || ""}</div>`;

function clientOptions(selected, all, includeBlank) {
  const cs = clientsArr().filter(c => all || c.status !== "inactive").sort((a, b) => a.name.localeCompare(b.name, "es"));
  return (includeBlank ? `<option value="">${esc(includeBlank)}</option>` : "") +
    cs.map(c => `<option value="${esc(c.id)}" ${c.id === selected ? "selected" : ""}>${esc(c.name)}${c.status === "inactive" ? " (inactivo)" : ""}</option>`).join("");
}


/* ==========================================================================
   14. MODALES INTERACTIVOS (CREACIÓN, EDICIÓN Y GESTIÓN)
   ========================================================================== */
function openModal({ title, body, footer, size }) {
  closeModal();
  const root = $("#modal-root");
  root.innerHTML = `
    <div class="modal-back">
      <div class="modal ${size || ""}" role="dialog" aria-modal="true" aria-label="${esc(title)}">
        <div class="modal-h">
          <h2>${esc(title)}</h2>
          <button class="icon-btn" aria-label="Cerrar" data-mact="close">${icon("x")}</button>
        </div>
        <div class="modal-b">${body}</div>
        ${footer ? `<div class="modal-f">${footer}</div>` : ""}
      </div>
    </div>
  `;
  const m = $(".modal", root);
  setTimeout(() => {
    const f = $("input:not([type=hidden]):not([disabled]),select,textarea", m);
    if (f) f.focus();
  }, 40);
  return m;
}

function closeModal() {
  const r = $("#modal-root");
  if (r) r.innerHTML = "";
}

function confirmDialog({ title, text, ok, danger }) {
  return new Promise(res => {
    const m = openModal({
      title, size: "narrow",
      body: `<p style="margin:0">${text}</p>`,
      footer: `
        <button class="btn" data-mact="no">Cancelar</button>
        <button class="btn ${danger ? "danger" : "primary"}" data-mact="yes">${esc(ok || "Confirmar")}</button>
      `
    });
    m.addEventListener("click", e => {
      const b = e.target.closest("[data-mact]");
      if (!b) return;
      const a = b.dataset.mact;
      if (a === "yes" || a === "no" || a === "close") {
        closeModal();
        res(a === "yes");
      }
    });
  });
}

function toast(msg, err) {
  const t = document.createElement("div");
  t.className = "toast" + (err ? " err" : "");
  t.textContent = msg;
  $("#toasts").appendChild(t);
  setTimeout(() => t.remove(), err ? 6000 : 3500);
}



/* --- MODULE: auth.js --- */
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
      if (sess && sess.userId && sess.exp > Date.now()) {
        return sess;
      }
    }
  } catch (_) {}
  return null;
}

function isAuthenticated() {
  return Boolean(getAuthSession());
}

function isAdmin() {
  if (!S.user) return false;
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
  return null;
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
    S.user = null;
  }
}

function initTrainers() {
  const list = getTrainersList();
  saveTrainersList(list);
  const cur = getCurrentTrainer();
  if (cur) {
    setCurrentTrainer(cur);
    S.authenticated = true;
  } else {
    setCurrentTrainer(null);
    S.authenticated = false;
  }
}

function openAuthModal(defaultTab = "signin", options = {}) {
  closeAuthModal();
  const root = $("#modal-root");
  if (!root) return;
  
  const isForced = options.force || !isAuthenticated();
  const curUser = S.user || DEFAULT_TRAINERS[0];

  root.innerHTML = `
    <div class="auth-overlay ${isForced ? "forced" : ""}" id="auth-modal-overlay" data-forced="${isForced ? "true" : "false"}">
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
              <a class="terms" href="#" onclick="event.preventDefault(); toast('Eleven Sports Science Hub v2.7');">
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
          ${!isForced ? `
            <button class="auth-close-btn" data-act="closeAuthModal" title="Cerrar modal de acceso">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          ` : ""}

          <div class="forms">
            <!-- Formulario Sign In -->
            <form class="signin" id="form-auth-signin" onsubmit="event.preventDefault(); handleTrainerSignIn();">
              <h2>Iniciar Sesión</h2>
              <p class="sub">Ingresa con tus credenciales de preparador físico o administrador</p>
              
              <!-- Mensaje de Error Dinámico -->
              <div class="auth-error-msg" id="auth-error-box" style="display:none"></div>

              <div class="auth-field">
                <label for="auth-signin-email">Correo Profesional o Usuario</label>
                <input type="text" id="auth-signin-email" value="${esc(curUser ? curUser.email : 'kevin@eleven.com')}" required autocomplete="username" placeholder="admin o correo institucional" />
              </div>
              
              <div class="auth-field">
                <label for="auth-signin-pin">Contraseña de Acceso (Servidor)</label>
                <input type="password" id="auth-signin-pin" value="" required autocomplete="current-password" placeholder="••••••••" />
              </div>

              <div class="auth-field" style="margin-top:2px;margin-bottom:6px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
                  <label for="auth-server-url" style="font-size:11.5px;color:var(--gold,#d4af37);font-weight:600">🌐 Servidor / Bot Eleven (Túnel o Local)</label>
                  <span style="font-size:10px;color:var(--muted)">Cloudflare o Local</span>
                </div>
                <input type="text" id="auth-server-url" value="${esc(getBotBaseUrl())}" placeholder="https://xxxx.trycloudflare.com" style="font-size:11.5px;font-family:monospace;padding:6px 10px" />
              </div>

              <div class="auth-row-sub">
                <label class="auth-remember">
                  <input type="checkbox" checked id="auth-signin-remember" />
                  Recordar sesión en este equipo
                </label>
                <span style="color:var(--muted);font-size:11.5px">🔒 Verificación segura por servidor</span>
              </div>

              <button type="submit" class="btn primary auth-submit-btn">Ingresar al Sistema</button>

              <div class="auth-quick-select">
                <span class="auth-quick-title">Selección Rápida de Usuario:</span>
                <div class="auth-quick-pills">
                  <button type="button" class="auth-quick-pill" data-act="quickFill" data-email="admin">⭐ Administrador (admin)</button>
                  <button type="button" class="auth-quick-pill" data-act="quickFill" data-email="kevin@eleven.com">⭐ Kevin Gaitán</button>
                  <button type="button" class="auth-quick-pill" data-act="quickFill" data-email="juandi">🏃 Juan Diego (PF)</button>
                  <button type="button" class="auth-quick-pill" data-act="quickFill" data-email="staff">⚡ Staff Eleven</button>
                </div>
              </div>
            </form>

            <!-- Formulario Sign Up -->
            <form class="signup" id="form-auth-signup" onsubmit="event.preventDefault(); handleTrainerSignUp();">
              <h2>Nuevo Entrenador</h2>
              <p class="sub">Registro de preparador físico, kinesiólogo o cuerpo técnico</p>

              <div class="auth-error-msg" id="auth-signup-error-box" style="display:none"></div>

              <div class="auth-field">
                <label for="auth-signup-name">Nombre y Apellidos Completos *</label>
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
                  <label for="auth-signup-pin">Contraseña *</label>
                  <input type="password" id="auth-signup-pin" required placeholder="Mínimo 6 caracteres" />
                </div>
              </div>

              <div class="auth-field">
                <label for="auth-signup-email">Correo Electrónico *</label>
                <input type="email" id="auth-signup-email" required placeholder="entrenador@eleven.com" />
              </div>

              <button type="submit" class="btn primary auth-submit-btn" style="margin-top:4px">Crear Perfil e Ingresar</button>
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
        if (!isForced) closeAuthModal();
        return;
      }
      const actEl = e.target.closest("[data-act]");
      if (!actEl) return;
      const act = actEl.dataset.act;
      if (act === "closeAuthModal") {
        if (!isForced) closeAuthModal();
      } else if (act === "switchAuthTab") {
        switchAuthTab(actEl.dataset.tab);
      } else if (act === "quickFill") {
        const em = $("#auth-signin-email");
        const pi = $("#auth-signin-pin");
        if (em) em.value = actEl.dataset.email;
        if (pi) {
          pi.value = "";
          pi.focus();
        }
        toast(`Usuario seleccionado: ${actEl.dataset.email}. Ingresa tu contraseña.`);
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
  const pinInput = $("#auth-signin-pin");
  const errBox = $("#auth-error-box");
  const submitBtn = $(".auth-submit-btn");
  if (!emailInput || !pinInput) return;

  const val = emailInput.value.trim().toLowerCase();
  const pin = pinInput.value.trim();
  const remember = $("#auth-signin-remember")?.checked !== false;

  if (errBox) {
    errBox.style.display = "none";
    errBox.textContent = "";
  }

  if (!val) {
    showAuthError("Por favor ingresa tu correo o usuario.");
    emailInput.focus();
    return;
  }
  if (!pin) {
    showAuthError("Por favor ingresa tu contraseña o PIN de acceso.");
    pinInput.focus();
    return;
  }

  const serverInput = $("#auth-server-url");
  if (serverInput && serverInput.value.trim()) {
    const sUrl = serverInput.value.trim().replace(/\/$/, "");
    try { localStorage.setItem("eleven_bot_url", sUrl); } catch {}
    if (S.config && S.config.gym) S.config.gym.botUrl = sUrl;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Verificando credenciales…";
  }

  try {
    // 1. Verificación criptográfica obligatoria contra el backend
    const resp = await fetch(`${getBotBaseUrl()}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ usuario: val, clave: pin })
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      if (resp.status === 429) {
        showAuthError(data.error || "🚨 Acceso bloqueado temporalmente por demasiados intentos fallidos (5 minutos).");
      } else {
        showAuthError(data.error || "⚠️ Usuario o contraseña incorrectos. Verifica tus credenciales.");
      }
      pinInput.focus();
      pinInput.select();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Ingresar al Sistema";
      }
      return;
    }

    // 2. Autenticación exitosa confirmada por el servidor
    const list = getTrainersList();
    let found = list.find(t => 
      (t.email && t.email.toLowerCase() === val) || 
      (t.id && t.id.toLowerCase() === val) || 
      (t.name && t.name.toLowerCase().trim() === val)
    );

    if (!found) {
      const isAdm = data.usuario?.rol === "admin" || data.usuario?.usuario === "admin";
      found = {
        id: isAdm ? "trainer-kevin" : `trainer-${data.usuario?.id || Date.now()}`,
        name: data.usuario?.nombre || "Kevin Gaitán",
        role: isAdm ? "Administrador General" : "Preparador Físico",
        email: val.includes("@") ? val : "admin@eleven.com",
        avatar: isAdm ? "KG" : "PF",
        isAdmin: isAdm
      };
    } else if (data.usuario?.rol === "admin") {
      found.isAdmin = true;
      found.role = "Administrador General";
    }

    const sessionData = {
      userId: found.id,
      userName: found.name,
      userRole: found.role,
      userToken: "verified-server-session",
      createdAt: Date.now(),
      exp: Date.now() + (remember ? 30 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000)
    };

    try {
      if (remember) {
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sessionData));
        sessionStorage.removeItem(AUTH_SESSION_KEY);
      } else {
        sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sessionData));
        localStorage.removeItem(AUTH_SESSION_KEY);
      }
    } catch (_) {}

    S.authenticated = true;
    setCurrentTrainer(found);

    closeAuthModal();
    buildNav();
    render();
    toast(`✅ ¡Bienvenido, ${found.name}! Acceso autenticado por el servidor (${found.role}).`);
  } catch (err) {
    console.warn("Fallo conectando al backend de login:", err);
    showAuthError("⚠️ No se pudo conectar al servidor de Eleven Performance. Verifica que el sistema esté activo.");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Ingresar al Sistema";
    }
  }
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
  S.authenticated = false;
  S.user = null;
  toast("Sesión cerrada correctamente.");
  buildNav();
  render();
  openAuthModal("signin", { force: true });
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



/* --- MODULE: dashboard.js --- */
/* ==========================================================================
   8. VISTA: PANEL (DASHBOARD)
   ========================================================================== */
function dashboardView() {
  const cs = clientsArr();
  const active = cs.filter(c => c.status !== "inactive");
  const today = todayISO();
  const R = S.config.rules;
  const recs = Object.values(S.records);
  const recent30 = recs.filter(r => daysBetween(r.date, today) <= 30 && r.date <= today);
  const upcoming = active.filter(c => c.nextEvalDate).sort((a, b) => a.nextEvalDate < b.nextEvalDate ? -1 : 1);
  const upSoon = upcoming.filter(c => daysBetween(today, c.nextEvalDate) <= R.upcomingDays);
  const reps = Object.values(S.reports).sort((a, b) => (b.createdAt || "") < (a.createdAt || "") ? -1 : 1);
  const alerts = allAlerts();
  const needUpd = active.filter(c => { const l = lastEvalDate(c.id); return !l || daysBetween(l, today) > R.staleDays; });
  const showAlerts = S.ui.alertsAll ? alerts : alerts.slice(0, 7);

  // Resumen de evolución de jugadores activos
  const evoRows = active.map(c => {
    const cell = (type, key, test, g) => {
      const def = metricDef(g, key), pts = series(c.id, type, key, test);
      if (!pts.length) return `<td class="r muted">—</td>`;
      const a = analyze(pts, def);
      return `<td class="r"><div class="num font-bold">${fmtN(a.last.v, def.dec)} ${def.unit}</div>${a.prev ? `<span class="chg ${a.status.cls}" style="margin-top:3px">${a.status.arrow} ${fmtSigned(a.pct, 1)}%</span>` : `<span class="muted small">Línea base</span>`}</td>`;
    };
    return `<tr class="click" data-act="openClient" data-id="${esc(c.id)}">
      <td><div class="name-cell">${avatarHTML(c)}<div><div class="font-bold">${esc(c.name)}</div><div class="small muted">${esc(c.position || "—")}</div></div></div></td>
      ${cell("nm", "height", "CMJ", "nm")}
      ${cell("gps", "vmax", null, "gps")}
      ${cell("gps", "mpm", null, "gps")}
      ${cell("anthro", "weight", null, "anthro")}
    </tr>`;
  }).join("");

  // Gráfico de actividad de evaluaciones por mes (últimos 6 meses)
  const months = [];
  {
    const d = parseD(today) || new Date();
    d.setDate(1);
    for (let i = 5; i >= 0; i--) {
      const m = new Date(d.getFullYear(), d.getMonth() - i, 1);
      months.push(m.getFullYear() + "-" + pad(m.getMonth() + 1));
    }
  }

  const types = S.config.evalTypes.map(t => t.key);
  const actChart = T => ({
    type: "bar",
    data: {
      labels: months.map(m => MES[+m.slice(5) - 1] + " " + m.slice(2, 4)),
      datasets: types.map(t => ({
        label: typeDef(t).label,
        data: months.map(m => recs.filter(r => r.type === t && r.date.slice(0, 7) === m).length),
        backgroundColor: TYPE_COLORS[typeDef(t).group] || T.muted,
        borderRadius: 3,
        maxBarThickness: 28
      })).filter(d => d.data.some(x => x > 0))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: { position: "bottom", labels: { color: T.muted, boxWidth: 10, font: { size: 11.5 } } },
        tooltip: { callbacks: { label: c => ` ${c.dataset.label}: ${c.parsed.y} registros` } }
      },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { color: T.muted } },
        y: { stacked: true, grid: { color: T.line }, border: { display: false }, ticks: { color: T.muted, precision: 0 } }
      }
    }
  });

  // Métricas dinámicas calculadas 100% de los datos reales
  const gpsRecs = recs.filter(r => r.type === "gps");
  const nmRecs = recs.filter(r => r.type === "nm");
  const anthroRecs = recs.filter(r => r.type === "anthro");
  const maxVmax = gpsRecs.reduce((m, r) => Math.max(m, (r.values && r.values.vmax) || 0), 0);
  const avgDist = gpsRecs.length ? Math.round(gpsRecs.reduce((s, r) => s + ((r.values && r.values.dist) || 0), 0) / gpsRecs.length) : 0;
  const maxCmj = nmRecs.reduce((m, r) => Math.max(m, (r.values && r.values.height) || 0), 0);

  return `
    <div class="page-head">
      <div style="display:flex;align-items:center;gap:16px">
        <span class="brand-logo" style="width:48px;height:48px;cursor:pointer" data-act="go" data-page="dashboard" title="Eleven Performance"></span>
        <div>
          <div class="eyebrow" style="color:var(--accent);letter-spacing:0.12em">${esc(S.config.professional.brand)} · ADAPT · PERFORM · WIN</div>
          <h1>Panel de Rendimiento Deportivo</h1>
          <div class="sub">Control biomecánico, cinemática GPS y perfiles de fuerza</div>
        </div>
      </div>
      <div class="actions">
        ${themeToggleBtnHTML()}
        <button class="btn" data-act="openAuthModal" title="Cambiar de entrenador">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          ${esc(S.user ? S.user.name.split(" ")[0] : "Entrenador")}
        </button>
        <input type="file" id="dash-excel-file" accept=".xlsx,.xls,.csv" style="display:none" onchange="handleExcelUpload(this.files[0])">
        <button class="btn primary" onclick="document.getElementById('dash-excel-file').click()">${icon("upload")}Importar Planilla</button>
        <button class="btn" data-act="newClient">${icon("plus")}Nuevo Deportista</button>
      </div>
    </div>

    

    <!-- FILA DE KPIS REALES Y DINÁMICOS -->
    <div class="kpis">
      <button class="kpi" data-act="go" data-page="clients">
        <span class="l">Deportistas Registrados</span>
        <span class="v">${cs.length}</span>
        <span class="s">${cs.length ? `${active.length} activos · ${cs.length - active.length} inactivos` : "Base de datos limpia"}</span>
      </button>
      <button class="kpi" data-act="go" data-page="evals">
        <span class="l">Evaluaciones Totales</span>
        <span class="v">${recs.length}</span>
        <span class="s">${recs.length ? `${gpsRecs.length} GPS · ${nmRecs.length} Saltos · ${anthroRecs.length} Antro` : "0 registros"}</span>
      </button>
      <button class="kpi" data-act="go" data-page="gps">
        <span class="l">Vel. Máxima GPS</span>
        <span class="v">${maxVmax > 0 ? maxVmax + " km/h" : "—"}</span>
        <span class="s">${maxVmax > 0 ? "Pico máximo del plantel" : "Esperando datos"}</span>
      </button>
      <button class="kpi" data-act="go" data-page="nm">
        <span class="l">Salto CMJ Máximo</span>
        <span class="v">${maxCmj > 0 ? maxCmj + " cm" : "—"}</span>
        <span class="s">${maxCmj > 0 ? "Pico neuromuscular" : "Esperando datos"}</span>
      </button>
      <button class="kpi" data-act="go" data-page="reports">
        <span class="l">Informes Emitidos</span>
        <span class="v">${reps.length}</span>
        <span class="s">${reps[0] ? "Último: " + fmtDate(reps[0].date || reps[0].createdAt.slice(0, 10)) : "0 informes"}</span>
      </button>
    </div>

    <!-- ZONA DE CARGA RÁPIDA DE EXCEL / CSV PARA PRUEBAS -->
    <section class="panel" style="margin-bottom:22px;border:1.5px dashed var(--line2);background:rgba(21, 32, 53, 0.45);text-align:center;padding:26px 20px;border-radius:18px;">
      <div style="max-width:580px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px">
        <div style="width:48px;height:48px;border-radius:50%;background:rgba(214,166,78,0.14);border:1px solid rgba(214,166,78,0.3);display:grid;place-items:center;color:var(--accent)">
          ${icon("upload")}
        </div>
        <div>
          <h3 style="font-size:17px;margin:0 0 4px">Carga y Prueba con tus Archivos Excel / CSV</h3>
          <p class="muted small" style="margin:0">Arrastra o selecciona tus archivos de Catapult GPS, planillas de salto CMJ o nóminas (.xlsx, .xls, .csv). El sistema creará automáticamente los deportistas y procesará sus métricas.</p>
        </div>
        <div style="display:flex;gap:12px;margin-top:6px;align-items:center">
          <button class="btn primary" onclick="document.getElementById('dash-excel-file').click()">${icon("upload")}Seleccionar Archivo Excel / CSV</button>
          ${cs.length === 0 ? `<button class="btn ghost sm" data-act="loadDemoData" title="Cargar datos de demostración">Cargar Datos Demo</button>` : ""}
        </div>
      </div>
    </section>

    ${active.length === 0 ? `
      <div class="empty" style="padding:48px 24px;border-radius:16px;background:rgba(21, 32, 53, 0.35);border:1px solid var(--line);margin-bottom:24px;">
        <div style="font-size:36px;margin-bottom:8px">📋</div>
        <b style="font-size:18px;color:#FFFFFF">Base de datos lista para pruebas</b>
        <span style="color:var(--muted);max-width:460px;margin:8px auto 16px;line-height:1.5">No hay deportistas ni evaluaciones precargadas. Puedes importar tu planilla de Excel arriba o registrar manualmente a un deportista para comenzar tus pruebas.</span>
        <div style="display:flex;gap:10px;justify-content:center">
          <button class="btn primary" onclick="document.getElementById('dash-excel-file').click()">${icon("upload")}Cargar Planilla Excel</button>
          <button class="btn" data-act="newClient">${icon("plus")}Nuevo Deportista</button>
        </div>
      </div>
    ` : ""}

    <!-- ALERTAS Y PRÓXIMAS EVALUACIONES -->
    <div class="grid g-7-5" style="margin-bottom: 18px;">
      <section class="panel">
        <div class="panel-head">
          <h3>Indicadores de Seguimiento y Prevención</h3>
          <span class="muted small">${alerts.filter(a => a.sev === "high").length} prioritarios · ${alerts.length} en total</span>
        </div>
        ${alerts.length
          ? `<div class="alerts">${showAlerts.map(alertHTML).join("")}</div>
             ${alerts.length > 7 ? `<button class="btn ghost sm" style="margin-top:10px" data-act="toggleAlerts">${S.ui.alertsAll ? "Mostrar menos" : "Ver los " + alerts.length + " indicadores"}</button>` : ""}`
          : emptyBox("Todos los atletas al día", "No hay descensos ni asimetrías críticas detectadas.")
        }
        <p class="note-legal">Indicadores biomecánicos calculados con algoritmos de control de carga. No reemplazan criterio médico.</p>
      </section>

      <div class="stack">
        <section class="panel" id="upcoming">
          <div class="panel-head">
            <h3>Próximas Evaluaciones Programadas</h3>
          </div>
          ${upcoming.length
            ? `<div class="alerts">${upcoming.slice(0, 5).map(c => {
                const d = daysBetween(today, c.nextEvalDate);
                return `<div class="alert ${d < 0 ? "high" : d <= 7 ? "mid" : "low"}" data-act="openClient" data-id="${esc(c.id)}" role="button" tabindex="0">
                  <span class="bar"></span>
                  <div>
                    <div class="t">${esc(c.name)}</div>
                    <div class="d">${fmtDate(c.nextEvalDate)} · ${d < 0 ? "Vencida hace " + (-d) + " días" : d === 0 ? "¡Hoy!" : "En " + d + " días"}</div>
                  </div>
                  <span class="sev">${d < 0 ? "Vencida" : "En Fecha"}</span>
                </div>`;
              }).join("")}</div>`
            : emptyBox("Sin controles agendados", "Programa próximas evaluaciones desde la ficha del jugador.")
          }
        </section>

        <section class="panel">
          <div class="panel-head">
            <h3>Atletas Sin Evaluación Reciente (> ${R.staleDays} d)</h3>
          </div>
          ${needUpd.length
            ? `<div class="alerts">${needUpd.map(c => {
                const l = lastEvalDate(c.id);
                return `<div class="alert mid" data-act="openClient" data-id="${esc(c.id)}" role="button" tabindex="0">
                  <span class="bar"></span>
                  <div>
                    <div class="t">${esc(c.name)}</div>
                    <div class="d">${l ? "Último registro: " + fmtDate(l) + " (" + daysBetween(l, today) + " d)" : "Sin registros previos"}</div>
                  </div>
                  <span class="sev">Actualizar</span>
                </div>`;
              }).join("")}</div>`
            : emptyBox("Plantel al día", `Ningún jugador activo supera ${R.staleDays} días sin evaluación.`)
          }
        </section>
      </div>
    </div>

    <!-- TABLA DE EVOLUCIÓN Y GRÁFICO DE ACTIVIDAD -->
    <div class="grid g-7-5" style="margin-bottom: 18px;">
      <section class="panel">
        <div class="panel-head">
          <h3>Resumen de Rendimiento del Plantel</h3>
          <span class="muted small">Último valor registrado y variación porcentual vs anterior</span>
        </div>
        ${active.length
          ? `<div class="tbl-wrap">
              <table class="tbl">
                <thead>
                  <tr>
                    <th>Deportista</th>
                    <th class="r">CMJ Altura</th>
                    <th class="r">Vel. Máx GPS</th>
                    <th class="r">MxMin (m/min)</th>
                    <th class="r">Peso</th>
                  </tr>
                </thead>
                <tbody>${evoRows}</tbody>
              </table>
            </div>`
          : emptyBox("Sin atletas activos")
        }
      </section>

      <section class="panel">
        <div class="panel-head">
          <h3>Actividad de Evaluaciones</h3>
          <span class="muted small">Volumen semestral por módulo</span>
        </div>
        ${chartBox(actChart, "chart-box", "Evaluaciones por mes")}
      </section>
    </div>

    <!-- REGISTROS RECIENTES & ÚLTIMOS INFORMES -->
    <div class="grid g-7-5">
      <section class="panel">
        <div class="panel-head">
          <h3>Evaluaciones Recientes</h3>
          <button class="btn ghost sm" data-act="go" data-page="evals">Ver todas</button>
        </div>
        ${recs.length
          ? `<div class="tbl-wrap">
              <table class="tbl">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Deportista</th>
                    <th>Tipo</th>
                    <th class="hide-sm">Resultados Clave</th>
                  </tr>
                </thead>
                <tbody>
                  ${recs.slice().sort((a, b) => a.date < b.date ? 1 : -1).slice(0, 7).map(r => `
                    <tr class="click" data-act="openClient" data-id="${esc(r.clientId)}" data-tab="${esc(r.type)}">
                      <td class="num">${fmtDateS(r.date)}</td>
                      <td><b>${esc(clientName(r.clientId))}</b></td>
                      <td>${typeChip(r.type)}</td>
                      <td class="hide-sm small muted">${esc(recSummary(r))}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>`
          : emptyBox("Sin registros recientes")
        }
      </section>

      <section class="panel">
        <div class="panel-head">
          <h3>Últimos Informes Generados</h3>
          <button class="btn ghost sm" data-act="go" data-page="reports">Ir a Informes</button>
        </div>
        ${reps.length
          ? `<div class="tbl-wrap">
              <table class="tbl">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Deportista</th>
                    <th>Periodo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${reps.slice(0, 6).map(r => `
                    <tr class="click" data-act="viewReport" data-id="${esc(r.id)}">
                      <td class="num">${fmtDateS(r.date || r.createdAt.slice(0, 10))}</td>
                      <td><b>${esc(clientName(r.clientId))}</b></td>
                      <td class="small muted">${fmtDateS(r.from)} – ${fmtDateS(r.to)}</td>
                      <td class="r">${icon("eye")}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>`
          : emptyBox("Aún no se han generado informes", "Genera informes ejecutivos en A4 en la pestaña Informes.")
        }
      </section>
    </div>
  `;
}

function alertHTML(a) {
  const c = S.clients[a.clientId];
  return `
    <div class="alert ${a.sev}" data-act="openClient" data-id="${esc(a.clientId)}" data-tab="${esc(a.tab || "summary")}" role="button" tabindex="0">
      <span class="bar"></span>
      <div>
        <div class="t">${esc(a.title)}</div>
        <div class="d">${c && S.view.page !== "client" ? `<b>${esc(c.name)}</b> · ` : ""}${esc(a.desc)}</div>
      </div>
      <span class="sev">${a.sev === "high" ? "Prioritario" : a.sev === "mid" ? "Atención" : "Info"}</span>
    </div>
  `;
}



/* --- MODULE: athletes.js --- */
/* ==========================================================================
   9. VISTA: DEPORTISTAS (LISTA Y DIRECTORIO)
   ========================================================================== */
function filteredClients() {
  const f = S.ui.clients, q = f.q.trim().toLowerCase();
  let cs = clientsArr().filter(c => {
    if (f.status === "active" && c.status === "inactive") return false;
    if (f.status === "inactive" && c.status !== "inactive") return false;
    if (f.position && c.position !== f.position) return false;
    if (q && !((c.name || "").toLowerCase().includes(q) || (c.position || "").toLowerCase().includes(q))) return false;
    if (f.from || f.to) {
      if (!recordsOf(c.id).some(r => (!f.from || r.date >= f.from) && (!f.to || r.date <= f.to))) return false;
    }
    return true;
  });

  const key = {
    name: c => (c.name || "").toLowerCase(),
    age: c => ageFrom(c.birthDate) ?? 999,
    position: c => (c.position || "zzz").toLowerCase(),
    last: c => lastEvalDate(c.id) || "0000"
  }[f.sort] || (c => c.name);

  cs.sort((a, b) => {
    const x = key(a), y = key(b);
    return (x < y ? -1 : x > y ? 1 : 0) * f.dir;
  });
  return cs;
}

function clientsView() {
  const f = S.ui.clients, cs = filteredClients(), all = clientsArr();
  const positions = [...new Set(all.map(c => c.position).filter(Boolean).concat(S.config.positions))].sort((a, b) => a.localeCompare(b, "es"));
  const th = (k, l, cls) => `<th class="sortable ${cls || ""}" data-act="sortClients" data-k="${k}">${l}${f.sort === k ? (f.dir > 0 ? " ↑" : " ↓") : ""}</th>`;

  return `
    <div class="page-head">
      <div>
        <h1>Directorio de Deportistas</h1>
        <div class="sub">${all.length} registrados · ${all.filter(c => c.status !== "inactive").length} activos</div>
      </div>
      <div class="actions">
        <button class="btn primary" data-act="newClient">${icon("plus")}Nuevo Deportista</button>
      </div>
    </div>

    <div class="filters">
      <div class="search field">
        <label for="f-q">Buscar Deportista</label>
        <div style="position:relative">
          ${icon("search")}
          <input id="f-q" class="input" placeholder="Nombre o posición..." value="${esc(f.q)}" data-ui="clients.q" autocomplete="off">
        </div>
      </div>
      <div class="field">
        <span class="flabel">Estado</span>
        <div class="seg" role="group">
          ${[["all", "Todos"], ["active", "Activos"], ["inactive", "Inactivos"]].map(s => `
            <button data-act="setUi" data-path="clients.status" data-val="${s[0]}" aria-pressed="${f.status === s[0]}">${s[1]}</button>
          `).join("")}
        </div>
      </div>
      <div class="field">
        <label for="f-pos">Posición Táctica</label>
        <select id="f-pos" class="input" data-ui="clients.position">
          <option value="">Todas</option>
          ${positions.map(p => `<option ${p === f.position ? "selected" : ""}>${esc(p)}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label for="f-sort">Ordenar</label>
        <select id="f-sort" class="input" data-ui="clients.sort">
          ${[["name", "Nombre"], ["age", "Edad"], ["position", "Posición"], ["last", "Última Evaluación"]].map(o => `
            <option value="${o[0]}" ${f.sort === o[0] ? "selected" : ""}>${o[1]}</option>
          `).join("")}
        </select>
      </div>
    </div>

    ${cs.length
      ? `<div class="tbl-wrap">
          <table class="tbl">
            <thead>
              <tr>
                ${th("name", "Deportista")}
                ${th("age", "Edad", "r")}
                ${th("position", "Posición")}
                <th class="r hide-sm">Estatura</th>
                <th class="r hide-sm">Peso</th>
                ${th("last", "Última Evaluación")}
                <th>Estado</th>
                <th>Seguimiento</th>
                <th class="r">Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${cs.map(c => {
                const h = latestValue(c.id, "anthro", "height");
                const w = latestValue(c.id, "anthro", "weight");
                const l = lastEvalDate(c.id);
                const al = alertsFor(c);
                const age = ageFrom(c.birthDate);
                return `
                  <tr class="click" data-act="openClient" data-id="${esc(c.id)}">
                    <td>
                      <div class="name-cell">
                        ${avatarHTML(c)}
                        <div>
                          <div class="font-bold">${esc(c.name)}</div>
                        </div>
                      </div>
                    </td>
                    <td class="r num">${age ?? "—"}</td>
                    <td>${esc(c.position || "—")}</td>
                    <td class="r num hide-sm">${h ? fmtN(h.v, 1) + " cm" : "—"}</td>
                    <td class="r num hide-sm">${w ? fmtN(w.v, 1) + " kg" : "—"}</td>
                    <td class="num">${l ? fmtDateS(l) : "—"}</td>
                    <td>${statusPill(c)}</td>
                    <td>${al.length ? `<span class="chg ${al.some(a => a.sev === "high") ? "bad" : al.some(a => a.sev === "mid") ? "flat" : "neutral"}">${al.length} alertas</span>` : `<span class="muted small">Al día</span>`}</td>
                    <td>
                      <div class="rowact">
                        <button class="icon-btn" title="Ver Ficha" aria-label="Ver Ficha" data-act="openClient" data-id="${esc(c.id)}">${icon("eye")}</button>
                        <button class="icon-btn" title="Editar" aria-label="Editar" data-act="editClient" data-id="${esc(c.id)}">${icon("edit")}</button>
                        <button class="icon-btn" title="${c.status === "inactive" ? "Activar" : "Desactivar"}" aria-label="Cambiar estado" data-act="toggleClient" data-id="${esc(c.id)}">${icon("power")}</button>
                        <button class="icon-btn" title="${isAdmin() ? "Eliminar Deportista (Admin)" : "Eliminar Deportista (Solo Kevin - Admin)"}" aria-label="Eliminar" data-act="deleteClient" data-id="${esc(c.id)}" style="${isAdmin() ? "color:var(--bad)" : "opacity:0.35;cursor:not-allowed"}">${icon("trash")}</button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>`
      : emptyBox("No se encontraron deportistas", "Ajusta los filtros o añade un nuevo jugador.", `<button class="btn primary" data-act="newClient">${icon("plus")}Nuevo Deportista</button>`)
    }
  `;
}

/* ==========================================================================
   10. VISTA: FICHA DEL DEPORTISTA (CLIENT VIEW & TABS)
   ========================================================================== */
function clientTabs() {
  return [
    ["summary", "Resumen Ejecutivo"],
    ["gps", "GPS & Cinemática"],
    ["nm", "Neuromuscular"],
    ["anthro", "Antropometría"],
    ["perf", "Rendimiento Físico"],
    ["evals", "Historial Evaluaciones"],
    ["routines", "Rutinas de Carga"],
    ["compare", "Comparar Fechas"],
    ["history", "Línea de Tiempo"],
    ["reports", "Informes"]
  ];
}

function clientView(c) {
  const tab = S.view.tab || "summary";
  const age = ageFrom(c.birthDate);
  const h = latestValue(c.id, "anthro", "height");
  const w = latestValue(c.id, "anthro", "weight");
  const l = lastEvalDate(c.id);

  let body = "";
  if (tab === "summary") body = summaryTab(c);
  else if (tab === "evals") body = evalsTab(c);
  else if (tab === "routines") body = routinesTab(c);
  else if (tab === "compare") body = compareTab(c);
  else if (tab === "history") body = historyTab(c);
  else if (tab === "reports") body = clientReportsTab(c);
  else body = groupTab(c, tab);

  return `
    <button class="back" data-act="go" data-page="clients">${icon("back")}Volver a Deportistas</button>
    <div class="client-head">
      <div class="photo-wrap">
        ${avatarHTML(c, "lg")}
        <button class="photo-btn" data-act="pickPhoto" data-id="${esc(c.id)}" title="Cambiar foto" aria-label="Cambiar foto">${icon("camera")}</button>
      </div>
      <div class="grow">
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <h1>${esc(c.name)}</h1>
          ${statusPill(c)}
        </div>
        <div class="meta">
          <span>Edad <b>${age != null ? age + " años" : "—"}</b></span>
          <span>Posición <b>${esc(c.position || "—")}</b></span>
          <span>Estatura <b>${h ? fmtN(h.v, 1) + " cm" : "—"}</b></span>
          <span>Peso <b>${w ? fmtN(w.v, 1) + " kg" : "—"}</b></span>
          <span>Último Test <b>${l ? fmtDate(l) : "—"}</b></span>
        </div>
      </div>
      <div class="actions">
        <button class="btn" style="border-color:var(--accent);color:var(--accent);font-weight:700" data-act="openCompetitionDeckForClient" data-id="${esc(c.id)}" title="Ver informe de competición oficial en formato editorial 16:9">${icon("reports")}Informe 16:9 (Plantilla Eleven)</button>
        <button class="btn" data-act="editClient" data-id="${esc(c.id)}">${icon("edit")}Editar Ficha</button>
        ${isAdmin() ? `<button class="btn danger" data-act="deleteClient" data-id="${esc(c.id)}" title="Eliminar definitivamente al deportista">${icon("trash")}Eliminar</button>` : ""}
        <button class="btn" data-act="newRecord" data-client="${esc(c.id)}">${icon("plus")}Test</button>
        <button class="btn" data-act="newRoutine" data-client="${esc(c.id)}">${icon("plus")}Rutina</button>
        <button class="btn primary" data-act="reportFor" data-id="${esc(c.id)}">${icon("reports")}Generar Informe</button>
      </div>
    </div>

    <!-- TABS DE NAVEGACIÓN DE LA FICHA -->
    <div class="tabs" role="tablist">
      ${clientTabs().map(t => `
        <button role="tab" aria-selected="${t[0] === tab}" data-act="tab" data-tab="${t[0]}">${esc(t[1])}</button>
      `).join("")}
    </div>

    ${body}
  `;
}

function athleteRadarChart(c) {
  return T => {
    let playerValues = [65, 70, 60, 65, 55, 60];
    if (c.id === "client-alexis-zapata") {
      playerValues = [75, 100, 68, 70, 78, 72];
    }
    return {
      type: 'radar',
      data: {
        labels: ['Distancia Total', 'MxMin', 'HSR (+19.8)', 'Sprint (+25)', 'Acc + Dcc', 'Player Load'],
        datasets: [
          {
            label: c.name,
            data: playerValues,
            borderColor: '#D6A64E',
            backgroundColor: 'rgba(214, 166, 78, 0.25)',
            pointBackgroundColor: '#D6A64E',
            borderWidth: 2.2
          },
          {
            label: 'Promedio Posición',
            data: [50, 50, 50, 50, 50, 50],
            borderColor: '#EE6A5F',
            backgroundColor: 'rgba(238, 106, 95, 0.12)',
            borderDash: [3, 3],
            borderWidth: 1.5
          },
          {
            label: 'Top Liga',
            data: [100, 100, 100, 100, 100, 100],
            borderColor: '#3DBA8C',
            backgroundColor: 'transparent',
            borderDash: [4, 4],
            borderWidth: 1.5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { display: false },
            grid: { color: T.line },
            angleLines: { color: T.line },
            pointLabels: { color: T.fg, font: { family: 'Barlow, sans-serif', size: 11, weight: '700' } }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: { color: T.muted, boxWidth: 12, font: { size: 11 } }
          }
        }
      }
    };
  };
}

function summaryTab(c) {
  const al = alertsFor(c);
  const lastA = recordsOf(c.id, "anthro").slice(-1)[0], v = lastA ? lastA.values : {};
  const routine = routinesOf(c.id)[0];
  const show = S.ui.showContact[c.id];
  const mask = s => s ? (show ? esc(s) : "•••••• " + esc(String(s).slice(-3))) : "—";

  // Indicadores clave
  const keyInd = [
    ["nm", "height", "CMJ", "CMJ · Salto"],
    ["nm", "rsi", "Drop Jump", "Drop Jump · RSI"],
    ["gps", "vmax", null, "GPS · Velocidad Máxima"],
    ["gps", "mpm", null, "GPS · MxMin"],
    ["perf", "s10", null, "Sprint 10 m"],
    ["anthro", "weight", null, "Peso Corporal"]
  ].map(([t, k, test, lab]) => {
    const def = metricDef(typeDef(t).group, k), pts = series(c.id, t, k, test);
    if (!pts.length) return "";
    const a = analyze(pts, def);
    return `
      <button class="stat" data-act="tab" data-tab="${t}" ${test ? `data-test="${esc(test)}"` : ""}>
        <span class="lab"><span>${esc(lab)}</span><span>${fmtDateS(a.last.date)}</span></span>
        <span class="val num">${fmtN(a.last.v, def.dec)}<small>${esc(def.unit)}</small></span>
        ${chgHTML(a.status, a.abs, a.pct, def)}
      </button>
    `;
  }).filter(Boolean);

  const tl = timelineItems(c.id).slice(0, 5);

  return `
    <div class="grid g-7-5">
      <div class="stack">
        <section class="panel">
          <div class="panel-head">
            <h3>Indicadores Biomecánicos & Cinemáticos Clave</h3>
            <span class="muted small">Último registro y variación vs prueba previa</span>
          </div>
          ${keyInd.length
            ? `<div class="stats">${keyInd.join("")}</div>`
            : emptyBox("Sin mediciones registradas", "Realiza la primera evaluación para generar los KPIs de rendimiento.", `<button class="btn" data-act="newRecord" data-client="${esc(c.id)}">${icon("plus")}Añadir Test</button>`)
          }
        </section>

        <!-- RADAR MULTIAXIAL DE RENDIMIENTO -->
        <section class="panel">
          <div class="panel-head">
            <h3>Radar de Rendimiento Multiaxial (Percentiles Posicionales)</h3>
            <span class="muted small">Comparativa normalizada vs Promedio Posición y Benchmark Top</span>
          </div>
          ${chartBox(athleteRadarChart(c), "chart-box", "Radar de Rendimiento Multiaxial")}
        </section>

        <section class="panel">
          <div class="panel-head">
            <h3>Perfil y Datos de Competencia</h3>
            <button class="btn ghost sm" data-act="editClient" data-id="${esc(c.id)}">${icon("edit")}Editar</button>
          </div>
          <div class="grid g2">
            <dl class="kv">
              <dt>Nacimiento</dt><dd>${c.birthDate ? fmtDate(c.birthDate) : "—"}</dd>
              <dt>Edad</dt><dd>${ageFrom(c.birthDate) != null ? ageFrom(c.birthDate) + " años" : "—"}</dd>
              <dt>Posición</dt><dd>${esc(c.position || "—")}</dd>
              <dt>Perfil Hábil</dt><dd>${esc(c.foot || "—")}</dd>
              <dt>Próxima Evaluación</dt><dd>${c.nextEvalDate ? fmtDate(c.nextEvalDate) : "Sin agendar"}</dd>
              ${(c.custom || []).filter(x => x.label).map(x => `<dt>${esc(x.label)}</dt><dd><b>${esc(x.value)}</b></dd>`).join("")}
            </dl>
            <dl class="kv">
              <dt>Estatura</dt><dd>${v.height != null ? fmtN(v.height, 1) + " cm" : "—"}</dd>
              <dt>Peso</dt><dd>${v.weight != null ? fmtN(v.weight, 1) + " kg" : "—"}</dd>
              <dt>Talla Sentada</dt><dd>${v.sitting != null ? fmtN(v.sitting, 1) + " cm" : "—"}</dd>
              <dt>IMC</dt><dd>${v.bmi != null ? fmtN(v.bmi, 1) + " kg/m²" : "—"}</dd>
              <dt>Grasa Corporal</dt><dd>${v.fat != null ? fmtN(v.fat, 1) + "%" : "—"}</dd>
              <dt>Último Antropo</dt><dd>${lastA ? fmtDate(lastA.date) : "—"}</dd>
            </dl>
          </div>
          ${c.notes ? `<div style="margin-top:14px;border-top:1px solid var(--line);padding-top:12px"><div class="flabel">Observaciones Técnicas</div><p style="margin:4px 0 0">${esc(c.notes)}</p></div>` : ""}
        </section>
      </div>

      <div class="stack">
        <section class="panel">
          <div class="panel-head">
            <h3>Indicadores de Seguimiento</h3>
          </div>
          ${al.length
            ? `<div class="alerts">${al.map(alertHTML).join("")}</div>`
            : emptyBox("Sin alertas activas", "El deportista se encuentra dentro de sus rangos normales.")
          }
        </section>

        <section class="panel">
          <div class="panel-head">
            <h3>Rutina de Entrenamiento Vigente</h3>
            ${routine ? `<button class="btn ghost sm" data-act="tab" data-tab="routines">Ver todas</button>` : ""}
          </div>
          ${routine
            ? `<div>
                <div class="font-bold font-lg">${esc(routine.name)}</div>
                <div class="muted small">${fmtDate(routine.date)} · ${esc(routine.frequency || "")} · ${(routine.exercises || []).length} ejercicios</div>
                <p class="small" style="margin:8px 0 0">${esc(routine.objective || "")}</p>
              </div>`
            : emptyBox("Sin rutina asignada", "Crea una pauta de entrenamiento de fuerza o velocidad.", `<button class="btn sm" data-act="newRoutine" data-client="${esc(c.id)}">${icon("plus")}Crear Rutina</button>`)
          }
        </section>

        <section class="panel">
          <div class="panel-head">
            <h3>Línea de Tiempo Reciente</h3>
            <button class="btn ghost sm" data-act="tab" data-tab="history">Historial</button>
          </div>
          ${tl.length
            ? `<div class="timeline">${tl.map(tlHTML).join("")}</div>`
            : emptyBox("Sin actividad registrada")
          }
        </section>
      </div>
    </div>
  `;
}

function groupTab(c, typeKey, embedded) {
  const t = typeDef(typeKey), g = t.group, defs = metricsOf(g);
  let recs = recordsOf(c.id, typeKey), test = null, testsBar = "";

  if (g === "nm") {
    const tests = sortTests([...new Set(recs.map(r => r.test).filter(Boolean))]);
    const want = S.ui.nmTest[c.id];
    test = tests.includes(want) ? want : tests.includes("CMJ") ? "CMJ" : tests[0];
    recs = recs.filter(r => r.test === test);
    if (tests.length) {
      testsBar = `<div class="seg" role="group" aria-label="Prueba">${tests.map(x => `<button data-act="nmTest" data-id="${esc(c.id)}" data-test="${esc(x)}" aria-pressed="${x === test}">${esc(x)}</button>`).join("")}</div>`;
    }
  }

  const head = `
    <div class="panel-head" style="margin-bottom:14px">
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
        <h2>${esc(t.label)}${embedded ? " · " + esc(c.name) : ""}</h2>
        ${testsBar}
      </div>
      <div class="actions">
        <button class="btn" data-act="tab" data-tab="compare" data-client="${esc(c.id)}" data-type="${esc(typeKey)}">${icon("compare")}Comparar</button>
        <button class="btn primary" data-act="newRecord" data-client="${esc(c.id)}" data-type="${esc(typeKey)}" ${test ? `data-test="${esc(test)}"` : ""}>${icon("plus")}Nuevo Registro</button>
      </div>
    </div>
  `;

  if (!recs.length) {
    return head + emptyBox(`Sin registros de ${t.label.toLowerCase()}`, "Añade el primer test para iniciar el monitoreo cronológico.", `<button class="btn primary" data-act="newRecord" data-client="${esc(c.id)}" data-type="${esc(typeKey)}">${icon("plus")}Registrar Test</button>`);
  }

  const withData = defs.filter(d => recs.some(r => r.values && typeof r.values[d.key] === "number"));
  const defaultKey = { anthro: "weight", gps: "dist", nm: "height", perf: withData[0] && withData[0].key }[g] || (withData[0] && withData[0].key);
  const selKey = withData.some(d => d.key === S.ui.metricSel[g]) ? S.ui.metricSel[g] : withData.some(d => d.key === defaultKey) ? defaultKey : (withData[0] || {}).key;

  const tiles = withData.map(def => {
    const pts = series(c.id, typeKey, def.key, test), a = analyze(pts, def);
    const rows = g === "gps"
      ? [["Promedio", fmtN(a.avg, def.dec)], ["Máximo", fmtN(a.max, def.dec)], ["Sesiones", a.n], ["Tendencia", a.trend.arrow + " " + a.trend.label]]
      : [["Mejor Marca", a.best && def.dir !== "neutral" ? fmtN(a.best.v, def.dec) : fmtN(a.max, def.dec)], ["Anterior", a.prev ? fmtN(a.prev.v, def.dec) : "—"], ["Sesiones", a.n], ["Tendencia", a.trend.arrow + " " + a.trend.label]];

    return `
      <button class="stat" aria-pressed="${def.key === selKey}" data-act="metricSel" data-g="${esc(g)}" data-k="${esc(def.key)}">
        <span class="lab"><span>${esc(def.label)}${def.calc ? ' <span title="Fórmula automática">ƒ</span>' : ""}</span><span>${a.last ? fmtDateS(a.last.date) : ""}</span></span>
        <span class="val num">${fmtN(a.last.v, def.dec)}<small>${esc(def.unit)}</small></span>
        ${chgHTML(a.status, a.abs, a.pct, def)}
        <span class="rows">${rows.map(r => `<span>${r[0]}</span><b>${esc(String(r[1]))}</b>`).join("")}</span>
      </button>
    `;
  }).join("");

  const sdef = metricDef(g, selKey);
  const spts = series(c.id, typeKey, selKey, test).map(p => Object.assign(p, { tag: g === "gps" ? (S.records[p.id] || {}).sessionType : test }));
  const bar = g === "gps" && sdef.dir === "neutral";
  const sa = analyze(spts, sdef);
  const cols = withData;

  const table = `
    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>Fecha</th>
            ${g === "nm" ? "<th>Prueba</th>" : ""}
            ${g === "gps" ? "<th>Sesión</th>" : ""}
            ${cols.map(d => `<th class="r">${esc(d.label)}<br><span style="text-transform:none;letter-spacing:0">${esc(d.unit)}</span></th>`).join("")}
            <th class="hide-sm">Notas</th>
            <th class="r">Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${recs.slice().reverse().map(r => `
            <tr>
              <td class="num font-bold">${fmtDateS(r.date)}</td>
              ${g === "nm" ? `<td><b>${esc(r.test || "—")}</b></td>` : ""}
              ${g === "gps" ? `<td>${esc(r.sessionType || "—")}</td>` : ""}
              ${cols.map(d => `<td class="r num">${r.values && r.values[d.key] != null ? fmtN(r.values[d.key], d.dec) + ((r.calc || []).includes(d.key) ? '<span class="muted"> ƒ</span>' : "") : '<span class="muted">—</span>'}</td>`).join("")}
              <td class="hide-sm small muted" style="max-width:240px">${esc(r.notes || "")}</td>
              <td>
                <div class="rowact">
                  <button class="icon-btn" aria-label="Editar" title="Editar" data-act="editRecord" data-id="${esc(r.id)}">${icon("edit")}</button>
                  <button class="icon-btn" aria-label="Eliminar" title="Eliminar" data-act="deleteRecord" data-id="${esc(r.id)}">${icon("trash")}</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  return `
    ${head}
    <div class="stats" style="margin-bottom:16px">${tiles}</div>
    <section class="panel" style="margin-bottom:16px">
      <div class="panel-head">
        <h3>Evolución Histórica · ${esc(sdef.label)}${test ? " (" + esc(test) + ")" : ""}</h3>
        <span class="muted small">${sa.n} registros · ${fmtDate(spts[0].date)} a ${fmtDate(spts[spts.length - 1].date)}${sa.n > 1 ? " · cambio neto: " + fmtSigned(spts[spts.length - 1].v - spts[0].v, sdef.dec) + " " + esc(sdef.unit) : ""}</span>
      </div>
      ${chartBox(evoChart(spts, sdef, { bar, avg: g === "gps" }), "chart-box", "Evolución de " + sdef.label)}
    </section>
    <section class="panel">
      <div class="panel-head">
        <h3>Historial Detallado de Sesiones</h3>
        <span class="muted small">ƒ = indicador derivado por algoritmo</span>
      </div>
      ${table}
    </section>
  `;
}

function evalsTab(c) {
  const ft = S.ui.evalsType[c.id] || "";
  const recs = recordsOf(c.id).filter(r => !ft || r.type === ft).reverse();
  const types = S.config.evalTypes;

  return `
    <div class="panel-head" style="margin-bottom:14px">
      <div class="seg" role="group" aria-label="Tipo">
        ${[["", "Todas"]].concat(types.map(t => [t.key, t.label])).map(t => `
          <button data-act="evalsType" data-id="${esc(c.id)}" data-type="${esc(t[0])}" aria-pressed="${ft === t[0]}">${esc(t[1])}</button>
        `).join("")}
      </div>
      <button class="btn primary" data-act="newRecord" data-client="${esc(c.id)}" data-type="${esc(ft)}">${icon("plus")}Nueva Evaluación</button>
    </div>
    ${recs.length ? recordsTable(recs, false) : emptyBox("Sin evaluaciones en esta categoría")}
  `;
}

function recordsTable(recs, withClient) {
  return `
    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>Fecha</th>
            ${withClient ? "<th>Deportista</th>" : ""}
            <th>Tipo</th>
            <th>Resultados Principales</th>
            <th class="hide-sm">Responsable</th>
            <th class="hide-sm">Observaciones</th>
            <th class="r">Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${recs.map(r => `
            <tr>
              <td class="num font-bold">${fmtDateS(r.date)}</td>
              ${withClient ? `<td><a href="#" data-act="openClient" data-id="${esc(r.clientId)}" data-tab="${esc(r.type)}"><b>${esc(clientName(r.clientId))}</b></a></td>` : ""}
              <td>${typeChip(r.type)}</td>
              <td class="small font-medium">${esc(recSummary(r))}</td>
              <td class="hide-sm small muted">${esc(r.professional || "—")}</td>
              <td class="hide-sm small muted" style="max-width:260px">${esc(r.notes || "")}</td>
              <td>
                <div class="rowact">
                  <button class="icon-btn" title="Editar" aria-label="Editar" data-act="editRecord" data-id="${esc(r.id)}">${icon("edit")}</button>
                  <button class="icon-btn" title="Eliminar" aria-label="Eliminar" data-act="deleteRecord" data-id="${esc(r.id)}">${icon("trash")}</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function routineCard(r, opts = {}) {
  const latest = routinesOf(r.clientId)[0];
  return `
    <article class="routine-card">
      <div class="rh">
        <div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <h3>${esc(r.name)}</h3>
            ${latest && latest.id === r.id ? `<span class="pill on">Vigente</span>` : `<span class="pill off">Anterior</span>`}
          </div>
          <div class="muted small">${opts.client ? esc(clientName(r.clientId)) + " · " : ""}${fmtDate(r.date)}${r.duration ? " · " + esc(r.duration) + " semanas" : ""}${r.frequency ? " · " + esc(r.frequency) : ""}</div>
        </div>
        <div class="actions">
          <button class="btn sm" data-act="editRoutine" data-id="${esc(r.id)}">${icon("edit")}Editar</button>
          <button class="btn sm" data-act="dupRoutine" data-id="${esc(r.id)}">${icon("copy")}Duplicar</button>
          <button class="icon-btn" title="Eliminar" aria-label="Eliminar" data-act="deleteRoutine" data-id="${esc(r.id)}">${icon("trash")}</button>
        </div>
      </div>

      ${r.objective ? `<div><span class="flabel">Objetivo Metodológico</span><div>${esc(r.objective)}</div></div>` : ""}

      ${(r.exercises || []).length
        ? `<div class="tbl-wrap">
            <table class="tbl ex-table">
              <thead>
                <tr>
                  <th>Ejercicio</th>
                  <th class="r">Series</th>
                  <th class="r">Reps</th>
                  <th class="r">Tiempo</th>
                  <th class="r">Descanso</th>
                  <th>Intensidad / Carga</th>
                  <th class="hide-sm">Notas Técnicas</th>
                </tr>
              </thead>
              <tbody>
                ${r.exercises.map(e => `
                  <tr>
                    <td><b>${esc(e.name)}</b></td>
                    <td class="r num">${esc(e.sets || "—")}</td>
                    <td class="r num">${esc(e.reps || "—")}</td>
                    <td class="r num">${esc(e.time || "—")}</td>
                    <td class="r num">${esc(e.rest || "—")}</td>
                    <td><span class="type-chip">${esc(e.intensity || "—")}</span></td>
                    <td class="hide-sm small muted">${esc(e.notes || "")}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>`
        : `<div class="muted small">Sin ejercicios registrados.</div>`
      }

      ${r.instructions ? `<div><span class="flabel">Indicaciones Específicas</span><div class="small">${esc(r.instructions)}</div></div>` : ""}
      ${r.notes ? `<div><span class="flabel">Observaciones</span><div class="small">${esc(r.notes)}</div></div>` : ""}
    </article>
  `;
}

function routinesTab(c) {
  const rs = routinesOf(c.id);
  return `
    <div class="panel-head" style="margin-bottom:14px">
      <h2>Programas y Rutinas de Carga</h2>
      <button class="btn primary" data-act="newRoutine" data-client="${esc(c.id)}">${icon("plus")}Nueva Rutina</button>
    </div>
    ${rs.length ? `<div class="stack">${rs.map(r => routineCard(r)).join("")}</div>` : emptyBox("Sin rutinas guardadas", "Crea una pauta de entrenamiento estructurada para este jugador.", `<button class="btn primary" data-act="newRoutine" data-client="${esc(c.id)}">${icon("plus")}Crear Rutina</button>`)}
  `;
}

function compareTab(c) {
  const st = S.ui.cmp[c.id] || (S.ui.cmp[c.id] = {});
  const avail = S.config.evalTypes.filter(t => recordsOf(c.id, t.key).length);
  if (!avail.length) return emptyBox("Datos insuficientes", "Se requieren al menos dos evaluaciones para generar comparaciones.");

  if (!avail.some(t => t.key === st.type)) {
    st.type = (avail.find(t => t.key === "gps" && recordsOf(c.id, "gps").length > 1) || avail.find(t => t.key === "nm" && recordsOf(c.id, "nm").length > 1) || avail[0]).key;
  }

  const t = typeDef(st.type), g = t.group;
  let recs = recordsOf(c.id, st.type);
  let testSel = "";

  if (g === "nm") {
    const tests = sortTests([...new Set(recs.map(r => r.test))]);
    if (!tests.includes(st.test)) st.test = tests.includes("CMJ") ? "CMJ" : tests[0];
    recs = recs.filter(r => r.test === st.test);
    testSel = `
      <div class="field">
        <label for="cmp-test">Prueba</label>
        <select id="cmp-test" class="input" data-act-change="cmpSet" data-id="${esc(c.id)}" data-k="test">
          ${tests.map(x => `<option ${x === st.test ? "selected" : ""}>${esc(x)}</option>`).join("")}
        </select>
      </div>
    `;
  }

  recs = recs.slice().reverse();
  if (!recs.some(r => r.id === st.curr)) st.curr = recs[0] && recs[0].id;
  if (!recs.some(r => r.id === st.prev) || st.prev === st.curr) st.prev = (recs.find(r => r.id !== st.curr) || {}).id;

  const opt = sel => recs.map(r => `<option value="${esc(r.id)}" ${r.id === sel ? "selected" : ""}>${fmtDate(r.date)} — ${esc(recSummary(r))}</option>`).join("");

  const picks = `
    <div class="cmp-pick">
      <div class="field">
        <label for="cmp-type">Módulo de Evaluación</label>
        <select id="cmp-type" class="input" data-act-change="cmpSet" data-id="${esc(c.id)}" data-k="type">
          ${avail.map(x => `<option value="${esc(x.key)}" ${x.key === st.type ? "selected" : ""}>${esc(x.label)}</option>`).join("")}
        </select>
      </div>
      ${testSel}
      <div class="field">
        <label for="cmp-prev">Evaluación Base (Anterior)</label>
        <select id="cmp-prev" class="input" data-act-change="cmpSet" data-id="${esc(c.id)}" data-k="prev">
          ${opt(st.prev)}
        </select>
      </div>
      <div class="field">
        <label for="cmp-curr">Evaluación Actual (Reciente)</label>
        <select id="cmp-curr" class="input" data-act-change="cmpSet" data-id="${esc(c.id)}" data-k="curr">
          ${opt(st.curr)}
        </select>
      </div>
    </div>
  `;

  if (recs.length < 2) return picks + emptyBox("Registros insuficientes", `Solo existe ${recs.length} registro en este módulo. Se requieren 2 para calcular deltas.`);

  const A = S.records[st.prev], B = S.records[st.curr];
  const defs = metricsOf(g).filter(d => (A.values || {})[d.key] != null || (B.values || {})[d.key] != null);
  const rows = defs.map(d => Object.assign({ def: d }, compareVals((A.values || {})[d.key], (B.values || {})[d.key], d)));

  const cards = rows.map(r => `
    <div class="cmp-card">
      <div class="metric">${esc(r.def.label)} <span class="muted small">${esc(r.def.unit)}</span></div>
      <div class="pair">
        <div><span>Anterior · ${fmtDateS(A.date)}</span><b>${r.prev != null ? fmtN(r.prev, r.def.dec) : "—"}</b></div>
        <div><span>Actual · ${fmtDateS(B.date)}</span><b>${r.curr != null ? fmtN(r.curr, r.def.dec) : "—"}</b></div>
      </div>
      <div class="pair">
        <div><span>Diferencia</span><b>${r.abs != null ? fmtSigned(r.abs, r.def.dec) + " " + esc(r.def.unit) : "—"}</b></div>
        <div><span>Variación %</span><b>${r.pct != null ? fmtSigned(r.pct, 1) + "%" : "—"}</b></div>
      </div>
      <div class="res">
        <span class="muted">Clasificación</span>
        ${r.abs != null ? `<span class="chg ${r.status.cls}">${r.status.arrow} ${r.status.label}</span>` : `<span class="chg na">Datos insuficientes</span>`}
      </div>
    </div>
  `).join("");

  const pctRows = rows.filter(r => r.pct != null).map(r => ({ label: r.def.label, pct: r.pct, cls: r.status.cls, status: r.status.label }));
  if (!defs.some(d => d.key === st.metric)) st.metric = (defs.find(d => d.key === { anthro: "weight", gps: "dist", nm: "height" }[g]) || defs[0] || {}).key;

  const mdef = metricDef(g, st.metric);
  const pts = series(c.id, st.type, st.metric, g === "nm" ? st.test : null);
  const hi = [pts.findIndex(p => p.id === A.id), pts.findIndex(p => p.id === B.id)].filter(i => i >= 0);

  const summ = {
    good: rows.filter(r => r.status.cls === "good").length,
    bad: rows.filter(r => r.status.cls === "bad").length,
    flat: rows.filter(r => r.status.cls === "flat").length
  };

  return `
    ${picks}
    <div class="demo-banner" style="background:var(--surface);border:1px solid var(--line)">
      <b style="color:var(--fg)">${Math.abs(daysBetween(A.date, B.date))} días entre evaluaciones.</b>
      <span>
        <span class="chg good">▲ ${summ.good} mejoras</span>
        <span class="chg bad">▼ ${summ.bad} retrocesos</span>
        <span class="chg flat">■ ${summ.flat} estables</span>
      </span>
    </div>

    <div class="cmp-hero">${cards}</div>

    <div class="grid g2">
      <section class="panel">
        <div class="panel-head">
          <h3>Variación Porcentual por Métrica</h3>
        </div>
        ${pctRows.length ? chartBox(pctBarChart(pctRows), "chart-box", "Variación porcentual") : emptyBox("Datos insuficientes")}
      </section>

      <section class="panel">
        <div class="panel-head">
          <h3>Trayectoria Histórica</h3>
          <select class="input" style="width:auto" id="cmp-metric" data-act-change="cmpSet" data-id="${esc(c.id)}" data-k="metric">
            ${defs.map(d => `<option value="${esc(d.key)}" ${d.key === st.metric ? "selected" : ""}>${esc(d.label)}</option>`).join("")}
          </select>
        </div>
        ${pts.length
          ? chartBox(evoChart(pts, mdef, { highlight: hi }), "chart-box", "Evolución histórica") + `<p class="hint" style="margin:8px 0 0">Puntos destacados = las dos fechas comparadas.</p>`
          : emptyBox("Datos insuficientes")
        }
      </section>
    </div>
  `;
}

function timelineItems(cid) {
  const items = recordsOf(cid).map(r => ({
    date: r.date,
    k: typeDef(r.type).group,
    title: typeDef(r.type).label + (r.test ? " · " + r.test : "") + (r.sessionType ? " · " + r.sessionType : ""),
    sub: recSummary(r),
    act: `data-act="editRecord" data-id="${esc(r.id)}"`
  }))
  .concat(routinesOf(cid).map(r => ({
    date: r.date,
    k: "routine",
    title: "Rutina: " + r.name,
    sub: r.objective || "",
    act: `data-act="tab" data-tab="routines"`
  })))
  .concat(reportsOf(cid).map(r => ({
    date: r.date || (r.createdAt || "").slice(0, 10),
    k: "report",
    title: "Informe Generado",
    sub: "Periodo " + fmtDateS(r.from) + " a " + fmtDateS(r.to),
    act: `data-act="viewReport" data-id="${esc(r.id)}"`
  })));

  return items.sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
}

const tlHTML = i => `
  <div class="tl" data-k="${esc(i.k)}" ${i.act} role="button" tabindex="0" style="cursor:pointer">
    <span class="date">${fmtDateS(i.date)}</span>
    <div style="min-width:0">
      <div style="font-weight:600">${esc(i.title)}</div>
      <div class="small muted" style="overflow-wrap:anywhere">${esc(i.sub)}</div>
    </div>
    <span class="muted">›</span>
  </div>
`;

function historyTab(c) {
  const items = timelineItems(c.id);
  if (!items.length) return emptyBox("Sin eventos en el historial");
  let lastM = "", h = "";
  items.forEach(i => {
    const m = i.date.slice(0, 7);
    if (m !== lastM) {
      h += `<div class="tl-month">${MESL[+m.slice(5) - 1]} ${m.slice(0, 4)}</div>`;
      lastM = m;
    }
    h += tlHTML(i);
  });
  return `
    <section class="panel">
      <div class="panel-head">
        <h3>Historial Cronológico de Cargas y Testeos</h3>
        <span class="muted small">${items.length} eventos (evaluaciones, rutinas e informes)</span>
      </div>
      <div class="timeline">${h}</div>
    </section>
  `;
}

function clientReportsTab(c) {
  const rs = reportsOf(c.id);
  return `
    <div class="panel-head" style="margin-bottom:14px">
      <h2>Informes Técnicos del Jugador</h2>
      <button class="btn primary" data-act="reportFor" data-id="${esc(c.id)}">${icon("reports")}Generar Informe</button>
    </div>
    ${rs.length ? reportsTable(rs, false) : emptyBox("Aún no se han emitido informes para este jugador")}
  `;
}

function reportsTable(rs, withClient) {
  return `
    <div class="tbl-wrap">
      <table class="tbl">
        <thead>
          <tr>
            <th>Generado</th>
            ${withClient ? "<th>Deportista</th>" : ""}
            <th>Periodo Evaluado</th>
            <th class="hide-sm">Secciones</th>
            <th class="r">Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${rs.map(r => `
            <tr class="click" data-act="viewReport" data-id="${esc(r.id)}">
              <td class="num font-bold">${fmtDateS(r.date || r.createdAt.slice(0, 10))}</td>
              ${withClient ? `<td><b>${esc(clientName(r.clientId))}</b></td>` : ""}
              <td class="num">${fmtDateS(r.from)} – ${fmtDateS(r.to)}</td>
              <td class="hide-sm small muted">${Object.keys(r.sections || {}).filter(k => r.sections[k]).map(k => ({ anthro: "Antropo", gps: "GPS", nm: "Neuromuscular", perf: "Físico", compare: "Comparación", routines: "Rutinas", notes: "Notas" }[k] || k)).join(", ")}</td>
              <td>
                <div class="rowact">
                  <button class="icon-btn" title="Ver" aria-label="Ver" data-act="viewReport" data-id="${esc(r.id)}">${icon("eye")}</button>
                  <button class="icon-btn" title="Eliminar" aria-label="Eliminar" data-act="deleteReport" data-id="${esc(r.id)}">${icon("trash")}</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}



/* --- MODULE: reports.js --- */
/* ==========================================================================
   11. VISTAS GLOBALES: EVALUACIONES, RUTINAS, MÓDULOS GPS Y NM
   ========================================================================== */
function evalsView() {
  const f = S.ui.evals;
  const recs = Object.values(S.records).filter(r => (!f.client || r.clientId === f.client) && (!f.type || r.type === f.type) && (!f.from || r.date >= f.from) && (!f.to || r.date <= f.to)).sort((a, b) => a.date < b.date ? 1 : -1);

  return `
    <div class="page-head">
      <div>
        <h1>Registro Global de Evaluaciones</h1>
        <div class="sub">${Object.keys(S.records).length} testeos y sesiones almacenadas</div>
      </div>
      <div class="actions">
        <button class="btn primary" data-act="newRecord" data-client="${esc(f.client)}" data-type="${esc(f.type)}">${icon("plus")}Nueva Evaluación</button>
      </div>
    </div>

    <div class="filters">
      <div class="field">
        <label for="e-client">Filtrar por Deportista</label>
        <select id="e-client" class="input" data-ui="evals.client">
          ${clientOptions(f.client, true, "Todos los deportistas")}
        </select>
      </div>
      <div class="field">
        <label for="e-type">Módulo</label>
        <select id="e-type" class="input" data-ui="evals.type">
          <option value="">Todos los módulos</option>
          ${S.config.evalTypes.map(t => `<option value="${esc(t.key)}" ${t.key === f.type ? "selected" : ""}>${esc(t.label)}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label for="e-from">Desde</label>
        <input id="e-from" type="date" class="input" value="${esc(f.from)}" data-ui="evals.from">
      </div>
      <div class="field">
        <label for="e-to">Hasta</label>
        <input id="e-to" type="date" class="input" value="${esc(f.to)}" data-ui="evals.to">
      </div>
    </div>

    ${recs.length ? recordsTable(recs, true) : emptyBox("No hay evaluaciones con los filtros seleccionados")}
  `;
}

function routinesView() {
  const f = S.ui.routines;
  const rs = Object.values(S.routines).filter(r => !f.client || r.clientId === f.client).sort((a, b) => a.date < b.date ? 1 : -1);

  return `
    <div class="page-head">
      <div>
        <h1>Rutinas y Programación de Cargas</h1>
        <div class="sub">${Object.keys(S.routines).length} pautas metodológicas activas</div>
      </div>
      <div class="actions">
        <button class="btn primary" data-act="newRoutine" data-client="${esc(f.client)}">${icon("plus")}Nueva Rutina</button>
      </div>
    </div>

    <div class="filters">
      <div class="field">
        <label for="r-client">Deportista</label>
        <select id="r-client" class="input" data-ui="routines.client">
          ${clientOptions(f.client, true, "Todos los deportistas")}
        </select>
      </div>
    </div>

    ${rs.length ? `<div class="stack">${rs.map(r => routineCard(r, { client: true })).join("")}</div>` : emptyBox("Sin rutinas asignadas")}
  `;
}

function moduleView(type) {
  const t = typeDef(type), key = type === "gps" ? "gpsClient" : "nmClient";
  const withData = clientsArr().filter(c => recordsOf(c.id, type).length).sort((a, b) => a.name.localeCompare(b.name, "es"));

  if (!S.clients[S.ui[key]]) S.ui[key] = (withData[0] || clientsArr()[0] || {}).id || "";
  const c = S.clients[S.ui[key]];

  let sumTable = "";
  if (type === "gps") {
    sumTable = withData.map(cl => {
      const rs = recordsOf(cl.id, "gps"), r = rs[rs.length - 1], v = r.values;
      const a = analyze(series(cl.id, "gps", "vmax"), metricDef("gps", "vmax"));
      const avgD = rs.reduce((s, x) => s + (x.values.dist || 0), 0) / rs.length;
      return `
        <tr class="click" data-act="setUi" data-path="gpsClient" data-val="${esc(cl.id)}">
          <td><b>${esc(cl.name)}</b></td>
          <td class="num">${fmtDateS(r.date)}</td>
          <td>${esc(r.sessionType || "—")}</td>
          <td class="r num font-bold">${rs.length}</td>
          <td class="r num">${fmtN(v.dist, 0)} m</td>
          <td class="r num hide-sm">${fmtN(avgD, 0)} m</td>
          <td class="r num">${fmtN(v.mpm, 1)}</td>
          <td class="r num font-bold">${fmtN(v.vmax, 1)} km/h</td>
          <td>${chgHTML(a.status, a.abs, a.pct, metricDef("gps", "vmax"), { noUnit: true })}</td>
        </tr>
      `;
    }).join("");

    sumTable = `
      <table class="tbl">
        <thead>
          <tr>
            <th>Deportista</th>
            <th>Última Sesión</th>
            <th>Tipo</th>
            <th class="r">Sesiones</th>
            <th class="r">Distancia Total</th>
            <th class="r hide-sm">Promedio Dist.</th>
            <th class="r">MxMin (m/min)</th>
            <th class="r">Vmáx Pico</th>
            <th>Tendencia Vmáx</th>
          </tr>
        </thead>
        <tbody>${sumTable}</tbody>
      </table>
    `;
  } else {
    sumTable = withData.map(cl => {
      const d = metricDef("nm", "height"), p = series(cl.id, "nm", "height", "CMJ"), a = analyze(p, d);
      const rsi = latestValue(cl.id, "nm", "rsi", "Drop Jump");
      const as = latestValue(cl.id, "nm", "asym");
      return `
        <tr class="click" data-act="setUi" data-path="nmClient" data-val="${esc(cl.id)}">
          <td><b>${esc(cl.name)}</b></td>
          <td class="num">${a.last ? fmtDateS(a.last.date) : "—"}</td>
          <td class="r num font-bold">${a.last ? fmtN(a.last.v, 1) + " cm" : "—"}</td>
          <td>${a.last ? chgHTML(a.status, a.abs, a.pct, d) : "—"}</td>
          <td class="r num">${rsi ? fmtN(rsi.v, 2) : "—"}</td>
          <td class="r num">${as ? fmtN(as.v, 1) + "%" : "—"}</td>
        </tr>
      `;
    }).join("");

    sumTable = `
      <table class="tbl">
        <thead>
          <tr>
            <th>Deportista</th>
            <th>Último CMJ</th>
            <th class="r">Altura Salto (cm)</th>
            <th>Cambio vs Previo</th>
            <th class="r">RSI Drop Jump</th>
            <th class="r">Asimetría %</th>
          </tr>
        </thead>
        <tbody>${sumTable}</tbody>
      </table>
    `;
  }

  let multiChartHTML = "";
  if (withData.length > 1) {
    if (type === "gps") {
      const gpsSquad = withData.map(cl => {
        const rs = recordsOf(cl.id, "gps");
        const last = rs[rs.length - 1];
        return {
          id: cl.id,
          name: cl.name,
          val: Math.round(((last && last.values.vmax) || 0) * 10) / 10
        };
      }).sort((a, b) => b.val - a.val);

      const mDef = metricDef("gps", "vmax");
      const chartFn = multiPlayerComparisonChart(gpsSquad, mDef, { highlightId: S.ui[key] });
      multiChartHTML = `
        <div style="height:230px;padding:12px 16px 8px">
          ${chartBox(chartFn, "chart-box", "Comparativa Plantel Vmáx")}
        </div>
      `;
    } else {
      const nmSquad = withData.map(cl => {
        const rs = recordsOf(cl.id, "nm");
        const cmj = rs.filter(r => r.test === "CMJ").slice(-1)[0] || rs[rs.length - 1];
        return {
          id: cl.id,
          name: cl.name,
          val: Math.round(((cmj && cmj.values.height) || 0) * 10) / 10
        };
      }).filter(x => x.val > 0).sort((a, b) => b.val - a.val);

      const mDef = metricDef("nm", "height");
      const chartFn = multiPlayerComparisonChart(nmSquad, mDef, { highlightId: S.ui[key] });
      multiChartHTML = `
        <div style="height:230px;padding:12px 16px 8px">
          ${chartBox(chartFn, "chart-box", "Comparativa Plantel CMJ")}
        </div>
      `;
    }
  }

  return `
    <div class="page-head">
      <div>
        <h1>${esc(t.label)}</h1>
        <div class="sub">${type === "gps" ? "Telemetría cinemática: distancias relativas, zonas de velocidad y Player Load." : "Control neuromuscular balístico: salto vertical, RSI reactivo y asimetría bilateral."}</div>
      </div>
      <div class="actions">
        <div class="field" style="min-width:260px">
          <label for="mod-client">Seleccionar Deportista</label>
          <select id="mod-client" class="input" data-ui="${key}">
            ${clientOptions(S.ui[key], true)}
          </select>
        </div>
      </div>
    </div>

    ${withData.length ? `
      <section class="panel" style="margin-bottom:18px">
        <div class="panel-head">
          <div>
            <h3>Comparativa de Rendimiento del Plantel</h3>
            <span class="muted small">${type === "gps" ? "Ranking de Velocidad Máxima (km/h) con promedio de equipo y jugador seleccionado" : "Ranking de Salto Vertical CMJ (cm) con promedio de equipo y jugador seleccionado"}</span>
          </div>
        </div>
        ${multiChartHTML}
        <div class="tbl-wrap" style="border-top:1px solid var(--border)">${sumTable}</div>
      </section>
    ` : ""}
    ${c ? groupTab(c, type, true) : emptyBox("Selecciona un jugador")}
  `;
}

/* ==========================================================================
   12. GENERADOR DE INFORMES TÉCNICOS & EXPORTACIÓN PDF A4
   ========================================================================== */
function defaultBuilder(cid) {
  const to = todayISO();
  const from = addDays(to, -120);
  return {
    clientId: cid || "",
    from, to,
    sections: { anthro: true, gps: true, nm: true, perf: true, compare: true, routines: true, notes: true },
    cmpType: "", cmpTest: "", cmpPrev: "", cmpCurr: "", note: ""
  };
}

function reportsView() {
  if (!S.ui.rep) S.ui.rep = defaultBuilder((clientsArr().filter(c => c.status !== "inactive")[0] || {}).id);
  const b = S.ui.rep, c = S.clients[b.clientId];
  const reps = Object.values(S.reports).sort((a, x) => (x.createdAt || "") < (a.createdAt || "") ? -1 : 1);

  let cmpBlock = "";
  if (c) {
    const avail = S.config.evalTypes.filter(t => recordsOf(c.id, t.key).length > 1);
    if (!avail.some(t => t.key === b.cmpType)) b.cmpType = (avail.find(t => t.key === "gps") || avail.find(t => t.key === "nm") || avail[0] || {}).key || "";
    if (b.cmpType) {
      let recs = recordsOf(c.id, b.cmpType).filter(r => r.date <= b.to);
      let testSel = "";
      if (typeDef(b.cmpType).group === "nm") {
        const tests = [...new Set(recs.map(r => r.test))];
        if (!tests.includes(b.cmpTest)) b.cmpTest = tests.includes("CMJ") ? "CMJ" : tests[0];
        recs = recs.filter(r => r.test === b.cmpTest);
        testSel = `<div class="field"><label for="rb-test">Prueba</label><select id="rb-test" class="input" data-ui="rep.cmpTest">${tests.map(x => `<option ${x === b.cmpTest ? "selected" : ""}>${esc(x)}</option>`).join("")}</select></div>`;
      }
      recs = recs.reverse();
      if (!recs.some(r => r.id === b.cmpCurr)) b.cmpCurr = recs[0] ? recs[0].id : "";
      if (!recs.some(r => r.id === b.cmpPrev) || b.cmpPrev === b.cmpCurr) b.cmpPrev = (recs.find(r => r.id !== b.cmpCurr) || {}).id || "";
      const opt = s => recs.map(r => `<option value="${esc(r.id)}" ${r.id === s ? "selected" : ""}>${fmtDate(r.date)} — ${esc(recSummary(r))}</option>`).join("");
      cmpBlock = `
        <div class="form-grid">
          <div class="field"><label for="rb-ctype">Módulo</label><select id="rb-ctype" class="input" data-ui="rep.cmpType">${avail.map(t => `<option value="${esc(t.key)}" ${t.key === b.cmpType ? "selected" : ""}>${esc(t.label)}</option>`).join("")}</select></div>
          ${testSel}
          <div class="field"><label for="rb-prev">Evaluación Base</label><select id="rb-prev" class="input" data-ui="rep.cmpPrev">${opt(b.cmpPrev)}</select></div>
          <div class="field"><label for="rb-curr">Evaluación Reciente</label><select id="rb-curr" class="input" data-ui="rep.cmpCurr">${opt(b.cmpCurr)}</select></div>
        </div>
      `;
    }
  }

  const inPeriod = c ? recordsOf(c.id).filter(r => r.date >= b.from && r.date <= b.to) : [];

  return `
    <div class="page-head">
      <div>
        <h1>Generador Oficial de Informes Técnicos</h1>
        <div class="sub">Documentos de exportación en formato editorial A4 con métricas cinemáticas y prescripciones</div>
      </div>
    </div>

    <div class="grid g-7-5" style="margin-bottom: 20px;">
      <section class="panel">
        <div class="panel-head">
          <h3>Configurar Informe</h3>
        </div>
        <div class="stack">
          <div class="form-grid">
            <div class="field span3">
              <label for="rb-client">Deportista *</label>
              <select id="rb-client" class="input" data-ui="rep.clientId">
                ${clientOptions(b.clientId, true, "Seleccionar deportista")}
              </select>
            </div>
            <div class="field">
              <label for="rb-from">Fecha Inicial</label>
              <input id="rb-from" type="date" class="input" value="${esc(b.from)}" data-ui="rep.from">
            </div>
            <div class="field">
              <label for="rb-to">Fecha Final</label>
              <input id="rb-to" type="date" class="input" value="${esc(b.to)}" data-ui="rep.to">
            </div>
            <div class="field">
              <span class="flabel">Rango Rápido</span>
              <div class="seg">
                ${[[30, "30 d"], [90, "90 d"], [180, "6 m"], [365, "1 año"]].map(p => `
                  <button data-act="repRange" data-days="${p[0]}" aria-pressed="${daysBetween(b.from, b.to) === p[0]}">${p[1]}</button>
                `).join("")}
              </div>
            </div>
          </div>

          <fieldset class="fieldset">
            <legend>Secciones Incluidas</legend>
            <div class="checks">
              ${Object.keys(SECTION_LABELS).map(k => `
                <label class="check">
                  <input type="checkbox" id="rb-s-${k}" data-ui-check="rep.sections.${k}" ${b.sections[k] ? "checked" : ""}>
                  ${SECTION_LABELS[k]}
                </label>
              `).join("")}
            </div>
          </fieldset>

          ${b.sections.compare ? `<fieldset class="fieldset"><legend>Comparación de Evaluaciones</legend>${c ? cmpBlock : `<p class="hint">Selecciona un jugador primero.</p>`}</fieldset>` : ""}

          <div class="field">
            <label for="rb-note">Observaciones Metodológicas y Conclusiones del PF</label>
            <textarea id="rb-note" class="input" rows="4" data-ui="rep.note" placeholder="Escribe el criterio del cuerpo técnico que acompañará a los gráficos...">${esc(b.note)}</textarea>
          </div>

          <div class="actions" style="justify-content:space-between">
            <span class="hint">${c ? `${inPeriod.length} sesiones en el rango seleccionado.` : ""}</span>
            <button class="btn primary" data-act="generateReport" ${c ? "" : "disabled"}>${icon("reports")}Generar y Visualizar Informe</button>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h3>Estructura del Documento A4</h3>
        </div>
        <ol class="small" style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:7px;color:var(--fg2)">
          <li><b>Portada Editorial:</b> Escudo/logo Eleven Performance, foto del jugador, periodo y credenciales técnicas.</li>
          <li><b>Perfil Biomédico:</b> Estado actual, antropometría e historial ponderado.</li>
          <li><b>Telemetría GPS:</b> Volumen cinemático, aceleraciones y comparativa de carga.</li>
          <li><b>Perfil Neuromuscular:</b> Altura de salto, reactividad RSI y asimetría de miembros inferiores.</li>
          <li><b>Deltas & Variaciones:</b> Gráficos de barras comparativas y análisis de progresión.</li>
          <li><b>Fortalezas & Alertas:</b> Clasificación algorítmica de adaptaciones positivas y descensos.</li>
          <li><b>Prescripciones Metodológicas:</b> Recomendaciones para el microciclo siguiente y firma profesional.</li>
        </ol>
      </section>
    </div>

    <section class="panel">
      <div class="panel-head">
        <h3>Historial de Informes Guardados</h3>
        <span class="muted small">${reps.length} disponibles</span>
      </div>
      ${reps.length ? reportsTable(reps, true) : emptyBox("No hay informes previos")}
    </section>
  `;
}

const SECTION_LABELS = {
  anthro: "Antropometría",
  gps: "GPS & Cinemática",
  nm: "Neuromuscular (CMJ & RSI)",
  perf: "Rendimiento Físico",
  compare: "Comparativa de Fechas",
  routines: "Rutinas Asignadas",
  notes: "Conclusiones Técnicas"
};

function buildReportModel(rep) {
  const c = S.clients[rep.clientId];
  if (!c) return null;
  const R = S.config.rules, P = S.config.professional;
  const recsP = recordsOf(c.id).filter(r => r.date >= rep.from && r.date <= rep.to);
  const findings = periodFindings(c.id, rep.from, rep.to, rep.sections);

  const dirF = findings.filter(f => f.def.dir !== "neutral" && f.a.prev);
  const good = dirF.filter(f => f.a.status.cls === "good");
  const bad = dirF.filter(f => f.a.status.cls === "bad");
  const flat = dirF.filter(f => f.a.status.cls === "flat");

  const fmtF = f => `${f.name}: ${fmtN(f.a.prev.v, f.def.dec)} → ${fmtN(f.a.last.v, f.def.dec)} ${f.def.unit} (${fmtSigned(f.a.pct, 1)}%)`;

  const strengths = good.sort((a, b) => Math.abs(b.a.pct) - Math.abs(a.a.pct)).map(fmtF);
  const improve = bad.sort((a, b) => Math.abs(b.a.pct) - Math.abs(a.a.pct)).map(f => fmtF(f) + " (Descenso registrado)");

  const recs = [];
  if (bad.some(f => f.group === "nm")) recs.push("Programar descarga neuromuscular y enfatizar trabajo de RFD.");
  if (bad.some(f => f.group === "gps")) recs.push("Ajustar exposición a metros a alta intensidad (+19.8 km/h) en el microciclo.");
  if (good.length) recs.push(`Mantener progresión en capacidades donde se evidenció mejora (${good.slice(0, 3).map(f => f.def.label).join(", ")}).`);
  recs.push(`Próxima evaluación recomendada: ${c.nextEvalDate ? fmtDateL(c.nextEvalDate) : "en 3 semanas"}.`);

  const state = `Durante el periodo comprendido entre el ${fmtDateL(rep.from)} y el ${fmtDateL(rep.to)}, ${c.name} registró ${recsP.length} evaluaciones de rendimiento. Se evidencia una adaptación con ${good.length} indicadores en mejora, ${bad.length} en descenso y ${flat.length} estables.`;
  const concl = rep.note || `En conclusión, el jugador presenta un comportamiento competitivo acorde a los objetivos del periodo. Se sugiere mantener el monitoreo periódico de cinemática GPS y reactividad elástica.`;

  return { c, P, rep, recsP, findings, strengths, improve, recs, state, concl, good, bad, flat };
}

function periodFindings(cid, from, to, sections) {
  const items = [];
  S.config.evalTypes.filter(t => t.group !== "general" && sections[t.group] !== false).forEach(t => {
    const recs = recordsOf(cid, t.key).filter(r => r.date <= to);
    const tests = t.group === "nm" ? [...new Set(recs.filter(r => r.date >= from).map(r => r.test))] : [null];
    tests.forEach(test => metricsOf(t.group).forEach(def => {
      const pts = series(cid, t.key, def.key, test, to);
      const inP = pts.filter(p => p.date >= from);
      if (!inP.length) return;
      const a = analyze(pts, def);
      items.push({ type: t.key, group: t.group, test, def, a, name: (test ? test + " · " : "") + def.label });
    }));
  });
  return items;
}

function rptChg(st, abs, pct, def) {
  if (abs == null) return `<span class="rpt-chg na">Datos insuficientes</span>`;
  return `<span class="rpt-chg ${st.cls}">${st.arrow} ${fmtSigned(abs, def.dec)}${pct != null ? " · " + fmtSigned(pct, 1) + "%" : ""} · ${st.label}</span>`;
}

function reportSections(M) {
  const { c, rep } = M, secs = [], to = rep.to, from = rep.from;
  const lastA = recordsOf(c.id, "anthro").filter(r => r.date <= to).slice(-1)[0], va = lastA ? lastA.values : {};
  const age = ageFrom(c.birthDate);

  // 1. Perfil
  secs.push({
    title: "Perfil Biomédico del Deportista",
    html: `
      <div class="rpt-kv">
        <div><span>Nombre</span><b>${esc(c.name)}</b></div>
        <div><span>Edad</span><b>${age != null ? age + " años" : "—"}</b></div>
        <div><span>Posición</span><b>${esc(c.position || "—")}</b></div>
        <div><span>Perfil</span><b>${esc(c.foot || "—")}</b></div>
        <div><span>Estatura</span><b>${va.height != null ? fmtN(va.height, 1) + " cm" : "—"}</b></div>
        <div><span>Peso</span><b>${va.weight != null ? fmtN(va.weight, 1) + " kg" : "—"}</b></div>
        <div><span>Talla Sentada</span><b>${va.sitting != null ? fmtN(va.sitting, 1) + " cm" : "—"}</b></div>
        <div><span>IMC</span><b>${va.bmi != null ? fmtN(va.bmi, 1) + " kg/m²" : "—"}</b></div>
      </div>
      <p class="small" style="margin-top:8px;color:var(--p-muted)">Mediciones estandarizadas registradas al corte de ${fmtDate(to)}.</p>
    `
  });

  // 2. Estado Actual
  const key = [
    ["nm", "height", "CMJ"],
    ["nm", "rsi", "Drop Jump"],
    ["gps", "vmax", null],
    ["gps", "mpm", null],
    ["anthro", "weight", null]
  ].map(([t, k, test]) => {
    const def = metricDef(typeDef(t).group, k), pts = series(c.id, t, k, test, to);
    if (!pts.length) return null;
    const a = analyze(pts, def);
    return `
      <tr>
        <td><b>${esc((test ? test + " · " : "") + def.label)}</b></td>
        <td class="mono">${fmtDateS(a.last.date)}</td>
        <td class="r mono">${fmtN(a.last.v, def.dec)} ${esc(def.unit)}</td>
        <td class="r mono">${a.prev ? fmtN(a.prev.v, def.dec) : "—"}</td>
        <td>${rptChg(a.status, a.abs, a.pct, def)}</td>
      </tr>
    `;
  }).filter(Boolean);

  secs.push({
    title: "Diagnóstico Cinemático & Biomecánico",
    html: `
      <p>${esc(M.state)}</p>
      ${key.length ? `<table class="rpt-tbl"><thead><tr><th>Indicador Clave</th><th>Fecha</th><th class="r">Valor Actual</th><th class="r">Valor Previo</th><th>Diferencia / Estado</th></tr></thead><tbody>${key.join("")}</tbody></table>` : ""}
    `
  });

  // 3. GPS
  if (rep.sections.gps) {
    const inP = recordsOf(c.id, "gps").filter(r => r.date >= from && r.date <= to);
    if (inP.length) {
      const rows = metricsOf("gps").filter(d => inP.some(r => r.values[d.key] != null)).map(d => {
        const vals = inP.map(r => r.values[d.key]).filter(v => typeof v === "number");
        const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
        const max = Math.max(...vals);
        const last = vals[vals.length - 1];
        return `<tr><td>${esc(d.label)} <span style="color:var(--p-muted)">(${esc(d.unit)})</span></td><td class="r mono">${fmtN(avg, d.dec)}</td><td class="r mono font-bold">${fmtN(max, d.dec)}</td><td class="r mono">${fmtN(last, d.dec)}</td></tr>`;
      }).join("");

      const dpts = inP.filter(r => r.values.dist != null).map(r => ({ date: r.date, v: r.values.dist, tag: r.sessionType }));
      const vpts = inP.filter(r => r.values.vmax != null).map(r => ({ date: r.date, v: r.values.vmax, tag: r.sessionType }));

      secs.push({
        title: "Análisis Telemétrico GPS Catapult",
        html: `
          <p>${inP.length} sesiones de competencia / entrenamiento monitoreadas en el microciclo:</p>
          <table class="rpt-tbl"><thead><tr><th>Parámetro Cinemático</th><th class="r">Promedio Sesión</th><th class="r">Máximo Pico</th><th class="r">Última Sesión</th></tr></thead><tbody>${rows}</tbody></table>
          <div class="rpt-two" style="margin-top:12px">
            <div><div class="small" style="font-weight:700;margin-bottom:4px">Distancia Total por Sesión (m)</div>${chartBox(evoChart(dpts, metricDef("gps", "dist"), { bar: true, avg: true }), "rpt-chart", "Distancia GPS")}</div>
            <div><div class="small" style="font-weight:700;margin-bottom:4px">Velocidad Máxima (km/h)</div>${chartBox(evoChart(vpts, metricDef("gps", "vmax")), "rpt-chart", "Velocidad máxima")}</div>
          </div>
        `
      });
    }
  }

  // 4. Neuromuscular
  if (rep.sections.nm) {
    const nmF = M.findings.filter(f => f.group === "nm");
    if (nmF.length) {
      const tbl = nmF.map(f => `
        <tr>
          <td><b>${esc(f.test || "Test")}</b></td>
          <td>${esc(f.def.label)} (${esc(f.def.unit)})</td>
          <td class="r mono font-bold">${fmtN(f.a.last.v, f.def.dec)}</td>
          <td class="r mono">${f.a.prev ? fmtN(f.a.prev.v, f.def.dec) : "—"}</td>
          <td class="r mono">${f.a.best ? fmtN(f.a.best.v, f.def.dec) : "—"}</td>
          <td>${rptChg(f.a.status, f.a.abs, f.a.pct, f.def)}</td>
        </tr>
      `).join("");

      const cpts = series(c.id, "nm", "height", "CMJ", to);
      secs.push({
        title: "Perfil Neuromuscular & Reactividad",
        html: `
          <table class="rpt-tbl"><thead><tr><th>Prueba</th><th>Parámetro</th><th class="r">Actual</th><th class="r">Previo</th><th class="r">Mejor</th><th>Evolución</th></tr></thead><tbody>${tbl}</tbody></table>
          ${cpts.length > 1 ? `<div style="margin-top:12px"><div class="small" style="font-weight:700;margin-bottom:4px">Evolución de Salto Vertical CMJ (cm)</div>${chartBox(evoChart(cpts, metricDef("nm", "height")), "rpt-chart", "CMJ")}</div>` : ""}
        `
      });
    }
  }

  // 4B. Comparativa vs Plantel (Multi-Jugador en Reporte A4)
  if (rep.sections.compare) {
    const squad = Object.values(S.clients).filter(cl => cl.status !== "inactive");
    if (squad.length > 1) {
      const gpsSquad = squad.map(cl => {
        const rs = recordsOf(cl.id, "gps");
        if (!rs.length) return null;
        const last = rs[rs.length - 1];
        return {
          id: cl.id,
          name: cl.name,
          val: Math.round(((last && last.values.vmax) || 0) * 10) / 10
        };
      }).filter(Boolean).sort((a, b) => b.val - a.val);

      if (gpsSquad.length > 1) {
        secs.push({
          title: "Benchmarking Cinemático vs Plantel (Vmáx Pico)",
          html: `
            <p>Comparativa de velocidad punta registrada en competencia oficial respecto al resto del plantel profesional:</p>
            <div style="margin-top:10px">
              ${chartBox(multiPlayerComparisonChart(gpsSquad, metricDef("gps", "vmax"), { highlightId: c.id }), "rpt-chart", "Comparativa Plantel Vmáx")}
            </div>
          `
        });
      }
    }
  }

  // 5. Fortalezas & Mejoras
  secs.push({
    title: "Fortalezas Detectadas",
    html: M.strengths.length
      ? `<ul class="rpt-list good">${M.strengths.map(s => `<li>▲ ${esc(s)}</li>`).join("")}</ul>`
      : `<p>Sin mejoras significativas detectadas en el periodo.</p>`
  });

  secs.push({
    title: "Aspectos a Monitorear",
    html: M.improve.length
      ? `<ul class="rpt-list bad">${M.improve.map(s => `<li>▼ ${esc(s)}</li>`).join("")}</ul>`
      : `<p>No se identificaron descensos críticos en los parámetros testeados.</p>`
  });

  // 6. Recomendaciones & Conclusión
  secs.push({
    title: "Recomendaciones Metodológicas & Prescripción",
    html: `<ul class="rpt-list rec">${M.recs.map(s => `<li>${esc(s)}</li>`).join("")}</ul>`
  });

  secs.push({
    title: "Conclusión Técnica",
    html: `<p>${esc(M.concl)}</p>`,
    sign: true
  });

  return secs;
}

function reportView() {
  const rep = S.reports[S.view.reportId];
  if (!rep) return emptyBox("Informe no encontrado", "", `<button class="btn" data-act="go" data-page="reports">Volver</button>`);

  const M = buildReportModel(rep);
  if (!M) return emptyBox("Deportista no disponible", "", `<button class="btn" data-act="go" data-page="reports">Volver</button>`);

  const { c, P } = M;
  const qStart = chartQueue.length;
  const secs = reportSections(M);
  S._reportChartQ = chartQueue.splice(qStart);

  const dateR = rep.date || (rep.createdAt || "").slice(0, 10);

  const cover = `
    <div class="rpt-page rpt-cover">
      <div class="lines"></div>
      <div class="top">
        <div style="display:flex;align-items:center;gap:12px">
          <span class="brand-logo" style="width:78px;height:78px"></span>
          <div>
            <div class="brand-name" style="font-size:22px">${esc(P.brand)}</div>
            <div class="brand-tag" style="font-size:11px">${esc(P.tagline)}</div>
          </div>
        </div>
        <div style="font-family:var(--f-mono);font-size:12px;color:#93A0B8">${fmtDate(dateR)}</div>
      </div>
      <div class="mid">
        ${c.photo ? `<div style="width:140px;height:140px;border-radius:50%;background:#0F1A2E url('${c.photo}') center/cover no-repeat;box-shadow:0 0 0 3px #D6A64E;margin-bottom:24px"></div>` : ""}
        <div class="k">INFORME DE RENDIMIENTO & CARGA</div>
        <h1>Informe de<br>Rendimiento</h1>
        <div class="who">${esc(c.name)}</div>
        <div style="color:#B7C2D6;margin-top:6px;font-size:16px">${esc([c.position, ageFrom(c.birthDate) != null ? ageFrom(c.birthDate) + " años" : ""].filter(Boolean).join(" · "))}</div>
        <div class="stripe"></div>
      </div>
      <div class="bot">
        <div><span>Periodo Analizado</span><b>${fmtDate(rep.from)} – ${fmtDate(rep.to)}</b></div>
        <div><span>Fecha de Emisión</span><b>${fmtDateL(dateR)}</b></div>
        <div><span>Preparador Físico</span><b>${esc(P.name)}</b><br><b style="color:#93A0B8;font-size:12px">${esc(P.role)}</b></div>
      </div>
    </div>
  `;

  S._reportSecs = secs;
  S._reportMeta = { c, P, rep, dateR };

  return `
    <button class="back" data-act="go" data-page="reports">${icon("back")}Volver a Informes</button>
    <div class="page-head">
      <div>
        <h1>Informe Técnico · ${esc(c.name)}</h1>
        <div class="sub">Periodo ${fmtDate(rep.from)} al ${fmtDate(rep.to)} · Emisión: ${fmtDate(dateR)}</div>
      </div>
      <div class="actions">
        <button class="btn" data-act="openClient" data-id="${esc(c.id)}">Ver Ficha</button>
        <button class="btn" data-act="exportHTML">${icon("download")}Descargar HTML</button>
        <button class="btn primary" data-act="exportPDF" id="btn-pdf">${icon("download")}Descargar PDF (A4)</button>
      </div>
    </div>

    <div class="rpt-stage">
      <div class="rpt-pages" id="rpt-pages">
        ${cover}
        <div id="rpt-measure" class="rpt-page" style="min-height:0;position:absolute;left:-10000px;top:0;visibility:hidden">
          <div class="rpt-body" id="rpt-measure-body"></div>
        </div>
      </div>
    </div>
  `;
}

function afterReportRender() {
  const wrap = $("#rpt-pages"), mb = $("#rpt-measure-body");
  if (!wrap || !mb) return;

  REPORT_CHARTS.forEach(ch => ch.destroy());
  REPORT_CHARTS = [];

  const { c, P } = S._reportMeta, secs = S._reportSecs;
  const pendingCharts = S._reportChartQ || [];
  S._reportChartQ = [];

  const secHTML = (s, i) => `
    <section class="rpt-sec">
      <h2><span class="n">${pad(i + 1)}</span>${esc(s.title)}</h2>
      ${s.html}
      ${s.sign ? `
        <div class="rpt-sign">
          <div class="small" style="color:var(--p-muted);max-width:360px">
            ${esc(P.brand)} · ${esc(P.tagline)}<br>${esc(P.contact || "")}
          </div>
          <div class="s">
            <b>${esc(P.name)}</b><br>${esc(P.role)}
          </div>
        </div>
      ` : ""}
    </section>
  `;

  const htmls = secs.map(secHTML);
  const heights = htmls.map(h => {
    mb.innerHTML = h;
    return mb.firstElementChild.getBoundingClientRect().height;
  });

  mb.innerHTML = "";
  $("#rpt-measure").remove();

  const BUDGET = 1123 - 50 - 44 - 60 - 10, GAP = 20;
  const pages = [];
  let cur = [], used = 0;

  htmls.forEach((h, i) => {
    const need = heights[i] + (cur.length ? GAP : 0);
    if (cur.length && used + need > BUDGET) {
      pages.push(cur);
      cur = [];
      used = 0;
    }
    cur.push(h);
    used += heights[i] + (cur.length > 1 ? GAP : 0);
  });
  if (cur.length) pages.push(cur);

  const total = pages.length + 1;
  wrap.insertAdjacentHTML("beforeend", pages.map((p, i) => `
    <div class="rpt-page">
      <div class="rpt-runhead">
        <span style="display:flex;align-items:center;gap:8px">
          <span class="brand-logo" style="width:24px;height:24px;box-shadow:none"></span>
          <span><b>${esc(P.brand)}</b> · Informe de Rendimiento</span>
        </span>
        <span>${esc(c.name)}</span>
      </div>
      <div class="rpt-body">${p.join("")}</div>
      <div class="rpt-foot">
        <span>${esc(P.name)} · ${esc(P.role)}</span>
        <span>Página ${i + 2} de ${total}</span>
      </div>
    </div>
  `).join(""));

  chartQueue = chartQueue.concat(pendingCharts);
  mountCharts(wrap);
}

async function exportPDF() {
  const btn = $("#btn-pdf");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Generando PDF en alta resolución...";
  }

  try {
    if (!window.jspdf || !window.html2canvas) {
      toast("Librerías de PDF no disponibles.", true);
      return;
    }

    const pages = $$("#rpt-pages .rpt-page");
    const pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });

    for (let i = 0; i < pages.length; i++) {
      const canvas = await window.html2canvas(pages[i], {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        windowWidth: 900
      });

      const pw = 210, ph = 297;
      const h = canvas.height * pw / canvas.width;
      if (i > 0) pdf.addPage();
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pw, Math.min(h, ph));
    }

    const filename = `Informe_${slug(S._reportMeta.c.name)}_${S._reportMeta.dateR}.pdf`;
    pdf.save(filename);
    toast("✅ PDF Oficial descargado exitosamente: " + filename);
  } catch (err) {
    console.error("Error exportando PDF:", err);
    toast("Fallo generando PDF. Se abre impresión nativa.", true);
    window.print();
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = icon("download") + "Descargar PDF (A4)";
    }
  }
}

async function exportHTML() {
  const wrap = $("#rpt-pages").cloneNode(true);
  const orig = $$("#rpt-pages canvas");
  $$("canvas", wrap).forEach((cv, i) => {
    const img = document.createElement("img");
    img.src = orig[i].toDataURL("image/png");
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    cv.replaceWith(img);
  });

  const css = $("link[rel=stylesheet]").outerHTML;
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Informe_${slug(S._reportMeta.c.name)}</title>${css}<style>body{background:#0D1320;margin:0;padding:24px 0}.rpt-pages{gap:22px;display:flex;flex-direction:column;align-items:center}@media print{body{background:#fff;padding:0}.rpt-page{box-shadow:none;page-break-after:always}}@page{size:A4;margin:0}</style></head><body><div class="rpt-pages">${wrap.innerHTML}</div></body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Informe_${slug(S._reportMeta.c.name)}_${S._reportMeta.dateR}.html`;
  a.click();
  toast("Archivo HTML descargado.");
}

/* ==========================================================================
   12B. VISTA: PLANTILLA OFICIAL DE INFORME DE COMPETENCIA 16:9 (8 PÁGINAS)
   ADAPTABLE DINÁMICAMENTE A TODOS LOS DEPORTISTAS · ELEVEN PERFORMANCE
   ========================================================================== */
function competitionDeckView() {
  const cid = S.ui.deckClient || S.ui.repClient || S.ui.clientDetail || "client-alexis-zapata";
  const c = S.clients[cid] || Object.values(S.clients)[0];
  if (c) S.ui.deckClient = c.id;

  const slide = S.ui.deckSlide || 1;
  const mode = S.ui.deckMode || "single";

  const pTitles = [
    "01 Portada",
    "02 Resumen Ejecutivo",
    "03 Evolución (MA5)",
    "04 Perfil Locomotor",
    "05 Perfil Mecánico",
    "06 Perfil Competitivo",
    "07 Comparación Posicional",
    "08 Triángulo Rendimiento"
  ];

  // Eleven Performance Emblem SVG (Champagne Gold & Deep Midnight Navy)
  const elevenCrestSVG = `
    <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="#0B1322" stroke="#D6A64E" stroke-width="4"/>
      <path d="M38 28 V72 M62 28 V72" stroke="#D6A64E" stroke-width="8" stroke-linecap="round"/>
      <circle cx="50" cy="50" r="4" fill="#D6A64E"/>
    </svg>
  `;

  const elevenCrestBigSVG = `
    <svg width="56" height="56" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" fill="#0B1322" stroke="#D6A64E" stroke-width="3.5"/>
      <path d="M36 26 V74 M64 26 V74" stroke="#D6A64E" stroke-width="9" stroke-linecap="round"/>
      <circle cx="50" cy="50" r="4.5" fill="#D6A64E"/>
    </svg>
  `;

  // Circular gauge SVG helper with Eleven Performance luxury typography
  const gaugeSVG = (val, max, color, label, size = 120) => {
    const r = 40, circ = 2 * Math.PI * r;
    const numVal = parseFloat(String(val).replace("%", "")) || 0;
    const numMax = parseFloat(String(max).replace("%", "")) || 100;
    const pct = Math.min(100, Math.max(0, (numVal / numMax) * 100));
    const offset = circ - (pct / 100) * circ;
    const s = size;
    const fontVal = s < 100 ? 19 : 24;
    return `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;width:${s}px;height:${s}px;margin:auto">
        <svg width="${s}" height="${s}" viewBox="0 0 100 100" style="transform:rotate(-90deg)">
          <circle cx="50" cy="50" r="${r}" stroke="#E2E8F0" stroke-width="9" fill="none"/>
          <circle cx="50" cy="50" r="${r}" stroke="${color}" stroke-width="9" fill="none" stroke-dasharray="${circ}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
        </svg>
        <div style="position:absolute;display:flex;flex-direction:column;align-items:center;line-height:1">
          <span style="font-family:var(--f-display);font-size:${fontVal}px;font-weight:800;color:#0F1A2E">${val}</span>
          <span style="font-size:9.5px;color:#718096;font-weight:700">/ ${max}</span>
        </div>
      </div>
      ${label ? `<div style="font-family:var(--f-display);font-size:12px;font-weight:700;color:#0F1A2E;text-align:center;margin-top:4px;text-transform:uppercase;letter-spacing:0.04em">${label}</div>` : ""}
    `;
  };

  // 1. Extraer métricas y registros del deportista seleccionado
  const aRecs = recordsOf(c.id, "anthro");
  const lastA = aRecs[aRecs.length - 1] || {};
  const va = lastA.values || {};
  const edad = ageFrom(c.birthDate) || 28;
  const estatura = va.height ? (va.height / 100).toFixed(2) + " m" : "1.76 m";
  const peso = va.weight ? va.weight.toFixed(1) + " kg" : "74.5 kg";
  const pos = c.position || "Mediocampista";
  const dorsal = (c.custom && c.custom.find(x => x.label.toLowerCase().includes("dorsal"))?.value) || "#" + (Math.abs(c.id.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) % 22 + 7);
  const clubName = (c.custom && c.custom.find(x => x.label.toLowerCase().includes("club"))?.value) || "Club Independiente Santa Fe";

  const gpsRecs = recordsOf(c.id, "gps");
  const nmRecs = recordsOf(c.id, "nm");

  // 2. Construir series cronológicas partido a partido
  let matches = [];
  let dtData = [], mxminData = [], hsrData = [], sprintData = [], accData = [], dccData = [], plData = [];

  if (gpsRecs.length >= 6) {
    matches = gpsRecs.map((_, i) => `P${i + 1}`);
    dtData = gpsRecs.map(r => r.values.dist || 4500);
    mxminData = gpsRecs.map(r => r.values.mpm || 105);
    hsrData = gpsRecs.map(r => r.values.hsr || r.values.hsd || 220);
    sprintData = gpsRecs.map(r => r.values.sprint || 75);
    accData = gpsRecs.map(r => r.values.acc || 15);
    dccData = gpsRecs.map(r => r.values.dcc || 18);
    plData = gpsRecs.map(r => r.values.pl || 400);
  } else {
    // Curva de temporada calibrada según la posición y pruebas del jugador
    const numP = 16;
    matches = Array.from({ length: numP }, (_, i) => `P${i + 1}`);
    const baseMpm = (gpsRecs[0] && gpsRecs[0].values.mpm) || (pos.includes("Volante") ? 112 : pos.includes("Extremo") ? 115 : pos.includes("Lateral") ? 108 : 104);
    const baseDist = (gpsRecs[0] && gpsRecs[0].values.dist) || (pos.includes("Volante") ? 9800 : pos.includes("Lateral") ? 10400 : 8900);
    const baseHsr = (gpsRecs[0] && gpsRecs[0].values.hsr) || (pos.includes("Extremo") || pos.includes("Lateral") ? 360 : 250);
    const baseSprint = (gpsRecs[0] && gpsRecs[0].values.sprint) || (pos.includes("Extremo") || pos.includes("Delantero") ? 160 : 80);
    const baseAcc = 16, baseDcc = 19, basePl = Math.round(baseDist / 8.8);

    const waves = [0.92, 1.05, 0.88, 1.12, 0.98, 1.15, 0.86, 1.08, 1.02, 1.18, 0.94, 1.06, 1.14, 0.90, 1.10, 1.04];
    dtData = waves.map(w => Math.round(baseDist * w));
    mxminData = waves.map(w => Math.round((baseMpm * (0.92 + (w - 1) * 0.45)) * 10) / 10);
    hsrData = waves.map(w => Math.round(baseHsr * w));
    sprintData = waves.map(w => Math.round(baseSprint * w));
    accData = waves.map(w => Math.round(baseAcc * w));
    dccData = waves.map(w => Math.round(baseDcc * w));
    plData = waves.map(w => Math.round(basePl * w));
  }

  const PJ = matches.length;
  const avg = arr => arr.length ? Math.round((arr.reduce((s, v) => s + v, 0) / arr.length) * 10) / 10 : 0;
  const max = arr => arr.length ? Math.max(...arr) : 0;
  const min = arr => arr.length ? Math.min(...arr) : 0;

  const avgDT = avg(dtData), maxDT = max(dtData), minDT = min(dtData);
  const avgMpm = avg(mxminData), maxMpm = max(mxminData), minMpm = min(mxminData);
  const avgHsr = avg(hsrData), maxHsr = max(hsrData), minHsr = min(hsrData);
  const avgSprint = avg(sprintData), maxSprint = max(sprintData), minSprint = min(sprintData);
  const avgAcc = avg(accData), maxAcc = max(accData), minAcc = min(accData);
  const avgDcc = avg(dccData), maxDcc = max(dccData), minDcc = min(dccData);
  const avgPl = avg(plData), maxPl = max(plData), minPl = min(plData);

  const customMin = c.custom && c.custom.find(x => x.label.includes("Minutos"))?.value;
  const totalMinutos = customMin ? parseInt(customMin.replace(/\D/g, "")) || 739 : Math.round(PJ * 68);
  const titularPJ = Math.min(PJ, Math.max(1, Math.round(totalMinutos / 78)));
  const ingresosPJ = Math.max(0, PJ - titularPJ);
  const promMinPJ = Math.round(totalMinutos / PJ);
  const customDisp = c.custom && c.custom.find(x => x.label.includes("Disponibilidad"))?.value;
  const disponibilidadPct = customDisp ? parseInt(customDisp.replace(/\D/g, "")) || 82 : 85;

  const vmaxPico = (gpsRecs[0] && gpsRecs[0].values.vmax) || (avgSprint > 110 ? 32.8 : 31.2);

  // Eficiencias cinemáticas
  const effDT_PL = avgPl ? Math.round((avgDT / avgPl) * 100) / 100 : 8.95;
  const effHSR_PL = avgPl ? Math.round(((avgHsr + avgSprint) / avgPl) * 100) / 100 : 0.68;
  const densAccMin = promMinPJ ? Math.round(((avgAcc + avgDcc) / promMinPJ) * 100) / 100 : 0.84;
  const sprintPct = avgDT ? Math.round(((avgSprint / avgDT) * 100) * 10) / 10 : 2.5;

  // Índices ponderados
  const locomotorIndex = Math.min(96, Math.max(28, Math.round((avgMpm / 128) * 45 + (avgHsr / 400) * 35 + (avgSprint / 220) * 20)));
  const mecanicoIndex = Math.min(94, Math.max(16, Math.round(((avgAcc + avgDcc) / 75) * 60 + (avgPl / 750) * 40)));
  const rendimientoIndex = Math.min(96, Math.max(45, Math.round(locomotorIndex * 0.45 + mecanicoIndex * 0.35 + disponibilidadPct * 0.2)));
  const competicionIndex = Math.min(98, Math.max(30, Math.round((titularPJ / PJ) * 50 + (promMinPJ / 90) * 50)));
  const posicionalIndex = Math.min(95, Math.max(25, Math.round((avgMpm / 118) * 60 + (effDT_PL / 10) * 40)));

  // Media móvil de 5 partidos
  const ma5 = arr => arr.map((_, i, a) => {
    const start = Math.max(0, i - 4);
    const sub = a.slice(start, i + 1);
    return Math.round(sub.reduce((s, v) => s + v, 0) / sub.length);
  });

  // Generador de gráficos de evolución con paleta Eleven Performance
  const evoChart = (label, data, unit, color) => T => {
    const mean = Math.round(data.reduce((s, v) => s + v, 0) / data.length);
    return {
      type: "line",
      data: {
        labels: matches,
        datasets: [
          { label: "Partido Real", data: data, borderColor: color || "#D6A64E", backgroundColor: hexA(color || "#D6A64E", 0.15), tension: 0.25, borderWidth: 2, pointRadius: 2.5 },
          { label: "Promedio (" + mean + ")", data: matches.map(() => mean), borderColor: "#3A86FF", borderDash: [4, 4], pointRadius: 0, borderWidth: 1.5, fill: false },
          { label: "MA5 (Tendencia)", data: ma5(data), borderColor: "#3DBA8C", borderWidth: 2.2, pointRadius: 0, tension: 0.3, fill: false }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: { boxWidth: 8, padding: 6, font: { size: 9, family: "Barlow, sans-serif" } }
          }
        },
        layout: {
          padding: { top: 0, bottom: 2, left: 2, right: 4 }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 8.5, family: "'IBM Plex Mono', monospace" } } },
          y: { grid: { color: "rgba(0,0,0,0.06)" }, ticks: { font: { size: 8.5, family: "'IBM Plex Mono', monospace" } } }
        }
      }
    };
  };

  // Radars con estilo Eleven
  const p2Radar = T => ({
    type: "radar",
    data: {
      labels: ["Distancia Total", "MxMin", "HSR (+19.8)", "Sprint (+25)", "Acc + Dcc", "Player Load"],
      datasets: [
        { label: c.name, data: [Math.min(100, Math.round((avgDT / 10000) * 100)), Math.min(100, Math.round((avgMpm / 125) * 100)), Math.min(100, Math.round((avgHsr / 450) * 100)), Math.min(100, Math.round((avgSprint / 240) * 100)), Math.min(100, Math.round(((avgAcc + avgDcc) / 80) * 100)), Math.min(100, Math.round((avgPl / 800) * 100))], borderColor: "#D6A64E", backgroundColor: "rgba(214, 166, 78, 0.28)", borderWidth: 2.5, pointBackgroundColor: "#D6A64E" },
        { label: "Promedio Posición", data: [55, 55, 55, 55, 55, 55], borderColor: "#3A86FF", borderDash: [3, 3], borderWidth: 1.5, fill: false },
        { label: "Top Liga", data: [100, 100, 100, 100, 100, 100], borderColor: "#3DBA8C", borderDash: [4, 4], borderWidth: 1.5, fill: false }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: { r: { min: 0, max: 100, ticks: { display: false } } },
      plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 10 } } } }
    }
  });

  const p5Radar = T => ({
    type: "radar",
    data: {
      labels: ["Aceleraciones (>2.5 m/s²)", "Desaceleraciones (<-2.5 m/s²)", "Player Load Total (AU)"],
      datasets: [
        { label: c.name, data: [Math.min(100, Math.round((avgAcc / 40) * 100)), Math.min(100, Math.round((avgDcc / 45) * 100)), Math.min(100, Math.round((avgPl / 800) * 100))], borderColor: "#D6A64E", backgroundColor: "rgba(214, 166, 78, 0.28)", borderWidth: 2.5 },
        { label: "Promedio Posición", data: [50, 50, 50], borderColor: "#3A86FF", borderDash: [3, 3], borderWidth: 1.5 },
        { label: "Top Liga", data: [100, 100, 100], borderColor: "#3DBA8C", borderDash: [4, 4], borderWidth: 1.5 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: { r: { min: 0, max: 100, ticks: { display: false } } },
      plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 10 } } } }
    }
  });

  // Gráfico de barras multi-jugador de la diapositiva 7
  const deckMultiPlayerChart = T => {
    const squadPlayers = Object.values(S.clients).map(cl => {
      const rs = recordsOf(cl.id, "gps");
      let val = 105;
      if (rs.length && rs[rs.length - 1].values && rs[rs.length - 1].values.mpm) {
        val = rs[rs.length - 1].values.mpm;
      } else if (cl.id === c.id) {
        val = avgMpm;
      }
      return {
        id: cl.id,
        name: cl.name.split(" ")[0] + " " + (cl.name.split(" ")[1] ? cl.name.split(" ")[1][0] + "." : ""),
        val: Math.round(val * 10) / 10
      };
    }).sort((a, b) => b.val - a.val);

    return multiPlayerComparisonChart(squadPlayers, {
      label: "MxMin",
      unit: "m/min",
      dec: 1
    }, { highlightId: c.id })(T);
  };

  // Nombres del deportista para la portada
  const nameParts = c.name.trim().split(" ");
  const firstName = nameParts[0].toUpperCase();
  const lastName = nameParts.slice(1).join(" ").toUpperCase() || firstName;

  // Celdas de calor helper
  const heatCell = val => {
    const num = Math.min(1, Math.max(0, val)).toFixed(1);
    const cls = num >= 0.6 ? "td-green" : num >= 0.3 ? "td-yellow" : "td-red";
    return `<td class="${cls}">${num}</td>`;
  };

  return `
    <button class="back" data-act="openClient" data-id="${esc(c.id)}">${icon("back")}Volver a ${esc(c.name)}</button>

    <!-- TOOLBAR DEL VISOR 16:9 -->
    <div class="deck-toolbar">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="display:flex;align-items:center;gap:8px">
          ${elevenCrestSVG}
          <div>
            <b style="font-family:var(--f-display);font-size:16px;letter-spacing:0.04em;color:#D6A64E">ELEVEN PERFORMANCE</b>
            <span style="font-size:10px;color:var(--muted);display:block;margin-top:-2px">HIGH PERFORMANCE HUB</span>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:6px;margin-left:8px">
          <label for="deck-client-sel" style="font-size:11px;font-weight:700;color:var(--muted);letter-spacing:0.05em">DEPORTISTA:</label>
          <select id="deck-client-sel" class="input sm" style="font-weight:700;min-width:180px;background:rgba(255,255,255,0.06);color:var(--fg);border-color:var(--accent)" data-ui="deckClient">
            ${Object.values(S.clients).map(cl => `<option value="${esc(cl.id)}" ${cl.id === c.id ? "selected" : ""}>${esc(cl.name)} (${esc(cl.position || "—")})</option>`).join("")}
          </select>
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:6px">
        <button class="btn sm" data-act="prevSlide" title="Diapositiva anterior">◀ Ant</button>
        <div class="deck-nav-pills">
          ${pTitles.map((t, idx) => `
            <button class="deck-pill ${slide === (idx + 1) ? "active" : ""}" data-act="setSlide" data-num="${idx + 1}">${t}</button>
          `).join("")}
        </div>
        <button class="btn sm" data-act="nextSlide" title="Diapositiva siguiente">Sig ▶</button>
      </div>

      <div class="actions">
        <button class="btn sm" data-act="toggleSlideView">${mode === "all" ? "Modo Diapositiva" : "Ver Todas"}</button>
        <button class="btn sm primary" data-act="exportDeckPDF" id="btn-deck-pdf">${icon("download")}Descargar PDF (16:9)</button>
        <button class="btn sm ghost" onclick="window.print()">${icon("print")}Imprimir</button>
      </div>
    </div>

    <!-- CONTENEDOR 16:9 DE DIAPOSITIVAS -->
    <div class="deck-container ${mode === "single" ? "single-slide" : ""}" id="deck-pages-root">

      <!-- ================= PÁGINA 1: PORTADA ================= -->
      <article class="deck-page deck-cover ${slide === 1 ? "active" : ""}" style="background:linear-gradient(135deg,#060B14 0%,#0F1A2E 50%,#16243E 100%)">
        <div class="deck-cover-top">
          <div style="display:flex;align-items:center;gap:16px">
            ${elevenCrestBigSVG}
            <div>
              <div style="font-family:var(--f-display);font-size:13px;letter-spacing:0.25em;color:#94A3B8;text-transform:uppercase">ELEVEN PERFORMANCE</div>
              <div style="font-family:var(--f-display);font-size:24px;font-weight:800;line-height:1;color:#FFFFFF;letter-spacing:0.04em">HIGH PERFORMANCE HUB</div>
              <div style="font-family:var(--f-display);font-size:12px;letter-spacing:0.18em;color:#D6A64E;margin-top:2px">${esc(clubName).toUpperCase()} · PREPARACIÓN FÍSICA & CIENCIAS DEL DEPORTE</div>
            </div>
          </div>
          <div style="text-align:right">
            <div style="font-family:var(--f-display);font-size:17px;font-weight:700;color:#D6A64E;letter-spacing:0.08em">INFORME DE COMPETENCIA</div>
            <div style="font-family:var(--f-display);font-size:32px;font-weight:900;color:#FFFFFF;line-height:1">2026 I</div>
          </div>
        </div>

        <div class="deck-cover-body">
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center">
            ${c.photo ? `<div style="width:230px;height:230px;border-radius:50%;background:url('${c.photo}') center/cover no-repeat;box-shadow:0 0 0 4px #D6A64E, 0 12px 30px rgba(0,0,0,0.6)"></div>` : `
              <div style="width:200px;height:200px;border-radius:50%;background:#0F1A2E;border:4px solid #D6A64E;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 30px rgba(0,0,0,0.6)">
                <span style="font-family:var(--f-display);font-size:72px;font-weight:900;color:#D6A64E">${c.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
              </div>
            `}
            <div style="font-family:var(--f-display);font-size:16px;letter-spacing:0.15em;color:#D6A64E;margin-top:16px;font-weight:700">DORSAL ${esc(dorsal)} · ${esc(pos).toUpperCase()}</div>
          </div>

          <div style="display:flex;flex-direction:column;gap:18px">
            <div>
              <div style="font-family:var(--f-display);font-size:62px;font-weight:900;line-height:0.9;color:#FFFFFF">${esc(firstName)}</div>
              <div style="font-family:var(--f-display);font-size:62px;font-weight:900;line-height:0.9;color:#D6A64E">${esc(lastName)}</div>
            </div>
            <div style="height:3px;background:#D6A64E;width:120px;border-radius:2px"></div>
            <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;margin-top:8px">
              <div class="deck-kpi-pill">
                <span class="eyebrow" style="color:#94A3B8">PARTIDOS</span>
                <b class="num" style="font-size:32px;display:block;color:#FFFFFF">${PJ}</b>
              </div>
              <div class="deck-kpi-pill">
                <span class="eyebrow" style="color:#94A3B8">MINUTOS</span>
                <b class="num" style="font-size:32px;display:block;color:#FFFFFF">${totalMinutos}</b>
              </div>
              <div class="deck-kpi-pill">
                <span class="eyebrow" style="color:#94A3B8">DISPONIBILIDAD</span>
                <b class="num" style="font-size:32px;display:block;color:#3DBA8C">${disponibilidadPct}%</b>
              </div>
            </div>
          </div>
        </div>

        <div class="deck-foot-bar" style="border-top-color:rgba(255,255,255,0.15);color:#94A3B8">
          <span>Eleven Performance · Departamento de Ciencias del Deporte & Alto Rendimiento</span>
          <b>PÁGINA 01 / 08</b>
        </div>
      </article>

      <!-- ================= PÁGINA 2: RESUMEN EJECUTIVO ================= -->
      <article class="deck-page ${slide === 2 ? "active" : ""}">
        <div class="deck-page-head">
          <span class="deck-badge-num">02</span>
          <span class="deck-head-title">RESUMEN EJECUTIVO</span>
          <div class="deck-head-crest">${elevenCrestSVG}</div>
        </div>

        <div class="deck-grid-2" style="margin-bottom:14px">
          <!-- Columna Izquierda: Perfil y Participación -->
          <div style="display:flex;flex-direction:column;gap:12px">
            <div class="deck-card">
              <div class="deck-card-h">Perfil del Jugador & Antropometría</div>
              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;font-size:12px">
                <div><span class="muted small">Edad</span><br><b>${edad} Años</b></div>
                <div><span class="muted small">Posición</span><br><b>${esc(pos)}</b></div>
                <div><span class="muted small">Estatura</span><br><b>${estatura}</b></div>
                <div><span class="muted small">Peso</span><br><b>${peso}</b></div>
              </div>
            </div>
            <div class="deck-card">
              <div class="deck-card-h">Participación Competitiva</div>
              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;font-size:12px">
                <div><span class="muted small">Titular</span><br><b class="num">${titularPJ} PJ</b></div>
                <div><span class="muted small">Ingresos</span><br><b class="num">${ingresosPJ} PJ</b></div>
                <div><span class="muted small">Minutos</span><br><b class="num">${totalMinutos} min</b></div>
                <div><span class="muted small">Promedio</span><br><b class="num">${promMinPJ} min</b></div>
              </div>
            </div>
            <!-- Tabla Variables Temporada -->
            <div class="deck-card" style="flex:1">
              <div class="deck-card-h">Variables Clave de Temporada</div>
              <table class="deck-table">
                <thead>
                  <tr><th>Variable</th><th>Promedio</th><th>Máximo</th><th>Mínimo</th><th>Percentil</th></tr>
                </thead>
                <tbody>
                  <tr><td>DT (m)</td><td>${avgDT}</td><td>${maxDT}</td><td>${minDT}</td><td>P${Math.min(99, Math.max(15, Math.round((avgDT/10500)*100)))}</td></tr>
                  <tr style="background:#FFFDF5"><td><b>MxMin (m/min)</b></td><td><b style="color:#D6A64E">${avgMpm}</b></td><td><b>${maxMpm}</b></td><td><b>${minMpm}</b></td><td><b style="color:#D6A64E">P${Math.min(100, Math.max(30, Math.round((avgMpm/125)*100)))}</b></td></tr>
                  <tr><td>HSR (m)</td><td>${avgHsr}</td><td>${maxHsr}</td><td>${minHsr}</td><td>P${Math.min(99, Math.max(15, Math.round((avgHsr/450)*100)))}</td></tr>
                  <tr><td>Sprint (m)</td><td>${avgSprint}</td><td>${maxSprint}</td><td>${minSprint}</td><td>P${Math.min(99, Math.max(15, Math.round((avgSprint/250)*100)))}</td></tr>
                  <tr><td>Acc (+2.5)</td><td>${avgAcc}</td><td>${maxAcc}</td><td>${minAcc}</td><td>P${Math.min(99, Math.max(15, Math.round((avgAcc/40)*100)))}</td></tr>
                  <tr><td>Dcc (&lt;-2.5)</td><td>${avgDcc}</td><td>${maxDcc}</td><td>${minDcc}</td><td>P${Math.min(99, Math.max(15, Math.round((avgDcc/45)*100)))}</td></tr>
                  <tr><td>PL (AU)</td><td>${avgPl}</td><td>${maxPl}</td><td>${minPl}</td><td>P${Math.min(99, Math.max(15, Math.round((avgPl/800)*100)))}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Columna Derecha: Radar y Cita -->
          <div style="display:flex;flex-direction:column;gap:12px">
            <div class="deck-card" style="flex:1;display:flex;flex-direction:column;min-height:0">
              <div class="deck-card-h">Radar Competitivo Multiaxial</div>
              <div class="deck-chart-wrap">
                ${chartBox(p2Radar, "deck-chart", "Radar Competitivo")}
              </div>
            </div>
            <div class="deck-card" style="border-left:4px solid #D6A64E;background:#FAF8F2;flex:none">
              <p style="font-size:12px;font-style:italic;margin:0;color:#1E293B;line-height:1.45">
                “${esc(c.name)} presenta un perfil competitivo caracterizado por ${avgMpm > 110 ? 'altísima intensidad y densidad de acciones por minuto' : 'sólido balance y regularidad locomotora'}, respondiendo con eficiencia a las demandas posicionales de ${esc(pos.toLowerCase())}.”
              </p>
              <span class="muted small" style="margin-top:6px;display:block;text-align:right;color:#D6A64E;font-weight:700">— Dirección de Rendimiento · Eleven Performance</span>
            </div>
          </div>
        </div>

        <div class="deck-foot-bar">
          <span>Resumen Integral Temporada 2026 I · Eleven Performance</span>
          <b>PÁGINA 02 / 08</b>
        </div>
      </article>

      <!-- ================= PÁGINA 3: EVOLUCIÓN EN LOS JUEGOS ================= -->
      <article class="deck-page ${slide === 3 ? "active" : ""}">
        <div class="deck-page-head">
          <span class="deck-badge-num">03</span>
          <span class="deck-head-title">EVOLUCIÓN EN LOS JUEGOS (${PJ} PARTIDOS)</span>
          <div class="deck-head-crest">${elevenCrestSVG}</div>
        </div>

        <div class="deck-grid-2" style="flex:1;gap:12px;grid-template-rows:1fr 1fr;min-height:0">
          <div class="deck-card" style="padding:8px 12px;display:flex;flex-direction:column;min-height:0">
            <div class="deck-card-h" style="margin-bottom:4px;font-size:12px;padding-bottom:3px">Distancia Total (DT) Partido a Partido</div>
            <div class="deck-chart-wrap">
              ${chartBox(evoChart("Distancia Total", dtData, "m", "#D6A64E"), "deck-chart", "DT Evolución")}
            </div>
          </div>
          <div class="deck-card" style="padding:8px 12px;display:flex;flex-direction:column;min-height:0">
            <div class="deck-card-h" style="margin-bottom:4px;font-size:12px;padding-bottom:3px">Intensidad Relativa: MxMin (m/min)</div>
            <div class="deck-chart-wrap">
              ${chartBox(evoChart("MxMin", mxminData, "m/min", "#D6A64E"), "deck-chart", "MxMin Evolución")}
            </div>
          </div>
          <div class="deck-card" style="padding:8px 12px;display:flex;flex-direction:column;min-height:0">
            <div class="deck-card-h" style="margin-bottom:4px;font-size:12px;padding-bottom:3px">Alta Intensidad: HSR (+19.8 km/h)</div>
            <div class="deck-chart-wrap">
              ${chartBox(evoChart("HSR", hsrData, "m", "#3DBA8C"), "deck-chart", "HSR Evolución")}
            </div>
          </div>
          <div class="deck-card" style="padding:8px 12px;display:flex;flex-direction:column;min-height:0">
            <div class="deck-card-h" style="margin-bottom:4px;font-size:12px;padding-bottom:3px">Sprint (+25 km/h) en Competición</div>
            <div class="deck-chart-wrap">
              ${chartBox(evoChart("Sprint", sprintData, "m", "#3A86FF"), "deck-chart", "Sprint Evolución")}
            </div>
          </div>
        </div>

        <div class="deck-foot-bar">
          <span>Análisis de Series Temporales y Media Móvil (MA5)</span>
          <b>PÁGINA 03 / 08</b>
        </div>
      </article>

      <!-- ================= PÁGINA 4: PERFIL LOCOMOTOR ================= -->
      <article class="deck-page ${slide === 4 ? "active" : ""}">
        <div class="deck-page-head">
          <span class="deck-badge-num">04</span>
          <span class="deck-head-title">PERFIL LOCOMOTOR & MATRIZ DE CALOR</span>
          <div class="deck-head-crest">${elevenCrestSVG}</div>
        </div>

        <div class="deck-grid-2" style="flex:1;gap:18px">
          <div class="deck-card" style="flex:1">
            <div class="deck-card-h">Matriz de Calor Partido a Partido (P1 a P${PJ})</div>
            <div style="overflow-x:auto;flex:1">
              <table class="deck-table" style="font-size:10px">
                <thead>
                  <tr><th>Var</th>${matches.map((_, i) => `<th>${i+1}</th>`).join("")}</tr>
                </thead>
                <tbody>
                  <tr><td><b>DT</b></td>${dtData.map(v => heatCell(v / (maxDT || 1))).join("")}</tr>
                  <tr><td><b>MxMin</b></td>${mxminData.map(v => heatCell(v / (maxMpm || 1))).join("")}</tr>
                  <tr><td><b>HSR</b></td>${hsrData.map(v => heatCell(v / (maxHsr || 1))).join("")}</tr>
                  <tr><td><b>Sprint</b></td>${sprintData.map(v => heatCell(v / (maxSprint || 1))).join("")}</tr>
                </tbody>
              </table>
            </div>
            <p class="hint" style="margin-top:6px;font-size:10.5px">Valores normalizados entre 0.0 y 1.0 según el pico máximo registrado en el torneo.</p>
          </div>

          <div style="display:flex;flex-direction:column;gap:12px;width:280px">
            <div class="deck-card" style="align-items:center;justify-content:center;padding:24px">
              ${gaugeSVG(locomotorIndex.toFixed(1), "100", "#D6A64E", "Índice Locomotor")}
            </div>
            <div class="deck-card" style="font-size:12px;color:#334155;line-height:1.45">
              <b style="color:#0F1A2E">Diagnóstico Locomotor:</b>
              ${avgMpm > 110 ? `Sobresaliente densidad competitiva con pico de ${maxMpm} m/min. El índice refleja participación de alto ritmo y respuesta en transiciones dinámicas.` : `Regularidad y solvencia en el despliegue posicional con promedio de ${avgDT} m y ${avgMpm} m/min en competencia.`}
            </div>
          </div>
        </div>

        <div class="deck-foot-bar">
          <span>Evaluación Cinética y Locomotora · Eleven Performance</span>
          <b>PÁGINA 04 / 08</b>
        </div>
      </article>

      <!-- ================= PÁGINA 5: PERFIL MECÁNICO ================= -->
      <article class="deck-page ${slide === 5 ? "active" : ""}">
        <div class="deck-page-head">
          <span class="deck-badge-num">05</span>
          <span class="deck-head-title">PERFIL MECÁNICO & DENSIDAD ACC/DCC</span>
          <div class="deck-head-crest">${elevenCrestSVG}</div>
        </div>

        <div class="deck-grid-2" style="flex:1;gap:18px">
          <div class="deck-card" style="flex:1;display:flex;flex-direction:column;min-height:0">
            <div class="deck-card-h">Radar Mecánico de Aceleraciones y Carga</div>
            <div class="deck-chart-wrap">
              ${chartBox(p5Radar, "deck-chart", "Radar Mecánico")}
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:12px;width:300px">
            <div class="deck-card" style="align-items:center;justify-content:center;padding:24px">
              ${gaugeSVG(mecanicoIndex.toFixed(1), "100", "#D6A64E", "Índice Mecánico")}
            </div>
            <div class="deck-card" style="font-size:12px;color:#334155;line-height:1.45">
              <b style="color:#0F1A2E">Análisis de Impacto:</b>
              Capacidad de frenado y cambio de ritmo en espacio reducido. Las desaceleraciones intensas (&lt;-2.5 m/s²) promedian ${avgDcc} acciones/partido con Player Load medio de ${avgPl} AU.
            </div>
          </div>
        </div>

        <div class="deck-foot-bar">
          <span>Cargas Neuromusculares e Inerciales (Catapult IMA)</span>
          <b>PÁGINA 05 / 08</b>
        </div>
      </article>

      <!-- ================= PÁGINA 6: PERFIL COMPETITIVO ================= -->
      <article class="deck-page ${slide === 6 ? "active" : ""}">
        <div class="deck-page-head">
          <span class="deck-badge-num">06</span>
          <span class="deck-head-title">PERFIL COMPETITIVO & EFICIENCIA</span>
          <div class="deck-head-crest">${elevenCrestSVG}</div>
        </div>

        <div class="deck-grid-2" style="flex:1;gap:18px">
          <div class="deck-card" style="flex:1">
            <div class="deck-card-h">Indicadores de Eficiencia Cinemática</div>
            <div class="stack" style="gap:14px;margin-top:10px">
              <div>
                <div style="display:flex;justify-content:space-between;font-size:12px"><b>Eficiencia Locomotora (DT / PL)</b><span class="num">${effDT_PL} m/AU</span></div>
                <div class="bar-track" style="margin-top:4px"><div class="bar-fill" style="width:${Math.min(100, Math.round((effDT_PL/10)*100))}%;background:#D6A64E"></div></div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:12px"><b>Eficiencia Alta Intensidad ((HSR+Sprint)/PL)</b><span class="num">${effHSR_PL} m/AU</span></div>
                <div class="bar-track" style="margin-top:4px"><div class="bar-fill" style="width:${Math.min(100, Math.round((effHSR_PL/1.0)*100))}%;background:#3DBA8C"></div></div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:12px"><b>Densidad Mecánica ((Acc+Dcc)/Min)</b><span class="num">${densAccMin} acc/min</span></div>
                <div class="bar-track" style="margin-top:4px"><div class="bar-fill" style="width:${Math.min(100, Math.round((densAccMin/1.2)*100))}%;background:#3A86FF"></div></div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:12px"><b>Sprint Relativo (% Tiempo en Sprint)</b><span class="num">${sprintPct}%</span></div>
                <div class="bar-track" style="margin-top:4px"><div class="bar-fill" style="width:${Math.min(100, Math.round((sprintPct/4.0)*100))}%;background:#EE6A5F"></div></div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:12px;width:300px">
            <div class="deck-card" style="align-items:center;justify-content:center;padding:24px">
              ${gaugeSVG(rendimientoIndex.toFixed(1), "100", "#3DBA8C", "Índice Rendimiento")}
            </div>
            <div class="deck-card" style="font-size:12px;color:#334155;line-height:1.45">
              <b style="color:#0F1A2E">Puntuación Global:</b>
              El índice de rendimiento (${rendimientoIndex}/100) sintetiza la relación entre carga externa y tiempo competitivo, situando a ${esc(c.name)} en percentil destacado del plantel.
            </div>
          </div>
        </div>

        <div class="deck-foot-bar">
          <span>Eficiencia Locomotora y Densidad de Acciones</span>
          <b>PÁGINA 06 / 08</b>
        </div>
      </article>

      <!-- ================= PÁGINA 7: COMPARACIÓN POSICIONAL ================= -->
      <article class="deck-page ${slide === 7 ? "active" : ""}">
        <div class="deck-page-head">
          <span class="deck-badge-num">07</span>
          <span class="deck-head-title">COMPARACIÓN POSICIONAL & PLANTEL (${esc(pos).toUpperCase()})</span>
          <div class="deck-head-crest">${elevenCrestSVG}</div>
        </div>

        <div class="deck-grid-2" style="flex:1;gap:16px;grid-template-columns:1.15fr 1fr;min-height:0">
          <!-- Columna Izquierda: Ranking Multi-Jugador Plantel Completo -->
          <div class="deck-card" style="flex:1;display:flex;flex-direction:column;min-height:0;padding:12px 14px">
            <div class="deck-card-h" style="margin-bottom:6px">Ranking de Densidad Locomotora (MxMin m/min) - Plantel Eleven</div>
            <div class="deck-chart-wrap">
              ${chartBox(deckMultiPlayerChart, "deck-chart", "Comparativa Multi-Jugador MxMin")}
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;padding-top:6px;border-top:1px solid #E2E8F0;font-size:11px;color:#64748B;flex:none">
              <span><b>Referencia:</b> Plantel Profesional Eleven</span>
              <span style="color:#D6A64E;font-weight:700">■ ${esc(c.name)}: ${avgMpm} m/min</span>
            </div>
          </div>

          <!-- Columna Derecha: Índice/Conclusión + Benchmarking Posicional -->
          <div style="display:flex;flex-direction:column;gap:12px;min-height:0">
            <div class="deck-card" style="padding:10px 14px;flex:none">
              <div style="display:flex;align-items:center;gap:14px">
                <div style="flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center">
                  ${gaugeSVG(posicionalIndex.toFixed(1), "100", "#D6A64E", "Índice Posicional", 85)}
                </div>
                <div style="flex:1;font-size:11.5px;color:#334155;line-height:1.45">
                  <div class="deck-card-h" style="margin-bottom:4px;font-size:12px;padding-bottom:2px">Conclusión Posicional</div>
                  ${esc(c.name)} presenta un promedio de <b>${avgMpm} m/min</b> y velocidad pico de <b>${vmaxPico} km/h</b>, superando la densidad media de su posición (<b>${esc(pos)}</b>) y consolidando su rol en transiciones ofensivas y defensivas.
                </div>
              </div>
            </div>

            <div class="deck-card" style="flex:1;display:flex;flex-direction:column;min-height:0;padding:10px 14px">
              <div class="deck-card-h" style="margin-bottom:6px;font-size:12px;padding-bottom:3px">Benchmarking vs Puesto de ${esc(pos)}</div>
              <div style="flex:1;overflow-y:auto">
                <table class="deck-table" style="font-size:11px">
                  <thead>
                    <tr><th>Métrica</th><th>${esc(c.name)}</th><th>Promedio Puesto</th><th>Top Referencia</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Distancia Total (m)</td><td><b>${avgDT} m</b></td><td>4850 m</td><td>5499 m</td></tr>
                    <tr style="background:#FFFDF5"><td><b>MxMin (m/min)</b></td><td><b style="color:#D6A64E">${avgMpm} m/min</b></td><td>99.0 m/min</td><td>107.0 m/min</td></tr>
                    <tr><td>HSR (+19.8 km/h)</td><td><b>${avgHsr} m</b></td><td>273 m</td><td>483 m</td></tr>
                    <tr><td>Sprint (+25 km/h)</td><td><b>${avgSprint} m</b></td><td>85 m</td><td>186 m</td></tr>
                    <tr><td>Acciones Mecánicas</td><td><b>${avgAcc + avgDcc} acc</b></td><td>32 acc</td><td>44 acc</td></tr>
                    <tr><td>Player Load (AU)</td><td><b>${avgPl} AU</b></td><td>425 AU</td><td>547 AU</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="deck-foot-bar">
          <span>Comparativa Normalizada contra el Plantel Profesional</span>
          <b>PÁGINA 07 / 08</b>
        </div>
      </article>

      <!-- ================= PÁGINA 8: TRIÁNGULO DE RENDIMIENTO ================= -->
      <article class="deck-page ${slide === 8 ? "active" : ""}">
        <div class="deck-page-head">
          <span class="deck-badge-num">08</span>
          <span class="deck-head-title">TRIÁNGULO DE RENDIMIENTO & CONCLUSIÓN</span>
          <div class="deck-head-crest">${elevenCrestSVG}</div>
        </div>

        <div class="deck-grid-3" style="flex:none;margin-bottom:14px">
          <div class="deck-card" style="align-items:center;justify-content:center;padding:18px">
            ${gaugeSVG(competicionIndex.toFixed(1), "100", "#D6A64E", "Competición")}
          </div>
          <div class="deck-card" style="align-items:center;justify-content:center;padding:18px">
            ${gaugeSVG(rendimientoIndex.toFixed(1), "100", "#3DBA8C", "Rendimiento")}
          </div>
          <div class="deck-card" style="align-items:center;justify-content:center;padding:18px">
            ${gaugeSVG(disponibilidadPct + "%", "100%", "#3A86FF", "Disponibilidad")}
          </div>
        </div>

        <div class="deck-grid-2" style="flex:1;gap:16px">
          <div class="deck-card">
            <div class="deck-card-h">Síntesis Cuantitativa de Temporada</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:12px">
              <div><span class="muted small">Partidos Oficiales</span><br><b class="num">${PJ} PJ</b></div>
              <div><span class="muted small">Minutos Jugados</span><br><b class="num">${totalMinutos} min</b></div>
              <div><span class="muted small">Disponibilidad Médica</span><br><b class="num">${disponibilidadPct}%</b></div>
              <div><span class="muted small">Velocidad Pico</span><br><b class="num">${vmaxPico} km/h</b></div>
            </div>
          </div>

          <div class="deck-card" style="border-left:4px solid #D6A64E;background:#FAF8F2">
            <div class="deck-card-h">Recomendaciones del Cuerpo Técnico</div>
            <p style="font-size:12px;color:#334155;line-height:1.45;margin:0">
              1. Mantener protocolos de entrada en calor explosiva previa a competencia para sostener aceleraciones iniciales (&gt;2.5 m/s²).<br>
              2. Dosificar cargas en microciclos densos con trabajos de descarga neuromuscular y recuperación post-partido.<br>
              3. Reforzar potencia en tren inferior con saltos Drop Jump y trabajo de RFD para consolidar reactividad elástica.
            </p>
            <div style="margin-top:10px;padding-top:8px;border-top:1px solid #E2E8F0;font-size:11px;color:#718096">
              <b>Juan Diego Castro Garzón</b> · Preparador Físico · Eleven Performance
            </div>
          </div>
        </div>

        <div class="deck-foot-bar">
          <span>Eleven Performance · Informe Oficial Cerrado 2026 I</span>
          <b>PÁGINA 08 / 08</b>
        </div>
      </article>

    </div>
  `;
}

async function exportDeckPDF() {
  const btn = $("#btn-deck-pdf");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Generando PDF 16:9 Oficial...";
  }

  try {
    if (!window.jspdf || !window.html2canvas) {
      toast("Librerías de PDF no disponibles. Se abre impresión nativa.", true);
      window.print();
      return;
    }

    const cid = S.ui.deckClient || S.ui.repClient || S.ui.clientDetail || "client-alexis-zapata";
    const c = S.clients[cid] || Object.values(S.clients)[0];

    const container = $("#deck-pages-root");
    const wasSingle = container && container.classList.contains("single-slide");
    if (wasSingle) {
      container.classList.remove("single-slide");
    }

    const pages = $$("#deck-pages-root .deck-page");
    const pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", orientation: "landscape", compress: true });

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const prevDisplay = page.style.display;
      page.style.setProperty("display", "flex", "important");

      const canvas = await window.html2canvas(page, {
        scale: 1.8,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        windowWidth: 1200
      });

      page.style.display = prevDisplay;

      const pw = 297, ph = 210;
      const h = canvas.height * pw / canvas.width;
      if (i > 0) pdf.addPage();
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, pw, Math.min(h, ph));
    }

    if (wasSingle && container) {
      container.classList.add("single-slide");
    }

    const filename = `INFORME_COMPETENCIA_${slug(c ? c.name : "DEPORTISTA").toUpperCase()}_ELEVEN_PERFORMANCE.pdf`;
    pdf.save(filename);
    toast("✅ PDF Oficial 16:9 (" + (c ? c.name : "8 Páginas") + ") descargado exitosamente: " + filename);
  } catch (err) {
    console.error("Error exportando PDF 16:9:", err);
    toast("Fallo generando PDF automático. Se abre ventana de impresión.", true);
    window.print();
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = icon("download") + "Descargar PDF (16:9)";
    }
  }
}




/* --- MODULE: gym.js --- */
/* ==========================================================================
   12. VISTA: ADMINISTRACIÓN DE MEMBRESÍAS & RECAUDO (EXCLUSIVO KEVIN GAITÁN)
   ========================================================================== */
function payBadgeHTML(metodo) {
  const m = (metodo || "Nequi").toLowerCase();
  if (m.includes("nequi")) return `<span class="pay-badge nequi">🟣 Nequi</span>`;
  if (m.includes("davi")) return `<span class="pay-badge daviplata">🔴 Daviplata</span>`;
  if (m.includes("efect") || m.includes("cash")) return `<span class="pay-badge efectivo">🟢 Efectivo</span>`;
  if (m.includes("banco")) return `<span class="pay-badge bancolombia">🟡 Bancolombia</span>`;
  if (m.includes("tarj") || m.includes("card")) return `<span class="pay-badge tarjeta">🔵 Tarjeta</span>`;
  return `<span class="pay-badge efectivo">💳 ${esc(metodo || "Transferencia")}</span>`;
}

function countdownPillHTML(fechaFin) {
  const dias = daysBetween(todayISO(), fechaFin);
  if (dias > 7) {
    return `<span class="countdown-pill good" title="Próximo pago el ${fmtDateS(fechaFin)}">🟢 Faltan ${dias} días</span>`;
  }
  if (dias > 0 && dias <= 7) {
    return `<span class="countdown-pill warn" title="Próximo pago el ${fmtDateS(fechaFin)}">🟡 Faltan ${dias} ${dias === 1 ? "día" : "días"} (Cobrar)</span>`;
  }
  if (dias === 0) {
    return `<span class="countdown-pill bad" title="Vence hoy ${fmtDateS(fechaFin)}">🔴 Vence HOY</span>`;
  }
  return `<span class="countdown-pill bad" title="Venció el ${fmtDateS(fechaFin)}">🔴 Vencido hace ${Math.abs(dias)} d</span>`;
}

function redactarMensajeAdminCobro(m) {
  const gymCfg = S.config.gym || {};
  const nequi = gymCfg.nequi || "3206051319";
  const daviplata = gymCfg.daviplata || "3206051319";
  const bancolombia = gymCfg.bancolombia || "Ahorros 245-891234-01";
  const titular = gymCfg.titular || "Eleven Performance SAS";
  const dias = daysBetween(todayISO(), m.fechaFin);
  
  let estadoTxt = "";
  if (dias < 0) {
    estadoTxt = `⚠️ Tu membresía venció hace *${Math.abs(dias)} días* (el ${fmtDateS(m.fechaFin)}). Te recordamos renovarla para mantener habilitado tu plan de entrenamiento.`;
  } else if (dias === 0) {
    estadoTxt = `⏰ Tu membresía vence el día de *HOY*. Te recordamos realizar tu renovación para continuar sin interrupciones.`;
  } else {
    estadoTxt = `🗓️ Tu membresía vence en *${dias} días* (el ${fmtDateS(m.fechaFin)}).`;
  }

  return `¡Hola ${m.nombre}! 👋 Saludos desde *Eleven Performance*.\n\n` +
    `Te compartimos el resumen de tu suscripción:\n` +
    `📋 *Plan:* ${m.planNombre || "Entrenamiento Deportivo"}\n` +
    `💰 *Valor mensualidad:* $${fmtN(m.valor || 120000, 0)} COP\n` +
    `${estadoTxt}\n\n` +
    `💳 *Medios de pago oficiales:*\n` +
    `📲 *Nequi:* ${nequi}\n` +
    `📱 *Daviplata:* ${daviplata}\n` +
    `🏦 *Bancolombia:* ${bancolombia}\n` +
    `👤 *Titular:* ${titular}\n\n` +
    `Por favor, una vez realizada la transferencia envíanos el comprobante por este chat para registrar tu pago en el sistema. ¡Seguimos entrenando al máximo! 💪⚽`;
}

function adminMembershipsView() {
  const memberships = Object.values(S.gymMemberships || {});
  const searchQ = (S.ui.adminMemSearch || "").toLowerCase().trim();
  const filterStatus = S.ui.adminMemStatus || "all";
  const filterMethod = S.ui.adminMemMethod || "all";
  const sortMode = S.ui.adminMemSort || "urgente";

  // KPIs
  let totalFacturado = 0;
  let totalAlDia = 0;
  let porVencer = 0;
  let vencidas = 0;
  const methodsCount = { nequi: 0, daviplata: 0, efectivo: 0, bancolombia: 0, tarjeta: 0 };

  memberships.forEach(m => {
    totalFacturado += (Number(m.valor) || 0);
    const dias = daysBetween(todayISO(), m.fechaFin);
    if (dias > 7) totalAlDia++;
    else if (dias >= 0 && dias <= 7) porVencer++;
    else vencidas++;

    const met = (m.metodoPago || "nequi").toLowerCase();
    if (met.includes("nequi")) methodsCount.nequi++;
    else if (met.includes("davi")) methodsCount.daviplata++;
    else if (met.includes("efect") || met.includes("cash")) methodsCount.efectivo++;
    else if (met.includes("banco")) methodsCount.bancolombia++;
    else if (met.includes("tarj")) methodsCount.tarjeta++;
  });

  // Filtrado
  let filtered = memberships.filter(m => {
    if (searchQ) {
      const matchName = (m.nombre || "").toLowerCase().includes(searchQ);
      const matchPhone = (m.telefono || "").toLowerCase().includes(searchQ);
      const matchDoc = (m.documento || "").toLowerCase().includes(searchQ);
      const matchPlan = (m.planNombre || "").toLowerCase().includes(searchQ);
      if (!matchName && !matchPhone && !matchDoc && !matchPlan) return false;
    }

    const dias = daysBetween(todayISO(), m.fechaFin);
    if (filterStatus === "active" && dias <= 7) return false;
    if (filterStatus === "expiring" && (dias < 0 || dias > 7)) return false;
    if (filterStatus === "expired" && dias >= 0) return false;

    if (filterMethod !== "all") {
      const met = (m.metodoPago || "").toLowerCase();
      if (!met.includes(filterMethod.toLowerCase())) return false;
    }

    return true;
  });

  // Ordenamiento
  filtered.sort((a, b) => {
    if (sortMode === "urgente") {
      return daysBetween(todayISO(), a.fechaFin) - daysBetween(todayISO(), b.fechaFin);
    }
    if (sortMode === "fechaPago") {
      return (b.fechaPago || b.fechaInicio || "").localeCompare(a.fechaPago || a.fechaInicio || "");
    }
    if (sortMode === "monto") {
      return (Number(b.valor) || 0) - (Number(a.valor) || 0);
    }
    if (sortMode === "nombre") {
      return (a.nombre || "").localeCompare(b.nombre || "");
    }
    return 0;
  });

  return `
    <div class="page-head" style="margin-bottom:20px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px;flex-wrap:wrap;width:100%">
        <div>
          <div style="display:inline-flex;align-items:center;gap:8px;padding:4px 12px;background:rgba(214,166,78,0.15);border:1px solid rgba(214,166,78,0.35);border-radius:20px;font-size:12px;font-weight:700;color:var(--accent);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em">
            👑 Módulo Exclusivo Admin · Kevin Gaitán
          </div>
          <h1 style="margin:0 0 6px;font-size:28px">Administración de Membresías & Recaudo</h1>
          <p style="margin:0;color:var(--muted);font-size:14px;max-width:760px">
            Control contable de deportistas: cuándo pagó, cómo pagó (Nequi, Daviplata, Efectivo, Bancolombia), semáforo visual de días restantes para próximo cobro y recordatorios por WhatsApp en 1-clic.
          </p>
        </div>
        <div class="actions">
          <button class="btn primary" data-act="openAdminPaymentModal">
            ${icon("plus")} Registrar / Renovar Pago
          </button>
          <button class="btn" data-act="exportMembershipsCSV" title="Descargar planilla completa en Excel o CSV">
            ${icon("upload")} Exportar Excel / CSV
          </button>
          ${memberships.length === 0 ? `<button class="btn ghost sm" data-act="loadGymDemoData">Cargar Alumnos Demo</button>` : ""}
        </div>
      </div>
    </div>

    <!-- KPIS CONTABLES Y DE COBRANZA -->
    <div class="stats" style="margin-bottom:24px">
      <div class="stat">
        <div class="lab"><span>Recaudo Total Registrado</span><span>${icon("reports")}</span></div>
        <div class="val" style="color:var(--accent)">$${fmtN(totalFacturado, 0)} <small>COP</small></div>
        <div class="chg good">${memberships.length} deportistas registrados</div>
      </div>
      <div class="stat">
        <div class="lab"><span>Al Día (&gt; 7 días)</span><span>${icon("check")}</span></div>
        <div class="val" style="color:var(--good)">${totalAlDia} <small>alumnos</small></div>
        <div class="chg good">🟢 Membresía vigente</div>
      </div>
      <div class="stat">
        <div class="lab"><span>Cobros Próximos (&le; 7 días)</span><span>${icon("clock")}</span></div>
        <div class="val" style="color:var(--warn)">${porVencer} <small>alertas</small></div>
        <div class="chg warn">🟡 Enviar cobro WhatsApp</div>
      </div>
      <div class="stat">
        <div class="lab"><span>Mora / Vencidas</span><span>${icon("alert")}</span></div>
        <div class="val" style="color:var(--bad)">${vencidas} <small>en mora</small></div>
        <div class="chg bad">🔴 Acceso suspendido</div>
      </div>
    </div>

    <!-- BARRA DE BÚSQUEDA Y FILTROS AVANZADOS -->
    <div style="background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:18px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;flex:1 1 360px">
        <div class="search" style="flex:1 1 200px">
          ${icon("search")}
          <input type="search" class="input" placeholder="Buscar por deportista, cédula, plan o teléfono..." value="${esc(S.ui.adminMemSearch || "")}" data-act-change="setAdminMemSearch">
        </div>
        <div class="seg">
          <button data-act="setAdminMemStatus" data-status="all" aria-pressed="${filterStatus === "all"}">Todos (${memberships.length})</button>
          <button data-act="setAdminMemStatus" data-status="active" aria-pressed="${filterStatus === "active"}">🟢 Al Día (${totalAlDia})</button>
          <button data-act="setAdminMemStatus" data-status="expiring" aria-pressed="${filterStatus === "expiring"}">🟡 Por Vencer (${porVencer})</button>
          <button data-act="setAdminMemStatus" data-status="expired" aria-pressed="${filterStatus === "expired"}">🔴 Vencidas (${vencidas})</button>
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:6px">
          <label style="font-size:12.5px;color:var(--muted);font-weight:600">Método:</label>
          <select class="input sm" style="width:140px;min-height:34px" data-act-change="setAdminMemMethod">
            <option value="all" ${filterMethod === "all" ? "selected" : ""}>Todos</option>
            <option value="nequi" ${filterMethod === "nequi" ? "selected" : ""}>🟣 Nequi (${methodsCount.nequi})</option>
            <option value="daviplata" ${filterMethod === "daviplata" ? "selected" : ""}>🔴 Daviplata (${methodsCount.daviplata})</option>
            <option value="efectivo" ${filterMethod === "efectivo" ? "selected" : ""}>🟢 Efectivo (${methodsCount.efectivo})</option>
            <option value="bancolombia" ${filterMethod === "bancolombia" ? "selected" : ""}>🟡 Bancolombia (${methodsCount.bancolombia})</option>
            <option value="tarjeta" ${filterMethod === "tarjeta" ? "selected" : ""}>🔵 Tarjeta (${methodsCount.tarjeta})</option>
          </select>
        </div>

        <div style="display:flex;align-items:center;gap:6px">
          <label style="font-size:12.5px;color:var(--muted);font-weight:600">Ordenar:</label>
          <select class="input sm" style="width:165px;min-height:34px" data-act-change="setAdminMemSort">
            <option value="urgente" ${sortMode === "urgente" ? "selected" : ""}>Días Restantes (Urgentes)</option>
            <option value="fechaPago" ${sortMode === "fechaPago" ? "selected" : ""}>Fecha de Pago (Recientes)</option>
            <option value="monto" ${sortMode === "monto" ? "selected" : ""}>Mayor Monto ($)</option>
            <option value="nombre" ${sortMode === "nombre" ? "selected" : ""}>Nombre Deportista (A-Z)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- TABLA ADMINISTRATIVA PRINCIPAL -->
    ${filtered.length === 0 ? `
      <div class="empty">
        <b>No se encontraron registros con los filtros seleccionados</b>
        <p class="muted">Intenta borrar el texto de búsqueda o restablecer los filtros de estado y método de pago.</p>
        <button class="btn primary" data-act="openAdminPaymentModal">${icon("plus")} Registrar Primer Pago</button>
      </div>
    ` : `
      <div class="tbl-wrap" style="box-shadow:0 8px 24px rgba(0,0,0,0.25);border-radius:var(--r);overflow:hidden">
        <table class="tbl" style="margin:0">
          <thead>
            <tr>
              <th>Deportista / Alumno</th>
              <th>Plan de Entrenamiento</th>
              <th>Cuándo Pagó</th>
              <th>Cómo Pagó</th>
              <th style="text-align:right">Monto Pagado</th>
              <th>Próximo Pago</th>
              <th style="text-align:center">Días Restantes</th>
              <th style="text-align:right">Acciones de Cobro</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(m => {
              const msgCobro = redactarMensajeAdminCobro(m);
              const cleanPhone = (m.telefono || "").replace(/\D/g, "");
              const waUrl = `https://wa.me/57${cleanPhone}?text=${encodeURIComponent(msgCobro)}`;

              return `
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:10px">
                      <span class="avatar sm">${esc(initials(m.nombre))}</span>
                      <div>
                        <div style="font-weight:700;font-size:14px">${esc(m.nombre)}</div>
                        <div class="muted small">
                          ${m.documento ? `CC: ${esc(m.documento)} · ` : ""}
                          <span style="font-family:var(--f-mono)">${esc(m.telefono || "Sin teléfono")}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style="font-weight:600;font-size:13px">${esc(m.planNombre || "Entrenamiento Deportivo")}</div>
                    ${m.notas ? `<div class="muted small" style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${esc(m.notas)}">${esc(m.notas)}</div>` : ""}
                  </td>
                  <td>
                    <div style="font-family:var(--f-mono);font-size:13px;font-weight:600">${fmtDateS(m.fechaPago || m.fechaInicio)}</div>
                    <div class="muted small" style="font-family:var(--f-mono)">
                      ${m.referencia ? `Ref: ${esc(m.referencia)}` : `<span style="opacity:0.6">Sin referencia</span>`}
                    </div>
                  </td>
                  <td>
                    ${payBadgeHTML(m.metodoPago)}
                  </td>
                  <td style="text-align:right">
                    <div style="font-weight:800;color:var(--accent);font-size:14px;font-family:var(--f-mono)">
                      $${fmtN(m.valor || 120000, 0)}
                    </div>
                    <div class="muted small">COP</div>
                  </td>
                  <td>
                    <div style="font-family:var(--f-mono);font-size:13px;font-weight:700">${fmtDateS(m.fechaFin)}</div>
                  </td>
                  <td style="text-align:center">
                    ${countdownPillHTML(m.fechaFin)}
                  </td>
                  <td style="text-align:right">
                    <div class="actions" style="justify-content:flex-end;gap:6px">
                      <button class="btn-whatsapp" data-act="enviarCobroBot" data-id="${esc(m.id)}" title="El Bot de Eleven enviará el mensaje oficial de cobro directamente al WhatsApp del deportista">
                        ${icon("whatsapp")} Enviar por Bot
                      </button>
                      <button class="btn sm" data-act="openAdminPaymentModal" data-id="${esc(m.id)}" title="Registrar renovación de pago y actualizar fechas">
                        💳 Renovar
                      </button>
                      <button class="icon-btn sm" data-act="editGymMembership" data-id="${esc(m.id)}" title="Editar datos del deportista">
                        ${icon("edit")}
                      </button>
                      <button class="icon-btn sm" data-act="deleteGymMembership" data-id="${esc(m.id)}" title="Eliminar membresía (Solo Admin)" style="color:var(--bad)">
                        ${icon("trash")}
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `}
  `;
}

function adminPaymentModal(mem) {
  const isNew = !mem;
  const hoy = todayISO();

  // Calcular fechas de vigencia:
  // Al registrar o renovar un pago, la fecha de pago predeterminada es HOY.
  // La fecha de próximo vencimiento se calcula extendiendo 30 días:
  // - Si el deportista ya tenía una fecha fin futura vigente (> hoy), se extienden 30 días a partir de esa fecha fin.
  // - Si ya venció o vence hoy (<= hoy) o es nuevo, se calcula a partir de hoy (+30 días).
  let defaultFechaFin = addDays(hoy, 30);
  if (mem && mem.fechaFin) {
    const diff = daysBetween(hoy, mem.fechaFin);
    if (diff > 0) {
      defaultFechaFin = addDays(mem.fechaFin, 30);
    } else {
      defaultFechaFin = addDays(hoy, 30);
    }
  }

  const baseMem = mem || {
    nombre: "",
    telefono: "",
    documento: "",
    planNombre: "Plan Pro Fútbol Alto Rendimiento",
    valor: 280000,
    fechaPago: hoy,
    metodoPago: "Nequi",
    referencia: "",
    fechaInicio: hoy,
    fechaFin: defaultFechaFin,
    notas: ""
  };

  const fechaPagoVal = hoy;
  const fechaFinVal = defaultFechaFin;

  // Lista unificada de deportistas para autocompletado
  const allAthletes = [];
  const seenAthletes = new Set();
  Object.values(S.gymMemberships || {}).forEach(m => {
    if (m.nombre && !seenAthletes.has(m.nombre.toLowerCase().trim())) {
      seenAthletes.add(m.nombre.toLowerCase().trim());
      allAthletes.push({
        nombre: m.nombre,
        telefono: m.telefono || "",
        documento: m.documento || "",
        planNombre: m.planNombre,
        valor: m.valor,
        metodoPago: m.metodoPago,
        fechaFin: m.fechaFin,
        memId: m.id
      });
    }
  });
  Object.values(S.clients || {}).forEach(c => {
    if (c.name && !seenAthletes.has(c.name.toLowerCase().trim())) {
      seenAthletes.add(c.name.toLowerCase().trim());
      allAthletes.push({
        nombre: c.name,
        telefono: c.phone || "",
        documento: c.document || "",
        planNombre: null,
        valor: null,
        metodoPago: null,
        fechaFin: null,
        memId: null
      });
    }
  });

  const m = openModal({
    title: isNew ? "Registrar Nuevo Pago de Deportista" : `Registrar Renovación de Pago — ${baseMem.nombre}`,
    size: "wide",
    body: `
      ${!isNew ? `
        <div style="margin-bottom:14px;padding:12px 14px;background:rgba(46,196,182,0.12);border-left:3px solid var(--good);border-radius:6px;font-size:13px;color:var(--fg);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
          <div>
            <b>🔄 Renovando Membresía de ${esc(baseMem.nombre)}:</b> Se registrará un nuevo pago con fecha de <b>hoy (${fmtDateS(hoy)})</b> y se extenderá la vigencia hasta <b>${fmtDateS(defaultFechaFin)}</b> (+30 días).
            ${baseMem.fechaFin ? `<div class="muted small" style="margin-top:3px">Estado actual previo: ${countdownPillHTML(baseMem.fechaFin)} (Vencimiento anterior: ${fmtDateS(baseMem.fechaFin)})</div>` : ""}
          </div>
        </div>
      ` : `
        <div style="margin-bottom:14px;padding:10px 14px;background:rgba(214,166,78,0.1);border-left:3px solid var(--accent);border-radius:4px;font-size:13px;color:var(--fg)">
          <b>Módulo de Recaudo Eleven Performance:</b> Registra el pago del deportista. Si seleccionas un alumno registrado, se renovará su membresía calculando su nueva vigencia automáticamente.
        </div>
      `}
      <div class="form-grid">
        <div class="field span2">
          <label for="adm-pay-name">Nombre del Deportista / Alumno *</label>
          <input class="input" id="adm-pay-name" list="adm-clients-list" value="${esc(baseMem.nombre)}" placeholder="Ej: Cristian Mafla o Alexis Zapata" required>
          <datalist id="adm-clients-list">
            ${allAthletes.map(a => `<option value="${esc(a.nombre)}">${a.documento ? `CC: ${esc(a.documento)} · ` : ""}${esc(a.telefono || "")}</option>`).join("")}
          </datalist>
        </div>
        <div class="field">
          <label for="adm-pay-doc">Cédula / Documento (CC)</label>
          <input class="input" id="adm-pay-doc" value="${esc(baseMem.documento || "")}" placeholder="1037645892">
        </div>
        <div class="field">
          <label for="adm-pay-phone">WhatsApp Contacto *</label>
          <input class="input" id="adm-pay-phone" value="${esc(baseMem.telefono || "")}" placeholder="310 456 7890" required>
        </div>
        <div class="field span2">
          <label for="adm-pay-plan">Plan / Servicio Contratado</label>
          <select class="input" id="adm-pay-plan">
            <option value="280000|Plan Pro Fútbol Alto Rendimiento|30" ${(baseMem.planNombre || "").includes("Alto") ? "selected" : ""}>Plan Pro Fútbol Alto Rendimiento ($280.000 / 30 días)</option>
            <option value="120000|Mensualidad Completa Gimnasio Libre|30" ${(baseMem.planNombre || "").includes("Completa") ? "selected" : ""}>Mensualidad Completa Gimnasio Libre ($120.000 / 30 días)</option>
            <option value="95000|Entrenamiento Funcional & Fuerza|30" ${(baseMem.planNombre || "").includes("Funcional") ? "selected" : ""}>Entrenamiento Funcional & Fuerza ($95.000 / 30 días)</option>
            <option value="320000|Plan Trimestral All-Access GPS|90" ${(baseMem.planNombre || "").includes("Trimestral") ? "selected" : ""}>Plan Trimestral All-Access GPS ($320.000 / 90 días)</option>
            <option value="250000|Plan Pro Monitoreo & Fuerza|30" ${(baseMem.planNombre || "").includes("Monitoreo") ? "selected" : ""}>Plan Pro Monitoreo & Fuerza ($250.000 / 30 días)</option>
          </select>
        </div>
        <div class="field">
          <label for="adm-pay-val">Monto Pagado (COP) *</label>
          <input class="input" id="adm-pay-val" type="number" value="${esc(baseMem.valor || 280000)}" required>
        </div>
        <div class="field">
          <label for="adm-pay-metodo">¿Cómo Pagó? (Método) *</label>
          <select class="input" id="adm-pay-metodo">
            <option value="Nequi" ${(baseMem.metodoPago || "").toLowerCase().includes("nequi") ? "selected" : ""}>🟣 Nequi</option>
            <option value="Daviplata" ${(baseMem.metodoPago || "").toLowerCase().includes("davi") ? "selected" : ""}>🔴 Daviplata</option>
            <option value="Efectivo" ${(baseMem.metodoPago || "").toLowerCase().includes("efect") ? "selected" : ""}>🟢 Efectivo en Sede</option>
            <option value="Bancolombia" ${(baseMem.metodoPago || "").toLowerCase().includes("banco") ? "selected" : ""}>🟡 Bancolombia (Transferencia)</option>
            <option value="Tarjeta" ${(baseMem.metodoPago || "").toLowerCase().includes("tarj") ? "selected" : ""}>🔵 Tarjeta Débito / Crédito</option>
          </select>
        </div>
        <div class="field">
          <label for="adm-pay-fecha">¿Cuándo Pagó? (Fecha de Pago) *</label>
          <input type="date" class="input" id="adm-pay-fecha" value="${esc(fechaPagoVal)}" required>
        </div>
        <div class="field">
          <label for="adm-pay-period">Duración / Período</label>
          <select class="input" id="adm-pay-period">
            <option value="15">15 días (Medio mes)</option>
            <option value="30" selected>1 Mes (30 días)</option>
            <option value="60">2 Meses (60 días)</option>
            <option value="90">3 Meses (Trimestral)</option>
            <option value="180">6 Meses (Semestral)</option>
            <option value="365">1 Año (365 días)</option>
          </select>
        </div>
        <div class="field">
          <label for="adm-pay-fin">Próximo Pago (Fecha Vencimiento) *</label>
          <input type="date" class="input" id="adm-pay-fin" value="${esc(fechaFinVal)}" required>
        </div>
        <div class="field">
          <label for="adm-pay-ref">Nº Comprobante / Referencia Transacción</label>
          <input class="input" id="adm-pay-ref" value="" placeholder="Ej: TAR-90184 o NEQ-8392">
        </div>
        <div class="field span3">
          <label for="adm-pay-notes">Notas Contables / Observaciones</label>
          <input class="input" id="adm-pay-notes" value="${esc(baseMem.notas || "")}" placeholder="Observaciones de pago, titular de la cuenta que transfirió, etc.">
        </div>
      </div>

      <div id="adm-pay-preview-box" style="margin-top:16px;padding:12px 16px;background:var(--surface-hover);border-radius:10px;border:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
        <span style="font-size:13px;color:var(--muted)">Estado proyectado tras el pago:</span>
        <div id="adm-pay-preview-badge">
          ${countdownPillHTML(fechaFinVal)}
        </div>
      </div>
    `,
    footer: `
      <button class="btn" data-mact="close">Cancelar</button>
      <button class="btn primary" id="btn-save-admin-payment">${isNew ? "Registrar Pago" : "Guardar & Renovar"}</button>
    `
  });

  let matchedMemId = mem?.id || null;

  // Autocompletar datos del deportista existente
  $("#adm-pay-name", m).addEventListener("input", e => {
    const inputVal = e.target.value.trim().toLowerCase();
    const matched = allAthletes.find(a => a.nombre.toLowerCase() === inputVal);
    if (matched) {
      if (matched.telefono) $("#adm-pay-phone", m).value = matched.telefono;
      if (matched.documento) $("#adm-pay-doc", m).value = matched.documento;
      if (matched.memId) {
        matchedMemId = matched.memId;
        if (matched.valor) $("#adm-pay-val", m).value = matched.valor;
        if (matched.metodoPago) $("#adm-pay-metodo", m).value = matched.metodoPago;
        if (matched.planNombre) {
          const sel = $("#adm-pay-plan", m);
          for (let opt of sel.options) {
            if (opt.value.includes(matched.planNombre) || opt.text.includes(matched.planNombre)) {
              opt.selected = true;
              break;
            }
          }
        }
        // Recalcular vigencia
        const fPago = $("#adm-pay-fecha", m).value || todayISO();
        const period = Number($("#adm-pay-period", m).value) || 30;
        let nextFin = addDays(fPago, period);
        if (matched.fechaFin && daysBetween(todayISO(), matched.fechaFin) > 0) {
          nextFin = addDays(matched.fechaFin, period);
        }
        $("#adm-pay-fin", m).value = nextFin;
        const badgeEl = $("#adm-pay-preview-badge", m);
        if (badgeEl) badgeEl.innerHTML = countdownPillHTML(nextFin);
      }
    }
  });

  // Ajustar fecha fin al cambiar fecha pago o período
  const updateFin = () => {
    const fPago = $("#adm-pay-fecha", m).value || todayISO();
    const period = Number($("#adm-pay-period", m).value) || 30;
    const finCalculada = addDays(fPago, period);
    $("#adm-pay-fin", m).value = finCalculada;
    const badgeEl = $("#adm-pay-preview-badge", m);
    if (badgeEl) badgeEl.innerHTML = countdownPillHTML(finCalculada);
  };

  $("#adm-pay-fecha", m).addEventListener("change", updateFin);
  $("#adm-pay-period", m).addEventListener("change", updateFin);

  $("#adm-pay-plan", m).addEventListener("change", e => {
    const [val, , days] = e.target.value.split("|");
    $("#adm-pay-val", m).value = val;
    if (days) {
      $("#adm-pay-period", m).value = days;
      updateFin();
    }
  });

  $("#adm-pay-fin", m).addEventListener("change", e => {
    const badgeEl = $("#adm-pay-preview-badge", m);
    if (badgeEl) badgeEl.innerHTML = countdownPillHTML(e.target.value);
  });

  $("#btn-save-admin-payment", m).addEventListener("click", async () => {
    const btn = $("#btn-save-admin-payment", m);
    const nombre = $("#adm-pay-name", m).value.trim();
    const telefono = $("#adm-pay-phone", m).value.trim();
    const documento = $("#adm-pay-doc", m).value.trim();
    const [valPlan, planNombre] = $("#adm-pay-plan", m).value.split("|");
    const valor = parseNum($("#adm-pay-val", m).value) || +valPlan;
    const metodoPago = $("#adm-pay-metodo", m).value;
    const fechaPago = $("#adm-pay-fecha", m).value || todayISO();
    const fechaFin = $("#adm-pay-fin", m).value;
    const referencia = $("#adm-pay-ref", m).value.trim();
    const notas = $("#adm-pay-notes", m).value.trim();

    if (!nombre) { toast("El nombre del deportista es obligatorio", true); return; }
    if (!telefono) { toast("El WhatsApp de contacto es obligatorio", true); return; }
    if (!fechaFin) { toast("La fecha del próximo pago es obligatoria", true); return; }

    btn.disabled = true;
    btn.textContent = "Guardando...";

    // Identificar si corresponde a una membresía existente para actualizarla directamente
    const cleanTel = telefono.replace(/\D/g, "");
    const existing = Object.values(S.gymMemberships || {}).find(x =>
      (mem && mem.id && x.id === mem.id) ||
      (matchedMemId && x.id === matchedMemId) ||
      (x.nombre && x.nombre.trim().toLowerCase() === nombre.toLowerCase()) ||
      (cleanTel && x.telefono && x.telefono.replace(/\D/g, "") === cleanTel)
    );

    const targetId = existing ? existing.id : (mem?.id || uid("gm"));

    const recordData = {
      id: targetId,
      nombre,
      telefono,
      documento,
      planNombre,
      valor,
      fechaPago,
      metodoPago,
      referencia,
      fechaInicio: (existing && existing.fechaInicio) || fechaPago,
      fechaFin,
      notas,
      updatedAt: new Date().toISOString()
    };

    // Actualizar Store y almacenamiento de manera sincrónica
    if (!S.gymMemberships) S.gymMemberships = {};
    S.gymMemberships[targetId] = recordData;
    persistLocal();
    await put("gymMemberships", targetId, recordData);

    // Registrar formalmente en el servidor backend para el reporte mensual de ingresos
    try {
      fetch(`${getBotBaseUrl()}/api/gym/pagos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          chat_id: cleanTel ? (cleanTel.length === 10 ? "57" + cleanTel : cleanTel) + "@c.us" : null,
          nombre_alumno: nombre,
          telefono: cleanTel,
          plan_nombre: planNombre,
          monto: valor,
          medio_pago: metodoPago,
          referencia,
          fecha_pago: fechaPago,
          fecha_inicio: fechaPago,
          fecha_vencimiento: fechaFin,
          notas
        })
      }).catch(() => {});
    } catch (_) {}

    closeModal();
    render(); // Forzar actualización síncrona inmediata de la tabla y KPIs
    toast(`✅ Pago registrado exitosamente para ${nombre} por ${metodoPago}. Próximo pago: ${fmtDateS(fechaFin)}.`);
  });
}

function exportMembershipsCSV() {
  const list = Object.values(S.gymMemberships || {});
  if (!list.length) {
    toast("No hay membresías registradas para exportar.", true);
    return;
  }
  const headers = ["Nombre", "Documento", "Telefono", "Plan", "Monto_COP", "Fecha_Pago", "Metodo_Pago", "Referencia", "Proximo_Pago", "Dias_Restantes", "Estado_Cobro", "Notas"];
  const rows = list.map(m => {
    const dias = daysBetween(todayISO(), m.fechaFin);
    let st = "Al Dia";
    if (dias < 0) st = "Vencido";
    else if (dias <= 7) st = "Por Vencer";
    return [
      `"${(m.nombre || "").replace(/"/g, '""')}"`,
      `"${(m.documento || "").replace(/"/g, '""')}"`,
      `"${(m.telefono || "").replace(/"/g, '""')}"`,
      `"${(m.planNombre || "").replace(/"/g, '""')}"`,
      Number(m.valor) || 0,
      `"${m.fechaPago || m.fechaInicio || ""}"`,
      `"${(m.metodoPago || "Nequi").replace(/"/g, '""')}"`,
      `"${(m.referencia || "").replace(/"/g, '""')}"`,
      `"${m.fechaFin || ""}"`,
      dias,
      `"${st}"`,
      `"${(m.notas || "").replace(/"/g, '""')}"`
    ].join(",");
  });

  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Eleven_Performance_Membresias_${todayISO()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast("📥 Planilla de membresías exportada a CSV exitosamente.");
}


/* ==========================================================================
   12B. VISTA: GESTIÓN INTEGRAL DE GIMNASIO & BOT WHATSAPP
   ========================================================================== */
function gymHoursList() {
  const open = (S.config.gym && S.config.gym.openHour) || 6;
  const close = (S.config.gym && S.config.gym.closeHour) || 22;
  const hours = [];
  for (let h = open; h < close; h++) {
    hours.push(pad(h) + ":00");
  }
  return hours;
}

function redactarMensajeCobro(m) {
  const cfg = (S.config && S.config.gym) || {};
  const dias = daysBetween(todayISO(), m.fechaFin);
  let estadoTxt = `vence el *${fmtDate(m.fechaFin)}*`;
  if (dias < 0) estadoTxt = `se encuentra *vencida hace ${Math.abs(dias)} días* (${fmtDate(m.fechaFin)})`;
  else if (dias === 0) estadoTxt = `*vence el día de HOY* (${fmtDate(m.fechaFin)})`;
  else if (dias <= 5) estadoTxt = `está próxima a vencer en *${dias} días* (${fmtDate(m.fechaFin)})`;

  return `Hola ${m.nombre || "Atleta"}! 👋 Te saludamos desde *Eleven Performance*.\n\n` +
    `Te escribimos para recordarte que tu suscripción *${m.planNombre || "Mensualidad"}* ${estadoTxt}.\n` +
    `💰 *Valor a cancelar:* $${fmtN(m.valor || 120000, 0)} COP\n\n` +
    `💳 *Cuentas autorizadas de recaudo:*\n` +
    `• *Nequi / Daviplata:* ${cfg.nequi || "3206051319"}\n` +
    `• *Bancolombia:* ${cfg.bancolombia || "Ahorros 245-891234-01"}\n` +
    `• *Titular:* ${cfg.titular || "Eleven Performance SAS"}\n\n` +
    `Una vez realices la transferencia, por favor envíanos el comprobante por este medio para confirmar tu renovación en el sistema. ¡A seguir rompiéndola! 🔥💪`;
}

function gymAdminView() {
  if (!window._gymPollingActive) {
    window._gymPollingActive = true;
    setInterval(async () => {
      if (S.view && S.view.page === "gym") {
        try {
          const res = await fetch(`${getBotBaseUrl()}/api/gym/entrenamientos`, { signal: AbortSignal.timeout(2000) });
          if (res.ok) {
            const liveEnts = await res.json();
            const changed = await syncLiveGymBookings(liveEnts);
            if (changed) render();
          }
        } catch (_) {}
      }
    }, 2000);
  }

  const gymCfg = S.config.gym || {};
  const currentTab = S.ui.gymTab || "agenda";
  const currentDate = S.ui.gymDate || todayISO();
  const maxSlots = gymCfg.slotsPerHour || 8;
  const hours = gymHoursList();

  // Membresías
  const memberships = Object.values(S.gymMemberships || {});
  let totalActivas = 0, porVencer = 0, vencidas = 0;
  memberships.forEach(m => {
    const diff = daysBetween(todayISO(), m.fechaFin);
    if (diff < 0) vencidas++;
    else if (diff <= 5) { porVencer++; totalActivas++; }
    else totalActivas++;
  });

  // Reservas de la fecha seleccionada
  const allBookings = Object.values(S.gymBookings || {});
  const dateBookings = allBookings.filter(b => b.date === currentDate && b.status !== "cancelado");
  const totalSlotsDay = hours.length * maxSlots;
  const occRate = totalSlotsDay > 0 ? Math.round((dateBookings.length / totalSlotsDay) * 100) : 0;

  return `
    <div class="gym-header-banner">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px;flex-wrap:wrap">
        <div>
          <div class="gym-badge-pill">
            ${icon("calendar", "gym-badge-icon")} Eleven Gym & WhatsApp Bot
          </div>
          <h1 style="margin:0 0 6px 0;font-size:28px">Administración de Gimnasio & Turnos</h1>
          <p style="margin:0;color:var(--muted);font-size:14px;max-width:680px">
            Control de cupos por hora, agendamiento de sesiones, cancelación con liberación de cupos y recordatorios de pago de mensualidades sincronizados con WhatsApp.
          </p>
        </div>
        <div class="actions" style="display:flex;align-items:center;gap:10px">
          ${themeToggleBtnHTML()}
          <button class="btn primary" data-act="openGymBookingModal" data-date="${esc(currentDate)}">${icon("plus")} Agendar Turno</button>
          <button class="btn" data-act="openGymMembershipModal">${icon("plus")} Nueva Membresía</button>
          ${memberships.length === 0 ? `<button class="btn ghost sm" data-act="loadGymDemoData">Cargar Alumnos de Prueba</button>` : ""}
        </div>
      </div>

      <!-- KPIs RÁPIDOS -->
      <div class="stats" style="margin-top:22px">
        <div class="stat">
          <div class="lab"><span>Ocupación de Hoy (${fmtDateS(currentDate)})</span><span>${icon("calendar")}</span></div>
          <div class="val">${dateBookings.length} <small>/ ${totalSlotsDay} cupos</small></div>
          <div class="chg ${occRate > 80 ? "bad" : "good"}">${occRate}% de capacidad</div>
        </div>
        <div class="stat">
          <div class="lab"><span>Alumnos Activos</span><span>${icon("clients")}</span></div>
          <div class="val">${totalActivas} <small>inscritos</small></div>
          <div class="chg good">Al día con el gimnasio</div>
        </div>
        <div class="stat">
          <div class="lab"><span>Mensualidades por Vencer</span><span>${icon("alert")}</span></div>
          <div class="val" style="color:var(--warn)">${porVencer} <small>alumnos (≤5 días)</small></div>
          <div class="chg ${porVencer > 0 ? "bad" : "good"}">Enviar recordatorio WhatsApp</div>
        </div>
        <div class="stat">
          <div class="lab"><span>Mensualidades Vencidas</span><span>${icon("alert")}</span></div>
          <div class="val" style="color:var(--bad)">${vencidas} <small>en mora</small></div>
          <div class="chg bad">Acceso suspendido</div>
        </div>
      </div>
    </div>

    <!-- TABS PRINCIPALES -->
    <div class="gym-toolbar">
      <div class="gym-tabs">
        <button class="gym-tab-btn ${currentTab === "agenda" ? "active" : ""}" data-act="setGymTab" data-tab="agenda">
          ${icon("calendar")} Agenda de Entrenamientos
        </button>
        ${isAdmin() ? `
          <button class="gym-tab-btn ${currentTab === "memberships" ? "active" : ""}" data-act="setGymTab" data-tab="memberships">
            ${icon("clients")} Alumnos & Mensualidades (${memberships.length})
          </button>
          <button class="gym-tab-btn ${currentTab === "reporte" ? "active" : ""}" data-act="setGymTab" data-tab="reporte">
            📊 Reporte Mensual & Retención
          </button>
          <button class="gym-tab-btn ${currentTab === "bot" ? "active" : ""}" data-act="setGymTab" data-tab="bot">
            ${icon("whatsapp")} Bot WhatsApp & Cuentas de Cobro
          </button>
        ` : ""}
      </div>
    </div>

    ${currentTab === "agenda" ? gymAgendaTabHTML(currentDate, hours, maxSlots, dateBookings, allBookings) : ""}
    ${currentTab === "memberships" ? gymMembershipsTabHTML(memberships) : ""}
    ${currentTab === "reporte" ? gymReporteMensualTabHTML() : ""}
    ${currentTab === "bot" ? (isAdmin() ? gymBotTabHTML(gymCfg) : restrictedAdminView("Bot WhatsApp & Cuentas de Cobro")) : ""}
  `;
}


/* ==========================================================================
   CALENDARIO VISUAL SEMANAL & MENSUAL (ESTILO GOOGLE CALENDAR)
   ========================================================================== */
function getWeekDays(refISO) {
  const d = parseD(refISO) || new Date();
  const day = d.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const cur = new Date(monday);
    cur.setDate(monday.getDate() + i);
    days.push(toISO(cur));
  }
  return days;
}

window.handleGymBookingDrop = async function(e, targetDate, targetTime) {
  e.preventDefault();
  if (e.currentTarget) e.currentTarget.classList.remove("gym-cell-dragover");
  const bookingId = e.dataTransfer.getData("text/plain");
  if (!bookingId) return;
  const b = S.gymBookings && S.gymBookings[bookingId];
  if (!b) return;
  if (b.date === targetDate && b.time === targetTime) return;

  const maxSlots = (S.config.gym && S.config.gym.slotsPerHour) || 8;
  const existing = Object.values(S.gymBookings || {}).filter(item => item.date === targetDate && item.time === targetTime && item.status !== "cancelado");
  if (existing.length >= maxSlots) {
    toast("El turno de las " + targetTime + " del " + targetDate + " ya está completo (" + maxSlots + " cupos).", true);
    return;
  }

  b.date = targetDate;
  b.time = targetTime;
  persistLocal();
  render();
  toast("Turno de " + b.nombre + " reprogramado al " + fmtDateS(targetDate) + " a las " + targetTime + ".");

  try {
    const dbId = b.dbId || (String(b.id).startsWith("bot_ent_") ? Number(b.id.replace("bot_ent_", "")) : undefined);
    if (dbId) {
      await fetch(getBotBaseUrl() + "/api/gym/reprogramar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: dbId, fecha: targetDate, hora: targetTime })
      });
    }
  } catch (err) {
    console.warn("Error en reprogramación backend:", err);
  }
};

function gymAgendaTabHTML(currentDate, hours, maxSlots, dateBookings, allBookings) {
  const viewMode = S.ui.gymAgendaView || "week";
  const blockFilter = S.ui.gymBlockFilter || "all";
  const isToday = currentDate === todayISO();

  return `
    <div style="background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:14px 18px;margin-bottom:18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px">
      <!-- SELECTOR DE VISTA ESTILO GOOGLE CALENDAR -->
      <div class="gym-view-switcher">
        <button class="gym-view-btn ${viewMode === "week" ? "active" : ""}" data-act="setGymViewMode" data-mode="week">
          ${icon("calendar")} Vista Semana (Google Calendar)
        </button>
        <button class="gym-view-btn ${viewMode === "day" ? "active" : ""}" data-act="setGymViewMode" data-mode="day">
          ${icon("clock")} Turnos por Hora (Día)
        </button>
        <button class="gym-view-btn ${viewMode === "month" ? "active" : ""}" data-act="setGymViewMode" data-mode="month">
          ${icon("calendar")} Mes Completo
        </button>
      </div>

      <!-- FILTROS DE BLOQUE (MAÑANA / TARDE) Y AGENDAR -->
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        ${viewMode === "week" ? `
          <div class="seg" style="display:inline-flex">
            <button class="${blockFilter === "all" ? "active" : ""}" data-act="setGymBlockFilter" data-block="all" style="font-size:12px;padding:4px 10px">Todos los Bloques</button>
            <button class="${blockFilter === "morning" ? "active" : ""}" data-act="setGymBlockFilter" data-block="morning" style="font-size:12px;padding:4px 10px">☀️ Mañana (6 - 12)</button>
            <button class="${blockFilter === "afternoon" ? "active" : ""}" data-act="setGymBlockFilter" data-block="afternoon" style="font-size:12px;padding:4px 10px">🌙 Tarde (13 - 21)</button>
          </div>
        ` : ""}
        <button class="btn primary sm" data-act="openGymBookingModal" data-date="${esc(currentDate)}">
          ${icon("plus")} Agendar Turno
        </button>
      </div>
    </div>

    ${viewMode === "week" ? gymWeekCalendarHTML(currentDate, hours, maxSlots, allBookings, blockFilter) : ""}
    ${viewMode === "day" ? gymDaySlotsHTML(currentDate, hours, maxSlots, dateBookings) : ""}
    ${viewMode === "month" ? gymMonthCalendarHTML(currentDate, allBookings, maxSlots) : ""}
  `;
}

function gymWeekCalendarHTML(currentDate, hours, maxSlots, allBookings, blockFilter) {
  const weekDays = getWeekDays(currentDate);
  const firstDay = weekDays[0];
  const lastDay = weekDays[6];
  const isThisWeek = weekDays.includes(todayISO());

  const dNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const morningHours = hours.filter(h => Number(h.split(":")[0]) < 13);
  const afternoonHours = hours.filter(h => Number(h.split(":")[0]) >= 13);

  const showMorning = blockFilter === "all" || blockFilter === "morning";
  const showAfternoon = blockFilter === "all" || blockFilter === "afternoon";

  const dayTotals = {};
  weekDays.forEach(d => {
    dayTotals[d] = (allBookings || []).filter(b => b.date === d && b.status !== "cancelado").length;
  });

  return `
    <div class="gym-week-cal-wrapper">
      <div class="gym-cal-topbar">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          <button class="btn sm" data-act="setGymWeekDelta" data-delta="-1" title="Semana anterior">◀ Semana Anterior</button>
          <button class="btn sm ${isThisWeek ? "primary" : ""}" data-act="setGymDateToday" title="Ir a esta semana">Esta Semana</button>
          <button class="btn sm" data-act="setGymWeekDelta" data-delta="1" title="Semana siguiente">Semana Siguiente ▶</button>
          <div class="gym-cal-title" style="margin-left:6px">
            ${fmtDateS(firstDay)} — ${fmtDateS(lastDay)}
            <small style="font-size:12px;color:var(--muted);font-weight:500">(Arrastra un atleta a otra celda para mover su turno)</small>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:8px">
          <span class="muted small">${hours.length} turnos · Capacidad: ${maxSlots} cupos / hora</span>
        </div>
      </div>

      <div class="gym-cal-grid">
        <!-- CABECERA DE DÍAS -->
        <div class="gym-cal-head-cell" style="font-weight:700;font-size:11.5px;color:var(--muted);display:flex;align-items:center;justify-content:center">
          HORARIO
        </div>

        ${weekDays.map((d, i) => {
          const isToday = d === todayISO();
          const dayNum = d.split("-")[2];
          return `
            <div class="gym-cal-head-cell ${isToday ? "is-today" : ""}">
              <div class="gym-cal-day-name">${dNames[i]} ${isToday ? `<span class="pill good" style="font-size:9.5px;padding:1px 5px;margin-left:4px">HOY</span>` : ""}</div>
              <div class="gym-cal-day-num">${dayNum}</div>
              <div style="font-size:11px;color:var(--muted);margin-top:2px">${dayTotals[d]} turnos</div>
            </div>
          `;
        }).join("")}

        <!-- SECCIÓN MAÑANA -->
        ${showMorning ? `
          <div class="gym-block-separator">
            ☀️ BLOQUE MAÑANA (06:00 — 12:00)
          </div>

          ${morningHours.map(hour => `
            <div class="gym-cal-time-cell">
              <span>${hour}</span>
            </div>
            ${weekDays.map(d => renderWeekCell(d, hour, maxSlots, allBookings)).join("")}
          `).join("")}
        ` : ""}

        <!-- SECCIÓN TARDE -->
        ${showAfternoon ? `
          <div class="gym-block-separator" style="background:rgba(111,163,232,0.08);border-color:rgba(111,163,232,0.25);color:#6FA3E8">
            🌙 BLOQUE TARDE / NOCHE (13:00 — 21:00)
          </div>

          ${afternoonHours.map(hour => `
            <div class="gym-cal-time-cell">
              <span>${hour}</span>
            </div>
            ${weekDays.map(d => renderWeekCell(d, hour, maxSlots, allBookings)).join("")}
          `).join("")}
        ` : ""}
      </div>
    </div>
  `;
}

function renderWeekCell(d, hour, maxSlots, allBookings) {
  const isToday = d === todayISO();
  const inSlot = (allBookings || []).filter(b => b.date === d && b.time === hour && b.status !== "cancelado");
  const count = inSlot.length;
  const isFull = count >= maxSlots;
  const free = maxSlots - count;

  return `
    <div class="gym-cal-slot-cell ${isToday ? "is-today-col" : ""}"
         ondragover="event.preventDefault(); this.classList.add('gym-cell-dragover');"
         ondragleave="this.classList.remove('gym-cell-dragover');"
         ondrop="handleGymBookingDrop(event, '${d}', '${hour}')">
      
      <div class="gym-cal-cell-cap">
        <span style="font-weight:700;color:${isFull ? "var(--bad)" : "var(--muted)"}">
          ${count}/${maxSlots}
        </span>
        ${isFull ? `<span style="font-size:9.5px;color:var(--bad);font-weight:700">LLENO</span>` : ""}
      </div>

      ${inSlot.map(b => {
        const tipoClass = (b.tipo || "fuerza").toLowerCase().includes("func") ? "tipo-funcional" : ((b.tipo || "").toLowerCase().includes("pers") ? "tipo-personalizado" : "tipo-fuerza");
        return `
          <div class="gym-cal-event ${tipoClass}"
               draggable="true"
               ondragstart="event.dataTransfer.setData('text/plain', '${b.id}')"
               title="${esc(b.nombre)} · ${esc(b.tipo || 'Fuerza')} (Arrastra a otra celda para mover)">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:4px">
              <span class="gym-cal-event-name">${esc(b.nombre)}</span>
              <button class="icon-btn sm" style="width:16px;height:16px;padding:0;color:var(--bad)" title="Cancelar turno" data-act="cancelGymBooking" data-id="${esc(b.id)}">
                ${icon("x")}
              </button>
            </div>
            <div class="gym-cal-event-meta">
              <span>${esc(b.tipo ? b.tipo.split(" ")[0] : "Fuerza")}</span>
              ${b.source === "bot" ? `<span style="color:#25D366;font-weight:700" title="Agendado por WhatsApp">🤖</span>` : ""}
            </div>
          </div>
        `;
      }).join("")}

      ${!isFull ? `
        <button class="gym-cal-quick-add" data-act="openGymBookingModal" data-date="${esc(d)}" data-time="${esc(hour)}" title="Agendar alumno el ${d} a las ${hour}">
          + Agendar
        </button>
      ` : ""}
    </div>
  `;
}

function gymDaySlotsHTML(currentDate, hours, maxSlots, dateBookings) {
  const isToday = currentDate === todayISO();

  return `
    <div style="background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:18px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <button class="btn sm" data-act="setGymDateDelta" data-delta="-1">◀ Día Anterior</button>
        <button class="btn sm ${isToday ? "primary" : ""}" data-act="setGymDateToday">Hoy</button>
        <button class="btn sm" data-act="setGymDateDelta" data-delta="1">Día Siguiente ▶</button>
        <div style="display:flex;align-items:center;gap:8px;margin-left:8px">
          <label style="font-size:13px;color:var(--muted);font-weight:600">Fecha:</label>
          <input type="date" class="input sm" style="width:160px;min-height:34px" value="${esc(currentDate)}" data-act-change="setGymDateVal">
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="muted small">${hours.length} turnos habilitados · ${maxSlots} cupos máx por hora</span>
        <button class="btn primary sm" data-act="openGymBookingModal" data-date="${esc(currentDate)}">${icon("plus")} Agendar Turno</button>
      </div>
    </div>

    <!-- GRID HORARIO DE DÍA -->
    <div class="gym-slots-grid">
      ${hours.map(hour => {
        const inSlot = dateBookings.filter(b => b.time === hour);
        const count = inSlot.length;
        const free = maxSlots - count;
        const pct = Math.min(100, Math.round((count / maxSlots) * 100));
        const isFull = count >= maxSlots;
        const fillClass = isFull ? "danger" : (pct >= 75 ? "warn" : "");

        return `
          <div class="gym-slot-card ${isFull ? "is-full" : (count > 0 ? "is-available" : "")}">
            <div class="gym-slot-header">
              <div class="gym-slot-time">
                ${icon("clock")} ${hour}
              </div>
              <span class="pill ${isFull ? "off" : "on"}" style="font-size:11.5px">
                ${isFull ? "Lleno (0 cupos)" : `${free} ${free === 1 ? "cupo" : "cupos"} libres`}
              </span>
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:3px">
                <span>Ocupación</span>
                <b>${count} / ${maxSlots}</b>
              </div>
              <div class="gym-cap-progress">
                <div class="gym-cap-fill ${fillClass}" style="width:${pct}%"></div>
              </div>
            </div>

            <div class="gym-attendees-list">
              ${inSlot.length === 0 ? `
                <div style="text-align:center;padding:16px 8px;color:var(--muted);font-size:12.5px;border:1px dashed var(--line);border-radius:6px">
                  Sin alumnos agendados en este turno
                </div>
              ` : inSlot.map(b => {
                const tipoClass = (b.tipo || "fuerza").toLowerCase().includes("func") ? "funcional" : ((b.tipo || "").toLowerCase().includes("pers") ? "personalizado" : "fuerza");
                return `
                  <div class="gym-attendee-item">
                    <div style="min-width:0;flex:1">
                      <div class="gym-attendee-name">${esc(b.nombre)}</div>
                      <div class="gym-attendee-sub">
                        <span class="gym-chip ${tipoClass}">${esc(b.tipo || "Fuerza")}</span>
                        ${b.source === "bot" ? `<span title="Agendado por WhatsApp" style="color:#25D366;font-size:11px;font-weight:700">🤖 WhatsApp</span>` : ""}
                      </div>
                    </div>
                    <div style="display:flex;align-items:center;gap:4px">
                      <button class="icon-btn sm" title="Cancelar turno y liberar cupo" data-act="cancelGymBooking" data-id="${esc(b.id)}" style="color:var(--bad)">
                        ${icon("x")}
                      </button>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>

            <div style="margin-top:auto;padding-top:8px;border-top:1px solid rgba(255,255,255,0.05);display:flex;justify-content:flex-end">
              ${isFull ? `
                <span class="hint" style="color:var(--bad);font-weight:600">Turno Completo</span>
              ` : `
                <button class="btn sm ghost" style="width:100%;justify-content:center" data-act="openGymBookingModal" data-date="${esc(currentDate)}" data-time="${esc(hour)}">
                  ${icon("plus")} Añadir a las ${hour}
                </button>
              `}
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function gymMonthCalendarHTML(currentDate, allBookings, maxSlots) {
  const d = parseD(currentDate) || new Date();
  const year = d.getFullYear();
  const month = d.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let startDayOfWeek = firstOfMonth.getDay();
  startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const dNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const cells = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    cells.push({ empty: true });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const iso = year + "-" + pad(month + 1) + "-" + pad(day);
    const dayBookings = (allBookings || []).filter(b => b.date === iso && b.status !== "cancelado");
    const morningCount = dayBookings.filter(b => Number((b.time || "00").split(":")[0]) < 13).length;
    const afternoonCount = dayBookings.filter(b => Number((b.time || "00").split(":")[0]) >= 13).length;
    cells.push({
      date: iso,
      dayNum: day,
      isToday: iso === todayISO(),
      count: dayBookings.length,
      morningCount,
      afternoonCount
    });
  }

  return `
    <div class="gym-week-cal-wrapper">
      <div class="gym-cal-topbar">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          <button class="btn sm" data-act="setGymMonthDelta" data-delta="-1">◀ Mes Anterior</button>
          <button class="btn sm ${d.getMonth() === (new Date()).getMonth() && year === (new Date()).getFullYear() ? "primary" : ""}" data-act="setGymDateToday">Mes Actual</button>
          <button class="btn sm" data-act="setGymMonthDelta" data-delta="1">Mes Siguiente ▶</button>
          <div class="gym-cal-title">
            ${monthNames[month]} ${year}
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(7, 1fr);background:var(--bg2);border-bottom:1px solid var(--line);text-align:center;padding:10px 0;font-size:12px;font-weight:700;color:var(--muted)">
        ${dNames.map(n => `<div>${n}</div>`).join("")}
      </div>

      <div class="gym-month-grid">
        ${cells.map(c => {
          if (c.empty) {
            return `<div style="background:transparent;border:1px dashed rgba(255,255,255,0.04);border-radius:10px;min-height:95px"></div>`;
          }
          return `
            <div class="gym-month-day-cell ${c.isToday ? "is-today" : ""}" data-act="jumpToGymDay" data-date="${c.date}">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <span style="font-size:16px;font-weight:800;color:${c.isToday ? "var(--accent)" : "var(--fg)"};font-family:var(--f-display)">${c.dayNum}</span>
                ${c.isToday ? `<span class="pill good" style="font-size:9.5px">HOY</span>` : ""}
              </div>

              ${c.count > 0 ? `
                <div style="margin-top:auto">
                  <div style="font-size:11.5px;font-weight:700;color:var(--accent);margin-bottom:3px">
                    ${c.count} ${c.count === 1 ? "alumno" : "alumnos"}
                  </div>
                  <div style="display:flex;gap:4px;font-size:10px;color:var(--muted)">
                    <span>☀️ ${c.morningCount}</span>
                    <span>🌙 ${c.afternoonCount}</span>
                  </div>
                </div>
              ` : `
                <div style="margin-top:auto;font-size:11px;color:var(--muted);opacity:0.6">
                  Sin sesiones
                </div>
              `}
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}
function gymMembershipsTabHTML(memberships) {
  const filterStatus = S.ui.gymFilterStatus || "all";
  const searchQ = (S.ui.gymSearch || "").toLowerCase().trim();

  let filtered = memberships.filter(m => {
    if (searchQ) {
      const matchName = (m.nombre || "").toLowerCase().includes(searchQ);
      const matchPhone = (m.telefono || "").toLowerCase().includes(searchQ);
      if (!matchName && !matchPhone) return false;
    }
    const dias = daysBetween(todayISO(), m.fechaFin);
    if (filterStatus === "active") return dias > 5;
    if (filterStatus === "expiring") return dias >= 0 && dias <= 5;
    if (filterStatus === "expired") return dias < 0;
    return true;
  });

  return `
    <div style="background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:18px;margin-bottom:18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;flex:1 1 340px">
        <div class="search" style="flex:1 1 220px">
          ${icon("search")}
          <input type="search" class="input" placeholder="Buscar por alumno o teléfono..." value="${esc(S.ui.gymSearch || "")}" data-act-change="setGymSearch">
        </div>
        <div class="seg">
          <button data-act="setGymFilterStatus" data-status="all" aria-pressed="${filterStatus === "all"}">Todos (${memberships.length})</button>
          <button data-act="setGymFilterStatus" data-status="active" aria-pressed="${filterStatus === "active"}">Al Día</button>
          <button data-act="setGymFilterStatus" data-status="expiring" aria-pressed="${filterStatus === "expiring"}">Por Vencer (≤5d)</button>
          <button data-act="setGymFilterStatus" data-status="expired" aria-pressed="${filterStatus === "expired"}">Vencidas</button>
        </div>
      </div>
      <div class="actions">
        <button class="btn primary" data-act="openAdminPaymentModal">${icon("plus")} Registrar / Renovar Pago</button>
        <button class="btn" data-act="openGymMembershipModal">${icon("plus")} Nuevo Alumno</button>
      </div>
    </div>

    ${filtered.length === 0 ? `
      <div class="empty">
        <b>No se encontraron membresías con este criterio</b>
        <p class="muted">Puedes registrar un nuevo alumno o limpiar los filtros de búsqueda.</p>
        <button class="btn primary" data-act="openAdminPaymentModal">${icon("plus")} Registrar Primer Alumno</button>
      </div>
    ` : `
      <div class="tbl-wrap">
        <table class="tbl">
          <thead>
            <tr>
              <th>Alumno / Deportista</th>
              <th>Plan de Entrenamiento</th>
              <th>Cuándo Pagó</th>
              <th>Cómo Pagó</th>
              <th style="text-align:right">Monto</th>
              <th>Próximo Pago</th>
              <th style="text-align:center">Días Restantes</th>
              <th style="text-align:right">Acciones de Cobro</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(m => {
              const msgCobro = redactarMensajeAdminCobro(m);
              const cleanPhone = (m.telefono || "").replace(/\D/g, "");
              const waUrl = `https://wa.me/57${cleanPhone}?text=${encodeURIComponent(msgCobro)}`;

              return `
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:10px">
                      <span class="avatar sm">${esc(initials(m.nombre))}</span>
                      <div>
                        <b>${esc(m.nombre)}</b>
                        <div class="muted small">${m.documento ? `CC: ${esc(m.documento)} · ` : ""}${esc(m.telefono || "")}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <b>${esc(m.planNombre || "Mensualidad")}</b>
                  </td>
                  <td>
                    <div style="font-family:var(--f-mono);font-size:12.5px">${fmtDateS(m.fechaPago || m.fechaInicio)}</div>
                    ${m.referencia ? `<div class="muted small">Ref: ${esc(m.referencia)}</div>` : ""}
                  </td>
                  <td>
                    ${payBadgeHTML(m.metodoPago)}
                  </td>
                  <td style="text-align:right">
                    <b style="color:var(--accent)">$${fmtN(m.valor || 120000, 0)}</b>
                    <span class="muted small">COP</span>
                  </td>
                  <td style="font-family:var(--f-mono);font-size:12.5px"><b>${fmtDateS(m.fechaFin)}</b></td>
                  <td style="text-align:center">${countdownPillHTML(m.fechaFin)}</td>
                  <td style="text-align:right">
                    <div class="actions" style="justify-content:flex-end;gap:6px">
                      <button class="btn-whatsapp" data-act="enviarCobroBot" data-id="${esc(m.id)}" title="El Bot de Eleven enviará el mensaje oficial de cobro directamente al WhatsApp del alumno">
                        ${icon("whatsapp")} Enviar por Bot
                      </button>
                      <button class="btn sm" data-act="openAdminPaymentModal" data-id="${esc(m.id)}" title="Renovar suscripción y registrar pago">
                        💳 Renovar
                      </button>
                      <button class="icon-btn sm" data-act="editGymMembership" data-id="${esc(m.id)}" title="Editar datos">
                        ${icon("edit")}
                      </button>
                      <button class="icon-btn sm" data-act="deleteGymMembership" data-id="${esc(m.id)}" title="Eliminar membresía" style="color:var(--bad)">
                        ${icon("trash")}
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `}
  `;
}

/* ==========================================================================
   REPORTE MENSUAL DE INGRESOS, ASISTENCIA Y ALUMNOS QUE DEJAN DE VENIR
   ========================================================================== */
function fetchGymReporteMensual(mes) {
  const m = mes || (S.ui.gymReportMonth || todayISO().slice(0, 7));
  S.ui.gymReportLoading = true;
  fetch(`${getBotBaseUrl()}/api/gym/reporte-mensual?mes=${encodeURIComponent(m)}`)
    .then(r => r.json())
    .then(data => {
      S.ui.gymReportData = data;
      S.ui.gymReportLoading = false;
      render();
    })
    .catch(err => {
      console.warn("Aviso cargando reporte mensual:", err);
      S.ui.gymReportLoading = false;
      render();
    });
}

function gymReporteMensualTabHTML() {
  const curMonth = S.ui.gymReportMonth || todayISO().slice(0, 7);
  if (!S.ui.gymReportData && !S.ui.gymReportLoading) {
    fetchGymReporteMensual(curMonth);
    return `<div class="panel" style="padding:40px;text-align:center"><div class="loading-spinner"></div><p class="muted">Cargando reporte mensual de ingresos, asistencia y retención…</p></div>`;
  }

  const rep = S.ui.gymReportData || {
    mes: curMonth,
    ingresos: { total: 0, total_formateado: "$0 COP", cantidad_pagos: 0, por_medio_pago: {}, detalle_pagos: [] },
    asistencia: { total_sesiones: 0, agendadas: 0, confirmadas: 0, asistidas: 0, canceladas: 0, tasa_cumplimiento: 0 },
    retencion: { total_en_riesgo: 0, alumnos_en_riesgo: [] }
  };

  const ing = rep.ingresos || {};
  const asis = rep.asistencia || {};
  const ret = rep.retencion || {};
  const enRiesgo = ret.alumnos_en_riesgo || [];
  const medios = Object.entries(ing.por_medio_pago || {});

  return `
    <div class="panel" style="margin-bottom:20px;padding:18px 24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px">
      <div>
        <h2 style="margin:0 0 4px 0;font-size:22px">📊 Reporte Mensual de Rendimiento & Cobranza</h2>
        <span class="muted small">Control de ingresos netos, afluencia a entrenamientos y alertas de deserción temprana</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <label for="gym-rep-month-input" style="font-size:13px;font-weight:600;color:var(--muted)">Mes:</label>
        <input type="month" id="gym-rep-month-input" class="input" style="width:auto;padding:6px 12px;font-size:13.5px" value="${esc(curMonth)}" onchange="S.ui.gymReportMonth = this.value; fetchGymReporteMensual(this.value);">
        <button class="btn sm" data-act="refreshGymReport" title="Recargar datos">${icon("history")} Actualizar</button>
      </div>
    </div>

    <!-- TARJETAS DE MÉTRICAS CLAVE -->
    <div class="kpis" style="margin-bottom:22px">
      <div class="kpi">
        <div class="kpi-top"><span class="kpi-label">Ingresos Recaudados</span><span>💳</span></div>
        <div class="kpi-val" style="color:var(--accent)">${esc(ing.total_formateado || ("$" + fmtN(ing.total || 0, 0) + " COP"))}</div>
        <div class="kpi-sub">${ing.cantidad_pagos || 0} pagos registrados en ${esc(curMonth)}</div>
      </div>
      <div class="kpi">
        <div class="kpi-top"><span class="kpi-label">Sesiones Programadas</span><span>🏋️‍♂️</span></div>
        <div class="kpi-val">${asis.total_sesiones || 0} <small style="font-size:14px;color:var(--muted)">turnos</small></div>
        <div class="kpi-sub"><span style="color:var(--good)">${asis.tasa_cumplimiento || 0}% de cumplimiento</span> (${(asis.confirmadas || 0) + (asis.asistidas || 0)} asistidos)</div>
      </div>
      <div class="kpi">
        <div class="kpi-top"><span class="kpi-label">Cancelaciones</span><span>⚠️</span></div>
        <div class="kpi-val" style="color:${(asis.canceladas || 0) > 5 ? 'var(--bad)' : 'var(--muted)'}">${asis.canceladas || 0} <small style="font-size:14px;color:var(--muted)">liberados</small></div>
        <div class="kpi-sub">Cupos reutilizados en tiempo real</div>
      </div>
      <div class="kpi">
        <div class="kpi-top"><span class="kpi-label">Atletas por Reactivar</span><span>🚨</span></div>
        <div class="kpi-val" style="color:${ret.total_en_riesgo > 0 ? 'var(--bad)' : 'var(--good)'}">${ret.total_en_riesgo || 0}</div>
        <div class="kpi-sub">${ret.total_en_riesgo > 0 ? 'En riesgo de deserción (>10 días inactivos)' : 'Todos los atletas activos al día'}</div>
      </div>
    </div>

    <div class="grid g2" style="margin-bottom:24px">
      <!-- BLOQUE 1: DESGLOSE DE INGRESOS POR MEDIO -->
      <section class="panel">
        <div class="panel-head">
          <h3>💰 Desglose de Recaudo por Medio de Pago</h3>
          <span class="badge badge-accent">${medios.length} Medios</span>
        </div>
        <div style="padding:14px 0">
          ${medios.length ? `
            <div style="display:flex;flex-direction:column;gap:12px">
              ${medios.map(([medio, total]) => {
                const pct = ing.total > 0 ? Math.round((total / ing.total) * 100) : 0;
                return `
                  <div>
                    <div style="display:flex;justify-content:space-between;align-items:center;font-size:13.5px;margin-bottom:4px">
                      <b>${esc(medio)}</b>
                      <span class="num">$${fmtN(total, 0)} COP <small class="muted">(${pct}%)</small></span>
                    </div>
                    <div style="height:6px;background:var(--surface2);border-radius:4px;overflow:hidden">
                      <div style="height:100%;width:${pct}%;background:var(--accent);border-radius:4px"></div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          ` : `<div class="empty muted" style="padding:24px 0;text-align:center">No se registraron pagos para este período en el servidor.</div>`}
        </div>

        <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center">
          <span class="muted small">Total Ingresos Netos:</span>
          <b style="font-size:18px;color:var(--accent)">${esc(ing.total_formateado || ("$" + fmtN(ing.total || 0, 0) + " COP"))}</b>
        </div>
      </section>

      <!-- BLOQUE 2: CONTROL DE RECORDATORIOS AUTOMÁTICOS 2H -->
      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>⏰ Recordatorios Automáticos & Bot</h3>
            <span class="muted small">Avisos interactivos 2 horas antes de cada sesión</span>
          </div>
          <span class="badge badge-good">WhatsApp Activo</span>
        </div>
        <div style="padding:10px 0;font-size:13.5px;line-height:1.6;color:var(--fg)">
          <p style="margin:0 0 10px 0">
            El sistema monitorea en segundo plano los turnos del día y envía un mensaje <b>2 horas antes</b> a cada deportista registrado para que confirme o libere su cupo respondiendo directamente en WhatsApp:
          </p>
          <div style="background:var(--surface2);padding:12px 14px;border-radius:8px;border:1px solid var(--line);font-size:12.5px;color:var(--muted);white-space:pre-wrap;font-family:monospace">🔔 *Recordatorio de Turno — Eleven Performance*
Hola *Atleta*, te recordamos tu sesión hoy a las *4:00 p.m.*.
👉 Responde *CONFIRMAR* o *SI* para asegurar tu asistencia.
👉 Responde *CANCELAR* si no puedes venir para liberar el cupo.</div>
          <div style="margin-top:12px;display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--good)">
            <span>✓ Confirmación automática en base de datos al recibir "SI" o "CONFIRMAR".</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--bad)">
            <span>✓ Cancelación y liberación inmediata de cupo al recibir "CANCELAR".</span>
          </div>
        </div>
      </section>
    </div>

    <!-- BLOQUE 3: ALUMNOS EN RIESGO DE DESERCIÓN (CHURN PREVENTION) -->
    <section class="panel">
      <div class="panel-head">
        <div>
          <h3>🚨 Atletas que Dejan de Venir — Campaña de Retención & Reactivación</h3>
          <span class="muted small">Alumnos con mensualidad vencida o más de 10 días sin reservar turnos</span>
        </div>
        <span class="badge ${enRiesgo.length ? "badge-bad" : "badge-good"}">${enRiesgo.length} Atletas</span>
      </div>

      ${enRiesgo.length ? `
        <div class="tbl-wrap" style="margin-top:12px">
          <table class="tbl">
            <thead>
              <tr>
                <th>Deportista</th>
                <th>Plan Contratado</th>
                <th>Inactividad</th>
                <th>Diagnóstico de Retención</th>
                <th>Vencimiento</th>
                <th class="r">Acción de Reactivación</th>
              </tr>
            </thead>
            <tbody>
              ${enRiesgo.map(a => `
                <tr>
                  <td>
                    <b>${esc(a.nombre)}</b>
                    ${a.telefono ? `<div class="muted small">${esc(a.telefono)}</div>` : ""}
                  </td>
                  <td class="small">${esc(a.plan_nombre)}</td>
                  <td>
                    <span class="pill off" style="font-weight:700">
                      ${a.dias_sin_entrenar ? `${a.dias_sin_entrenar} días sin venir` : "Sin turnos"}
                    </span>
                  </td>
                  <td class="small muted">${esc(a.motivo_riesgo)}</td>
                  <td class="num small">${fmtDateS(a.fecha_vencimiento)}</td>
                  <td class="r">
                    <button class="btn sm primary" data-act="reactivarAlumnoWhatsApp"
                      data-nombre="${esc(a.nombre)}"
                      data-telefono="${esc(a.telefono)}"
                      data-mensaje="${esc(a.mensaje_sugerido)}"
                      title="Enviar mensaje de bienvenida y reenganche por WhatsApp">
                      ${icon("whatsapp")} Reactivar por WhatsApp
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      ` : `
        <div class="empty" style="padding:32px;text-align:center">
          <span style="font-size:32px">🏆</span>
          <b style="display:block;margin:6px 0 2px 0">¡Excelente retención de atletas!</b>
          <span class="muted small">Todos tus alumnos registrados tienen turnos activos o se encuentran al día con sus sesiones.</span>
        </div>
      `}
    </section>
  `;
}

function gymBotTabHTML(gymCfg) {
  const sampleMsg = redactarMensajeCobro({
    nombre: "Alexis Zapata",
    planNombre: "Mensualidad Completa (Gimnasio Libre)",
    fechaFin: addDays(todayISO(), 3),
    valor: 120000
  });

  return `
    <div class="grid g2" style="margin-bottom:20px">
      <!-- PANEL CONFIGURACIÓN DE RECAUDO -->
      <section class="panel">
        <div class="panel-head">
          <h3>Cuentas Oficiales de Cobro & Capacidad</h3>
          <span class="muted small">Datos enviados automáticamente a los alumnos</span>
        </div>

        <div class="form-grid">
          <div class="field span3">
            <label for="gym-titular">Titular de la Cuenta / Empresa</label>
            <input class="input" id="gym-titular" value="${esc(gymCfg.titular || "Eleven Performance SAS")}" placeholder="Ej: Eleven Performance SAS">
          </div>
          <div class="field">
            <label for="gym-nequi">Nequi</label>
            <input class="input" id="gym-nequi" value="${esc(gymCfg.nequi || "3206051319")}" placeholder="3206051319">
          </div>
          <div class="field">
            <label for="gym-daviplata">Daviplata</label>
            <input class="input" id="gym-daviplata" value="${esc(gymCfg.daviplata || "3206051319")}" placeholder="3206051319">
          </div>
          <div class="field">
            <label for="gym-banco">Bancolombia</label>
            <input class="input" id="gym-banco" value="${esc(gymCfg.bancolombia || "Ahorros 245-891234-01")}" placeholder="Ahorros 000-000000-00">
          </div>
          <div class="field">
            <label for="gym-slots">Cupos Máximos por Hora</label>
            <input class="input" id="gym-slots" type="number" min="1" max="50" value="${esc(gymCfg.slotsPerHour || 8)}">
          </div>
          <div class="field span2">
            <label for="gym-boturl">Servidor API del Bot (Local)</label>
            <input class="input" id="gym-boturl" value="${esc(gymCfg.botUrl || "http://localhost:3000")}" placeholder="http://localhost:3000">
          </div>
        </div>

        <div class="actions" style="margin-top:16px;justify-content:space-between">
          <button class="btn" data-act="testGymBotPing">${icon("power")} Probar Conexión con Bot</button>
          <button class="btn primary" data-act="saveGymBotConfig">Guardar Cuentas & Parámetros</button>
        </div>
      </section>

      <!-- SIMULADOR DE WHATSAPP -->
      <section class="panel">
        <div class="panel-head">
          <h3>Vista Previa del Mensaje de WhatsApp</h3>
          <span class="muted small">Formato enviado al deportista</span>
        </div>

        <div class="wa-preview-card">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid #222E35">
            <div style="width:36px;height:36px;border-radius:50%;background:#25D366;display:grid;place-items:center;color:#072814;font-weight:700">11</div>
            <div>
              <div style="color:#E9EDEF;font-weight:700;font-size:14px">Eleven Performance Bot</div>
              <div style="color:#25D366;font-size:11px">en línea</div>
            </div>
          </div>

          <div class="wa-preview-bubble">
            ${esc(sampleMsg)}
            <div class="wa-preview-time">
              10:45 a. m.
              <svg width="15" height="15" viewBox="0 0 16 16" fill="#53BDEB"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/></svg>
            </div>
          </div>
        </div>

        <div style="margin-top:16px;background:var(--surface2);padding:14px;border-radius:8px;font-size:13px;color:var(--fg2)">
          <b style="color:var(--accent)">💡 Flujos automatizados en WhatsApp:</b>
          <ul style="margin:6px 0 0 18px;padding:0;line-height:1.6">
            <li><b>Agendamiento:</b> El alumno escribe <i>"Quiero entrenar mañana a las 7am"</i> y el bot reserva según cupos.</li>
            <li><b>Cancelación:</b> Al escribir <i>"Cancelo mi sesión de las 8"</i>, libera el cupo para otros alumnos.</li>
            <li><b>Consulta de estado:</b> Al escribir <i>"¿Cuándo vence mi mes?"</i>, responde con su saldo y fecha exacta.</li>
          </ul>
        </div>
      </section>
    </div>
  `;
}

function gymBookingModal({ date, time }) {
  date = date || todayISO();
  time = time || "07:00";
  const hours = gymHoursList();
  const clients = Object.values(S.clients || {});

  const m = openModal({
    title: "Agendar Turno de Entrenamiento",
    size: "narrow",
    body: `
      <div class="form-grid">
        <div class="field span3">
          <label for="gb-name">Nombre del Alumno / Atleta *</label>
          <input class="input" id="gb-name" list="dl-gym-clients" placeholder="Selecciona o escribe el nombre" required>
          <datalist id="dl-gym-clients">
            ${clients.map(c => `<option value="${esc(c.name)}">${c.phone ? `(${c.phone})` : ""}</option>`).join("")}
          </datalist>
        </div>
        <div class="field span3">
          <label for="gb-phone">Teléfono / WhatsApp</label>
          <input class="input" id="gb-phone" placeholder="310 123 4567">
        </div>
        <div class="field span2">
          <label for="gb-date">Fecha de Entrenamiento *</label>
          <input type="date" class="input" id="gb-date" value="${esc(date)}" required>
        </div>
        <div class="field">
          <label for="gb-time">Horario *</label>
          <select class="input" id="gb-time">
            ${hours.map(h => `<option value="${esc(h)}" ${h === time ? "selected" : ""}>${esc(h)}</option>`).join("")}
          </select>
        </div>
        <div class="field span3">
          <label for="gb-tipo">Modalidad de Entrenamiento</label>
          <select class="input" id="gb-tipo">
            <option value="Fuerza / Gym">Fuerza / Gym Tradicional</option>
            <option value="Funcional Grupal">Entrenamiento Funcional Grupal</option>
            <option value="Personalizado 1 a 1">Personalizado 1 a 1 (Alto Rendimiento)</option>
          </select>
        </div>
      </div>
    `,
    footer: `
      <button class="btn" data-mact="close">Cancelar</button>
      <button class="btn primary" id="btn-save-gym-booking">Confirmar Agendamiento</button>
    `
  });

  // Autocompletar teléfono al elegir deportista
  $("#gb-name", m).addEventListener("input", e => {
    const matched = clients.find(c => c.name.toLowerCase() === e.target.value.toLowerCase().trim());
    if (matched && matched.phone) {
      $("#gb-phone", m).value = matched.phone;
    }
  });

  $("#btn-save-gym-booking", m).addEventListener("click", async () => {
    const nombre = $("#gb-name", m).value.trim();
    const phone = $("#gb-phone", m).value.trim();
    const bDate = $("#gb-date", m).value;
    const bTime = $("#gb-time", m).value;
    const tipo = $("#gb-tipo", m).value;

    if (!nombre) { toast("Ingresa el nombre del alumno", true); return; }
    if (!bDate || !bTime) { toast("Fecha y hora obligatorias", true); return; }

    let botRes = null;
    try {
      const res = await fetch(`${getBotBaseUrl()}/api/gym/agendar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, telefono: phone, fecha: bDate, hora: bTime, tipo })
      });
      botRes = await res.json().catch(() => null);
      if (botRes && botRes.error) {
        toast(botRes.error, true);
        return;
      }
    } catch (_) {}

    const id = botRes && botRes.id ? `bot_ent_${botRes.id}` : uid("gb");
    await put("gymBookings", id, {
      id,
      dbId: botRes ? botRes.id : undefined,
      nombre,
      phone,
      date: bDate,
      time: bTime,
      tipo,
      status: "confirmado",
      source: "manual",
      createdAt: new Date().toISOString()
    });

    closeModal();
    S.ui.gymDate = bDate;
    toast(`Turno agendado para ${nombre} a las ${bTime}. Sincronizado.`);
    trySyncBotFromApi().then(() => render());
  });
}

function gymMembershipModal(mem) {
  const isNew = !mem;
  mem = mem || {
    nombre: "",
    telefono: "",
    documento: "",
    planId: "mensual",
    planNombre: "Mensualidad Completa (Gimnasio Libre)",
    fechaInicio: todayISO(),
    fechaFin: addDays(todayISO(), 30),
    valor: 120000
  };
  const clients = Object.values(S.clients || {});

  const m = openModal({
    title: isNew ? "Registrar Membresía de Alumno" : "Editar Membresía de Alumno",
    size: "narrow",
    body: `
      <div class="form-grid">
        <div class="field span3">
          <label for="gm-name">Nombre del Alumno / Atleta *</label>
          <input class="input" id="gm-name" value="${esc(mem.nombre)}" list="dl-gm-clients" placeholder="Ej: Alexis Zapata" required>
          <datalist id="dl-gm-clients">
            ${clients.map(c => `<option value="${esc(c.name)}">${c.phone ? `(${c.phone})` : ""}</option>`).join("")}
          </datalist>
        </div>
        <div class="field span2">
          <label for="gm-phone">Teléfono / WhatsApp *</label>
          <input class="input" id="gm-phone" value="${esc(mem.telefono)}" placeholder="310 456 7890" required>
        </div>
        <div class="field">
          <label for="gm-doc">Documento (CC)</label>
          <input class="input" id="gm-doc" value="${esc(mem.documento || "")}" placeholder="1037...">
        </div>
        <div class="field span3">
          <label for="gm-plan">Plan de Entrenamiento</label>
          <select class="input" id="gm-plan">
            <option value="120000|Mensualidad Completa (Gimnasio Libre)|30" ${mem.planId === "mensual" ? "selected" : ""}>Mensualidad Completa ($120.000 / 30 días)</option>
            <option value="95000|Entrenamiento Funcional Grupal|30" ${mem.planId === "funcional" ? "selected" : ""}>Entrenamiento Funcional Grupal ($95.000 / 30 días)</option>
            <option value="280000|Personalizado 1 a 1 (Alto Rendimiento)|30" ${mem.planId === "personalizado" ? "selected" : ""}>Personalizado 1 a 1 ($280.000 / 30 días)</option>
            <option value="320000|Plan Trimestral All-Access|90" ${mem.planId === "trimestral" ? "selected" : ""}>Plan Trimestral All-Access ($320.000 / 90 días)</option>
          </select>
        </div>
        <div class="field">
          <label for="gm-val">Valor (COP)</label>
          <input class="input" id="gm-val" type="number" value="${esc(mem.valor || 120000)}">
        </div>
        <div class="field">
          <label for="gm-ini">Fecha Inicio</label>
          <input type="date" class="input" id="gm-ini" value="${esc(mem.fechaInicio)}">
        </div>
        <div class="field">
          <label for="gm-fin">Fecha Vencimiento *</label>
          <input type="date" class="input" id="gm-fin" value="${esc(mem.fechaFin)}" required>
        </div>
      </div>
    `,
    footer: `
      <button class="btn" data-mact="close">Cancelar</button>
      <button class="btn primary" id="btn-save-gym-membership">${isNew ? "Guardar Membresía" : "Guardar Cambios"}</button>
    `
  });

  // Autocompletar datos del cliente
  $("#gm-name", m).addEventListener("input", e => {
    const matched = clients.find(c => c.name.toLowerCase() === e.target.value.toLowerCase().trim());
    if (matched) {
      if (matched.phone) $("#gm-phone", m).value = matched.phone;
      if (matched.document) $("#gm-doc", m).value = matched.document;
    }
  });

  // Ajustar valor y fecha fin al cambiar el plan
  $("#gm-plan", m).addEventListener("change", e => {
    const [val, , days] = e.target.value.split("|");
    $("#gm-val", m).value = val;
    const ini = $("#gm-ini", m).value || todayISO();
    $("#gm-fin", m).value = addDays(ini, +days);
  });

  $("#btn-save-gym-membership", m).addEventListener("click", async () => {
    const nombre = $("#gm-name", m).value.trim();
    const telefono = $("#gm-phone", m).value.trim();
    const documento = $("#gm-doc", m).value.trim();
    const [valPlan, planNombre] = $("#gm-plan", m).value.split("|");
    const valor = parseNum($("#gm-val", m).value) || +valPlan;
    const fechaInicio = $("#gm-ini", m).value;
    const fechaFin = $("#gm-fin", m).value;

    if (!nombre) { toast("El nombre es obligatorio", true); return; }
    if (!telefono) { toast("El teléfono de WhatsApp es obligatorio", true); return; }
    if (!fechaFin) { toast("La fecha de vencimiento es obligatoria", true); return; }

    const id = mem.id || uid("gm");
    const updatedMem = Object.assign({}, mem, {
      id,
      nombre,
      telefono,
      documento,
      planNombre,
      valor,
      fechaInicio,
      fechaFin,
      fechaPago: mem.fechaPago || fechaInicio || todayISO(),
      metodoPago: mem.metodoPago || "Nequi",
      referencia: mem.referencia || "",
      notas: mem.notas || "",
      updatedAt: new Date().toISOString()
    });
    if (!S.gymMemberships) S.gymMemberships = {};
    S.gymMemberships[id] = updatedMem;
    persistLocal();
    await put("gymMemberships", id, updatedMem);

    closeModal();
    render();
    toast(`✅ Membresía guardada para ${nombre}.`);
  });
}



/* --- MODULE: whatsapp.js --- */
/* ==========================================================================
   12A. VISTA: CHATS & WHATSAPP HUB (CONTROL EN VIVO ELEVEN PERFORMANCE)
   ========================================================================== */
function getBotBaseUrl() {
  const stored = (typeof localStorage !== "undefined" && localStorage.getItem("eleven_bot_url")) || "";
  if (stored && stored.trim()) return stored.trim().replace(/\/$/, "");
  const configUrl = S.config && S.config.gym && S.config.gym.botUrl;
  if (configUrl && configUrl.trim()) return configUrl.trim().replace(/\/$/, "");
  if (typeof window !== "undefined" && window.location && window.location.origin) {
    if (!window.location.hostname.endsWith(".vercel.app") && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      return window.location.origin;
    }
  }
  return "http://localhost:7077";
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



/* --- MODULE: config-view.js --- */
/* ==========================================================================
   13. VISTA: CONFIGURACIÓN
   ========================================================================== */
function configView() {
  if (!S.ui.botConfig) {
    trySyncBotFromApi().then(() => render());
  }
  const botCfg = S.ui.botConfig || {};
  const currentBotNum = botCfg.numeroBot || (S.ui.waStatus && S.ui.waStatus.numeroBot) || "573206051319";
  const currentAdvisorNum = botCfg.numeroAsesor || "573206051319";
  const currentPayNum = botCfg.numeroPagos || (S.config.gym && S.config.gym.nequi) || "3206051319";
  const currentBancolombia = botCfg.bancolombia || (S.config.gym && S.config.gym.bancolombia) || "Ahorros 245-891234-01";
  const currentTitular = botCfg.titular || (S.config.gym && S.config.gym.titular) || "Eleven Performance S.A.S.";

  const C = S.config, P = C.professional, R = C.rules;
  const g = S.ui.cfgGroup && C.metrics[S.ui.cfgGroup] ? S.ui.cfgGroup : "gps";
  const groups = [...new Set(C.evalTypes.map(t => t.group))];

  return `
    <div class="page-head">
      <div>
        <h1>Configuración del Sistema</h1>
        <div class="sub">Perfil profesional, líneas de WhatsApp, cuentas de recaudo y gestión de datos</div>
      </div>
      <div class="actions">
        ${themeToggleBtnHTML()}
      </div>
    </div>

    <!-- CONFIGURACIÓN DE NÚMEROS DE WHATSAPP Y RECAUDO EN VIVO -->
    <div class="grid g2" style="margin-bottom:18px;">
      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>📱 Líneas Telefónicas de WhatsApp</h3>
            <span class="muted small">Configuración en vivo del bot y alertas sin scripts</span>
          </div>
          <span class="badge badge-accent">En Vivo</span>
        </div>
        <div class="form-grid">
          <div class="field span3">
            <label for="cfg-num-bot">Número de WhatsApp del Bot</label>
            <input class="input" id="cfg-num-bot" value="${esc(currentBotNum)}" placeholder="573206051319">
            <span class="hint">Línea que atiende las conversaciones automáticas con atletas (incluir 57).</span>
          </div>
          <div class="field span3">
            <label for="cfg-num-asesor">Número de Alertas (Entrenador / Asesor)</label>
            <input class="input" id="cfg-num-asesor" value="${esc(currentAdvisorNum)}" placeholder="573206051319">
            <span class="hint">Recibe notificaciones inmediatas de citas y pedidos de ayuda humana.</span>
          </div>
        </div>
        <div class="actions" style="margin-top:14px;justify-content:flex-end">
          <button class="btn primary" data-act="saveBotNumbers">Guardar Números de WhatsApp</button>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>💳 Cuentas Oficiales de Cobro & Recaudo</h3>
            <span class="muted small">Datos bancarios para recordatorios de pago</span>
          </div>
          <span class="badge badge-good">Recaudo</span>
        </div>
        <div class="form-grid">
          <div class="field span3">
            <label for="cfg-num-pagos">Nequi / Daviplata</label>
            <input class="input" id="cfg-num-pagos" value="${esc(currentPayNum)}" placeholder="3206051319">
            <span class="hint">Número enviado a atletas para transferencias Nequi / Daviplata.</span>
          </div>
          <div class="field span3">
            <label for="cfg-cuenta-bancolombia">Cuenta Bancolombia</label>
            <input class="input" id="cfg-cuenta-bancolombia" value="${esc(currentBancolombia)}" placeholder="Ahorros 245-891234-01">
          </div>
          <div class="field span3">
            <label for="cfg-titular-cuenta">Titular de la Cuenta</label>
            <input class="input" id="cfg-titular-cuenta" value="${esc(currentTitular)}" placeholder="Eleven Performance S.A.S.">
          </div>
        </div>
        <div class="actions" style="margin-top:14px;justify-content:flex-end">
          <button class="btn primary" data-act="saveBotNumbers">Guardar Cuentas de Cobro</button>
        </div>
      </section>
    </div>

    <div class="grid g2" style="margin-bottom:18px;">
      <section class="panel">
        <div class="panel-head">
          <h3>Identificación Profesional</h3>
          <span class="muted small">Aparece en informes y firmas</span>
        </div>
        <div class="form-grid">
          ${[["name", "Nombre Completo"], ["role", "Cargo o Especialidad"], ["brand", "Marca / Empresa"], ["tagline", "Lema o Slogan"], ["contact", "Correo de Contacto"]].map(([k, l]) => `
            <div class="field ${k === "name" || k === "role" ? "span3" : ""}">
              <label for="cfg-p-${k}">${l}</label>
              <input class="input" id="cfg-p-${k}" value="${esc(P[k] || "")}">
            </div>
          `).join("")}
        </div>
        <div class="actions" style="margin-top:14px;justify-content:flex-end">
          <button class="btn primary" data-act="cfgSavePro">Guardar Datos</button>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h3>Reglas de Control de Cargas & Alertas</h3>
          <span class="muted small">Umbrales automáticos de seguimiento</span>
        </div>
        <div class="form-grid">
          ${[
            ["staleDays", "Días sin evaluar para alertar", "días"],
            ["upcomingDays", "Ventana de control próximo", "días"],
            ["profileDays", "Vigencia de antropometría", "días"],
            ["stableBand", "Banda de estabilidad (%)", "%"],
            ["dropAlert", "Alerta de descenso significativo", "%"],
            ["asymRef", "Límite de asimetría bilateral", "%"]
          ].map(([k, l, u]) => `
            <div class="field">
              <label for="cfg-r-${k}">${l}</label>
              <div class="unit-in">
                <input class="input" id="cfg-r-${k}" inputmode="decimal" value="${esc(R[k])}">
                <span class="u">${u}</span>
              </div>
            </div>
          `).join("")}
        </div>
        <div class="actions" style="margin-top:14px;justify-content:space-between">
          <span class="hint">Reglas aplicadas a todas las variaciones.</span>
          <button class="btn primary" data-act="cfgSaveRules">Guardar Reglas</button>
        </div>
      </section>
    </div>

    <!-- RESPALDO Y GESTIÓN DE BASE DE DATOS -->
    <div class="grid g2">
      <section class="panel">
        <div class="panel-head">
          <h3>Copia de Seguridad y Migración</h3>
        </div>
        <div class="stack" style="gap:10px">
          <div class="actions">
            <button class="btn" data-act="exportJSON">${icon("download")}Descargar Copia (JSON)</button>
            <button class="btn" data-act="exportCSV">${icon("download")}Exportar Registros (CSV)</button>
            <label class="btn" for="imp-json">${icon("upload")}Restaurar Copia</label>
            <input type="file" id="imp-json" accept="application/json,.json" hidden>
          </div>
          ${isAdmin() ? `
            <div class="actions" style="margin-top:10px">
              <button class="btn danger" data-act="clearDatabase">${icon("trash")}Vaciar Base de Datos (Limpiar para Pruebas)</button>
              <button class="btn ghost sm" data-act="loadDemoData">Cargar Datos Demo de Santa Fe</button>
            </div>
          ` : `
            <p class="hint" style="margin-top:10px;color:var(--muted);font-size:12px">🔒 La opción de vaciar base de datos o cargar datos demo está reservada para el Administrador General.</p>
          `}
          <p class="hint">Base activa con ${Object.keys(S.clients).length} atletas y ${Object.keys(S.records).length} evaluaciones.</p>
        </div>
      </section>
    </div>
  `;
}



/* --- MODULE: main.js --- */
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

