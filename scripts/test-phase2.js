/**
 * Comprehensive Automated Phase 2 Test Suite (FR-10 AI Assistant & FR-11 Patient Recall)
 * Tests local build with Puppeteer:
 * 1. Mobile (390x844) collision check between .chat-launcher-btn and .mobile-sticky-bar
 * 2. Chat open/close interactions
 * 3. Clinical Q&A intents (pricing, timings, branches, doctors, emergency triage)
 * 4. Patient Care Recall modal (.ics export & WhatsApp flow)
 * 5. Care Recall Banner in Offers section
 * 6. Console error audit & network URL validation
 * 7. Multi-viewport visual screenshot captures
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const os = require('os');

const PORT = 8089;
const ROOT = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/') reqPath = '/index.html';
      const filePath = path.join(ROOT, reqPath);

      fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      });
    });

    server.listen(PORT, () => {
      console.log(`Test server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function runTests() {
  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const badRequests = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('requestfailed', (req) => {
    badRequests.push(`${req.url()} (${req.failure().errorText})`);
  });

  const results = [];
  function assert(name, condition, details = '') {
    if (condition) {
      console.log(`  PASS: ${name}`);
      results.push({ name, pass: true });
    } else {
      console.error(`  FAIL: ${name} - ${details}`);
      results.push({ name, pass: false, details });
    }
  }

  try {
    console.log('\n--- 1. Testing Mobile Viewport (390x844) & Sticky Collision ---');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle0' });

    // Verify launcher button exists and is visible
    const launcherBox = await page.$eval('#chat-launcher-btn', (el) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        bottom: rect.bottom,
        top: rect.top,
        height: rect.height,
        right: rect.right,
        display: style.display,
        visibility: style.visibility,
        zIndex: parseInt(style.zIndex, 10)
      };
    });

    const stickyBarBox = await page.$eval('.mobile-sticky-bar', (el) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
        display: style.display,
        zIndex: parseInt(style.zIndex, 10)
      };
    });

    assert('Chat launcher button is rendered', launcherBox.display !== 'none' && launcherBox.visibility !== 'hidden');
    assert('Mobile sticky bar is active on mobile', stickyBarBox.display === 'flex');
    
    // Check bounding box clearance: launcher bottom MUST be <= stickyBar top (no collision!)
    const clearance = stickyBarBox.top - launcherBox.bottom;
    console.log(`  Launcher Bottom: ${launcherBox.bottom}px, Sticky Bar Top: ${stickyBarBox.top}px, Clearance: ${clearance}px`);
    assert('Zero collision: launcher sits strictly above sticky bar', clearance >= 0, `Clearance was ${clearance}px`);

    await page.screenshot({ path: path.join(ROOT, 'screenshots', 'p2-mobile-closed.jpg'), type: 'jpeg', quality: 85 });

    console.log('\n--- 2. Testing Chatbot Interactivity & Intents ---');
    // Click launcher to open
    await page.click('#chat-launcher-btn');
    await new Promise(r => setTimeout(r, 600));

    const isOpen = await page.$eval('#chat-window', el => !el.hidden && el.classList.contains('chat-window-open'));
    assert('Chat window opened on launcher click', isOpen);

    await page.screenshot({ path: path.join(ROOT, 'screenshots', 'p2-mobile-open.jpg'), type: 'jpeg', quality: 85 });

    // Test quick chip click: "Treatment Costs"
    await page.click('.chat-chip[data-intent="pricing"]');
    await new Promise(r => setTimeout(r, 700));

    const messagesCount = await page.$$eval('.chat-msg', msgs => msgs.length);
    assert('Quick chip generates user and bot message bubbles', messagesCount >= 3);

    const botText = await page.$eval('.chat-msg-bot:last-child .chat-bubble', el => el.innerText);
    assert('Bot pricing response contains indicative costs', botText.includes('Indicative Pricing') && botText.includes('Dental Implants'));

    // Test custom input: emergency question
    await page.type('#chat-input', 'I have severe tooth pain and swelling');
    await page.click('#chat-send-btn');
    await new Promise(r => setTimeout(r, 700));

    const emergencyResponse = await page.$eval('.chat-msg-bot:last-child .chat-bubble', el => el.innerText);
    assert('Emergency query returns triage guidance and hospital note', 
      emergencyResponse.includes('Dental Emergency') && emergencyResponse.includes('Self-Care'));

    console.log('\n--- 3. Testing Patient Recall Reminder System (FR-11) ---');
    // Open recall modal via chatbot chip
    await page.click('.chat-chip[data-intent="reminders"]');
    await new Promise(r => setTimeout(r, 400));

    const isModalOpen = await page.$eval('#reminder-modal-backdrop', el => !el.hidden && el.classList.contains('open'));
    assert('Care reminder modal opened from chat reminder trigger', isModalOpen);

    await page.screenshot({ path: path.join(ROOT, 'screenshots', 'p2-mobile-modal-open.jpg'), type: 'jpeg', quality: 85 });

    // Verify modal fields
    const modalFields = await page.evaluate(() => {
      const service = document.getElementById('reminder-service');
      const branch = document.getElementById('reminder-branch');
      const date = document.getElementById('reminder-date');
      const name = document.getElementById('reminder-name');
      const phone = document.getElementById('reminder-phone');
      const icsBtn = document.getElementById('reminder-ics-btn');
      const waBtn = document.getElementById('reminder-wa-btn');

      return {
        hasServiceOptions: service && service.options.length >= 4,
        hasBranches: branch && branch.options.length === 2,
        hasDateMin: !!date.min,
        hasName: !!name,
        hasPhonePattern: phone && phone.getAttribute('pattern') === '[6-9][0-9]{9}',
        hasIcsBtn: !!icsBtn,
        hasWaBtn: !!waBtn
      };
    });

    assert('Reminder modal has all required PRD fields', 
      modalFields.hasServiceOptions && modalFields.hasBranches && modalFields.hasDateMin && modalFields.hasPhonePattern);

    // Test ICS trigger
    await page.click('#reminder-ics-btn');
    await new Promise(r => setTimeout(r, 200));
    const statusMsg = await page.$eval('#reminder-status-msg', el => el.style.display !== 'none' && el.innerText);
    assert('Calendar (.ics) generation provides instant feedback', statusMsg && statusMsg.includes('Calendar invite'));

    // Close modal via Escape
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
    const isModalClosed = await page.$eval('#reminder-modal-backdrop', el => el.hidden || !el.classList.contains('open'));
    assert('Modal closes on Escape key', isModalClosed);

    console.log('\n--- 4. Testing Desktop Viewport (1536x864) & Offers Banner ---');
    await page.setViewport({ width: 1536, height: 864, deviceScaleFactor: 1 });
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle0' });

    // Check Care Recall banner presence in Offers
    const bannerVisible = await page.$eval('.care-recall-banner', el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
    assert('Care Recall banner is visible in Offers section', bannerVisible);

    // Trigger Care Recall modal from banner button
    await page.click('.care-recall-btn');
    await new Promise(r => setTimeout(r, 400));
    const isModalOpenFromBanner = await page.$eval('#reminder-modal-backdrop', el => !el.hidden && el.classList.contains('open'));
    assert('Banner button triggers Care Recall modal', isModalOpenFromBanner);

    await page.screenshot({ path: path.join(ROOT, 'screenshots', 'p2-desktop-modal-open.jpg'), type: 'jpeg', quality: 85 });

    // Close via close button
    await page.click('#reminder-modal-close');
    await new Promise(r => setTimeout(r, 400));

    // Open desktop chat and capture screenshot
    await page.click('#chat-launcher-btn');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(ROOT, 'screenshots', 'p2-desktop-chat-open.jpg'), type: 'jpeg', quality: 85 });

    console.log('\n--- 5. Console & Network Hygiene Audit ---');
    assert('Zero console errors throughout test suite', consoleErrors.length === 0, consoleErrors.join('; '));
    assert('Zero failed network requests', badRequests.length === 0, badRequests.join('; '));

  } finally {
    await browser.close();
    server.close();
  }

  const failed = results.filter(r => !r.pass);
  console.log('\n=======================================');
  console.log(`TOTAL CHECKS: ${results.length}`);
  console.log(`PASSED: ${results.length - failed.length}`);
  console.log(`FAILED: ${failed.length}`);
  console.log('=======================================');

  if (failed.length > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test suite error:', err);
  process.exit(1);
});
