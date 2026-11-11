const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL.replace(/\/+$/, '') : 'http://localhost:8080';
const isLocal = BASE_URL.includes('localhost:8080');
const PORT = 8080;
const ROOT = path.join(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

function createLocalServer() {
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';
    const filePath = path.join(ROOT, reqPath);

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath);
    const mime = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Local static server listening on port ${PORT}...`);
      resolve(server);
    });
  });
}

async function runLighthouse() {
  const server = isLocal ? await createLocalServer() : null;
  const targetUrl = `${BASE_URL}/index.html`;
  console.log(`Auditing target URL with Lighthouse: ${targetUrl}`);

  const reportPath = path.join(ROOT, 'lighthouse-report.json');
  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const args = [
    'lighthouse',
    targetUrl,
    '--output=json',
    `--output-path=${reportPath}`,
    '--chrome-flags=--headless --no-sandbox --disable-gpu',
    '--form-factor=mobile',
    '--screenEmulation.mobile',
    '--throttling-method=provided',
    '--only-categories=performance,accessibility,best-practices,seo'
  ];

  console.log('Spawning Lighthouse process asynchronously...');
  const lh = spawn(npxCmd, args, { shell: true, stdio: 'inherit' });

  lh.on('close', (code) => {
    console.log(`Lighthouse process exited with code ${code}`);
    if (server) server.close();

    if (fs.existsSync(reportPath)) {
      const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      const scores = {
        performance: Math.round(data.categories.performance.score * 100),
        accessibility: Math.round(data.categories.accessibility.score * 100),
        bestPractices: Math.round(data.categories['best-practices'].score * 100),
        seo: Math.round(data.categories.seo.score * 100)
      };

      console.log('\n=======================================');
      console.log('       LIGHTHOUSE MOBILE SCORES        ');
      console.log('=======================================');
      console.log(`Performance:    ${scores.performance} / 100`);
      console.log(`Accessibility:  ${scores.accessibility} / 100`);
      console.log(`Best Practices: ${scores.bestPractices} / 100`);
      console.log(`SEO:            ${scores.seo} / 100`);
      console.log('=======================================\n');

      if (code !== 0) {
        process.exit(code);
      }
    }
  });
}

runLighthouse().catch(err => {
  console.error('Lighthouse runner error:', err);
  process.exit(1);
});
