import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { applyHiddenPageHead, isHiddenPagePath, NOINDEX_CONTENT } from '../seo/hiddenPageHead.js'
import { MARKETING_SEO_PATHS, getSeoKeyForPath } from '../seo/pageSeoRoutes.js'
import { applySeoToHtml } from '../seo/buildSeoHeadMarkup.js'
import { PRERENDER_PATHS } from '../ssg/prerender-paths.js'
import en from '../i18n/en.json'
import pt from '../i18n/pt.json'
import es from '../i18n/es.json'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '../../')
const srcRoot = join(webRoot, 'src')
const read = (...parts) => readFileSync(join(webRoot, ...parts), 'utf8')

function listFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? listFiles(full) : [full]
  })
}

function flattenKeys(object, prefix = '') {
  return Object.entries(object).flatMap(([key, value]) =>
    value && typeof value === 'object' ? flattenKeys(value, `${prefix}${key}.`) : [`${prefix}${key}`]
  )
}

const BASE_HTML = '<html><head><title>riseup.kids</title></head><body><div id="root"></div></body></html>'

describe('/experiencia stays hidden from Google', () => {
  it('the prerendered page gets a noindex tag and a neutral title', () => {
    const html = applyHiddenPageHead(BASE_HTML, '/experiencia')

    expect(html).toContain(`<meta name="robots" content="${NOINDEX_CONTENT}" />`)
    expect(html).toContain('<title>Experiência Rise Up Kids</title>')
  })

  it('applying it twice never duplicates the tag', () => {
    const once = applyHiddenPageHead(BASE_HTML, '/experiencia')
    const twice = applyHiddenPageHead(once, '/experiencia')

    expect(twice.match(/name="robots"/g)).toHaveLength(1)
  })

  it('every other page is left exactly as it was — no noindex leaks onto public pages', () => {
    for (const path of ['/', '/parents', '/schools', '/videos', '/privacy']) {
      expect(applyHiddenPageHead(BASE_HTML, path)).toBe(BASE_HTML)
      expect(isHiddenPagePath(path)).toBe(false)
    }
    expect(isHiddenPagePath('/experiencia')).toBe(true)
  })

  it('the shared HTML template is not noindexed (that would hide the whole site)', () => {
    expect(read('index.html')).not.toMatch(/name="robots"/i)
  })

  it('it has no SEO key, so no canonical or hreflang is ever advertised for it', () => {
    expect(getSeoKeyForPath('/experiencia')).toBeNull()
    expect(MARKETING_SEO_PATHS).not.toContain('/experiencia')

    const out = applySeoToHtml(BASE_HTML, {
      pathname: '/experiencia',
      lang: 'pt',
      seoKey: getSeoKeyForPath('/experiencia'),
      appUrl: 'https://riseup.kids',
    })
    expect(out).toBe(BASE_HTML)
  })

  it('it is not in the sitemap, and robots.txt does not name it', () => {
    expect(read('public', 'sitemap.xml')).not.toMatch(/experiencia/i)
    // No Disallow on purpose: it would stop crawlers seeing the noindex and would publish the path.
    expect(read('public', 'robots.txt')).not.toMatch(/experiencia/i)
  })

  it('it is prerendered, so the static host has a real /experiencia page instead of the home page', () => {
    expect(PRERENDER_PATHS).toContain('/experiencia')
  })
})

describe('/experiencia is routed but not linked anywhere', () => {
  const routeSource = read('src', 'app', 'router', 'AppRouteSwitch.jsx')

  it('is a registered route, ahead of the catch-all that redirects unknown paths home', () => {
    const page = routeSource.indexOf("path: '/experiencia'")
    const catchAll = routeSource.indexOf("path: '*'")

    expect(page).toBeGreaterThan(-1)
    expect(catchAll).toBeGreaterThan(page)
  })

  it('no menu, header, footer, or other page links to it', () => {
    const offenders = listFiles(srcRoot)
      .filter((file) => /\.(jsx?|json)$/.test(file))
      .filter((file) => !/[\\/]tests[\\/]/.test(file))
      .filter((file) => !/[\\/]components[\\/]experience[\\/]/.test(file))
      .filter((file) => !/ExperienciaPage\.jsx$|AppRouteSwitch\.jsx$|prerender-paths\.js$|hiddenPageHead\.js$|HomePageBackButton\.jsx$/.test(file))
      // The path used as a link/target (inside quotes) — plain mentions in comments don't count.
      .filter((file) => /['"`]\/experiencia/.test(readFileSync(file, 'utf8')))
      .map((file) => relative(webRoot, file))

    expect(offenders).toEqual([])
  })

  it('the floating "go home" button is switched off on this page, so it is a standalone page', () => {
    const source = read('src', 'components', 'common', 'HomePageBackButton.jsx')

    expect(source).toMatch(/PATHS_WITHOUT_BACK_BUTTON\s*=\s*\[[^\]]*'\/experiencia'/)
    expect(source).toMatch(/PATHS_WITHOUT_BACK_BUTTON\.includes\(pathname\)/)
  })

  it('the page does not render the site menus (no NavHeader / footer)', () => {
    const page = read('src', 'pages', 'ExperienciaPage.jsx')

    expect(page).not.toMatch(/NavHeader|SiteFooter|HomeFooter/)
  })
})

describe('the videos are not in the page code', () => {
  it('no Bunny embed link is anywhere in the site source or its example settings', () => {
    const files = [...listFiles(srcRoot).filter((f) => !/[\\/]tests[\\/]/.test(f)), join(webRoot, '.env.example')]
    const withLinks = files
      .filter((file) => /\.(jsx?|json|example)$/.test(file))
      .filter((file) => /mediadelivery\.net\/embed\//.test(readFileSync(file, 'utf8')))
      .map((file) => relative(webRoot, file))

    expect(withLinks).toEqual([])
  })
})

describe('the video list', () => {
  it('is keyed by position, so two videos with the same link cannot collide', () => {
    const source = read('src', 'components', 'experience', 'ExperienceContent.jsx')

    expect(source).toMatch(/key=\{`video-\$\{index\}`\}/)
    expect(source).not.toMatch(/key=\{src\}/)
  })
})

describe('Content-Security-Policy', () => {
  it('lets the page frame Bunny players, and nothing broader', () => {
    const html = read('index.html')
    const frameSrc = html.match(/frame-src([^;]*);/)[1]

    expect(frameSrc).toContain('https://player.mediadelivery.net')
    expect(frameSrc).toContain('https://iframe.mediadelivery.net')
    expect(frameSrc).not.toMatch(/\*|https:\s|\shttps:;/)
  })
})

describe('page copy', () => {
  it('has the same keys in Portuguese, Spanish and English', () => {
    const keys = (dict) => flattenKeys(dict.experiencia).sort()

    expect(keys(pt).length).toBeGreaterThan(10)
    expect(keys(es)).toEqual(keys(pt))
    expect(keys(en)).toEqual(keys(pt))
  })

  it("uses the client's exact wording from her design file", () => {
    expect(pt.experiencia.gate.title).toBe('Sua Experiência Rise Up Kids')
    expect(pt.experiencia.gate.text).toBe('Digite o e-mail que você cadastrou para assistir.')
    expect(es.experiencia.gate.text.startsWith('Escribe el correo con el que te registraste')).toBe(true)
    expect(pt.experiencia.gate.button).toBe('Entrar')
    expect(pt.experiencia.notRegistered.title).toBe('Ainda não se cadastrou?')
    expect(es.experiencia.notRegistered.title).toBe('¿Todavía no te registraste?')
    expect(pt.experiencia.notRegistered.button).toBe('Quero a experiência')
    expect(pt.experiencia.content.title).toBe('A Experiência Rise Up Kids está aqui')
    expect(pt.experiencia.content.recipeButton).toBe('Imprimir receita aqui')
    // The design file says "Participe da Rise Up Kids"; her written request said "Quero participar da
    // Rise Up Kids". The design file is the later, finished artifact, so it wins.
    expect(pt.experiencia.content.joinButton).toBe('Participe da Rise Up Kids')
    expect(es.experiencia.content.joinButton).toBe('Únete a Rise Up Kids')
  })

  it('has no empty strings', () => {
    for (const dict of [pt, es, en]) {
      for (const key of flattenKeys(dict.experiencia)) {
        const value = key.split('.').reduce((acc, part) => acc[part], dict.experiencia)
        expect(value.trim().length, key).toBeGreaterThan(0)
      }
    }
  })
})

describe('recipe PDF', () => {
  it('is hosted on our own domain, as a real two-page PDF', () => {
    const pdf = readFileSync(join(webRoot, 'public', 'downloads', 'strawberry-banana-smoothie-recipe.pdf'))
    const text = pdf.toString('latin1')

    expect(text.startsWith('%PDF-')).toBe(true)
    expect(text.trimEnd().endsWith('%%EOF')).toBe(true)
    expect(text).toContain('/Count 2')
    expect(pdf.length).toBeGreaterThan(50_000)
  })
})
