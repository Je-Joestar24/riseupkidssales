import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { applySeoToHtml } from '../seo/buildSeoHeadMarkup.js'

const PINTEREST_META =
  '<meta name="p:domain_verify" content="3393ad571f6109ef489500cf6b4688a1"/>'
const PINTEREST_CONTENT = '3393ad571f6109ef489500cf6b4688a1'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '../../')

describe('Pinterest domain verification', () => {
  it('is present in the main site head template', () => {
    const html = readFileSync(join(webRoot, 'index.html'), 'utf8')
    expect(html).toContain(PINTEREST_META)
    expect(html).toMatch(/<head>[\s\S]*p:domain_verify[\s\S]*<\/head>/)
  })

  it('stays in prerendered SEO markup for marketing pages', () => {
    const html = readFileSync(join(webRoot, 'index.html'), 'utf8')
    const out = applySeoToHtml(html, {
      pathname: '/',
      lang: 'en',
      seoKey: 'home',
      appUrl: 'https://riseup.kids',
    })
    expect(out).toContain('name="p:domain_verify"')
    expect(out).toContain(`content="${PINTEREST_CONTENT}"`)
  })

  it('injects the tag when a template is missing it', () => {
    const html = '<html lang="en"><head><title>t</title></head><body></body></html>'
    const out = applySeoToHtml(html, {
      pathname: '/parents',
      lang: 'pt',
      seoKey: 'parents',
      appUrl: 'https://riseup.kids',
    })
    expect(out).toContain('name="p:domain_verify"')
    expect(out).toContain(PINTEREST_CONTENT)
  })
})
