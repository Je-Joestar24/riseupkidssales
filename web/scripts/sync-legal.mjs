#!/usr/bin/env node
/**
 * Copies legal HTML from riseupkids-sale/web/legal/ into public/ and/or dist/.
 * Static legal pages must NOT go through React — otherwise hydration error #418.
 *
 * Usage:
 *   node scripts/sync-legal.mjs          # public/ only (before vite build)
 *   node scripts/sync-legal.mjs --dist   # dist/ after build + prerender
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, '..');
const legalRoot = path.join(webRoot, 'legal');
const copyDist = process.argv.includes('--dist');

const REDIRECTS = `# Static legal pages — must be served BEFORE SPA fallback (fixes React #418)
/privacy           /privacy/index.html   200
/terms             /terms/index.html     200
/privacy-policy    /privacy/index.html   301
`;

function copyLegalHtml(targetRoot, subdir) {
  const from = path.join(legalRoot, subdir, 'index.html');
  const toDir = path.join(targetRoot, subdir);
  const to = path.join(toDir, 'index.html');
  fs.mkdirSync(toDir, { recursive: true });
  fs.copyFileSync(from, to);
  console.log(`legal/${subdir}/index.html -> ${path.relative(webRoot, to)}`);
}

function writeHostingFiles(targetRoot) {
  fs.mkdirSync(targetRoot, { recursive: true });
  fs.writeFileSync(path.join(targetRoot, '_redirects'), REDIRECTS, 'utf8');
  console.log(`Wrote ${path.relative(webRoot, path.join(targetRoot, '_redirects'))}`);
}

if (!fs.existsSync(legalRoot)) {
  console.error('Missing legal/ folder in riseupkids-sale/web');
  process.exit(1);
}

const publicRoot = path.join(webRoot, 'public');
copyLegalHtml(publicRoot, 'privacy');
copyLegalHtml(publicRoot, 'terms');
writeHostingFiles(publicRoot);

if (copyDist) {
  const distRoot = path.join(webRoot, 'dist');
  if (!fs.existsSync(distRoot)) {
    console.error('Missing dist/ — run vite build first');
    process.exit(1);
  }
  copyLegalHtml(distRoot, 'privacy');
  copyLegalHtml(distRoot, 'terms');
  writeHostingFiles(distRoot);
  console.log('Legal pages restored in dist/ (static HTML, no React).');
}
