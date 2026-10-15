import { describe, expect, it } from 'vitest'
import { render } from '../ssg/entry-server.jsx'
import { PRERENDER_PATHS } from '../ssg/prerender-paths.js'

/**
 * The production build prerenders every path in PRERENDER_PATHS on the server, where there is no
 * `window` or `document`. Anything that reads them while rendering breaks `npm run build` for the
 * whole site (this test exists because exactly that happened once with the confirmation preview).
 * This runs the same server render here, under the node test environment, so it fails in the
 * normal test run instead.
 */
describe('server-side prerender', () => {
  it('runs without a browser (no window/document available)', () => {
    expect(typeof window).toBe('undefined')
    expect(typeof document).toBe('undefined')
  })

  it.each(PRERENDER_PATHS)('renders %s without throwing', (path) => {
    const { appHtml } = render(path, { language: 'pt' })

    expect(typeof appHtml).toBe('string')
    expect(appHtml.length).toBeGreaterThan(0)
  })

  it('the hidden Smoothie page prerenders only a neutral shell — nothing gated, no form, no videos', () => {
    const { appHtml } = render('/experiencia', { language: 'pt' })

    expect(appHtml).toContain('exp-page')
    expect(appHtml).toContain('Carregando…')
    expect(appHtml).not.toContain('mediadelivery')
    expect(appHtml).not.toContain('<iframe')
    expect(appHtml).not.toContain('experience-email')
    // Neither the unlocked content nor the sign-in card is in the static HTML.
    expect(appHtml).not.toContain('Imprimir receita')
    expect(appHtml).not.toContain('Participe da Rise Up Kids')
    expect(appHtml).not.toContain('Digite o e-mail')
  })

  it('the hidden Smoothie page has no site header or home button in its shell', () => {
    const { appHtml } = render('/experiencia', { language: 'pt' })

    expect(appHtml).not.toContain('Go to homepage')
    expect(appHtml).not.toContain('<header')
  })

  it('the lead forms prerender as forms, never as the confirmation message', () => {
    const parents = render('/parents', { language: 'pt' }).appHtml
    const schools = render('/schools', { language: 'pt' }).appHtml

    expect(parents).not.toContain('Você está nessa aventura')
    expect(schools).not.toContain('Você está nessa aventura')
    expect(parents).toContain('invitation-name')
  })
})
