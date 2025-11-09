const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const root = process.cwd();
    const src = path.join(root, 'playwright-report');
    const destRoot = path.join(root, 'reporting');
    const dest = path.join(destRoot, 'html-report');

    if (!fs.existsSync(src)) {
      console.log('No playwright-report directory found, nothing to move.');
      return;
    }

    // ensure reporting directory exists
    if (!fs.existsSync(destRoot)) fs.mkdirSync(destRoot, { recursive: true });

    // remove existing dest if present
    if (fs.existsSync(dest)) {
      // simple recursive remove
      fs.rmSync(dest, { recursive: true, force: true });
    }

    // rename (move) the report directory
    fs.renameSync(src, dest);
    console.log(`Moved playwright-report -> ${path.relative(root, dest)}`);
  } catch (err) {
    console.error('Failed to move report:', err);
    process.exitCode = 1;
  }
})();
