import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../constants/env.js', () => ({ RECAPTCHA_SITE_KEY: 'test-site-key' }))

const { executeRecaptcha, __resetRecaptchaForTests } = await import('../services/recaptchaService.js')

const ORIGINAL_WINDOW = globalThis.window
const ORIGINAL_DOCUMENT = globalThis.document

/**
 * This workspace has no jsdom/DOM-testing setup (unlike the admin frontend). Rather than adding
 * a new dependency for one file, a minimal fake `document`/`window` is enough to exercise the
 * real script-loading logic: create-element, append-to-head, and the load/error callbacks.
 */
function installFakeBrowser({ onAppend } = {}) {
  const scriptEl = { onload: null, onerror: null }
  const head = {
    appendChild: vi.fn((el) => {
      onAppend?.(el)
    }),
  }
  globalThis.document = {
    createElement: vi.fn(() => scriptEl),
    head,
  }
  globalThis.window = {}
  return { scriptEl, head }
}

beforeEach(() => {
  __resetRecaptchaForTests()
})

afterEach(() => {
  globalThis.window = ORIGINAL_WINDOW
  globalThis.document = ORIGINAL_DOCUMENT
  vi.restoreAllMocks()
})

describe('executeRecaptcha — configuration', () => {
  it('throws without touching the DOM when the site key is not configured', async () => {
    vi.doMock('../constants/env.js', () => ({ RECAPTCHA_SITE_KEY: '' }))
    vi.resetModules()
    const { executeRecaptcha: execWithNoKey } = await import('../services/recaptchaService.js')
    const { head } = installFakeBrowser()

    await expect(execWithNoKey('invitation')).rejects.toThrow(/not configured/i)
    expect(head.appendChild).not.toHaveBeenCalled()

    vi.doUnmock('../constants/env.js')
    vi.resetModules()
  })

  it('rejects outside a browser environment instead of throwing a raw ReferenceError', async () => {
    globalThis.window = undefined
    globalThis.document = undefined

    await expect(executeRecaptcha('invitation')).rejects.toThrow(/only available in the browser/i)
  })
})

describe('executeRecaptcha — script loading', () => {
  it('injects the script tag with the site key in the render param, marked async+defer', async () => {
    const { scriptEl, head } = installFakeBrowser({
      onAppend: (el) => {
        el.grecaptcha = { ready: (cb) => cb(), execute: () => Promise.resolve('token-abc') }
        globalThis.window.grecaptcha = el.grecaptcha
        el.onload()
      },
    })

    const token = await executeRecaptcha('invitation')

    expect(head.appendChild).toHaveBeenCalledTimes(1)
    expect(scriptEl.src).toBe('https://www.google.com/recaptcha/api.js?render=test-site-key')
    expect(scriptEl.async).toBe(true)
    expect(scriptEl.defer).toBe(true)
    expect(token).toBe('token-abc')
  })

  it('only injects the script once across multiple calls (cached load)', async () => {
    const { head } = installFakeBrowser({
      onAppend: (el) => {
        globalThis.window.grecaptcha = { ready: (cb) => cb(), execute: () => Promise.resolve('t') }
        el.onload()
      },
    })

    await executeRecaptcha('invitation')
    await executeRecaptcha('school_application')

    expect(head.appendChild).toHaveBeenCalledTimes(1)
  })

  it('resolves immediately without re-injecting the script if grecaptcha is already on window', async () => {
    globalThis.window = { grecaptcha: { ready: (cb) => cb(), execute: () => Promise.resolve('already-loaded') } }
    globalThis.document = { createElement: vi.fn(), head: { appendChild: vi.fn() } }

    const token = await executeRecaptcha('invitation')

    expect(document.createElement).not.toHaveBeenCalled()
    expect(token).toBe('already-loaded')
  })

  it('rejects when the script fails to load (network error)', async () => {
    installFakeBrowser({
      onAppend: (el) => {
        el.onerror()
      },
    })

    await expect(executeRecaptcha('invitation')).rejects.toThrow(/failed to load/i)
  })
})

describe('executeRecaptcha — action passthrough', () => {
  it('passes the exact action name and site key to grecaptcha.execute', async () => {
    const executeSpy = vi.fn(() => Promise.resolve('tok'))
    installFakeBrowser({
      onAppend: (el) => {
        globalThis.window.grecaptcha = { ready: (cb) => cb(), execute: executeSpy }
        el.onload()
      },
    })

    await executeRecaptcha('school_application')

    expect(executeSpy).toHaveBeenCalledWith('test-site-key', { action: 'school_application' })
  })

  it('propagates a rejection from grecaptcha.execute rather than swallowing it', async () => {
    installFakeBrowser({
      onAppend: (el) => {
        globalThis.window.grecaptcha = {
          ready: (cb) => cb(),
          execute: () => Promise.reject(new Error('execute failed')),
        }
        el.onload()
      },
    })

    await expect(executeRecaptcha('invitation')).rejects.toThrow('execute failed')
  })
})
