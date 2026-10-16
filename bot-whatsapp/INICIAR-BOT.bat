@echo off
title Bot WhatsApp Eleven Performance
cd /d "%~dp0"
:inicio
echo ============================================
echo    Bot WhatsApp Eleven Performance - NO CIERRES
echo    (puedes minimizarla)
echo ============================================
echo.
node --env-file=.env src/index.js
if %errorlevel%==3 goto yaencendido
echo.
echo El bot se detuvo. Se reinicia solo en 10 segundos...
echo (Para apagarlo del todo, cierra esta ventana)
timeout /t 10 /nobreak >nul
goto inicio
:yaencendido
echo.
echo Esta ventana se cerrara sola.
timeout /t 8 >nul
