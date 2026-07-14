#!/usr/bin/env node
/**
 * Copies legal source files from riseupkids-sale/web/legal/ into public/
 * so riseup.kids/privacy and /terms serve static HTML (no JavaScript required).
 *
 * Edit files in legal/ only — then run: npm run sync:legal
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, '..');
const legalRoot = path.join(webRoot, 'legal');
const publicRoot = path.join(webRoot, 'public');

function copyLegalHtml(subdir) {
  const from = path.join(legalRoot, subdir, 'index.html');
  const toDir = path.join(publicRoot, subdir);
  const to = path.join(toDir, 'index.html');
  fs.mkdirSync(toDir, { recursive: true });
  fs.copyFileSync(from, to);
  console.log(`legal/${subdir}/index.html -> public/${subdir}/index.html`);
}

if (!fs.existsSync(legalRoot)) {
  console.error('Missing legal/ folder in riseupkids-sale/web');
  process.exit(1);
}

copyLegalHtml('privacy');
copyLegalHtml('terms');

const redirects = `# Static legal pages for riseup.kids (Apple/Google crawlers)
/privacy           /privacy/index.html   200
/terms             /terms/index.html     200
/privacy-policy    /privacy/index.html   301
`;

fs.mkdirSync(publicRoot, { recursive: true });
fs.writeFileSync(path.join(publicRoot, '_redirects'), redirects, 'utf8');
console.log('Wrote public/_redirects');
