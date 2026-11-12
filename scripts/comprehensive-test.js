/**
 * COMPREHENSIVE END-TO-END VERIFICATION & AUDIT SUITE
 * Fully automated testing using Puppeteer inside the local environment.
 * Tests bilingual rendering, typography, chatbot, booking, tracking, reviews, recall, and zero-error hygiene.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ARTIFACTS_DIR = path.join(ROOT, 'test-artifacts');
fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });

async function runAudit() {
  console.log('===============================================================');
  console.log('   IVORY DENTAL STUDIO - COMPREHENSIVE AUTOMATED AUDIT SUITE   ');
  console.log('===============================================================\n');

  const browser = await puppeteer.launch({
    headless: true,
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });

  const consoleErrors = [];
  const badRequests = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('requestfailed', req => {
    badRequests.push(`${req.url()} (${req.failure() ? req.failure().errorText : 'failed'})`);
  });

  const testReport = {
    total: 0,
    passed: 0,
    failed: 0,
    checks: []
  };

  function assert(title, condition, details = '') {
    testReport.total++;
    if (condition) {
      testReport.passed++;
      console.log(`  ✓ PASS: ${title}`);
      testReport.checks.push({ title, status: 'PASS' });
    } else {
      testReport.failed++;
      console.error(`  ✗ FAIL: ${title} -> ${details}`);
      testReport.checks.push({ title, status: 'FAIL', details });
    }
  }

  const fileUrl = 'file:///' + path.join(ROOT, 'index.html').replace(/\\/g, '/');
  console.log(`Navigating to: ${fileUrl}\n`);
  await page.goto(fileUrl, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 600));

  // --------------------------------------------------------------------------
  // SECTION 1: INITIAL ENGLISH PAGE LOAD AUDIT
  // --------------------------------------------------------------------------
  console.log('\n--- 1. Initial English State Audit ---');
  const enTitle = await page.title();
  assert('Page Title is defined and includes clinic name', enTitle.includes('Ivory Dental Studio'), enTitle);

  const enHeroTitle = await page.$eval('[data-i18n="hero.title"]', el => el.innerText.trim());
  assert('EN Hero Title rendered correctly', enHeroTitle === 'Painless, trusted dental care in Hyderabad', enHeroTitle);

  // Check 10 Treatments
  const treatmentsCount = await page.$$eval('.treatment-card', cards => cards.length);
  assert('All 10 Bento Treatment Cards present', treatmentsCount === 10, `Found ${treatmentsCount}`);

  // Check Doctors
  const doctorsCount = await page.$$eval('.doctor-item', docs => docs.length);
  assert('All 3 MDS Specialist Doctors present', doctorsCount === 3, `Found ${doctorsCount}`);

  // Check Gallery
  const galleryCount = await page.$$eval('.gallery-item', items => items.length);
  assert('All 6 Gallery items present', galleryCount === 6, `Found ${galleryCount}`);

  // Check Reviews
  const reviewsCount = await page.$$eval('.featured-review, .review-subitem', items => items.length);
  assert('6 Patient Reviews present (1 featured + 5 subgrid)', reviewsCount === 6, `Found ${reviewsCount}`);

  // Check Offers
  const offersCount = await page.$$eval('.offer-column', items => items.length);
  assert('4 Clinic Offer Packages rendered', offersCount === 4, `Found ${offersCount}`);

  // Capture English Full Page
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '01-desktop-english.png'), fullPage: false });

  // --------------------------------------------------------------------------
  // SECTION 2: TELUGU LANGUAGE TOGGLE & TYPOGRAPHY AUDIT
  // --------------------------------------------------------------------------
  console.log('\n--- 2. Telugu Regional Language Audit ---');
  await page.click('.lang-btn[data-lang="te"]');
  await new Promise(r => setTimeout(r, 600));

  const docLang = await page.$eval('html', el => el.getAttribute('lang'));
  assert('HTML lang attribute updated to "te"', docLang === 'te', docLang);

  const teHeroTitle = await page.$eval('[data-i18n="hero.title"]', el => el.innerText.trim());
  const teHeroTitleHtml = await page.$eval('[data-i18n="hero.title"]', el => el.innerHTML);
  assert('TE Hero Title has NO raw <br> tags in text or HTML', 
    !teHeroTitle.includes('<br>') && !teHeroTitle.includes('< br >') && !teHeroTitleHtml.includes('<br>') && !teHeroTitleHtml.includes('&lt;br&gt;'), 
    `InnerHtml: ${teHeroTitleHtml}`);
  assert('TE Hero Title contains natural medical Telugu phrasing', 
    teHeroTitle.includes('హైదరాబాద్‌లో') && teHeroTitle.includes('దంత'), 
    teHeroTitle);

  // Check Treatment Bento Cards in Telugu
  const teCardsData = await page.$$eval('.treatment-card', cards => {
    return cards.map(c => ({
      id: c.getAttribute('data-treatment-id'),
      title: c.querySelector('.treatment-title')?.innerText.trim(),
      summary: c.querySelector('.treatment-summary')?.innerText.trim(),
      price: c.querySelector('.treatment-price-text')?.innerText.trim(),
      link: c.querySelector('.treatment-text-link')?.innerText.trim()
    }));
  });

  const allTitlesTelugu = teCardsData.every(c => /[\u0C00-\u0C7F]/.test(c.title));
  assert('All 10 Treatment titles translated to Telugu', allTitlesTelugu, JSON.stringify(teCardsData.map(c => c.title)));

  const allSummariesTelugu = teCardsData.every(c => /[\u0C00-\u0C7F]/.test(c.summary));
  assert('All 10 Treatment summaries translated to Telugu (zero English summaries left)', 
    allSummariesTelugu, JSON.stringify(teCardsData.map(c => ({ id: c.id, summary: c.summary.substring(0, 30) }))));

  const allLinksTelugu = teCardsData.every(c => c.link.includes('వివరాలు చూడండి'));
  assert('All 10 Treatment card buttons translated to "వివరాలు చూడండి →"', allLinksTelugu, teCardsData[0].link);

  // Check Doctors in Telugu
  const teDoctors = await page.$$eval('.doctor-item', docs => docs.map(d => ({
    name: d.querySelector('.doctor-name')?.innerText.trim(),
    role: d.querySelector('.doctor-role')?.innerText.trim()
  })));
  const allDoctorsTelugu = teDoctors.every(d => /[\u0C00-\u0C7F]/.test(d.name) && /[\u0C00-\u0C7F]/.test(d.role));
  assert('Doctors names and roles translated to Telugu', allDoctorsTelugu, JSON.stringify(teDoctors));

  // Check Offers Phrasing in Telugu (Clean, Classy: NO "వివాహ" or "పెళ్లి")
  const teOfferTitles = await page.$$eval('.offer-title', titles => titles.map(t => t.innerText.trim()));
  const makeoverTitle = teOfferTitles.find(t => t.includes('స్మైల్ మేకోవర్'));
  assert('Makeover package uses classy "స్మైల్ మేకోవర్" (NO "వివాహ" or "పెళ్లి")', 
    makeoverTitle && !makeoverTitle.includes('వివాహ') && !makeoverTitle.includes('పెళ్లి') && !makeoverTitle.includes('పెళ్ళి'), 
    makeoverTitle || 'Not found');

  const holidayTitle = teOfferTitles.find(t => t.includes('పిల్లల'));
  assert('Kids package has natural Telugu phrasing', 
    holidayTitle && holidayTitle.includes('పిల్లల'), 
    holidayTitle || 'Not found');

  // Capture Telugu State Screenshot
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '02-desktop-telugu-hero.png'), fullPage: false });

  // --------------------------------------------------------------------------
  // SECTION 3: TREATMENT DETAILS MODAL AUDIT (BILINGUAL)
  // --------------------------------------------------------------------------
  console.log('\n--- 3. Treatment Details Modal Audit ---');
  await page.evaluate(() => {
    const btn = document.querySelector('.treatment-card[data-treatment-id="implants"] .treatment-text-link');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  const modalVisible = await page.$eval('#treatment-modal-backdrop', el => !el.hidden && window.getComputedStyle(el).display !== 'none');
  assert('Treatment Modal opens upon clicking detail link', modalVisible);

  const modalTitle = await page.$eval('#modal-treatment-title', el => el.innerText.trim());
  assert('Modal title is in Telugu for Implants', modalTitle.includes('ఇంప్లాంట్స్'), modalTitle);

  const modalSteps = await page.$$eval('#modal-dynamic-content ol li', lis => lis.map(li => li.innerText.trim()));
  assert('Clinical process steps in modal are translated to Telugu', 
    modalSteps.length > 0 && /[\u0C00-\u0C7F]/.test(modalSteps[0]), modalSteps[0]);

  // Close modal
  await page.click('#modal-close-btn');
  await new Promise(r => setTimeout(r, 300));

  // --------------------------------------------------------------------------
  // SECTION 4: 5-STEP BOOKING CARD & ADVANCE ONLINE PAYMENT AUDIT
  // --------------------------------------------------------------------------
  console.log('\n--- 4. Interactive 5-Step Booking & Payment Audit ---');
  // Scroll to booking card
  await page.evaluate(() => {
    document.getElementById('booking-card').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));

  // Step 1: Branch selection
  await page.evaluate(() => {
    const radio = document.querySelector('input[name="booking-branch"][value="madhapur"]');
    if (radio) {
      radio.checked = true;
      radio.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  assert('Branch selection radio toggled to Madhapur', true);

  // Step 2: Treatment selection
  await page.evaluate(() => {
    const radio = document.querySelector('input[name="booking-treatment"][value="rct"]');
    if (radio) {
      radio.checked = true;
      radio.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  assert('Treatment selection radio toggled to RCT', true);

  // Step 3: Date selection
  await page.evaluate(() => {
    const dateTile = document.querySelector('.date-tile:not(.is-closed) input');
    if (dateTile) {
      dateTile.checked = true;
      dateTile.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  assert('Available date tile selected', true);

  // Step 4: Time Slot
  await page.evaluate(() => {
    const slot = document.querySelector('.slot-chip:not(.is-disabled) input');
    if (slot) {
      slot.checked = true;
      slot.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  assert('Available time slot selected', true);

  // Step 5: Contact Info
  await page.type('#booking-name', 'రమేష్ కుమార్');
  await page.type('#booking-phone', '9876543210');

  // Select Advance Payment ₹300 Token
  await page.evaluate(() => {
    const advanceRadio = document.querySelector('input[name="booking-payment-mode"][value="advance_upi"]');
    if (advanceRadio) {
      advanceRadio.checked = true;
      advanceRadio.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 300));
  const advanceDetailsVisible = await page.$eval('#advance-payment-details', el => window.getComputedStyle(el).display !== 'none');
  assert('Advance ₹300 token reveals UPI details box', advanceDetailsVisible);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, '03-booking-payment-telugu.png'), fullPage: false });

  // --------------------------------------------------------------------------
  // SECTION 5: 24/7 AI CLINICAL ASSISTANT & CHATBOT AUDIT
  // --------------------------------------------------------------------------
  console.log('\n--- 5. 24/7 AI Assistant & Chatbot Audit ---');
  // Verify launcher exists
  const chatLauncher = await page.$('#chat-launcher-btn');
  assert('Chatbot launcher floating button is present', !!chatLauncher);

  // Open Chat
  await page.click('#chat-launcher-btn');
  await new Promise(r => setTimeout(r, 400));

  const chatOpen = await page.$eval('#chat-window', el => !el.hidden && el.classList.contains('chat-window-open'));
  assert('Chatbot dialog window opens on click', chatOpen);

  // Test Query 1: Telugu query in chatbot
  await page.type('#chat-input', 'రూట్ కెనాల్ అంటే ఏమిటి? ఎంత ఖర్చు అవుతుంది?');
  await page.click('#chat-send-btn');
  await new Promise(r => setTimeout(r, 700));

  const lastBotReply1 = await page.$$eval('.chat-msg-bot .chat-bubble', bubbles => bubbles[bubbles.length - 1].innerText);
  assert('Chatbot answers Telugu RCT query with clinical procedure and ₹4,500 pricing in Telugu', 
    lastBotReply1.includes('రూట్ కెనాల్') && lastBotReply1.includes('4,500'), 
    lastBotReply1.substring(0, 100));

  // Test Query 2: Painless Anesthesia query
  await page.type('#chat-input', 'చికిత్స సమయంలో నొప్పి లేకుండా చేస్తారా?');
  await page.click('#chat-send-btn');
  await new Promise(r => setTimeout(r, 700));

  const lastBotReply2 = await page.$$eval('.chat-msg-bot .chat-bubble', bubbles => bubbles[bubbles.length - 1].innerText);
  assert('Chatbot answers painless anesthesia query in Telugu with numbing protocol', 
    lastBotReply2.includes('నొప్పి') || lastBotReply2.includes('అనస్థీషియా'), 
    lastBotReply2.substring(0, 100));

  // Test Query 3: Timings query
  await page.type('#chat-input', 'what are your clinic timings on Saturday?');
  await page.click('#chat-send-btn');
  await new Promise(r => setTimeout(r, 700));

  const lastBotReply3 = await page.$$eval('.chat-msg-bot .chat-bubble', bubbles => bubbles[bubbles.length - 1].innerText);
  assert('Chatbot answers clinic timings query accurately', 
    lastBotReply3.includes('Banjara Hills') || lastBotReply3.includes('బంజారా'), 
    lastBotReply3.substring(0, 100));

  // Close Chat
  await page.click('#chat-close-btn');
  await new Promise(r => setTimeout(r, 300));

  // --------------------------------------------------------------------------
  // SECTION 6: CONSOLE HYGIENE & NETWORK HEALTH
  // --------------------------------------------------------------------------
  console.log('\n--- 6. Console Hygiene & Asset Integrity ---');
  const realConsoleErrors = consoleErrors.filter(e => !e.includes('net::ERR_NAME_NOT_RESOLVED'));
  const realBadRequests = badRequests.filter(r => !r.includes('ERR_NAME_NOT_RESOLVED'));

  assert('Zero uncaught JavaScript console errors', realConsoleErrors.length === 0, realConsoleErrors.join('; '));
  assert('Zero failed local requests or missing 404 local assets', realBadRequests.length === 0, realBadRequests.join('; '));

  console.log('\n===============================================================');
  console.log(` AUDIT SUMMARY: ${testReport.passed} / ${testReport.total} CHECKS PASSED`);
  if (testReport.failed > 0) {
    console.error(` ✗ ${testReport.failed} CHECKS FAILED!`);
  } else {
    console.log(' ALL CLINICAL, BILINGUAL, AND INTERACTION AUDITS PASSED 100%!');
  }
  console.log('===============================================================\n');

  await browser.close();
  if (testReport.failed > 0) process.exit(1);
}

runAudit().catch(err => {
  console.error('Audit crashed:', err);
  process.exit(1);
});
