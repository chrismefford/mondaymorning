import sharp from 'sharp';
import fs from 'fs/promises';
for (const f of ['src/assets/texture-green.svg','src/assets/texture-cream.svg','src/assets/texture-blue.svg']) {
  const buf = await fs.readFile(f);
  const out = await sharp(buf, { density: 50 })
    .resize({ width: 900, withoutEnlargement: true })
    .blur(0.5)
    .webp({ quality: 45, effort: 6 })
    .toBuffer();
  const outPath = f.replace(/\.svg$/, '.webp');
  await fs.writeFile(outPath, out);
  console.log(`${outPath}: ${(out.length/1024).toFixed(0)}KB`);
}
