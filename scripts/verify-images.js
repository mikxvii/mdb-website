#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of all images referenced in the carousel
const carouselImages = [
  "/images/lafayette5.jpg",
  "/images/edan-goat.JPEG",
  "/images/table1.JPEG",
  "/images/mdb-ride.jpg",
  "/images/car2.JPEG",
  "/images/stpat.JPEG",
  "/images/wnc.jpg",
  "/images/noah-goat.JPEG",
  "/images/jefflineage5.jpg",
  "/images/newbies.JPEG",
  "/images/mdb-goats.JPEG",
  "/images/8ball.JPEG",
  "/images/wbn1.JPEG",
  "/images/circuit7.jpg",
  "/images/table3.JPEG",
  "/images/mdb-hawaii.JPG",
  "/images/car1.JPEG",
  "/images/mdb5 2.jpg",
  "/images/pms2.jpg",
  "/images/6flags-selfie.jpg",
  "/images/soccer-w.jpg",
  "/images/tp-over.jpg",
  "/images/wbn2.JPEG",
  "/images/sur7.jpg",
  "/images/mdb-newnite.JPG",
  "/images/mdb-6flags.jpeg",
  "/images/car3.JPEG",
  "/images/edan-pair.jpg",
  "/images/table2.JPEG"
];

console.log('🔍 Verifying carousel images...\n');

let allGood = true;
const publicDir = path.join(__dirname, '..', 'public');

carouselImages.forEach(imagePath => {
  const fullPath = path.join(publicDir, imagePath);
  const relativePath = imagePath;
  
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    if (stats.size > 5 * 1024 * 1024) { // 5MB
      console.log(`⚠️  ${relativePath} - EXISTS but LARGE (${sizeInMB}MB)`);
      allGood = false;
    } else {
      console.log(`✅ ${relativePath} - EXISTS (${sizeInMB}MB)`);
    }
  } else {
    console.log(`❌ ${relativePath} - MISSING`);
    allGood = false;
  }
});

console.log('\n📊 Summary:');
if (allGood) {
  console.log('🎉 All images are present and properly sized!');
} else {
  console.log('⚠️  Some issues found. Check the output above.');
}

console.log('\n💡 Tips for production:');
console.log('- Ensure file extensions match exactly (case-sensitive)');
console.log('- Consider compressing large images (>5MB)');
console.log('- Use consistent file naming conventions');
console.log('- Test image loading in production environment');
