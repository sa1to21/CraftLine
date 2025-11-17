const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

const optimizationSettings = {
  projects: { width: 800, quality: 80 },
  mobilebg: { width: 1920, quality: 85 }, // Mobile hero background
};

async function optimizeImage(inputPath, outputPath, options) {
  try {
    await sharp(inputPath)
      .resize(options.width, null, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: options.quality })
      .toFile(outputPath);

    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

    console.log(`✓ ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    console.log(`  ${(inputSize / 1024).toFixed(1)}KB -> ${(outputSize / 1024).toFixed(1)}KB (saved ${savings}%)`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeNewImages() {
  console.log('Starting optimization of new images...\n');

  // Optimize 8.jpg, 9.jpg, 10.jpg
  const newImages = ['8', '9', '10'];

  for (const img of newImages) {
    await optimizeImage(
      path.join(publicDir, `${img}.jpg`),
      path.join(publicDir, `${img}.webp`),
      optimizationSettings.projects
    );
  }

  console.log('\n✓ New images optimization complete!');
}

optimizeNewImages().catch(console.error);
