const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX_HTML = path.join(ROOT, 'index.html');
const SITEMAP_XML = path.join(ROOT, 'sitemap.xml');
const ROBOTS_TXT = path.join(ROOT, 'robots.txt');

function validateUrl(input) {
  if (!input) {
    console.error('Error: Base URL is required.');
    console.error('Usage: node scripts/set-site-url.js https://<url>');
    process.exit(1);
  }

  let urlStr = input.trim();
  if (urlStr.endsWith('/')) {
    urlStr = urlStr.slice(0, -1);
  }

  if (!urlStr.startsWith('https://')) {
    console.error(`Error: URL must start with https:// (received: "${input}")`);
    process.exit(1);
  }

  try {
    const parsed = new URL(urlStr);
    if (parsed.protocol !== 'https:') {
      throw new Error('Must use https');
    }
  } catch (err) {
    console.error(`Error: Invalid URL "${input}":`, err.message);
    process.exit(1);
  }

  return urlStr;
}

function updateSiteUrl(newBaseUrl) {
  const baseUrl = validateUrl(newBaseUrl);
  console.log(`Setting site base URL to: ${baseUrl}\n`);
  const changes = [];

  // 1. Update index.html
  if (fs.existsSync(INDEX_HTML)) {
    let html = fs.readFileSync(INDEX_HTML, 'utf8');
    const originalHtml = html;

    // Canonical link
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${baseUrl}/">`
    );

    // og:url
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${baseUrl}/">`
    );

    // og:image
    html = html.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:image" content="${baseUrl}/assets/img/og-image.jpg">`
    );

    // twitter:image
    if (html.includes('twitter:image')) {
      html = html.replace(
        /<meta\s+(?:name|property)="twitter:image"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="twitter:image" content="${baseUrl}/assets/img/og-image.jpg">`
      );
    } else {
      // Insert after og:image if missing
      html = html.replace(
        /(<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>)/i,
        `$1\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:image" content="${baseUrl}/assets/img/og-image.jpg">`
      );
    }

    // JSON-LD structured data
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
    if (jsonLdMatch) {
      try {
        const jsonLd = JSON.parse(jsonLdMatch[1]);
        jsonLd.url = `${baseUrl}/`;
        jsonLd.image = `${baseUrl}/assets/img/og-image.jpg`;
        const updatedJsonLd = JSON.stringify(jsonLd, null, 2);
        html = html.replace(
          /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
          `<script type="application/ld+json">\n${updatedJsonLd}\n  </script>`
        );
      } catch (err) {
        console.error('Error parsing JSON-LD in index.html:', err.message);
        process.exit(1);
      }
    }

    if (html !== originalHtml) {
      fs.writeFileSync(INDEX_HTML, html, 'utf8');
      changes.push(`Updated index.html (canonical, og:url, og:image, twitter:image, JSON-LD)`);
    } else {
      changes.push(`index.html already up to date`);
    }
  }

  // 2. Update sitemap.xml
  if (fs.existsSync(SITEMAP_XML)) {
    let sitemap = fs.readFileSync(SITEMAP_XML, 'utf8');
    const originalSitemap = sitemap;

    sitemap = sitemap.replace(/<loc>https?:\/\/[^<]+<\/loc>/g, (match) => {
      // Keep subpath if any (e.g. /sitemap.xml or /)
      try {
        const rawUrl = match.replace(/<\/?loc>/g, '');
        const parsed = new URL(rawUrl);
        const subPath = parsed.pathname === '/' ? '/' : parsed.pathname;
        return `<loc>${baseUrl}${subPath}</loc>`;
      } catch (e) {
        return `<loc>${baseUrl}/</loc>`;
      }
    });

    if (sitemap !== originalSitemap) {
      fs.writeFileSync(SITEMAP_XML, sitemap, 'utf8');
      changes.push(`Updated sitemap.xml <loc> entries`);
    } else {
      changes.push(`sitemap.xml already up to date`);
    }
  }

  // 3. Update robots.txt
  if (fs.existsSync(ROBOTS_TXT)) {
    let robots = fs.readFileSync(ROBOTS_TXT, 'utf8');
    const originalRobots = robots;

    robots = robots.replace(
      /Sitemap:\s*https?:\/\/[^\r\n]+/i,
      `Sitemap: ${baseUrl}/sitemap.xml`
    );

    if (robots !== originalRobots) {
      fs.writeFileSync(ROBOTS_TXT, robots, 'utf8');
      changes.push(`Updated robots.txt Sitemap directive`);
    } else {
      changes.push(`robots.txt already up to date`);
    }
  }

  // 4. Verifications
  console.log('--- Changes Applied ---');
  changes.forEach(c => console.log(`• ${c}`));

  console.log('\n--- Running Idempotence & Validation Checks ---');
  // Check index.html JSON-LD parse
  const finalHtml = fs.readFileSync(INDEX_HTML, 'utf8');
  const finalJsonLdMatch = finalHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (!finalJsonLdMatch) throw new Error('Missing JSON-LD in index.html');
  const parsedLd = JSON.parse(finalJsonLdMatch[1]);
  if (parsedLd.url !== `${baseUrl}/`) throw new Error(`JSON-LD URL mismatch: ${parsedLd.url}`);
  console.log(`✓ JSON-LD parsed cleanly: url = ${parsedLd.url}`);

  // Check sitemap.xml
  const finalSitemap = fs.readFileSync(SITEMAP_XML, 'utf8');
  const locs = finalSitemap.match(/<loc>(.*?)<\/loc>/g) || [];
  if (locs.length === 0) throw new Error('No <loc> entries found in sitemap.xml');
  locs.forEach(loc => {
    const raw = loc.replace(/<\/?loc>/g, '');
    if (!raw.startsWith('https://')) throw new Error(`Sitemap loc is not https: ${raw}`);
  });
  console.log(`✓ Verified ${locs.length} <loc> entries in sitemap.xml (all absolute https)`);

  // Check robots.txt
  const finalRobots = fs.readFileSync(ROBOTS_TXT, 'utf8');
  if (!finalRobots.includes(`Sitemap: ${baseUrl}/sitemap.xml`)) {
    throw new Error('robots.txt does not contain valid Sitemap directive');
  }
  console.log(`✓ Verified robots.txt: Sitemap: ${baseUrl}/sitemap.xml\n`);
  console.log('Site URL successfully set and verified!');
}

const inputArg = process.argv[2];
updateSiteUrl(inputArg);
