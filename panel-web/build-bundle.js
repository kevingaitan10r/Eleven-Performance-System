import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));

const MODULES = [
  'config.js',
  'utils.js',
  'store.js',
  'icons.js',
  'charts.js',
  'ui.js',
  'auth.js',
  'dashboard.js',
  'athletes.js',
  'reports.js',
  'gym.js',
  'whatsapp.js',
  'config-view.js',
  'main.js'
];

let bundle = `/* ==========================================================================
   ELEVEN PERFORMANCE HUB — UNIFIED BUNDLE (AUTO-GENERATED FROM /js/ MODULES)
   ADAPT · PERFORM · WIN | Sports Science & High Performance Engine
   Version: 2.7.0
   ========================================================================== */\n\n`;

for (const mod of MODULES) {
  const content = readFileSync(join(DIR, 'js', mod), 'utf8');
  bundle += `\n/* --- MODULE: ${mod} --- */\n` + content + '\n';
}

writeFileSync(join(DIR, 'app.js'), bundle, 'utf8');
console.log('✅ Bundle panel-web/app.js generated successfully from 14 modules.');
