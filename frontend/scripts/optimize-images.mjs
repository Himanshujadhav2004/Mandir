import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directories = [
  'd:/mandir/frontend/public/images',
  'd:/mandir/frontend/public/assets'
];

async function optimize() {
  console.log('Converting and compressing images to high-performance WebP...');
  let totalSaved = 0;

  for (const dir of directories) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
        const originalSizeKB = (stat.size / 1024).toFixed(1);
        const webpFilename = file.replace(/\.(jpg|jpeg|png)+$/i, '') + '.webp';
        const webpPath = path.join(dir, webpFilename);

        try {
          await sharp(filePath)
            .resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 75, effort: 6 })
            .toFile(webpPath);

          const newStat = fs.statSync(webpPath);
          const newSizeKB = (newStat.size / 1024).toFixed(1);

          console.log(`Converted ${file}: ${originalSizeKB} KB -> ${newSizeKB} KB (${webpFilename})`);
          totalSaved += (stat.size - newStat.size);
        } catch (err) {
          console.error(`Failed to convert ${file}:`, err.message);
        }
      }
    }
  }

  console.log(`WebP conversion complete! Total saved: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB`);
}

optimize();
