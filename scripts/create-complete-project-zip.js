import fs from 'node:fs';
import path from 'node:path';
import JSZip from 'jszip';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'dist');
const zipFileName = 'om-lifeos-universal-master.zip';
const outputPath = path.join(outputDir, zipFileName);

// Ensure output dir exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const zip = new JSZip();

// Ignore patterns to keep zip clean and lightweight
const IGNORED_PATHS = [
  'node_modules',
  '.git',
  'dist',
  'release',
  'target',
  '.DS_Store',
  'Thumbs.db',
  'bun.lockb'
];

function shouldInclude(filePath) {
  const rel = path.relative(rootDir, filePath).replace(/\\/g, '/');
  for (const ign of IGNORED_PATHS) {
    if (rel === ign || rel.startsWith(ign + '/')) {
      return false;
    }
  }
  return true;
}

function addDirectoryToZip(dirPath, zipFolder) {
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    if (!shouldInclude(fullPath)) continue;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const subFolder = zipFolder.folder(item);
      addDirectoryToZip(fullPath, subFolder);
    } else {
      const data = fs.readFileSync(fullPath);
      zipFolder.file(item, data);
    }
  }
}

console.log('📦 Generating Complete Universal Om-LifeOS Project ZIP...');
addDirectoryToZip(rootDir, zip);

// Also add 1-click Windows Runner batch files directly into zip root
zip.file('1-CLICK-RUN-WEB.bat', `@echo off
echo Starting Om-LifeOS Universal Local Server...
npm install
npm run dev
pause
`);

zip.file('1-CLICK-BUILD-WINDOWS-EXE.bat', `@echo off
echo Building Native Windows EXE (Tauri)...
npm install
npm run build
npm run tauri:build:windows
pause
`);

zip.file('1-CLICK-BUILD-ANDROID-APK.bat', `@echo off
echo Building Native Android APK (Tauri Android)...
npm install
npm run tauri:android:build
pause
`);

zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } })
  .then(content => {
    fs.writeFileSync(outputPath, content);
    console.log(`✅ Universal Project ZIP generated successfully at:\n${outputPath} (${(content.length / 1024 / 1024).toFixed(2)} MB)`);
    
    // Also copy to public directory if exists so browser can download directly via static URL
    const publicDir = path.join(rootDir, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(path.join(publicDir, zipFileName), content);
    console.log(`✅ Also copied to public/${zipFileName} for direct in-browser download.`);
  })
  .catch(err => {
    console.error('❌ Failed to generate project ZIP:', err);
    process.exit(1);
  });
