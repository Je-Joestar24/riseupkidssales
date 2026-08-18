import { describe, expect, it } from 'vitest'
import { translations } from '../i18n/translations.js'

describe('Grant Eckstein location', () => {
  it('adds Provo, Utah under the BYU title in every language', () => {
    expect(translations.en.schools.educationSpecialists.grant.name).toBe(
      'Dr. Grant Eckstein, Ph.D.',
    )
    expect(translations.en.schools.educationSpecialists.grant.role).toBe(
      'Professor of Linguistics at Brigham Young University',
    )
    expect(translations.en.schools.educationSpecialists.grant.credentials).toBe('Provo, Utah, USA')

    expect(translations.es.schools.educationSpecialists.grant.credentials).toBe(
      'Provo, Utah, EE. UU.',
    )
    expect(translations.pt.schools.educationSpecialists.grant.credentials).toBe(
      'Provo, Utah, EUA',
    )
  })

  it('does not change Sarah Schumutz credentials', () => {
    expect(translations.en.schools.educationSpecialists.sarah.credentials.length).toBeGreaterThan(0)
    expect(translations.en.schools.educationSpecialists.sarah.credentials).not.toContain(
      'Provo, Utah',
    )
  })
})
