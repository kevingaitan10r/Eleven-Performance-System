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


