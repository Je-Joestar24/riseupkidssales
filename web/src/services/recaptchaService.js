import { RECAPTCHA_SITE_KEY } from '../constants/env.js'

/**
 * reCAPTCHA v3 — invisible bot check for the two public lead forms. Runs entirely in the
 * background: no checkbox, no puzzle, nothing a real parent/school ever sees. Scoring happens
 * server-side (see backend/services/captcha.service.js); this only mints the token to send along
 * with the submission.
 * @see https://developers.google.com/recaptcha/docs/v3
 */

let scriptLoadPromise = null

function loadScript() {
  if (scriptLoadPromise) return scriptLoadPromise

  scriptLoadPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      reject(new Error('reCAPTCHA is only available in the browser'))
      return
    }
    if (window.grecaptcha) {
      resolve(window.grecaptcha)
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.grecaptcha) resolve(window.grecaptcha)
      else reject(new Error('reCAPTCHA script loaded but grecaptcha is unavailable'))
    }
    script.onerror = () => reject(new Error('Failed to load the reCAPTCHA script'))
    document.head.appendChild(script)
  })

  return scriptLoadPromise
}

/**
 * @param {string} action - must match the action name the backend expects for this form
 *   (e.g. 'invitation', 'school_application') — a mismatched action is rejected server-side.
 * @returns {Promise<string>} a single-use token to send as `captchaToken`
 */
export async function executeRecaptcha(action) {
  if (!RECAPTCHA_SITE_KEY) {
    throw new Error('reCAPTCHA is not configured (VITE_RECAPTCHA_SITE_KEY is missing)')
  }

  const grecaptcha = await loadScript()

  return new Promise((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha.execute(RECAPTCHA_SITE_KEY, { action }).then(resolve).catch(reject)
    })
  })
}

/** Test-only: clears the cached script-load promise between tests. */
export function __resetRecaptchaForTests() {
  scriptLoadPromise = null
}
