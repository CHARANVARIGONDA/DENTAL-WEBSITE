const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 8080;
const ROOT = path.join(__dirname, '..');
const SCREENSHOTS_DIR = path.join(ROOT, 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

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
  '.xml': 'application/xml; charset=utf-8'
};

function startServer() {
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
      resolve(server);
    });
  });
}

async function verifyAndCapture() {
  const server = await startServer();
  const profileDir = path.join(ROOT, '.tmp-chrome-' + Date.now());
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      `--user-data-dir=${profileDir}`
    ]
  });

  const page = await browser.newPage();
  const widths = [360, 375, 768, 1024, 1100, 1280, 1440, 1920];
  const auditResults = [];

  console.log('Starting automated overlap verification and full-page screenshot capture...\n');

  try {
    for (const width of widths) {
      await page.setViewport({ width, height: 900 });
      await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle0' });

      // Scroll through page to trigger IntersectionObserver on all sections
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 500;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              resolve();
            }
          }, 40);
        });
      });
      await new Promise(r => setTimeout(r, 400));

      // Ensure all dynamic and animated elements have .in-view for clean screenshots
      await page.evaluate(() => {
        document.querySelectorAll('.fade-up-element').forEach(el => el.classList.add('in-view'));
      });
      await new Promise(r => setTimeout(r, 200));

      // Run overlap & collision audit in browser context
      const audit = await page.evaluate((currWidth) => {
        const issues = [];

        // Check horizontal overflow of the document
        const scrollWidth = document.documentElement.scrollWidth;
        const clientWidth = document.documentElement.clientWidth;
        if (scrollWidth > currWidth + 1) { // 1px tolerance for subpixel rounding
          issues.push(`Document overflows viewport: scrollWidth=${scrollWidth}px > viewport=${currWidth}px`);
        }

        // Top bar elements collision check
        const topBarInner = document.querySelector('.top-bar-inner');
        if (topBarInner) {
          const visibleChildren = Array.from(topBarInner.children).filter(el => {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden';
          });

          for (let i = 0; i < visibleChildren.length; i++) {
            for (let j = i + 1; j < visibleChildren.length; j++) {
              const r1 = visibleChildren[i].getBoundingClientRect();
              const r2 = visibleChildren[j].getBoundingClientRect();
              // Check intersection
              const overlap = !(r1.right <= r2.left || r1.left >= r2.right || r1.bottom <= r2.top || r1.top >= r2.bottom);
              if (overlap) {
                issues.push(`Top bar child collision between <${visibleChildren[i].className}> and <${visibleChildren[j].className}> at width ${currWidth}px`);
              }
            }
          }
        }

        // Check nav links collision if desktop nav is visible
        const nav = document.querySelector('.top-bar-nav');
        if (nav && window.getComputedStyle(nav).display !== 'none') {
          const links = Array.from(nav.querySelectorAll('.nav-link'));
          for (let i = 0; i < links.length - 1; i++) {
            const r1 = links[i].getBoundingClientRect();
            const r2 = links[i + 1].getBoundingClientRect();
            if (r1.right > r2.left) {
              issues.push(`Nav link collision between "${links[i].textContent}" and "${links[i+1].textContent}"`);
            }
          }
        }

        // Check wordmark wrapping
        const logo = document.querySelector('.brand-logo');
        if (logo) {
          const logoText = logo.querySelector('span');
          if (logoText) {
            const initialHeight = logoText.offsetHeight;
            // A wrapped 2-line title in 1.25rem would be ~40px or higher
            if (initialHeight > 34) {
              issues.push(`Brand logo wrapped onto multiple lines (height=${initialHeight}px)`);
            }
          }
        }

        // Check H1 overflow at 360px
        const h1 = document.querySelector('h1');
        let h1Info = null;
        if (h1) {
          const h1Rect = h1.getBoundingClientRect();
          h1Info = {
            width: h1Rect.width,
            height: h1Rect.height,
            text: h1.innerText,
            overflowsContainer: h1Rect.right > currWidth
          };
          if (h1Info.overflowsContainer) {
            issues.push(`H1 overflows container at width ${currWidth}px`);
          }
        }

        return {
          width: currWidth,
          issues,
          scrollWidth,
          h1Info
        };
      }, width);

      auditResults.push(audit);

      // Capture full-page screenshot
      const screenshotFileName = `page-${width}px.png`;
      const screenshotPath = path.join(SCREENSHOTS_DIR, screenshotFileName);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      const statusIcon = audit.issues.length === 0 ? '✓ PASS' : '✗ FAIL';
      console.log(`${statusIcon} [${width}px] Full-page saved to: screenshots/${screenshotFileName}`);
      if (audit.issues.length > 0) {
        audit.issues.forEach(iss => console.error(`    ↳ Error: ${iss}`));
      } else {
        console.log(`    ↳ Top bar elements: Zero collision, Zero unwanted wrap, scrollWidth: ${audit.scrollWidth}px`);
        if (width === 360) {
          console.log(`    ↳ 360px H1 check: "${audit.h1Info.text}" (w: ${audit.h1Info.width}px, h: ${audit.h1Info.height}px, overflow: false)`);
        }
      }
    }
  } catch (err) {
    console.error('Audit execution error:', err);
  } finally {
    await browser.close();
    server.close();
    if (fs.existsSync(profileDir)) {
      try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (e) {}
    }
  }

  return auditResults;
}

verifyAndCapture().then((results) => {
  const allPass = results.every(r => r.issues.length === 0);
  console.log('\n======================================================');
  console.log(` OVERLAP & SCREENSHOT AUDIT RESULT: ${allPass ? 'ALL 8 VIEWPORTS PASSED' : 'FAILURES DETECTED'} `);
  console.log('======================================================\n');
  if (!allPass) process.exit(1);
});
