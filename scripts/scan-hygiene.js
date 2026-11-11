const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IGNORE_DIRS = ['node_modules', '.git', 'screenshots', 'assets/raw'];

function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const relPath = path.relative(ROOT, fullPath).replace(/\\/g, '/');
    if (IGNORE_DIRS.some(ig => relPath === ig || relPath.startsWith(ig + '/'))) {
      return;
    }
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      results.push(relPath);
    }
  });
  return results;
}

const files = getAllFiles(ROOT);
console.log(`Scanning ${files.length} project files...`);

const PATTERNS = [
  { name: 'TODO / FIXME', regex: /\b(TODO|FIXME|HACK|XXX)\b/i },
  { name: 'Lorem Ipsum', regex: /\b(lorem\s+ipsum|dolor\s+sit|consectetur)\b/i },
  { name: 'Old Demo Domain', regex: /ivorydentalstudio-hyderabad\.demo/i },
  { name: 'API Key / Secret Token', regex: /(?:AIza[0-9A-Za-z-_]{35}|AKIA[0-9A-Z]{16}|ghp_[0-9A-Za-z]{36}|vercel_[0-9A-Za-z]{24}|Bearer\s+[a-zA-Z0-9_\-\.]{20,})/i },
  { name: 'Hardcoded Secret', regex: /(?:password|secret_key|api_key|access_token)\s*[:=]\s*['"][^'"]+['"]/i },
  { name: 'Real Email Address', regex: /\b[A-Za-z0-9._%+-]+@(?!users\.noreply\.github\.com|example\.com|YOUR-SITE-URL)[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/i }
];

const findings = [];

files.forEach(f => {
  if (f === 'scripts/scan-hygiene.js') return;
  const ext = path.extname(f).toLowerCase();
  if (!['.html', '.css', '.js', '.json', '.xml', '.txt', '.md', '.svg', '.webmanifest'].includes(ext)) {
    return;
  }
  const content = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    PATTERNS.forEach(pat => {
      if (pat.regex.test(line)) {
        if (f.startsWith('scripts/e2e') && line.includes("url.includes('undefined')")) return;
        findings.push({
          file: f,
          line: idx + 1,
          pattern: pat.name,
          text: line.trim().slice(0, 100)
        });
      }
    });
  });
});

console.log(`\nTotal findings: ${findings.length}`);
findings.forEach(f => {
  console.log(`[${f.pattern}] ${f.file}:${f.line} -> ${f.text}`);
});

// Also scan git log if any commits exist
try {
  const { execSync } = require('child_process');
  const logAuthors = execSync("git log --format='%an <%ae>'", { encoding: 'utf8' }).trim().split('\n');
  const uniqueAuthors = [...new Set(logAuthors)];
  console.log('\nGit authors in history:', uniqueAuthors);
} catch (e) {
  console.log('\nNo git history yet or error reading git log');
}

