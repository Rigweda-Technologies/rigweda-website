// Converts PNG/JPEG images in public/ to compressed WebP, capped at 1400px wide.
// Usage: node scripts/optimize-images.mjs public/renders/foo.png public/products/bar.jpg
// The original file is replaced by a .webp file with the same name; update references in the code.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const MAX_WIDTH = 1400;
const files = process.argv.slice(2);

if (!files.length) {
  console.error('Pass one or more image paths, e.g. node scripts/optimize-images.mjs public/renders/seo.png');
  process.exit(1);
}

let before = 0;
let after = 0;

for (const file of files) {
  const output = file.replace(/\.(png|jpe?g)$/i, '.webp');
  if (output === file) {
    console.warn(`skip ${file}: not a PNG or JPEG`);
    continue;
  }
  const input = await fs.readFile(file);
  const image = sharp(input);
  const { width = MAX_WIDTH } = await image.metadata();
  const webp = await image
    .resize({ width: Math.min(width, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: 80, alphaQuality: 90, effort: 5 })
    .toBuffer();
  await fs.writeFile(output, webp);
  await fs.unlink(file);
  before += input.length;
  after += webp.length;
  console.log(`${path.basename(file)} ${Math.round(input.length / 1024)}KB -> ${path.basename(output)} ${Math.round(webp.length / 1024)}KB`);
}

console.log(`total ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`);
