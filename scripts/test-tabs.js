const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    pipe: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });
  await page.goto('file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/'), { waitUntil: 'load' });
  
  // Switch to Telugu
  await page.click('.lang-btn[data-lang="te"]');
  await new Promise(r => setTimeout(r, 400));
  
  // Click Makeover Tab
  await page.click('.offer-tab-btn[data-cat="wedding"]');
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => document.getElementById('offers').scrollIntoView());
  await (await page.$('#offers')).screenshot({ path: path.join(__dirname, '..', 'test-artifacts', 'tab-makeover-active.png') });
  
  console.log('Tab click verified and captured!');
  await browser.close();
})();

