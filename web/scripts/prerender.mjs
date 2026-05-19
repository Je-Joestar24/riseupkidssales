/**
 * After `vite build` and `vite build --ssr`, writes static HTML for each path in PRERENDER_PATHS.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { PRERENDER_PATHS } from '../src/ssg/prerender-paths.js'
import { getSeoKeyForPath } from '../src/seo/pageSeoRoutes.js'
import { applySeoToHtml } from '../src/seo/buildSeoHeadMarkup.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const distDir = join(rootDir, 'dist')
const serverDir = join(distDir, 'server')

function readViteAppUrl() {
  try {
    const envText = readFileSync(join(rootDir, '.env'), 'utf-8')
    for (const line of envText.split('\n')) {
      const trimmed = line.trim()
      if (trimmed.startsWith('VITE_APP_URL=')) {
        return trimmed.slice('VITE_APP_URL='.length).trim().replace(/^["']|["']$/g, '')
      }
    }
  } catch {
    // optional .env
  }
  return process.env.VITE_APP_URL || 'https://riseup.kids'
}

const APP_URL = readViteAppUrl()
const PRERENDER_LANGUAGE = 'pt'

const template = readFileSync(join(distDir, 'index.html'), 'utf-8')

const serverEntryCandidates = ['entry-server.js', 'entry-server.mjs']
let serverEntry = null
for (const name of serverEntryCandidates) {
  try {
    readFileSync(join(serverDir, name))
    serverEntry = join(serverDir, name)
    break
  } catch {
    // try next
  }
}

if (!serverEntry) {
  console.error('SSG prerender: missing dist/server/entry-server.{js,mjs}. Run vite build --ssr first.')
  process.exit(1)
}

const { render } = await import(pathToFileURL(serverEntry).href)

function injectIntoTemplate(baseHtml, { appHtml, emotionStyleTags, preloadedState }) {
  const stateJson = JSON.stringify(preloadedState).replace(/</g, '\\u003c')
  const stateScript = `<script>window.__RUK_PRELOADED_STATE__=${stateJson};<\/script>`
  let html = baseHtml
  html = html.replace('</head>', `${emotionStyleTags}\n${stateScript}\n</head>`)
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  return html
}

function writeHtmlForPath(pathname, html) {
  if (pathname === '/') {
    writeFileSync(join(distDir, 'index.html'), html, 'utf-8')
    return
  }
  const dir = join(distDir, pathname.replace(/^\//, ''))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html, 'utf-8')
}

for (const pathname of PRERENDER_PATHS) {
  const { appHtml, emotionStyleTags, preloadedState } = render(pathname, {
    language: PRERENDER_LANGUAGE,
  })
  let html = injectIntoTemplate(template, { appHtml, emotionStyleTags, preloadedState })

  const seoKey = getSeoKeyForPath(pathname)
  if (seoKey) {
    html = applySeoToHtml(html, {
      pathname,
      lang: PRERENDER_LANGUAGE,
      seoKey,
      appUrl: APP_URL,
    })
  }

  writeHtmlForPath(pathname, html)
  console.log('SSG wrote', pathname, seoKey ? `(seo: ${seoKey}, lang: ${PRERENDER_LANGUAGE})` : '')
}
