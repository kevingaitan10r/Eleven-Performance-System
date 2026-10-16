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

