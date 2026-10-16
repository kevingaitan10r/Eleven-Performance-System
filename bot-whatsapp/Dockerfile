FROM node:22-bookworm-slim

# Instalar dependencias del sistema necesarias para Puppeteer / Chromium
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    fonts-noto-color-emoji \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    xdg-utils \
    chromium \
    && rm -rf /var/lib/apt/lists/*

# Configurar variables para que Puppeteer use Chromium del sistema
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    NODE_ENV=production

WORKDIR /app

# Instalar dependencias npm
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# Copiar el código del proyecto
COPY . .

# Asegurar que existan carpetas de persistencia y archivo .env mínimo
RUN mkdir -p datos .sesion && touch .env

# Exponer el puerto del panel web (3000 por defecto)
EXPOSE 3000

# Arranque del bot
CMD ["node", "--env-file=.env", "src/index.js"]
