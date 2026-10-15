import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../axios', () => ({ default: { post: vi.fn() } }))
vi.mock('../services/recaptchaService.js', () => ({ executeRecaptcha: vi.fn() }))

const { default: api } = await import('../axios')
const { executeRecaptcha } = await import('../services/recaptchaService.js')
const { verifyExperienceEmail, restoreExperienceSession } = await import(
  '../services/experienceService.js'
)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('verifyExperienceEmail', () => {
  it('gets a reCAPTCHA token for the "experience_access" action and sends it with the email and language', async () => {
    executeRecaptcha.mockResolvedValue('captcha-abc')
    api.post.mockResolvedValue({ data: { success: true, data: { token: 't', videos: [] } } })

    const result = await verifyExperienceEmail('maria@example.com', 'es')

    expect(executeRecaptcha).toHaveBeenCalledWith('experience_access')
    expect(api.post).toHaveBeenCalledWith('/experience/verify', {
      email: 'maria@example.com',
      language: 'es',
      captchaToken: 'captcha-abc',
    })
    expect(result).toEqual({ success: true, data: { token: 't', videos: [] } })
  })

  it('never contacts the server if the reCAPTCHA token cannot be obtained', async () => {
    executeRecaptcha.mockRejectedValue(new Error('reCAPTCHA is not configured'))

    await expect(verifyExperienceEmail('maria@example.com', 'pt')).rejects.toThrow(/not configured/)
    expect(api.post).not.toHaveBeenCalled()
  })

  it('lets a server rejection through unchanged, so the caller can read its status and code', async () => {
    executeRecaptcha.mockResolvedValue('captcha-abc')
    const denied = Object.assign(new Error('403'), {
      response: { status: 403, data: { code: 'EXPERIENCE_ACCESS_DENIED' } },
    })
    api.post.mockRejectedValue(denied)

    await expect(verifyExperienceEmail('nobody@example.com', 'pt')).rejects.toBe(denied)
  })
})

describe('restoreExperienceSession', () => {
  it('posts the stored token and language — and does not use reCAPTCHA (no email is checked)', async () => {
    api.post.mockResolvedValue({ data: { success: true, data: { videos: ['v'] } } })

    const result = await restoreExperienceSession('stored-token', 'pt')

    expect(api.post).toHaveBeenCalledWith('/experience/session', {
      token: 'stored-token',
      language: 'pt',
    })
    expect(executeRecaptcha).not.toHaveBeenCalled()
    expect(result).toEqual({ success: true, data: { videos: ['v'] } })
  })

  it('never puts the token in the URL', async () => {
    api.post.mockResolvedValue({ data: { success: true, data: { videos: [] } } })

    await restoreExperienceSession('stored-token', 'pt')

    expect(api.post.mock.calls[0][0]).toBe('/experience/session')
    expect(api.post.mock.calls[0][0]).not.toContain('stored-token')
  })
})
