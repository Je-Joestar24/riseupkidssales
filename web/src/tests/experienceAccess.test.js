import { describe, expect, it, vi } from 'vitest'
import {
  clearStoredToken,
  experienceLanguage,
  isBunnyEmbedUrl,
  isPlausibleEmail,
  pickJoinUrl,
  pickSignupUrl,
  readStoredToken,
  restoreAccess,
  storeToken,
  submitEmail,
  tokenStorageKey,
  withPlayerParams,
} from '../utils/experienceAccess.js'

function fakeStorage(initial = {}) {
  const data = { ...initial }
  return {
    data,
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value)
    },
    removeItem: (key) => {
      delete data[key]
    },
  }
}

const throwingStorage = {
  getItem: () => {
    throw new Error('blocked')
  },
  setItem: () => {
    throw new Error('blocked')
  },
  removeItem: () => {
    throw new Error('blocked')
  },
}

function httpError(status, code) {
  return Object.assign(new Error(`HTTP ${status}`), { response: { status, data: { code } } })
}

const VIDEOS = [
  'https://player.mediadelivery.net/embed/660084/one',
  'https://player.mediadelivery.net/embed/660084/two',
]

describe('language and storage keys', () => {
  it('only Spanish is Spanish; anything else is the Portuguese page', () => {
    expect(experienceLanguage('es')).toBe('es')
    expect(experienceLanguage(' ES ')).toBe('es')
    expect(experienceLanguage('pt')).toBe('pt')
    expect(experienceLanguage('en')).toBe('pt')
    expect(experienceLanguage(undefined)).toBe('pt')
  })

  it('keeps a separate stored token per language', () => {
    expect(tokenStorageKey('pt')).not.toBe(tokenStorageKey('es'))
  })
})

describe('isPlausibleEmail', () => {
  it('accepts normal addresses and rejects everything else', () => {
    expect(isPlausibleEmail('maria@example.com')).toBe(true)
    expect(isPlausibleEmail('  maria@example.com ')).toBe(true)
    expect(isPlausibleEmail('maria@example')).toBe(false)
    expect(isPlausibleEmail('maria example.com')).toBe(false)
    expect(isPlausibleEmail('')).toBe(false)
    expect(isPlausibleEmail(undefined)).toBe(false)
    expect(isPlausibleEmail({ email: 'a@b.co' })).toBe(false)
  })
})

describe('isBunnyEmbedUrl — only Bunny player links may ever be framed', () => {
  it('accepts https links on Bunny embed hosts', () => {
    expect(isBunnyEmbedUrl('https://player.mediadelivery.net/embed/1/abc')).toBe(true)
    expect(isBunnyEmbedUrl('https://iframe.mediadelivery.net/embed/1/abc')).toBe(true)
  })

  it('rejects other hosts, look-alikes, plain http, and non-URLs', () => {
    expect(isBunnyEmbedUrl('https://evil.example.com/embed/1/abc')).toBe(false)
    expect(isBunnyEmbedUrl('https://player.mediadelivery.net.evil.example/x')).toBe(false)
    expect(isBunnyEmbedUrl('http://player.mediadelivery.net/embed/1/abc')).toBe(false)
    expect(isBunnyEmbedUrl('javascript:alert(1)')).toBe(false)
    expect(isBunnyEmbedUrl('not a url')).toBe(false)
    expect(isBunnyEmbedUrl(undefined)).toBe(false)
  })
})

describe('withPlayerParams — the video player settings', () => {
  it('adds no-autoplay, preload and responsive to a plain embed link', () => {
    expect(withPlayerParams('https://player.mediadelivery.net/embed/1/abc')).toBe(
      'https://player.mediadelivery.net/embed/1/abc?autoplay=false&preload=true&responsive=true'
    )
  })

  it('appends to a link that already has a query string instead of breaking it', () => {
    expect(withPlayerParams('https://player.mediadelivery.net/embed/1/abc?token=x')).toBe(
      'https://player.mediadelivery.net/embed/1/abc?token=x&autoplay=false&preload=true&responsive=true'
    )
  })

  it('still produces a link that is a valid Bunny embed URL', () => {
    expect(isBunnyEmbedUrl(withPlayerParams('https://player.mediadelivery.net/embed/1/abc'))).toBe(true)
  })
})

describe('token storage', () => {
  it('stores, reads back, and clears a token for its own language only', () => {
    const storage = fakeStorage()

    expect(storeToken(storage, 'pt', 'tok-pt')).toBe(true)

    expect(readStoredToken(storage, 'pt')).toBe('tok-pt')
    expect(readStoredToken(storage, 'es')).toBeNull()

    clearStoredToken(storage, 'pt')
    expect(readStoredToken(storage, 'pt')).toBeNull()
  })

  it('never throws when storage is blocked or missing', () => {
    expect(readStoredToken(throwingStorage, 'pt')).toBeNull()
    expect(storeToken(throwingStorage, 'pt', 'x')).toBe(false)
    expect(() => clearStoredToken(throwingStorage, 'pt')).not.toThrow()
    expect(readStoredToken(null, 'pt')).toBeNull()
    expect(() => clearStoredToken(null, 'pt')).not.toThrow()
  })
})

describe('pickSignupUrl', () => {
  it('uses the form for the page language', () => {
    const links = { pt: 'https://form/pt', es: 'https://form/es' }
    expect(pickSignupUrl('pt', links)).toBe('https://form/pt')
    expect(pickSignupUrl('es', links)).toBe('https://form/es')
  })

  it('falls back to the other form until a Spanish one exists, and to empty if none', () => {
    expect(pickSignupUrl('es', { pt: 'https://form/pt', es: '' })).toBe('https://form/pt')
    expect(pickSignupUrl('pt', { pt: '', es: 'https://form/es' })).toBe('https://form/es')
    expect(pickSignupUrl('pt', {})).toBe('')
  })
})

describe('pickJoinUrl — the join button', () => {
  it('goes to the parents page, not the bare home page', () => {
    expect(pickJoinUrl('pt')).toBe('/parents?lang=pt')
    expect(pickJoinUrl('pt', '')).toBe('/parents?lang=pt')
    expect(pickJoinUrl('pt', '   ')).toBe('/parents?lang=pt')
    expect(pickJoinUrl('pt')).not.toBe('/')
  })

  it('keeps Spanish visitors on the Spanish parents page, and anything else on Portuguese', () => {
    expect(pickJoinUrl('es')).toBe('/parents?lang=es')
    expect(pickJoinUrl('en')).toBe('/parents?lang=pt')
    expect(pickJoinUrl(undefined)).toBe('/parents?lang=pt')
  })

  it('uses a custom link from the settings exactly as given', () => {
    expect(pickJoinUrl('pt', 'https://riseup.kids/parents?x=1')).toBe('https://riseup.kids/parents?x=1')
    expect(pickJoinUrl('es', 'https://example.com/join')).toBe('https://example.com/join')
  })
})

describe('restoreAccess — a returning device', () => {
  it('with no stored token it stays locked and never calls the server', async () => {
    const restore = vi.fn()

    const result = await restoreAccess({ storage: fakeStorage(), language: 'pt', restore })

    expect(result).toEqual({ status: 'locked' })
    expect(restore).not.toHaveBeenCalled()
  })

  it('a valid stored token unlocks the page with the videos the server returns', async () => {
    const storage = fakeStorage({ [tokenStorageKey('pt')]: 'good-token' })
    const restore = vi.fn().mockResolvedValue({ success: true, data: { videos: VIDEOS } })

    const result = await restoreAccess({ storage, language: 'pt', restore })

    expect(restore).toHaveBeenCalledWith('good-token', 'pt')
    expect(result).toEqual({ status: 'unlocked', videos: VIDEOS })
  })

  it('a token the server rejects (403) is cleared, so it is not retried on every visit', async () => {
    const storage = fakeStorage({ [tokenStorageKey('pt')]: 'stale-token' })
    const restore = vi.fn().mockRejectedValue(httpError(403, 'EXPERIENCE_TOKEN_INVALID'))

    const result = await restoreAccess({ storage, language: 'pt', restore })

    expect(result).toEqual({ status: 'locked' })
    expect(readStoredToken(storage, 'pt')).toBeNull()
  })

  it('a network failure stays locked but KEEPS the token, so the next visit can retry', async () => {
    const storage = fakeStorage({ [tokenStorageKey('pt')]: 'good-token' })
    const restore = vi.fn().mockRejectedValue(new Error('Network Error'))

    const result = await restoreAccess({ storage, language: 'pt', restore })

    expect(result).toEqual({ status: 'locked' })
    expect(readStoredToken(storage, 'pt')).toBe('good-token')
  })

  it('a malformed server answer never unlocks anything', async () => {
    const storage = fakeStorage({ [tokenStorageKey('pt')]: 'tok' })

    for (const answer of [undefined, {}, { success: true }, { success: true, data: {} }, { success: false }]) {
      const result = await restoreAccess({ storage, language: 'pt', restore: async () => answer })
      expect(result.status).toBe('locked')
    }
  })

  it("the Portuguese token is not used for the Spanish page", async () => {
    const storage = fakeStorage({ [tokenStorageKey('pt')]: 'pt-token' })
    const restore = vi.fn()

    const result = await restoreAccess({ storage, language: 'es', restore })

    expect(result).toEqual({ status: 'locked' })
    expect(restore).not.toHaveBeenCalled()
  })
})

describe('submitEmail — the email form', () => {
  it('a confirmed subscriber unlocks the page and the device remembers the token', async () => {
    const storage = fakeStorage()
    const verify = vi.fn().mockResolvedValue({ success: true, data: { token: 'new-token', videos: VIDEOS } })

    const result = await submitEmail({ email: '  maria@example.com ', storage, language: 'pt', verify })

    expect(verify).toHaveBeenCalledWith('maria@example.com', 'pt')
    expect(result).toEqual({ status: 'unlocked', videos: VIDEOS })
    expect(readStoredToken(storage, 'pt')).toBe('new-token')
  })

  it('the email itself is never stored on the device', async () => {
    const storage = fakeStorage()
    const verify = async () => ({ success: true, data: { token: 't', videos: VIDEOS } })

    await submitEmail({ email: 'maria@example.com', storage, language: 'pt', verify })

    expect(JSON.stringify(storage.data)).not.toContain('maria')
  })

  it('a non-email is rejected locally without calling the server', async () => {
    const verify = vi.fn()

    const result = await submitEmail({ email: 'nope', storage: fakeStorage(), language: 'pt', verify })

    expect(result).toEqual({ status: 'locked', error: 'invalidEmail' })
    expect(verify).not.toHaveBeenCalled()
  })

  it('"not registered" from the server shows the sign-up prompt and stores nothing', async () => {
    const storage = fakeStorage()
    const verify = vi.fn().mockRejectedValue(httpError(403, 'EXPERIENCE_ACCESS_DENIED'))

    const result = await submitEmail({ email: 'nobody@example.com', storage, language: 'pt', verify })

    expect(result).toEqual({ status: 'locked', error: 'notRegistered' })
    expect(storage.data).toEqual({})
  })

  it('a rejected bot check (400) is reported as a verification problem, not as "not registered"', async () => {
    const verify = vi.fn().mockRejectedValue(httpError(400))

    const result = await submitEmail({ email: 'a@example.com', storage: fakeStorage(), language: 'pt', verify })

    expect(result).toEqual({ status: 'locked', error: 'verification' })
  })

  it.each([
    ['server error', httpError(503)],
    ['rate limited', httpError(429)],
    ['network down', new Error('Network Error')],
    ['reCAPTCHA not loading', new Error('Failed to load the reCAPTCHA script')],
  ])('%s is "try again", never "not registered"', async (_label, error) => {
    const verify = vi.fn().mockRejectedValue(error)

    const result = await submitEmail({ email: 'a@example.com', storage: fakeStorage(), language: 'pt', verify })

    expect(result).toEqual({ status: 'locked', error: 'unavailable' })
  })

  it('a success answer without a token or video list does not unlock anything', async () => {
    for (const answer of [{ success: true }, { success: true, data: { token: 't' } }, { success: true, data: { videos: VIDEOS } }]) {
      const result = await submitEmail({
        email: 'a@example.com',
        storage: fakeStorage(),
        language: 'pt',
        verify: async () => answer,
      })
      expect(result.status).toBe('locked')
    }
  })

  it('still unlocks for the current visit even if the device cannot store the token', async () => {
    const verify = async () => ({ success: true, data: { token: 't', videos: VIDEOS } })

    const result = await submitEmail({ email: 'a@example.com', storage: throwingStorage, language: 'pt', verify })

    expect(result.status).toBe('unlocked')
  })
})
