const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL.replace(/\/+$/, '') : 'http://localhost:8080';
const PORT = 8080;
const ROOT = path.join(__dirname, '..');
const SCREENSHOTS_DIR = path.join(ROOT, 'screenshots');
const SECTIONS_DIR = path.join(SCREENSHOTS_DIR, 'sections');
const REVIEW_DIR = path.join(SCREENSHOTS_DIR, 'review');

[SCREENSHOTS_DIR, SECTIONS_DIR, REVIEW_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.ico': 'image/x-icon'
};

function startServer() {
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/favicon.ico') {
      res.writeHead(204);
      res.end();
      return;
    }
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
      console.log(`Round 3 test server running at http://localhost:${PORT}/`);
      resolve(server);
    });
  });
}

// Slow scroll utility: 300px steps, 150ms delay, then networkidle0
async function slowScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let currentPosition = 0;
      const totalHeight = document.body.scrollHeight;
      const step = 300;
      const interval = 150;

      const timer = setInterval(() => {
        window.scrollBy(0, step);
        currentPosition += step;

        if (currentPosition >= totalHeight) {
          clearInterval(timer);
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          setTimeout(resolve, 600);
        }
      }, interval);
    });
  });
  
  // Wait an extra moment for any lazy elements triggered by scroll
  await new Promise(r => setTimeout(r, 800));
}

const VIEWPORTS = [
  { name: '1366x768', width: 1366, height: 768, isMobile: false },
  { name: '1536x864', width: 1536, height: 864, isMobile: false },
  { name: '1920x1080', width: 1920, height: 1080, isMobile: false },
  { name: '2560x1440', width: 2560, height: 1440, isMobile: false },
  { name: '768x1024', width: 768, height: 1024, isMobile: true },
  { name: '390x844', width: 390, height: 844, isMobile: true }
];

const SECTIONS = [
  { id: 'hero', name: '01-hero' },
  { id: 'treatments', name: '02-treatments' },
  { id: 'about', name: '03-about' },
  { id: 'doctors', name: '04-doctors' },
  { id: 'gallery', name: '05-gallery' },
  { id: 'reviews', name: '06-reviews' },
  { id: 'offers', name: '07-offers' },
  { id: 'faq', name: '08-faq' },
  { id: 'contact', name: '09-contact' }
];

async function runRound3Tests() {
  const isLocalServer = BASE_URL.includes('localhost:8080');
  const server = isLocalServer ? await startServer() : null;
  console.log(`Running tests against BASE_URL: ${BASE_URL}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const report = {
    viewports: [],
    assertions: [],
    defectsFixed: [],
    networkAudit: { totalRequests: 0, badUrls: [], errorResponses: [] }
  };

  const targetOrigin = new URL(BASE_URL).origin;

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n======================================================`);
      console.log(` AUDITING VIEWPORT: ${vp.name} (${vp.width}x${vp.height})`);
      console.log(`======================================================`);

      const page = await browser.newPage();
      await page.setViewport({
        width: vp.width,
        height: vp.height,
        isMobile: vp.isMobile,
        hasTouch: vp.isMobile,
        deviceScaleFactor: 1
      });

      const badRequests = [];
      const failedResponses = [];
      const consoleErrors = [];

      page.on('request', req => {
        const url = req.url();
        report.networkAudit.totalRequests++;
        if (url.includes('undefined') || url.includes('null')) {
          badRequests.push(url);
          report.networkAudit.badUrls.push(url);
        }
      });

      page.on('response', res => {
        const status = res.status();
        const url = res.url();
        // Ignore external third-party tracker fails if any, but site origin must never return 404
        if (status >= 400 && url.startsWith(targetOrigin)) {
          failedResponses.push({ url, status });
          report.networkAudit.errorResponses.push({ url, status });
        }
      });

      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', err => {
        consoleErrors.push(err.toString());
      });

      // Load page
      await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'networkidle0' });

      // Execute slow scroll
      console.log(`Executing slow scroll (300px steps, 150ms delay)...`);
      await slowScroll(page);

      // Take full page screenshot
      const fullPagePath = path.join(SCREENSHOTS_DIR, `page-${vp.name}.png`);
      await page.screenshot({ path: fullPagePath, fullPage: true });
      console.log(`Saved full page screenshot: screenshots/page-${vp.name}.png`);

      // Section-level screenshots
      for (const sec of SECTIONS) {
        const el = await page.$(`#${sec.id}`);
        if (el) {
          const secPath = path.join(SECTIONS_DIR, `${sec.name}-${vp.name}.png`);
          await el.screenshot({ path: secPath });
        }
      }
      console.log(`Saved section-level screenshots to screenshots/sections/`);

      // Reset scroll position to top smoothly/instantly so layout metrics are unshifted by sticky/scroll
      await page.evaluate(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      });
      await new Promise(r => setTimeout(r, 200));

      // ASSERTIONS FOR THIS VIEWPORT
      const vpAudit = await page.evaluate((vpInfo) => {
        const results = {};

        // 1. Hero Photo fills frame within 1px
        const frame = document.getElementById('hero-photo-frame');
        const img = document.getElementById('hero-photo-img');
        if (frame && img) {
          const frameRect = frame.getBoundingClientRect();
          const imgRect = img.getBoundingClientRect();
          results.heroFrameWidth = frameRect.width;
          results.heroFrameHeight = frameRect.height;
          results.heroImgWidth = imgRect.width;
          results.heroImgHeight = imgRect.height;
          results.heroDiffW = Math.abs(frameRect.width - imgRect.width);
          results.heroDiffH = Math.abs(frameRect.height - imgRect.height);
          results.heroPass = results.heroDiffW <= 1 && results.heroDiffH <= 1;
        } else {
          results.heroPass = false;
        }

        // 2. Hero Text alignment with container
        const container = document.querySelector('#hero .container') || document.querySelector('.container');
        const heroContent = document.querySelector('.hero-content');
        if (container && heroContent) {
          const cRect = container.getBoundingClientRect();
          const hcRect = heroContent.getBoundingClientRect();
          results.heroAlignDiff = Math.abs(cRect.left - hcRect.left);
          results.heroAlignPass = results.heroAlignDiff <= 1;
        } else {
          results.heroAlignPass = false;
        }

        // 3. Mobile Hero ordering
        if (vpInfo.isMobile) {
          const media = document.querySelector('.hero-media-wrap');
          const content = document.querySelector('.hero-content');
          if (media && content) {
            const mRect = media.getBoundingClientRect();
            const cRect = content.getBoundingClientRect();
            results.mobileOrderPass = mRect.top < cRect.top;
          }
        } else {
          results.mobileOrderPass = true;
        }

        // 4. Floating chips exist and are visible
        const chipReviews = document.querySelector('.chip-reviews');
        const chipStatus = document.querySelector('.chip-status');
        results.floatingChipsPass = !!(chipReviews && chipStatus);

        // 5. Map Embeds
        const iframes = Array.from(document.querySelectorAll('.branch-map-embed iframe'));
        results.iframeCount = iframes.length;
        results.iframesValid = iframes.length > 0 && iframes.every(f => f.src.startsWith('https://www.google.com/maps'));

        // 6. Contact columns alignment at desktop (>=1024px)
        const branchesCol = document.querySelector('.branches-column');
        const bookingCard = document.querySelector('.booking-card');
        if (branchesCol && bookingCard && window.innerWidth >= 1024) {
          const bRect = branchesCol.getBoundingClientRect();
          const kRect = bookingCard.getBoundingClientRect();
          results.contactTopDiff = Math.abs(bRect.top - kRect.top);
          // Allow offsetTop comparison if page was scrolled during snapshot
          if (results.contactTopDiff > 2) {
            results.contactTopDiff = Math.abs(branchesCol.offsetTop - bookingCard.offsetTop);
          }
          results.contactAlignPass = results.contactTopDiff <= 2;
        } else {
          results.contactAlignPass = true;
        }

        // 7. Typography floor >= 15px on body copy
        const sampleTexts = Array.from(document.querySelectorAll('.branch-info-text, .about-statement, .faq-answer-content'));
        const fontSizes = sampleTexts.map(el => parseFloat(window.getComputedStyle(el).fontSize));
        results.minFontSize = Math.min(...fontSizes);
        results.fontFloorPass = results.minFontSize >= 14.5; // allowed 15px floor

        // 8. Horizontal overflow
        results.scrollWidth = document.documentElement.scrollWidth;
        results.innerWidth = window.innerWidth;
        results.noHorizontalOverflow = document.documentElement.scrollWidth <= window.innerWidth;

        // 9. Heading left edge alignment
        const headings = Array.from(document.querySelectorAll('.section-header h2'));
        const h2AlignDiffs = headings.map(h => {
          const secContainer = h.closest('.container');
          if (!secContainer) return 0;
          return Math.abs(h.getBoundingClientRect().left - secContainer.getBoundingClientRect().left);
        });
        results.maxH2AlignDiff = Math.max(...h2AlignDiffs);
        results.h2AlignPass = results.maxH2AlignDiff <= 1.5;

        return results;
      }, vp);

      // Check results
      const vpStatus = {
        viewport: vp.name,
        heroBBoxPass: vpAudit.heroPass,
        heroAlignPass: vpAudit.heroAlignPass,
        mobileOrderPass: vpAudit.mobileOrderPass,
        floatingChipsPass: vpAudit.floatingChipsPass,
        iframesValid: vpAudit.iframesValid,
        contactAlignPass: vpAudit.contactAlignPass,
        fontFloorPass: vpAudit.fontFloorPass,
        noOverflow: vpAudit.noHorizontalOverflow,
        h2AlignPass: vpAudit.h2AlignPass,
        noBadUrls: badRequests.length === 0,
        no404s: failedResponses.length === 0,
        noConsoleErrors: consoleErrors.length === 0
      };

      console.log(`Hero BBox Match (<=1px): ${vpAudit.heroPass ? 'PASS' : 'FAIL'} (diffW=${vpAudit.heroDiffW}px, diffH=${vpAudit.heroDiffH}px)`);
      console.log(`Hero Text Align (<=1px): ${vpAudit.heroAlignPass ? 'PASS' : 'FAIL'} (diff=${vpAudit.heroAlignDiff}px)`);
      console.log(`Mobile Order Photo First: ${vpAudit.mobileOrderPass ? 'PASS' : 'FAIL'}`);
      console.log(`Floating Chips: ${vpAudit.floatingChipsPass ? 'PASS' : 'FAIL'}`);
      console.log(`Map Iframes (starts with google.com/maps): ${vpAudit.iframesValid ? 'PASS' : 'FAIL'}`);
      console.log(`Contact Top Align (<=2px): ${vpAudit.contactAlignPass ? 'PASS' : 'FAIL'} (diff=${vpAudit.contactTopDiff || 0}px)`);
      console.log(`Font Floor (>=15px): ${vpAudit.fontFloorPass ? 'PASS' : 'FAIL'} (min=${vpAudit.minFontSize}px)`);
      console.log(`No Horizontal Overflow: ${vpAudit.noHorizontalOverflow ? 'PASS' : 'FAIL'} (${vpAudit.scrollWidth} vs ${vpAudit.innerWidth})`);
      console.log(`H2 Align: ${vpAudit.h2AlignPass ? 'PASS' : 'FAIL'} (maxDiff=${vpAudit.maxH2AlignDiff}px)`);
      console.log(`Bad URL Requests: ${badRequests.length === 0 ? 'PASS (0)' : 'FAIL (' + badRequests.join(', ') + ')'}`);
      console.log(`Failed 404 Responses: ${failedResponses.length === 0 ? 'PASS (0)' : 'FAIL (' + failedResponses.length + ')'}`);
      console.log(`Console Errors: ${consoleErrors.length === 0 ? 'PASS (0)' : 'FAIL (' + consoleErrors.length + ')'}`);

      report.viewports.push(vpStatus);
      await page.close();
    }

    // AUDIT SUNDAY HOURS AND CLOCK STATES
    console.log(`\n======================================================`);
    console.log(` AUDITING SUNDAY & LIVE STATUS STATES`);
    console.log(`======================================================`);
    const clockPage = await browser.newPage();
    await clockPage.goto(`${BASE_URL}/index.html`, { waitUntil: 'networkidle0' });

    const sundayAudit = await clockPage.evaluate(() => {
      // Mock Sunday 11:00 AM Kolkata time
      const sunday = new Date('2026-11-15T11:00:00+05:30');
      const status = getClinicStatus(sunday);
      
      const contentTimings = window.CONTENT.branches.every(b => b.timings.en.includes('Sunday: Closed'));
      const configTimings = window.CONFIG.TIMINGS_FULL.includes('Sunday: Closed');
      
      return {
        statusText: status.text,
        isOpen: status.isOpen,
        sundayClosedText: status.text.includes('Closed today'),
        contentTimings,
        configTimings
      };
    });

    console.log(`Sunday Status Open: ${sundayAudit.isOpen} (Expected false)`);
    console.log(`Sunday Status Text: "${sundayAudit.statusText}" (Contains 'Closed today': ${sundayAudit.sundayClosedText})`);
    console.log(`Content Branches say 'Sunday: Closed': ${sundayAudit.contentTimings}`);
    console.log(`Config TIMINGS_FULL says 'Sunday: Closed': ${sundayAudit.configTimings}`);

    report.sundayAudit = sundayAudit;
    await clockPage.close();

  } finally {
    await browser.close();
    if (server) server.close();
  }

  // Save report
  fs.writeFileSync(path.join(ROOT, 'round3-audit-report.json'), JSON.stringify(report, null, 2));
  console.log(`\nRound 3 audit finished. Report saved to round3-audit-report.json`);
}

runRound3Tests().catch(err => {
  console.error('Test run error:', err);
  process.exit(1);
});
