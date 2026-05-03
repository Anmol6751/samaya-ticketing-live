const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\DC\\.gemini\\antigravity\\brain\\4010a339-9e5e-4966-ba89-ebb4b143118d\\mission_theme_image_1777799020113.png';
const destDir = path.join(__dirname, '..', 'public', 'images', 'mission');
const dest = path.join(destDir, 'mission-theme.png');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copyFileSync(src, dest);
  console.log('✅ Image copied successfully to public/images/mission/mission-theme.png');
} catch (err) {
  console.error('❌ Failed to copy image:', err);
}
