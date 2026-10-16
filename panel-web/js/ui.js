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

