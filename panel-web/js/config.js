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

