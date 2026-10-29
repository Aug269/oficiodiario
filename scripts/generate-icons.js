import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generate() {
  const svgPath = path.resolve('public/icon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  // 1. Generate icon-192.png
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.resolve('public/icon-192.png'));
  console.log('Generated icon-192.png');

  // 2. Generate icon-512.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.resolve('public/icon-512.png'));
  console.log('Generated icon-512.png');

  // 3. Generate icon-maskable-512.png (with 10% safe zone padding for maskable icons)
  // Background color #4a153b
  const innerSize = Math.round(512 * 0.8);
  const resizedInner = await sharp(svgBuffer).resize(innerSize, innerSize).png().toBuffer();
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 74, g: 21, b: 59, alpha: 1 }
    }
  })
    .composite([{ input: resizedInner, gravity: 'center' }])
    .png()
    .toFile(path.resolve('public/icon-maskable-512.png'));
  console.log('Generated icon-maskable-512.png');

  // 4. Apple Touch Icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.resolve('public/apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // 5. Favicons
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.resolve('public/favicon-32x32.png'));
  console.log('Generated favicon-32x32.png');

  console.log('All PWA icons generated successfully!');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
