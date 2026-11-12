const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const ARTIFACTS_DIR = path.join(ROOT, 'test-artifacts');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 1 });

  const fileUrl = 'file:///' + path.join(ROOT, 'index.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 500));

  // Switch to Telugu
  await page.click('.lang-btn[data-lang="te"]');
  await new Promise(r => setTimeout(r, 600));

  // 1. Hero
  const heroEl = await page.$('.hero-section');
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(ARTIFACTS_DIR, 'section-hero-telugu.png') });
  }

  // 2. Treatments Bento Grid
  await page.evaluate(() => {
    const el = document.getElementById('treatments');
    if (el) el.scrollIntoView();
    if (window.refreshScrollObserver) window.refreshScrollObserver();
  });
  await new Promise(r => setTimeout(r, 600));
  const treatEl = await page.$('#treatments');
  if (treatEl) {
    await treatEl.screenshot({ path: path.join(ARTIFACTS_DIR, 'section-treatments-telugu.png') });
  }

  // 3. Gallery Section
  await page.evaluate(() => {
    const el = document.getElementById('gallery');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  const galleryEl = await page.$('#gallery');
  if (galleryEl) {
    await galleryEl.screenshot({ path: path.join(ARTIFACTS_DIR, 'section-gallery-telugu.png') });
  }

  // 4. Reviews Section
  await page.evaluate(() => {
    const el = document.getElementById('reviews');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  const reviewsEl = await page.$('#reviews');
  if (reviewsEl) {
    await reviewsEl.screenshot({ path: path.join(ARTIFACTS_DIR, 'section-reviews-telugu.png') });
  }

  // 5. Offers Section (Telugu)
  await page.evaluate(() => {
    const el = document.getElementById('offers');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  const offersEl = await page.$('#offers');
  if (offersEl) {
    await offersEl.screenshot({ path: path.join(ARTIFACTS_DIR, 'section-offers-telugu.png') });
  }

  // 6. Booking Card Section
  await page.evaluate(() => {
    const el = document.getElementById('booking-card');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  const bookingEl = await page.$('#booking-card');
  if (bookingEl) {
    await bookingEl.screenshot({ path: path.join(ARTIFACTS_DIR, 'section-booking-telugu.png') });
  }

  // Switch back to English to capture English Offers
  await page.click('.lang-btn[data-lang="en"]');
  await new Promise(r => setTimeout(r, 600));
  await page.evaluate(() => {
    const el = document.getElementById('offers');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  if (offersEl) {
    await offersEl.screenshot({ path: path.join(ARTIFACTS_DIR, 'section-offers-english.png') });
  }

  console.log('Targeted section screenshots captured in test-artifacts/');
  await browser.close();
})().catch(console.error);
