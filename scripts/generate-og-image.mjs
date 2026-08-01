import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../public/og-image.png');

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#667eea" />
      <stop offset="100%" stop-color="#764ba2" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <text x="80" y="280" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="700" fill="#ffffff">Evandro Nascimento</text>
  <text x="80" y="350" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="500" fill="#e5e0ff">Software Developer &#8226; Tech Lead</text>
  <text x="80" y="420" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#c9c2f0">Java &#8226; Kotlin &#8226; C# &#8226; Spring &#8226; Dotnet</text>
</svg>
`;

const buffer = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(outputPath, buffer);
console.log(`Wrote ${outputPath}`);
