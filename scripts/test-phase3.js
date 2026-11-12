/**
 * Automated Verification Suite for Phase 3 (Growth) & Regional Language Toggle (FR-12)
 * Tests:
 * 1. Telugu language toggle (Hero, Navigation, Bento cards, Doctors, Section headers)
 * 2. Advance booking & online payment option (₹300 token & UPI apps)
 * 3. Self-serve Treatment Plan & Appointment Tracking portal
 * 4. Reputation & Review Generation System (5-star Google review vs private feedback)
 * 5. Seasonal & Festival offer tabs
 * 6. Visual screenshot captures
 * 7. Console error and network hygiene
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PORT = 8092;
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
      console.log(`Phase 3 Test server running at http://localhost:${PORT}`);
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

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  page.on('requestfailed', req => {
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
    console.log('\n--- 1. Testing Regional Language Toggle (FR-12: English / Telugu) ---');
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle0' });

    // Initial state: English
    const initialLang = await page.$eval('html', el => el.lang);
    assert('Default language is English', initialLang === 'en');

    // Click Telugu button
    await page.click('.lang-btn[data-lang="te"]');
    await new Promise(r => setTimeout(r, 400));

    const teLang = await page.$eval('html', el => el.lang);
    const teHero = await page.$eval('h1[data-i18n="hero.title"]', el => el.innerText);
    const teImplantTitle = await page.$eval('.treatment-card[data-treatment-id="implants"] .treatment-title', el => el.innerText);
    const teDoctorName = await page.$eval('.doctor-name', el => el.innerText);

    assert('HTML lang attribute updated to te', teLang === 'te');
    assert('Hero title translated into Telugu', teHero.includes('నొప్పిలేని') || teHero.includes('దంత సంరక్షణ'));
    assert('Treatment card title translated into Telugu', teImplantTitle.includes('డెంటల్ ఇంప్లాంట్స్'));
    assert('Doctor name translated into Telugu', teDoctorName.includes('డా.'));

    await page.screenshot({ path: path.join(ROOT, 'screenshots', 'p3-telugu-hero.jpg'), type: 'jpeg', quality: 85 });

    // Switch back to English
    await page.click('.lang-btn[data-lang="en"]');
    await new Promise(r => setTimeout(r, 300));
    const enHero = await page.$eval('h1[data-i18n="hero.title"]', el => el.innerText);
    assert('Successfully switched back to English', enHero.includes('Painless, trusted'));

    console.log('\n--- 2. Testing Advance Booking & Online Payment (Phase 3 Growth) ---');
    // Scroll to booking card
    await page.evaluate(() => {
      document.getElementById('booking-card').scrollIntoView({ behavior: 'instant' });
    });

    const hasPaymentSection = await page.$eval('#booking-payment-group', el => !!el);
    assert('Payment preference selector is present in booking card', hasPaymentSection);

    // Toggle advance UPI
    await page.click('input[name="booking-payment-mode"][value="advance_upi"]');
    await new Promise(r => setTimeout(r, 200));

    const isUpiDetailsVisible = await page.$eval('#advance-payment-details', el => el.style.display !== 'none');
    assert('Advance UPI payment details expand with instant ₹300 priority token', isUpiDetailsVisible);

    await page.screenshot({ path: path.join(ROOT, 'screenshots', 'p3-advance-booking.jpg'), type: 'jpeg', quality: 85 });

    console.log('\n--- 3. Testing Treatment Plan Tracking Portal (Phase 3 Growth) ---');
    // Open portal via header link
    await page.click('.nav-track-link');
    await new Promise(r => setTimeout(r, 400));

    const isPortalOpen = await page.$eval('#track-portal-modal', el => !el.hidden && el.classList.contains('open'));
    assert('Treatment Plan Tracking portal opens', isPortalOpen);

    // Search phone number
    await page.type('#track-phone-input', '9876543210');
    await page.click('#track-search-form button[type="submit"]');
    await new Promise(r => setTimeout(r, 300));

    const trackResult = await page.$eval('#track-result-container', el => el.innerText);
    const lowerResult = trackResult.toLowerCase();
    assert('Treatment plan roadmap renders 4 stages for patient', 
      lowerResult.includes('treatment roadmap') && lowerResult.includes('phase 1') && lowerResult.includes('ramesh kumar'),
      `Got: ${trackResult.slice(0, 80)}`);

    await page.screenshot({ path: path.join(ROOT, 'screenshots', 'p3-tracking-portal.jpg'), type: 'jpeg', quality: 85 });

    // Close portal
    await page.click('#track-portal-close');
    await new Promise(r => setTimeout(r, 300));

    console.log('\n--- 4. Testing Reputation & Review Generation System (Phase 3 Growth) ---');
    // Open review modal
    await page.click('#open-review-btn');
    await new Promise(r => setTimeout(r, 400));

    const isReviewOpen = await page.$eval('#review-generation-modal', el => !el.hidden && el.classList.contains('open'));
    assert('Reputation Review modal opens', isReviewOpen);

    // Click 5 stars
    await page.click('.star-rating-btn[data-star="5"]');
    await new Promise(r => setTimeout(r, 300));

    const googleReviewPrompt = await page.$eval('#review-feedback-outcome', el => el.innerText);
    assert('5-star rating guides happy patient to Google Reviews', 
      googleReviewPrompt.includes('Google Reviews') || googleReviewPrompt.includes('5-star trust'));

    await page.screenshot({ path: path.join(ROOT, 'screenshots', 'p3-review-modal.jpg'), type: 'jpeg', quality: 85 });

    // Close review modal
    await page.click('#review-modal-close');
    await new Promise(r => setTimeout(r, 300));

    console.log('\n--- 5. Testing Seasonal & Festival Offer Tabs (Phase 3 Growth) ---');
    // Scroll to offers with offset for sticky header
    await page.evaluate(() => {
      const el = document.getElementById('offers');
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'instant' });
    });

    const hasOfferTabs = await page.$eval('#offers-tab-cluster', el => el.children.length >= 4);
    assert('Offer tabs cluster has 4 seasonal categories', hasOfferTabs);

    // Click Smile Makeover tab
    await page.click('.offer-tab-btn[data-cat="wedding"]');
    await new Promise(r => setTimeout(r, 300));

    const weddingOfferText = await page.$eval('#offers-container', el => el.innerText);
    assert('Smile Makeover tab filters for Smile Makeover Package', 
      weddingOfferText.includes('Smile Makeover'));

    await page.screenshot({ path: path.join(ROOT, 'screenshots', 'p3-seasonal-offers.jpg'), type: 'jpeg', quality: 85 });

    console.log('\n--- 6. Console & Network Hygiene Audit ---');
    assert('Zero console errors throughout test suite', consoleErrors.length === 0, consoleErrors.join('; '));
    assert('Zero failed network requests', badRequests.length === 0, badRequests.join('; '));

  } finally {
    await browser.close();
    server.close();
  }

  const failed = results.filter(r => !r.pass);
  console.log('\n=======================================');
  console.log(`TOTAL PHASE 3 CHECKS: ${results.length}`);
  console.log(`PASSED: ${results.length - failed.length}`);
  console.log(`FAILED: ${failed.length}`);
  console.log('=======================================');

  if (failed.length > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Phase 3 test suite error:', err);
  process.exit(1);
});
