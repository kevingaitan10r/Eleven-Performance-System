@echo off
title Probar IA Eleven Performance
cd /d "%~dp0"
node --env-file=.env src/probar.js
pause
