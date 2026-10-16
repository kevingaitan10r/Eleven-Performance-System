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

