@echo off
cd /d "%~dp0bot-whatsapp"
title Eleven Performance - Sistema y Bot Unificado

echo ==========================================================
echo   ELEVEN PERFORMANCE — SISTEMA Y BOT UNIFICADO
echo   Centro de Alto Rendimiento Deportivo
echo ==========================================================

if not exist node_modules (
    echo Instalando dependencias de Node.js...
    call npm install
)

start http://localhost:7077

:loop
call node --env-file=.env src/index.js
echo.
echo Reiniciando sistema en 3 segundos...
timeout /t 3 /nobreak >nul
goto loop
