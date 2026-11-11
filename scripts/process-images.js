const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, '..', 'assets', 'raw');
const IMG_DIR = path.join(__dirname, '..', 'assets', 'img');
const FOCAL_POINTS_FILE = path.join(__dirname, 'focal-points.json');

if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
}

const focalPoints = JSON.parse(fs.readFileSync(FOCAL_POINTS_FILE, 'utf8'));

// Image definitions
const images = [
  // Hero (requires 1600w, 1200w, 640w)
  { name: 'hero-clinic', ext: '.jpg', isHero: true, pos: sharp.strategy.attention, ratio: '4:3' },
  // Treatments
  { name: 'treat-implants', ext: '.jpg', pos: sharp.strategy.attention, ratio: '4:3' },
  { name: 'treat-rct', ext: '.jpg', pos: sharp.strategy.attention, ratio: '4:3' },
  { name: 'treat-braces', ext: '.jpg', pos: sharp.strategy.attention, ratio: '4:3' },
  { name: 'treat-crowns', ext: '.jpg', pos: sharp.strategy.attention, ratio: '4:3' },
  { name: 'treat-cleaning', ext: '.jpg', pos: sharp.strategy.attention, ratio: '4:3' },
  { name: 'treat-whitening', ext: '.jpg', pos: sharp.strategy.attention, ratio: '4:3' },
  { name: 'treat-kids', ext: '.jpg', pos: sharp.strategy.attention, ratio: '4:3' },
  { name: 'treat-dentures', ext: '.jpg', pos: sharp.strategy.attention, ratio: '4:3' },
  { name: 'treat-extraction', ext: '.jpg', pos: sharp.strategy.attention, ratio: '4:3' },
  { name: 'treat-checkup', ext: '.jpg', pos: 'center', ratio: '4:3' },
  // Gallery
  { name: 'gallery-smile', ext: '.jpg', pos: 'center', ratio: '4:3' },
  { name: 'gallery-before-after', ext: '.jpg', pos: 'center', ratio: '4:3' },
  { name: 'gallery-reception', ext: '.jpg', pos: 'center', ratio: '4:3' },
  { name: 'gallery-sterilisation', ext: '.jpg', pos: 'center', ratio: '4:3' },
  // Doctors (4:5 ratio with focal point cropping)
  { name: 'doc-implantologist', ext: '.jpg', ratio: '4:5', isDoctor: true },
  { name: 'doc-endodontist', ext: '.jpg', ratio: '4:5', isDoctor: true },
  { name: 'doc-orthodontist', ext: '.jpg', ratio: '4:5', isDoctor: true }
];

async function processAll() {
  console.log('Processing WebP images with sharp...');

  for (const item of images) {
    const rawFilename = `${item.name}${item.ext}`;
    const rawFile = path.join(RAW_DIR, rawFilename);
    if (!fs.existsSync(rawFile)) {
      console.warn(`File missing: ${rawFile}`);
      continue;
    }

    if (item.isDoctor && focalPoints[rawFilename]) {
      const fp = focalPoints[rawFilename];
      const crop = fp.crop;

      // 1200w equivalent (800x1000)
      const out1200 = path.join(IMG_DIR, `${item.name}-1200.webp`);
      await sharp(rawFile)
        .extract(crop)
        .resize(800, 1000)
        .webp({ quality: 84 })
        .toFile(out1200);

      // 640w equivalent (480x600)
      const out640 = path.join(IMG_DIR, `${item.name}-640.webp`);
      await sharp(rawFile)
        .extract(crop)
        .resize(480, 600)
        .webp({ quality: 80 })
        .toFile(out640);

      console.log(`✓ Doctor: ${item.name} cropped using focal-points.json (eyes @ ${fp.eyePercentFromTop}%). Status: ${fp.status}`);
      continue;
    }

    const is4to5 = item.ratio === '4:5';
    const w1200 = is4to5 ? 800 : 1200;
    const h1200 = is4to5 ? 1000 : 900;
    const w640 = is4to5 ? 480 : 640;
    const h640 = is4to5 ? 600 : 480;

    // 1600w version for images shown wider than 1200 CSS px (Hero)
    if (item.isHero) {
      const out1600 = path.join(IMG_DIR, `${item.name}-1600.webp`);
      await sharp(rawFile)
        .resize(1600, 1200, {
          fit: 'cover',
          position: item.pos
        })
        .webp({ quality: 82 })
        .toFile(out1600);
      const stat1600 = fs.statSync(out1600);
      console.log(`✓ Hero 1600w: ${(stat1600.size / 1024).toFixed(1)} KB`);
    }

    // 1200w equivalent
    const out1200 = path.join(IMG_DIR, `${item.name}-1200.webp`);
    await sharp(rawFile)
      .resize(w1200, h1200, {
        fit: 'cover',
        position: item.pos
      })
      .webp({ quality: item.isHero ? 82 : 80 })
      .toFile(out1200);

    const stat1200 = fs.statSync(out1200);

    // 640w equivalent
    const out640 = path.join(IMG_DIR, `${item.name}-640.webp`);
    await sharp(rawFile)
      .resize(w640, h640, {
        fit: 'cover',
        position: item.pos
      })
      .webp({ quality: item.isHero ? 80 : 78 })
      .toFile(out640);

    const stat640 = fs.statSync(out640);

    console.log(`✓ ${item.name} (${item.ratio}): 1200 = ${(stat1200.size / 1024).toFixed(1)} KB, 640 = ${(stat640.size / 1024).toFixed(1)} KB`);
  }

  console.log('All WebP conversions completed successfully.');
}

processAll().catch(err => {
  console.error('Processing error:', err);
  process.exit(1);
});
