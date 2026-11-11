const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        status: res.statusCode,
        headers: res.headers,
        body: data
      }));
    }).on('error', reject);
  });
}

async function verifyLive() {
  const base = 'https://dental-website-two-xi.vercel.app';
  console.log(`Testing live deployment at: ${base}\n`);

  // 1. Homepage & headers
  const home = await get(`${base}/`);
  console.log('[1. Homepage & Security Headers]');
  console.log('Status:', home.status);
  console.log('Cache-Control:', home.headers['cache-control']);
  console.log('X-Content-Type-Options:', home.headers['x-content-type-options']);
  console.log('X-Frame-Options:', home.headers['x-frame-options']);
  console.log('Referrer-Policy:', home.headers['referrer-policy']);
  console.log('Canonical link matches:', home.body.includes('<link rel="canonical" href="https://dental-website-two-xi.vercel.app/">'));
  console.log('og:url matches:', home.body.includes('<meta property="og:url" content="https://dental-website-two-xi.vercel.app/">'));
  console.log('og:image matches:', home.body.includes('<meta property="og:image" content="https://dental-website-two-xi.vercel.app/assets/img/og-image.jpg">'));
  console.log('JSON-LD updated:', home.body.includes('"url": "https://dental-website-two-xi.vercel.app/"'));

  // 2. 404 page
  const notFound = await get(`${base}/does-not-exist`);
  console.log('\n[2. Custom 404 Check (/does-not-exist)]');
  console.log('Status:', notFound.status);
  console.log('Contains "Page Not Found":', notFound.body.includes('Page Not Found'));
  console.log('Contains Back to Home link:', notFound.body.includes('href="/"'));
  console.log('Contains noindex robots:', notFound.body.includes('name="robots" content="noindex"'));

  // 3. Static assets
  const favicon = await get(`${base}/favicon.svg`);
  console.log('\n[3. Static Assets Check]');
  console.log('favicon.svg status:', favicon.status, 'Content-Type:', favicon.headers['content-type']);

  const manifest = await get(`${base}/site.webmanifest`);
  console.log('site.webmanifest status:', manifest.status, 'Content-Type:', manifest.headers['content-type']);

  const robots = await get(`${base}/robots.txt`);
  console.log('robots.txt status:', robots.status, 'Sitemap directive:', robots.body.trim());

  const sitemap = await get(`${base}/sitemap.xml`);
  console.log('sitemap.xml status:', sitemap.status, 'Contains live URL loc:', sitemap.body.includes('<loc>https://dental-website-two-xi.vercel.app/</loc>'));

  const ogImg = await get(`${base}/assets/img/og-image.jpg`);
  console.log('og-image.jpg status:', ogImg.status, 'Content-Type:', ogImg.headers['content-type'], 'Size (bytes):', ogImg.headers['content-length']);

  const allChecksPass = 
    home.status === 200 &&
    home.headers['x-content-type-options'] === 'nosniff' &&
    home.body.includes('<link rel="canonical" href="https://dental-website-two-xi.vercel.app/">') &&
    notFound.status === 404 &&
    notFound.body.includes('Page Not Found') &&
    favicon.status === 200 &&
    manifest.status === 200 &&
    robots.status === 200 &&
    sitemap.status === 200 &&
    ogImg.status === 200;

  console.log('\nAll Live HTTP Endpoint Checks Passed:', allChecksPass);
}

verifyLive().catch(err => {
  console.error('Live check error:', err);
  process.exit(1);
});
