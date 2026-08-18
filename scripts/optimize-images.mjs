import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const images = [
  { name: 'capa.webp', url: 'https://i.ibb.co/wN90tkw0/CAPA-web.webp', maxWidth: 800, quality: 72 },
  { name: 'montagem-potes.webp', url: 'https://i.ibb.co/fzg6zGpv/Gemini-Generated-Image-3ib6u03ib6u03ib6.webp', maxWidth: 760, quality: 70 },
  { name: 'energetico.webp', url: 'https://i.ibb.co/4ZPZScBJ/Energ-tico.webp', maxWidth: 600, quality: 70 },
  { name: 'tropical.webp', url: 'https://i.ibb.co/G4DH980p/Tropical.webp', maxWidth: 600, quality: 70 },
  { name: 'maca-canela.webp', url: 'https://i.ibb.co/Y43W1KNw/MA-COM-CANELA.png', maxWidth: 600, quality: 70 },
  { name: 'morango-proteico.webp', url: 'https://i.ibb.co/DHdwzSZY/Morango-Proteico.png', maxWidth: 600, quality: 70 },
  { name: 'cafe.webp', url: 'https://i.ibb.co/zWDQb9Jk/Caf.webp', maxWidth: 600, quality: 70 },
  { name: 'banana.webp', url: 'https://i.ibb.co/yFm0NqF8/Banana.webp', maxWidth: 600, quality: 70 },
  { name: 'dias-geladeira.webp', url: 'https://i.ibb.co/Tqd8stFF/DIAS-2.webp', maxWidth: 760, quality: 70 },
  { name: 'aula-extra.webp', url: 'https://i.ibb.co/Q32xyg60/AULA-WEBP.webp', maxWidth: 760, quality: 70 },
  { name: 'bonus-1.webp', url: 'https://i.ibb.co/B2YPt2J1/B-nus-1.webp', maxWidth: 640, quality: 70 },
  { name: 'bonus-2.webp', url: 'https://i.ibb.co/5g2gC5bM/B-nus-2.webp', maxWidth: 640, quality: 70 },
  { name: 'bonus-3.webp', url: 'https://i.ibb.co/JR1KkKFN/B-nus-3.webp', maxWidth: 640, quality: 70 },
  { name: 'mockup-oferta.webp', url: 'https://i.ibb.co/27HPPVZB/7.webp', maxWidth: 640, quality: 70 },
  { name: 'expert.webp', url: 'https://i.ibb.co/Df8Nw2qJ/EXPERT.webp', maxWidth: 640, quality: 70 },
  { name: 'garantia.webp', url: 'https://i.ibb.co/pv6zQcGj/Garantia.webp', maxWidth: 400, quality: 70 },
  { name: 'dep-1.webp', url: 'https://i.ibb.co/gbX0sd3v/Dep-1.webp', maxWidth: 720, quality: 70 },
  { name: 'dep-2.webp', url: 'https://i.ibb.co/TM1rnzZp/Dep-2.webp', maxWidth: 720, quality: 70 },
  { name: 'dep-3.webp', url: 'https://i.ibb.co/1GXZnFrd/Dep-3.webp', maxWidth: 720, quality: 70 },
  { name: 'dep-4.webp', url: 'https://i.ibb.co/HpH6VyPV/Dep-4.webp', maxWidth: 720, quality: 70 },
  { name: 'dep-5.webp', url: 'https://i.ibb.co/TDBMnxBh/Dep-5.webp', maxWidth: 720, quality: 70 }
];

const outDir = path.resolve('public', 'images');
fs.mkdirSync(outDir, { recursive: true });

async function run() {
  const results = [];
  let totalBefore = 0;
  let totalAfter = 0;

  for (const img of images) {
    try {
      const outPath = path.join(outDir, img.name);
      const resp = await fetch(img.url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status} fetching ${img.url}`);
      const arrayBuffer = await resp.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const sizeBefore = buffer.length;
      totalBefore += sizeBefore;

      const metadata = await sharp(buffer).metadata();
      const origW = metadata.width || 0;
      const origH = metadata.height || 0;

      let pipeline = sharp(buffer);
      if (origW > img.maxWidth) {
        pipeline = pipeline.resize({ width: img.maxWidth, withoutEnlargement: true });
      }

      const outBuffer = await pipeline
        .webp({ quality: img.quality, effort: 6 })
        .toBuffer();

      const sizeAfter = outBuffer.length;
      totalAfter += sizeAfter;

      const outMeta = await sharp(outBuffer).metadata();
      fs.writeFileSync(outPath, outBuffer);

      results.push({
        name: img.name,
        dimBefore: `${origW}x${origH}`,
        dimAfter: `${outMeta.width}x${outMeta.height}`,
        kbBefore: (sizeBefore / 1024).toFixed(1),
        kbAfter: (sizeAfter / 1024).toFixed(1),
        reduction: (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(1) + '%'
      });
    } catch (err) {
      console.error(`Error processing ${img.name}:`, err);
    }
  }

  console.log(JSON.stringify({
    results,
    totalBeforeKB: (totalBefore / 1024).toFixed(1),
    totalAfterKB: (totalAfter / 1024).toFixed(1),
    totalReduction: (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1) + '%'
  }, null, 2));
}

run();
