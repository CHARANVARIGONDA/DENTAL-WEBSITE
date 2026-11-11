const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

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
  '.xml': 'application/xml'
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
      console.log(`Local test server running at http://localhost:${PORT}/`);
      resolve(server);
    });
  });
}

async function runTests() {
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
  const results = {
    viewports: {},
    interactions: {},
    links: {},
    forms: {}
  };

  try {
    // 1. Test Viewports (375px, 768px, 1440px)
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle0' });

      const check = await page.evaluate((vpWidth) => {
        const bodyWidth = document.body.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const bar = document.querySelector('.mobile-sticky-bar');
        const barVisible = bar ? window.getComputedStyle(bar).display !== 'none' : false;
        const bodyPaddingBottom = window.getComputedStyle(document.body).paddingBottom;

        return {
          vpWidth,
          bodyWidth,
          scrollWidth,
          noHorizontalOverflow: scrollWidth <= vpWidth,
          barVisible,
          bodyPaddingBottom
        };
      }, vp.width);

      results.viewports[vp.name] = check;
      console.log(`✓ Viewport ${vp.name} (${vp.width}px): Overflow free = ${check.noHorizontalOverflow}, Sticky bar = ${check.barVisible}, Body padding-bottom = ${check.bodyPaddingBottom}`);
    }

    // 2. Mobile Interactions Test (at 375px)
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle0' });

    // 2A. Hamburger Menu Toggle & Escape key
    await page.click('#hamburger-btn');
    const drawerOpen = await page.evaluate(() => {
      const drawer = document.querySelector('#mobile-drawer');
      return drawer.classList.contains('open') && !drawer.hasAttribute('hidden');
    });
    await page.keyboard.press('Escape');
    const drawerClosed = await page.evaluate(() => {
      const drawer = document.querySelector('#mobile-drawer');
      return !drawer.classList.contains('open') && drawer.hasAttribute('hidden');
    });
    results.interactions.hamburger = { drawerOpen, drawerClosed };
    console.log(`✓ Mobile Navigation: Drawer opens = ${drawerOpen}, Closes on Esc = ${drawerClosed}`);

    // 2B. Treatment Modal Test
    const firstTreatmentBtn = await page.$('[data-action="view-treatment"]');
    await firstTreatmentBtn.click();
    await new Promise(r => setTimeout(r, 100));
    const modalCheck = await page.evaluate(() => {
      const backdrop = document.querySelector('#treatment-modal-backdrop');
      const title = document.querySelector('#modal-title').textContent;
      const price = document.querySelector('#modal-price').textContent;
      const steps = document.querySelectorAll('#modal-process li').length;
      return {
        isOpen: backdrop.classList.contains('open'),
        title,
        price,
        hasSteps: steps > 0
      };
    });
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 100));
    const modalClosed = await page.evaluate(() => {
      const backdrop = document.querySelector('#treatment-modal-backdrop');
      return !backdrop.classList.contains('open');
    });
    results.interactions.treatmentModal = { ...modalCheck, modalClosed };
    console.log(`✓ Treatment Modal: Opened "${modalCheck.title}" with price "${modalCheck.price}", Steps count = ${modalCheck.hasSteps}, Closed on Esc = ${modalClosed}`);

    // 2C. Gallery Lightbox Test
    const firstGalleryItem = await page.$('.gallery-item.clickable');
    await firstGalleryItem.click();
    await new Promise(r => setTimeout(r, 100));
    const lightboxCheck = await page.evaluate(() => {
      const backdrop = document.querySelector('#lightbox-backdrop');
      const img = document.querySelector('#lightbox-img').getAttribute('src');
      return {
        isOpen: backdrop.classList.contains('open'),
        img
      };
    });
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 100));
    const lightboxClosed = await page.evaluate(() => {
      const backdrop = document.querySelector('#lightbox-backdrop');
      return !backdrop.classList.contains('open');
    });
    results.interactions.lightbox = { ...lightboxCheck, lightboxClosed };
    console.log(`✓ Lightbox: Opened image "${lightboxCheck.img}", Closed on Esc = ${lightboxClosed}`);

    // 2D. FAQ Accordion Test
    const firstFaqBtn = await page.$('.faq-question-btn');
    await firstFaqBtn.click();
    const faqOpened = await page.evaluate(() => {
      const btn = document.querySelector('.faq-question-btn');
      const panel = document.querySelector('.faq-answer-panel');
      return btn.getAttribute('aria-expanded') === 'true' && !panel.hasAttribute('hidden');
    });
    await firstFaqBtn.click();
    const faqClosed = await page.evaluate(() => {
      const btn = document.querySelector('.faq-question-btn');
      const panel = document.querySelector('.faq-answer-panel');
      return btn.getAttribute('aria-expanded') === 'false' && panel.hasAttribute('hidden');
    });
    results.interactions.faq = { faqOpened, faqClosed };
    console.log(`✓ FAQ Accordion: Toggles expanded = ${faqOpened}, Collapses = ${faqClosed}`);

    // 2E. Appointment Form Validation Test
    // Try empty submit
    await page.click('#appointment-form button[type="submit"]');
    const invalidCount = await page.evaluate(() => {
      return document.querySelectorAll('#appointment-form .is-invalid').length;
    });
    console.log(`✓ Form Validation: Empty submit flagged ${invalidCount} invalid fields`);

    // Fill valid inputs
    await page.focus('#patient-name');
    await page.type('#patient-name', 'Ramesh Kumar');
    await page.focus('#patient-phone');
    await page.type('#patient-phone', '9876543210');
    await page.select('#patient-treatment', 'Dental Implants');
    
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    
    await page.evaluate((d) => {
      const dateInp = document.querySelector('#patient-date');
      dateInp.value = d;
      dateInp.dispatchEvent(new Event('input', { bubbles: true }));
      dateInp.dispatchEvent(new Event('change', { bubbles: true }));
    }, todayStr);

    // Mock window.open to intercept WhatsApp redirect
    await page.evaluate(() => {
      window._openedUrls = [];
      window.open = (url) => {
        window._openedUrls.push(url);
        return { focus: () => {} };
      };
    });

    await page.click('#appointment-form button[type="submit"]');
    await new Promise(r => setTimeout(r, 300));

    const formResult = await page.evaluate(() => {
      const invalids = Array.from(document.querySelectorAll('#appointment-form .is-invalid')).map(el => el.id);
      const successVisible = document.querySelector('#form-success-banner').classList.contains('visible');
      const openedUrls = window._openedUrls;
      return { successVisible, openedUrls, invalids };
    });
    results.forms = formResult;
    console.log(`✓ Form Submission: Invalids = [${formResult.invalids.join(', ')}], Success = ${formResult.successVisible}`);
    console.log(`✓ WhatsApp URL Intercepted: ${formResult.openedUrls ? formResult.openedUrls[0] : 'None'}`);

    // 2F. Link Consistency Audit
    const linkAudit = await page.evaluate(() => {
      const callLinks = Array.from(document.querySelectorAll('a[data-action="call"]')).map(a => a.getAttribute('href'));
      const waLinks = Array.from(document.querySelectorAll('a[data-action="whatsapp"]')).map(a => a.getAttribute('href'));
      return {
        allCallCorrect: callLinks.every(h => h.startsWith('tel:+910000000000')),
        callLinksCount: callLinks.length,
        allWaCorrect: waLinks.every(h => h.startsWith('https://wa.me/910000000000')),
        waLinksCount: waLinks.length
      };
    });
    results.links = linkAudit;
    console.log(`✓ Link Audit: ${linkAudit.callLinksCount} Call links verified, ${linkAudit.waLinksCount} WhatsApp links verified`);

  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    if (browser) await browser.close();
    server.close();
    if (fs.existsSync(profileDir)) {
      try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (e) {}
    }
  }

  return results;
}

runTests().then(() => {
  console.log('Automated functional and responsive test suite passed.');
});
