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


