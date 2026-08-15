import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directories = [
  'd:/mandir/frontend/public/images',
  'd:/mandir/frontend/public/assets'
];

async function optimize() {
  console.log('Starting image compression & optimization...');
  let totalSaved = 0;

  for (const dir of directories) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
        // If file is larger than 300KB, resize and compress it
        if (stat.size > 300 * 1024) {
          const originalSizeMB = (stat.size / (1024 * 1024)).toFixed(2);
          const tempPath = filePath + '.tmp';

          try {
            await sharp(filePath)
              .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
              .jpeg({ quality: 80, progressive: true })
              .toFile(tempPath);

            const newStat = fs.statSync(tempPath);
            const newSizeKB = (newStat.size / 1024).toFixed(1);

            fs.unlinkSync(filePath);
            fs.renameSync(tempPath, filePath);

            console.log(`Optimized ${file}: ${originalSizeMB} MB -> ${newSizeKB} KB`);
            totalSaved += (stat.size - newStat.size);
          } catch (err) {
            console.error(`Failed to optimize ${file}:`, err.message);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
          }
        }
      }
    }
  }

  console.log(`Optimization complete! Total disk space saved: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB`);
}

optimize();
