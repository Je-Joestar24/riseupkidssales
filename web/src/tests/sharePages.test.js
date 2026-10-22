import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { applySharePageHead } from '../seo/sharePageHead.js'
import { SHARE_IMAGE, SHARE_PAGES, isSharePagePath } from '../seo/sharePages.js'
import { MARKETING_SEO_PATHS, getSeoKeyForPath } from '../seo/pageSeoRoutes.js'
import { PRERENDER_PATHS } from '../ssg/prerender-paths.js'
import { render } from '../ssg/entry-server.jsx'
import { EXPERIENCE_SIGNUP_URL_ES, EXPERIENCE_SIGNUP_URL_PT } from '../constants/env.js'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '../../')
const srcRoot = join(webRoot, 'src')
const read = (...parts) => readFileSync(join(webRoot, ...parts), 'utf8')
const APP_URL = 'https://riseup.kids'

// Mirrors the real template: relative logo image, generic title/description.
const TEMPLATE = `<html><head>
<title>riseup.kids</title>
<meta name="description" content="Riseup Kids - fun, interactive learning for children." />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="riseup.kids" />
<meta property="og:title" content="riseup.kids" />
<meta property="og:description" content="Riseup Kids - fun, interactive learning for children." />
<meta property="og:image" content="/assets/logo-abc123.png" />
<meta property="og:image:alt" content="riseup.kids logo" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="riseup.kids" />
<meta name="twitter:description" content="Riseup Kids - fun, interactive learning for children." />
<meta name="twitter:image" content="/assets/logo-abc123.png" />
<meta name="twitter:image:alt" content="riseup.kids logo" />
</head><body><div id="root"></div></body></html>`

const metaContent = (html, attr, key) =>
  html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1]

function listFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? listFiles(full) : [full]
  })
}

describe('share-link pages: the link preview', () => {
  it.each(Object.keys(SHARE_PAGES))('%s gets its own title, description and image for WhatsApp/Instagram', (path) => {
    const page = SHARE_PAGES[path]
    const html = applySharePageHead(TEMPLATE, path, APP_URL)

    expect(html).toContain(`<title>${page.title}</title>`)
    expect(metaContent(html, 'name', 'description')).toBe(page.description)
    expect(metaContent(html, 'property', 'og:title')).toBe(page.title)
    expect(metaContent(html, 'property', 'og:description')).toBe(page.description)
    expect(metaContent(html, 'property', 'og:url')).toBe(`${APP_URL}${path}`)
    expect(metaContent(html, 'property', 'og:site_name')).toBe('Rise Up Kids')
    expect(metaContent(html, 'property', 'og:locale')).toBe(page.ogLocale)
    expect(metaContent(html, 'name', 'twitter:card')).toBe('summary_large_image')
    expect(metaContent(html, 'name', 'twitter:title')).toBe(page.title)
    expect(metaContent(html, 'name', 'twitter:description')).toBe(page.description)
  })

  it('the preview image is an ABSOLUTE link on our domain — previews ignore relative ones', () => {
    const html = applySharePageHead(TEMPLATE, '/free', APP_URL)

    expect(metaContent(html, 'property', 'og:image')).toBe('https://riseup.kids/share/free-share.jpg')
    expect(metaContent(html, 'name', 'twitter:image')).toBe('https://riseup.kids/share/free-share.jpg')
    expect(html).not.toContain('logo-abc123')
    expect(metaContent(html, 'property', 'og:image:width')).toBe('1200')
    expect(metaContent(html, 'property', 'og:image:height')).toBe('630')
  })

  it('a trailing slash on the site address does not double up', () => {
    const html = applySharePageHead(TEMPLATE, '/free', 'https://riseup.kids/')

    expect(metaContent(html, 'property', 'og:image')).toBe('https://riseup.kids/share/free-share.jpg')
    expect(metaContent(html, 'property', 'og:url')).toBe('https://riseup.kids/free')
  })

  it('the Portuguese link previews in Portuguese and the Spanish link in Spanish', () => {
    expect(SHARE_PAGES['/free'].title).toMatch(/Experiência Gratuita Rise Up Kids/)
    expect(SHARE_PAGES['/gratis'].title).toMatch(/Experiencia Gratuita Rise Up Kids/)
    expect(SHARE_PAGES['/free'].ogLocale).toBe('pt_BR')
    expect(SHARE_PAGES['/gratis'].ogLocale).toBe('es_ES')
  })

  it('never says Flodesk anywhere in what the preview shows', () => {
    for (const path of Object.keys(SHARE_PAGES)) {
      const html = applySharePageHead(TEMPLATE, path, APP_URL)

      expect(html).not.toMatch(/flodesk/i)
    }
  })

  it('is noindex, so these share links are never ranked as pages of their own', () => {
    const html = applySharePageHead(TEMPLATE, '/free', APP_URL)

    expect(metaContent(html, 'name', 'robots')).toBe('noindex, nofollow, noarchive')
  })

  it('applying it twice never duplicates a tag', () => {
    const once = applySharePageHead(TEMPLATE, '/free', APP_URL)
    const twice = applySharePageHead(once, '/free', APP_URL)

    expect(twice).toBe(once)
    expect(twice.match(/property="og:title"/g)).toHaveLength(1)
    expect(twice.match(/name="robots"/g)).toHaveLength(1)
  })

  it('every other page is left exactly as it was', () => {
    for (const path of ['/', '/parents', '/schools', '/videos', '/experiencia', '/privacy']) {
      expect(applySharePageHead(TEMPLATE, path, APP_URL)).toBe(TEMPLATE)
      expect(isSharePagePath(path)).toBe(false)
    }
  })

  it('the share image exists, is 1200x630, and is small enough for WhatsApp (under 300 KB)', () => {
    const file = readFileSync(join(webRoot, 'public', SHARE_IMAGE.path.replace(/^\//, '')))

    // JPEG: read the dimensions from the start-of-frame marker.
    expect(file[0]).toBe(0xff)
    expect(file[1]).toBe(0xd8)
    let offset = 2
    let size = null
    while (offset < file.length && file[offset] === 0xff) {
      const marker = file[offset + 1]
      const length = file.readUInt16BE(offset + 2)
      if (marker === 0xc0 || marker === 0xc2) {
        size = { height: file.readUInt16BE(offset + 5), width: file.readUInt16BE(offset + 7) }
        break
      }
      offset += 2 + length
    }
    expect(size).toEqual({ width: SHARE_IMAGE.width, height: SHARE_IMAGE.height })
    expect(file.length).toBeLessThan(300 * 1024)
  })
})

describe('share-link pages: the page and the embedded form', () => {
  it('both paths are prerendered, so the preview tags exist in the static HTML', () => {
    expect(PRERENDER_PATHS).toContain('/free')
    expect(PRERENDER_PATHS).toContain('/gratis')
  })

  it('/free embeds the Portuguese form and /gratis the Spanish one — nothing else', () => {
    const pt = render('/free', { language: 'pt' }).appHtml
    const es = render('/gratis', { language: 'pt' }).appHtml

    expect(pt).toContain('src="https://riseupkids.myflodesk.com/stjjhtqnlz"')
    expect(pt).not.toContain('dftjzwem69')
    expect(es).toContain('src="https://riseupkids.myflodesk.com/dftjzwem69"')
    expect(es).not.toContain('stjjhtqnlz')
    expect(pt.match(/<iframe/g)).toHaveLength(1)
  })

  it('the frame is labelled for screen readers, and the page has no site header or home button', () => {
    const pt = render('/free', { language: 'pt' }).appHtml

    expect(pt).toMatch(/<iframe[^>]*title="Cadastro da Experiência Gratuita Rise Up Kids"/)
    expect(pt).not.toContain('<header')
    expect(pt).not.toContain('Go to homepage')
  })

  it('the Content-Security-Policy lets the page frame that one Flodesk host, and no wider', () => {
    const frameSrc = read('index.html').match(/frame-src([^;]*);/)[1]

    expect(frameSrc).toContain('https://riseupkids.myflodesk.com')
    expect(frameSrc).not.toMatch(/\*\.myflodesk|\*\.flodesk|\s\*\s|\shttps:\s|\shttps:;/)
    // The frame sources that were already there are still there.
    expect(frameSrc).toContain('https://player.mediadelivery.net')
    expect(frameSrc).toContain('https://www.paypal.com')
    expect(frameSrc).toContain('https://www.youtube.com')
  })

  it('the home button is switched off on both pages', () => {
    const source = read('src', 'components', 'common', 'HomePageBackButton.jsx')

    expect(source).toMatch(/PATHS_WITHOUT_BACK_BUTTON\s*=\s*\[[^\]]*'\/free'[^\]]*'\/gratis'/)
  })

  it('both are registered routes, ahead of the catch-all', () => {
    const routes = read('src', 'app', 'router', 'AppRouteSwitch.jsx')
    const catchAll = routes.indexOf("path: '*'")

    for (const path of ['/free', '/gratis']) {
      const at = routes.indexOf(`path: '${path}'`)
      expect(at).toBeGreaterThan(-1)
      expect(catchAll).toBeGreaterThan(at)
    }
  })

  it('they stay out of the sitemap, the SEO map and robots.txt', () => {
    for (const path of ['/free', '/gratis']) {
      expect(getSeoKeyForPath(path)).toBeNull()
      expect(MARKETING_SEO_PATHS).not.toContain(path)
    }
    expect(read('public', 'sitemap.xml')).not.toMatch(/\/free|\/gratis/)
    expect(read('public', 'robots.txt')).not.toMatch(/\/free|\/gratis/)
  })

  it('no menu, header or footer links to them', () => {
    const offenders = listFiles(srcRoot)
      .filter((file) => /\.(jsx?|json)$/.test(file))
      .filter((file) => !/[\\/]tests[\\/]/.test(file))
      .filter((file) => !/sharePages\.js$|AppRouteSwitch\.jsx$|prerender-paths\.js$|HomePageBackButton\.jsx$|constants[\\/]env\.js$/.test(file))
      .filter((file) => /['"`]\/(free|gratis)\b/.test(readFileSync(file, 'utf8')))
      .map((file) => relative(webRoot, file))

    expect(offenders).toEqual([])
  })
})

describe('the Experience page sign-up button points to our own pages', () => {
  it('defaults to /free (Portuguese) and /gratis (Spanish)', () => {
    expect(EXPERIENCE_SIGNUP_URL_PT).toBe('/free')
    expect(EXPERIENCE_SIGNUP_URL_ES).toBe('/gratis')
    expect(isSharePagePath(EXPERIENCE_SIGNUP_URL_PT)).toBe(true)
    expect(isSharePagePath(EXPERIENCE_SIGNUP_URL_ES)).toBe(true)
  })
})
