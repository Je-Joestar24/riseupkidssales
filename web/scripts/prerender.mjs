/**
 * After `vite build` and `vite build --ssr`, writes static HTML for each path in PRERENDER_PATHS.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { PRERENDER_PATHS } from '../src/ssg/prerender-paths.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const distDir = join(rootDir, 'dist')
const serverDir = join(distDir, 'server')

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
  const { appHtml, emotionStyleTags, preloadedState } = render(pathname)
  const html = injectIntoTemplate(template, { appHtml, emotionStyleTags, preloadedState })
  writeHtmlForPath(pathname, html)
  console.log('SSG wrote', pathname)
}
