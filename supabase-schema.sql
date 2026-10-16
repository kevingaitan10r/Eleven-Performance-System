-- ============================================================================
-- ELEVEN PERFORMANCE HUB — SCHEMA COMPLETO PARA SUPABASE (POSTGRESQL)
-- ============================================================================

-- 1. TABLA: USUARIOS (Entrenadores y Administradores)
CREATE TABLE IF NOT EXISTS usuarios (
  id BIGSERIAL PRIMARY KEY,
  usuario VARCHAR(100) NOT NULL UNIQUE,
  nombre VARCHAR(150) NOT NULL,
  clave_hash TEXT NOT NULL,
  rol VARCHAR(50) NOT NULL DEFAULT 'empleado',
  activo SMALLINT NOT NULL DEFAULT 1,
  creado BIGINT
);

-- 2. TABLA: CHATS (Conversaciones de WhatsApp)
CREATE TABLE IF NOT EXISTS chats (
  id VARCHAR(100) PRIMARY KEY,
  nombre VARCHAR(150),
  telefono VARCHAR(50),
  bot_activo SMALLINT NOT NULL DEFAULT 1,
  pausa_hasta BIGINT,
  ultimo_mensaje BIGINT
);

-- 3. TABLA: MENSAJES (Historial de Conversación)
CREATE TABLE IF NOT EXISTS mensajes (
  id BIGSERIAL PRIMARY KEY,
  chat_id VARCHAR(100) NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
  autor VARCHAR(100) NOT NULL, -- 'cliente', 'bot', 'asesor:<nombre>'
  texto TEXT NOT NULL,
  fecha BIGINT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_mensajes_chat ON mensajes(chat_id, id);

-- 4. TABLA: ATLETAS / CLIENTES
CREATE TABLE IF NOT EXISTS clientes (
  chat_id VARCHAR(100) PRIMARY KEY,
  nombre VARCHAR(150),
  telefono VARCHAR(50),
  negocio VARCHAR(150),
  ciudad VARCHAR(100),
  correo VARCHAR(150),
  necesidad TEXT,
  plan_interes VARCHAR(150),
  estado VARCHAR(50) NOT NULL DEFAULT 'nuevo',
  notas TEXT,
  autoriza_datos SMALLINT DEFAULT 0,
  fecha_autorizacion BIGINT,
  metodo_pago VARCHAR(50),
  modalidad_contrato VARCHAR(50),
  creado BIGINT,
  actualizado BIGINT
);

-- 5. TABLA: MEMBRESÍAS Y PLANES DE GIMNASIO
CREATE TABLE IF NOT EXISTS membresias (
  id BIGSERIAL PRIMARY KEY,
  chat_id VARCHAR(100) NOT NULL UNIQUE,
  nombre_alumno VARCHAR(150),
  telefono VARCHAR(50),
  plan_nombre VARCHAR(150) NOT NULL DEFAULT 'Plan Pro Alto Rendimiento',
  valor NUMERIC(12, 2) NOT NULL DEFAULT 150000,
  fecha_pago VARCHAR(20),
  metodo_pago VARCHAR(50) DEFAULT 'Nequi',
  referencia_pago VARCHAR(100),
  fecha_inicio VARCHAR(20) NOT NULL,
  fecha_fin VARCHAR(20) NOT NULL,
  estado VARCHAR(50) NOT NULL DEFAULT 'activa',
  notas TEXT,
  creado BIGINT,
  actualizado BIGINT
);

-- 6. TABLA: ENTRENAMIENTOS / CITAS EN AGENDA
CREATE TABLE IF NOT EXISTS entrenamientos (
  id BIGSERIAL PRIMARY KEY,
  chat_id VARCHAR(100) NOT NULL,
  nombre_alumno VARCHAR(150),
  fecha VARCHAR(20) NOT NULL, -- YYYY-MM-DD
  hora VARCHAR(10) NOT NULL,  -- HH:MM
  tipo VARCHAR(100) NOT NULL DEFAULT 'Fuerza & Rendimiento',
  estado VARCHAR(50) NOT NULL DEFAULT 'agendada',
  motivo_cancelacion TEXT,
  recordatorio_enviado SMALLINT DEFAULT 0,
  confirmado SMALLINT DEFAULT 0,
  creado BIGINT,
  actualizado_en BIGINT
);
CREATE INDEX IF NOT EXISTS idx_entrenamientos_fecha ON entrenamientos(fecha, hora);

-- 7. TABLA: PAGOS FORMALES Y RECAUDO CONTABLE
CREATE TABLE IF NOT EXISTS pagos (
  id BIGSERIAL PRIMARY KEY,
  chat_id VARCHAR(100),
  nombre_alumno VARCHAR(150),
  telefono VARCHAR(50),
  plan_nombre VARCHAR(150),
  monto NUMERIC(12, 2) NOT NULL DEFAULT 120000,
  medio_pago VARCHAR(50) NOT NULL DEFAULT 'Nequi',
  referencia VARCHAR(100),
  fecha_pago VARCHAR(20) NOT NULL,
  fecha_inicio VARCHAR(20),
  fecha_vencimiento VARCHAR(20),
  notas TEXT,
  creado BIGINT
);
CREATE INDEX IF NOT EXISTS idx_pagos_fecha ON pagos(fecha_pago);

-- 8. TABLA: CONFIGURACIÓN GLOBAL DEL SISTEMA
CREATE TABLE IF NOT EXISTS configuracion (
  clave VARCHAR(100) PRIMARY KEY,
  valor TEXT NOT NULL
);

-- 9. TABLA: CHATS ELIMINADOS DEL PANEL
CREATE TABLE IF NOT EXISTS chats_eliminados (
  chat_id VARCHAR(100) PRIMARY KEY,
  fecha BIGINT NOT NULL
);

-- ============================================================================
-- POLÍTICAS DE ROW LEVEL SECURITY (RLS) DESHABILITADAS PARA ACCESO SERVICE_ROLE
-- ============================================================================
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE membresias ENABLE ROW LEVEL SECURITY;
ALTER TABLE entrenamientos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats_eliminados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acceso total para backend con service_role" ON usuarios USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total para backend con service_role" ON chats USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total para backend con service_role" ON mensajes USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total para backend con service_role" ON clientes USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total para backend con service_role" ON membresias USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total para backend con service_role" ON entrenamientos USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total para backend con service_role" ON pagos USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total para backend con service_role" ON configuracion USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total para backend con service_role" ON chats_eliminados USING (true) WITH CHECK (true);
