import { describe, expect, it } from 'vitest'
import { shouldPreviewConfirmation } from '../utils/leadConfirmationPreview.js'

describe('shouldPreviewConfirmation (QA-only preview toggle)', () => {
  it('is false with no query string', () => {
    expect(shouldPreviewConfirmation('')).toBe(false)
    expect(shouldPreviewConfirmation(undefined)).toBe(false)
  })

  it('is false when the param is absent or set to anything other than "1"', () => {
    expect(shouldPreviewConfirmation('?utm=1')).toBe(false)
    expect(shouldPreviewConfirmation('?previewConfirmation=true')).toBe(false)
    expect(shouldPreviewConfirmation('?previewConfirmation=0')).toBe(false)
  })

  it('is true when previewConfirmation=1 is present, alongside other params', () => {
    expect(shouldPreviewConfirmation('?previewConfirmation=1')).toBe(true)
    expect(shouldPreviewConfirmation('?lang=en&previewConfirmation=1')).toBe(true)
  })
})
