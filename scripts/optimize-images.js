const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = publicDir;

// Image optimization settings
const optimizationSettings = {
  hero: { width: 1920, quality: 82 },
  services: { width: 800, quality: 80 },
  projects: { width: 800, quality: 80 },
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

async function optimizeAllImages() {
  console.log('Starting image optimization...\n');

  // Optimize hero image
  await optimizeImage(
    path.join(imagesDir, 'hero.jpg'),
    path.join(imagesDir, 'hero.webp'),
    optimizationSettings.hero
  );

  // Optimize service images (s1-s4)
  for (let i = 1; i <= 4; i++) {
    await optimizeImage(
      path.join(imagesDir, `s${i}.jpg`),
      path.join(imagesDir, `s${i}.webp`),
      optimizationSettings.services
    );
  }

  // Optimize project images (1-4)
  for (let i = 1; i <= 4; i++) {
    await optimizeImage(
      path.join(imagesDir, `${i}.jpg`),
      path.join(imagesDir, `${i}.webp`),
      optimizationSettings.projects
    );
  }

  console.log('\n✓ Image optimization complete!');
}

optimizeAllImages().catch(console.error);
