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

