import api from '../axios'
import { executeRecaptcha } from './recaptchaService.js'

/**
 * Free Smoothie Experience page. The email is checked on the server against the Flodesk freebie
 * segment; the video links come back in the response only if it passes.
 *
 * @param {string} email
 * @param {string} language - pt | es
 * @returns {Promise<{ success: boolean, data: { token: string, videos: string[] } }>}
 */
export async function verifyExperienceEmail(email, language) {
  const captchaToken = await executeRecaptcha('experience_access')
  const response = await api.post('/experience/verify', { email, language, captchaToken })
  return response.data
}

/**
 * Re-opens the page on a device that already passed the check, using the token the server issued.
 *
 * @param {string} token
 * @param {string} language - pt | es
 * @returns {Promise<{ success: boolean, data: { videos: string[] } }>}
 */
export async function restoreExperienceSession(token, language) {
  const response = await api.post('/experience/session', { token, language })
  return response.data
}
