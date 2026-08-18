import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { applySeoToHtml } from '../seo/buildSeoHeadMarkup.js'
import { getPageSeo } from '../seo/getPageSeo.js'

const PRICE_IN_SHARE_COPY = /\$12|US\$\s*12|12\/mes|12\/mês|12\/month/i
const srcRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const webRoot = join(srcRoot, '..')

describe('Parents and home share copy has no listed price', () => {
  it.each(['en', 'es', 'pt'])('omits a dollar amount from %s home and parents SEO', (lang) => {
    expect(getPageSeo('home', lang).description).not.toMatch(PRICE_IN_SHARE_COPY)
    expect(getPageSeo('parents', lang).description).not.toMatch(PRICE_IN_SHARE_COPY)
  })

  it('omits a dollar amount from the prerendered parents share preview', () => {
    const html = readFileSync(join(webRoot, 'index.html'), 'utf8')
    const out = applySeoToHtml(html, {
      pathname: '/parents',
      lang: 'en',
      seoKey: 'parents',
      appUrl: 'https://riseup.kids',
    })

    expect(out).not.toMatch(PRICE_IN_SHARE_COPY)
    expect(out).toContain('name="description"')
    expect(out).toContain('property="og:description"')
  })
})
