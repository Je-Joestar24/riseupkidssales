#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const legalRoot = path.join(__dirname, '..', 'legal');
const meta = JSON.parse(fs.readFileSync(path.join(legalRoot, 'meta.json'), 'utf8'));

function shell({ title, aria, description, canonical, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} | Rise Up Kids</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />
  <style>
    :root { color-scheme: light; }
    body {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      line-height: 1.65;
      color: #1f2937;
      background: #f8fafc;
    }
    main {
      max-width: 760px;
      margin: 0 auto;
      padding: 2rem 1.25rem 3rem;
      background: #fff;
      min-height: 100vh;
      box-sizing: border-box;
    }
    header { border-bottom: 1px solid #e5e7eb; margin-bottom: 1.5rem; padding-bottom: 1rem; }
    h1 { font-size: 2rem; margin: 0 0 0.35rem; color: #0f766e; }
    .meta { color: #6b7280; font-size: 0.95rem; margin: 0; }
    nav { margin-top: 1rem; font-size: 0.95rem; }
    nav a { color: #0f766e; margin-right: 1rem; }
    h2 { font-size: 1.25rem; margin-top: 1.75rem; color: #111827; }
    h3 { font-size: 1.05rem; margin-top: 1.25rem; color: #374151; }
    p { margin: 0.75rem 0; }
    ul { margin: 0.75rem 0 0.75rem 1.25rem; padding: 0; }
    li { margin: 0.35rem 0; }
    footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <main role="main" aria-label="${aria}">
    <header>
      <h1>${title}</h1>
      <p class="meta">Last updated: ${meta.lastUpdated} · Version ${meta.version}</p>
      <nav aria-label="Legal pages">
        <a href="https://riseup.kids/privacy">Privacy Policy</a>
        <a href="https://riseup.kids/terms">Terms of Use</a>
      </nav>
    </header>
${bodyHtml}
    <footer>
      <p>Contact: <a href="mailto:contact@riseup.kids">contact@riseup.kids</a></p>
      <p>© 2026 Rise Up Kids. All rights reserved.</p>
    </footer>
  </main>
</body>
</html>
`;
}

const privacyBody = fs.readFileSync(path.join(legalRoot, 'privacy', 'body.html'), 'utf8').trim();
const termsBody = fs.readFileSync(path.join(legalRoot, 'terms', 'body.html'), 'utf8').trim();

fs.writeFileSync(
  path.join(legalRoot, 'privacy', 'index.html'),
  shell({
    title: 'Privacy Policy',
    aria: 'Privacy Policy',
    description:
      'How Rise Up Kids collects, uses, and protects information for families and schools.',
    canonical: 'https://riseup.kids/privacy',
    bodyHtml: privacyBody,
  })
);

fs.writeFileSync(
  path.join(legalRoot, 'terms', 'index.html'),
  shell({
    title: 'Terms of Use',
    aria: 'Terms of Use',
    description: 'Terms of Use for the Rise Up Kids learning service for families and schools.',
    canonical: 'https://riseup.kids/terms',
    bodyHtml: termsBody,
  })
);

console.log('Rebuilt legal privacy/terms index.html');
