import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { translations } from '../i18n/translations.js'

const footerSource = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '../components/home/footer/FooterCopyright.jsx'),
  'utf8',
)

describe('Footer copyright copy', () => {
  it('uses the two client lines in English, Spanish, and Portuguese', () => {
    expect(translations.en.footer.copyright).toBe('© 2026 Rise Up Kids. All rights reserved.')
    expect(translations.en.footer.headquarters).toBe('Headquartered in the United States.')

    expect(translations.es.footer.copyright).toBe(
      '© 2026 Rise Up Kids. Todos los derechos reservados.',
    )
    expect(translations.es.footer.headquarters).toBe('Con sede en los Estados Unidos.')

    expect(translations.pt.footer.copyright).toBe(
      '© 2026 Rise Up Kids. Todos os direitos reservados.',
    )
    expect(translations.pt.footer.headquarters).toBe('Com sede nos Estados Unidos.')
  })

  it('does not keep the old split rights-reserved line', () => {
    expect(translations.en.footer.rightsReserved).toBeUndefined()
    expect(translations.es.footer.rightsReserved).toBeUndefined()
    expect(translations.pt.footer.rightsReserved).toBeUndefined()
  })

  it('renders headquarters, 16px/14px, weight 400, and a 4–6px gap', () => {
    expect(footerSource).toContain("t('footer.copyright')")
    expect(footerSource).toContain("t('footer.headquarters')")
    expect(footerSource).not.toContain('rightsReserved')
    expect(footerSource).toContain('fontWeight: 400')
    expect(footerSource).toContain("'14px'")
    expect(footerSource).toContain("'16px'")
    expect(footerSource).toContain('lineHeight: 1.5')
    expect(footerSource).toContain("gap: '5px'")
    expect(footerSource).toContain("textAlign: 'center'")
  })
})
