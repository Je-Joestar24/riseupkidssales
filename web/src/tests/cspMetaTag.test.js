import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { applySeoToHtml } from '../seo/buildSeoHeadMarkup.js'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '../../')

describe('Content-Security-Policy meta tag', () => {
  it('is present in the main site head template', () => {
    const html = readFileSync(join(webRoot, 'index.html'), 'utf8')
    expect(html).toMatch(/<meta[\s\S]*?http-equiv="Content-Security-Policy"/)
    expect(html).toMatch(/<head>[\s\S]*Content-Security-Policy[\s\S]*<\/head>/)
  })

  it('allows the PayPal SDK and blocks unlisted script origins', () => {
    const html = readFileSync(join(webRoot, 'index.html'), 'utf8')
    expect(html).toMatch(/script-src[^;]*https:\/\/www\.paypal\.com/)
    expect(html).toMatch(/object-src 'none'/)
  })

  it('survives SSG head processing for a marketing page', () => {
    const html = readFileSync(join(webRoot, 'index.html'), 'utf8')
    const out = applySeoToHtml(html, {
      pathname: '/',
      lang: 'en',
      seoKey: 'home',
      appUrl: 'https://riseup.kids',
    })
    expect(out).toMatch(/http-equiv="Content-Security-Policy"/)
  })
})
