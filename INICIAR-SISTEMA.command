#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR/bot-whatsapp"

echo "=========================================================="
echo "  🚀 ELEVEN PERFORMANCE — SISTEMA Y BOT UNIFICADO"
echo "  🏋️‍♂️ Centro de Alto Rendimiento Deportivo & Gym"
echo "=========================================================="

if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias de Node.js..."
    npm install
fi

if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo "⚠️ Creando archivo .env desde .env.example..."
        cp .env.example .env
    else
        echo "❌ ERROR: No se encontró el archivo .env"
        exit 1
    fi
fi

# Limpiar bloqueos de sesiones previas si se cerró forzado
find .sesion -name "SingletonLock" -delete 2>/dev/null
find .sesion -name "SingletonSocket" -delete 2>/dev/null

echo "Iniciando servidor unificado de Eleven Performance..."
echo "Panel Web y Bot disponibles en: http://localhost:7077"
echo "----------------------------------------------------------"

# Abrir el panel automáticamente en el navegador
(sleep 3 && open "http://localhost:7077") &

while true; do
    node --env-file=.env src/index.js
    STATUS=$?
    if [ $STATUS -eq 3 ]; then
        echo "⚠️ El sistema ya está activo en otra ventana."
        break
    fi
    echo ""
    echo "🔄 Reiniciando en 3 segundos..."
    echo "(Presiona Ctrl + C para cerrarlo por completo)"
    sleep 3
done
