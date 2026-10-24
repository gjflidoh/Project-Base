// Records each marketing scene HTML file (in ../scenes) as a silent .webm
// at both the square and vertical target resolutions, using the sandbox's
// pre-installed Playwright + Chromium (no network/install required).
//
// Usage: node record.js [outDir]

const path = require('path');
const fs = require('fs');
const { chromium } = require('/opt/node-tools/node_modules/playwright');

const SCENES_DIR = path.join(__dirname, '..', 'scenes');
const OUT_DIR = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, '..', 'out');

const SCENES = [
  { file: 'scene1-stock.html', name: 'stockaz-1-notebook-problem', durationMs: 54500 },
  { file: 'scene2-credit.html', name: 'stockaz-2-who-owes-what', durationMs: 55500 },
  { file: 'scene3-scan.html', name: 'stockaz-3-is-it-in-stock', durationMs: 57500 },
  { file: 'scene4-reports.html', name: 'stockaz-4-what-sold-today', durationMs: 54500 },
];

const FORMATS = [
  { key: 'square', size: { width: 1080, height: 1080 } },
  { key: 'vertical', size: { width: 1080, height: 1920 } },
];

async function recordOne(browser, scene, format) {
  const tmpDir = fs.mkdtempSync(path.join(OUT_DIR, '.rec-'));
  const context = await browser.newContext({
    viewport: format.size,
    recordVideo: { dir: tmpDir, size: format.size },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const url = `file://${path.join(SCENES_DIR, scene.file)}?format=${format.key}`;
  await page.goto(url);
  await page.waitForTimeout(scene.durationMs);
  const video = page.video();
  await context.close();

  const finalName = `${scene.name}-${format.key}.webm`;
  const finalPath = path.join(OUT_DIR, finalName);
  const recordedPath = await video.path();
  fs.renameSync(recordedPath, finalPath);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('recorded', finalName);
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    for (const scene of SCENES) {
      for (const format of FORMATS) {
        await recordOne(browser, scene, format);
      }
    }
  } finally {
    await browser.close();
  }
})();
