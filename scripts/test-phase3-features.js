const puppeteer = require('puppeteer');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

async function testPhase3Modals() {
  console.log('Testing Phase 3 Features: Tracking Portal, Review Modal, Care Recall...\n');

  const browser = await puppeteer.launch({
    headless: true,
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });

  const fileUrl = 'file:///' + path.join(ROOT, 'index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 500));

  let passed = 0;
  let total = 0;

  function assert(title, condition, details = '') {
    total++;
    if (condition) {
      passed++;
      console.log(`  ✓ PASS: ${title}`);
    } else {
      console.error(`  ✗ FAIL: ${title} -> ${details}`);
    }
  }

  // 1. Treatment Tracking Portal
  console.log('--- 1. Treatment Tracking Portal ---');
  await page.evaluate(() => {
    if (window.openTreatmentTracker) window.openTreatmentTracker();
  });
  await new Promise(r => setTimeout(r, 400));

  const trackingVisible = await page.$eval('#track-portal-modal', el => !el.hidden && window.getComputedStyle(el).display !== 'none');
  assert('Tracking modal opened', trackingVisible);

  await page.type('#track-phone-input', '9876543210');
  await page.$eval('#track-search-form', form => form.dispatchEvent(new Event('submit', { cancelable: true })));
  await new Promise(r => setTimeout(r, 400));

  const roadmapRendered = await page.$eval('#track-result-container', el => el.innerHTML.includes('Milestones') || el.innerHTML.includes('దశలు') || el.innerHTML.includes('Dental Implants') || el.innerHTML.includes('ఇంప్లాంట్స్'));
  assert('Patient treatment plan roadmap rendered for 9876543210', roadmapRendered);

  await page.click('#track-portal-close');
  await new Promise(r => setTimeout(r, 300));

  // 2. Review & Reputation System
  console.log('\n--- 2. Reputation & Review Modal ---');
  await page.evaluate(() => {
    if (window.openReviewModal) window.openReviewModal();
  });
  await new Promise(r => setTimeout(r, 400));

  const reviewVisible = await page.$eval('#review-generation-modal', el => !el.hidden && window.getComputedStyle(el).display !== 'none');
  assert('Review modal opened', reviewVisible);

  // Rate 5 stars
  await page.click('.star-rating-btn[data-star="5"]');
  await new Promise(r => setTimeout(r, 300));
  const googleBtnVisible = await page.$eval('#review-feedback-outcome', el => el.innerHTML.includes('Google') || el.innerHTML.includes('గూగుల్'));
  assert('5-star rating shows direct Google Review CTA', googleBtnVisible);

  // Rate 3 stars
  await page.click('.star-rating-btn[data-star="3"]');
  await new Promise(r => setTimeout(r, 300));
  const feedbackFormVisible = await page.$eval('#review-feedback-outcome', el => el.innerHTML.includes('textarea') || el.innerHTML.includes('feedback') || el.innerHTML.includes('ఫీడ్‌బ్యాక్'));
  assert('3-star rating shows private feedback improvement form', feedbackFormVisible);

  await page.click('#review-modal-close');
  await new Promise(r => setTimeout(r, 300));

  // 3. Care Recall & Calendar (.ics)
  console.log('\n--- 3. Care Recall & Calendar (.ics) ---');
  await page.evaluate(() => {
    if (window.openCareReminder) window.openCareReminder();
  });
  await new Promise(r => setTimeout(r, 400));

  const reminderVisible = await page.$eval('#reminder-modal-backdrop', el => !el.hidden && window.getComputedStyle(el).display !== 'none');
  assert('Care reminder modal opened', reminderVisible);

  await page.type('#reminder-name', 'రమేష్');
  await page.type('#reminder-phone', '9876543210');

  // Click Save to Calendar
  await page.click('#reminder-ics-btn');
  await new Promise(r => setTimeout(r, 300));
  const icsStatus = await page.$eval('#reminder-status-msg', el => el.innerText);
  assert('.ics calendar invite created and status displayed', icsStatus.includes('Calendar invite downloaded'), icsStatus);

  await page.click('#reminder-modal-close');
  await new Promise(r => setTimeout(r, 300));

  console.log(`\n========================================`);
  console.log(`Phase 3 Feature Tests: ${passed} / ${total} PASSED`);
  console.log(`========================================\n`);

  await browser.close();
  if (passed !== total) process.exit(1);
}

testPhase3Modals().catch(err => {
  console.error(err);
  process.exit(1);
});
