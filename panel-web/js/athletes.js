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

