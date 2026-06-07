// backend/src/utils/keepAlive.js
const https = require('https');

const BACKEND_URL = process.env.RENDER_URL || 'https://tg-tech-solutions.onrender.com';

function pingServer() {
  https.get(`${BACKEND_URL}/health`, (res) => {
    console.log(`[KeepAlive] Ping successful — Status: ${res.statusCode} — ${new Date().toISOString()}`);
  }).on('error', (err) => {
    console.log(`[KeepAlive] Ping failed — ${err.message}`);
  });
}

function startKeepAlive() {
  // Har 10 minute pe ping karo
  setInterval(pingServer, 10 * 60 * 1000);
  console.log('[KeepAlive] Started — pinging every 10 minutes');
}

module.exports = { startKeepAlive };