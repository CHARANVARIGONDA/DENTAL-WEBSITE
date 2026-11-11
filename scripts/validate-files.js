const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// 1. Test JSON-LD
const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!match) {
  console.error('FAIL: No JSON-LD script found!');
  process.exit(1);
}
try {
  const json = JSON.parse(match[1]);
  console.log('✓ PASS: JSON-LD is valid JSON! @type:', json['@type'], 'name:', json.name);
} catch (e) {
  console.error('FAIL: JSON-LD parse error:', e.message);
  process.exit(1);
}

// 2. Test robots.txt & sitemap.xml
if (fs.existsSync('robots.txt')) {
  console.log('✓ PASS: robots.txt exists');
} else {
  console.error('FAIL: robots.txt missing');
}

if (fs.existsSync('sitemap.xml')) {
  console.log('✓ PASS: sitemap.xml exists');
} else {
  console.error('FAIL: sitemap.xml missing');
}

// 3. Basic HTML tag balance check
const openDivs = (html.match(/<div\b/g) || []).length;
const closeDivs = (html.match(/<\/div>/g) || []).length;
console.log(`HTML tag check: <div count = ${openDivs}, </div> count = ${closeDivs}`);
if (openDivs === closeDivs) {
  console.log('✓ PASS: div tags are balanced');
} else {
  console.warn(`WARN: div tags mismatch (${openDivs} open vs ${closeDivs} close)`);
}

console.log('Validation checks finished.');

