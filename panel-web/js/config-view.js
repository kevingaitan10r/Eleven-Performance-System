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

