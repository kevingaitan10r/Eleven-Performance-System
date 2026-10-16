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

