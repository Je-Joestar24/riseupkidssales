const raw = (value) => (typeof value === 'string' ? value.trim() : '')

const envApiUrl = raw(import.meta.env.VITE_API_URL)
const useRemoteApi = envApiUrl.startsWith('http')

export const API_BASE_URL = useRemoteApi
  ? envApiUrl.replace(/\/+$/, '')
  : import.meta.env.DEV
    ? '/api'
    : envApiUrl || 'http://localhost:5000/api'

export const BACKEND_BASE_URL = useRemoteApi
  ? envApiUrl.replace(/\/api\/?$/, '').replace(/\/+$/, '')
  : import.meta.env.DEV
    ? ''
    : envApiUrl.replace(/\/api\/?$/, '') || 'http://localhost:5000'

export const APP_URL = raw(import.meta.env.VITE_APP_URL)
export const LMS_BASE_URL = raw(import.meta.env.VITE_LMS_URL)

export const LMS_LOGIN_URL = LMS_BASE_URL ? new URL('login', LMS_BASE_URL).toString() : ''

/** E.164 digits only (e.g. 5511999887766). Set VITE_SCHOOLS_WHATSAPP_NUMBER at build time. */
export const SCHOOLS_WHATSAPP_PHONE = raw(import.meta.env.VITE_SCHOOLS_WHATSAPP_NUMBER).replace(/\D/g, '')

/**
 * Free Smoothie Experience page (/experiencia). All public links; a button whose link is empty is
 * simply not shown. Spanish falls back to the Portuguese form until a Spanish form exists.
 */
export const EXPERIENCE_SIGNUP_URL_PT = raw(import.meta.env.VITE_EXPERIENCE_SIGNUP_URL_PT)
export const EXPERIENCE_SIGNUP_URL_ES = raw(import.meta.env.VITE_EXPERIENCE_SIGNUP_URL_ES)
export const EXPERIENCE_JOIN_URL = raw(import.meta.env.VITE_EXPERIENCE_JOIN_URL) || 'https://riseup.kids'
/** Hosted on our own domain (served from public/downloads). */
export const EXPERIENCE_RECIPE_URL =
  raw(import.meta.env.VITE_EXPERIENCE_RECIPE_URL) || '/downloads/strawberry-banana-smoothie-recipe.pdf'

/** Public by design (reCAPTCHA site keys are meant to ship in client code) — the matching secret
 * key stays server-side only, see backend/.env.example's RECAPTCHA_SECRET_KEY. */
export const RECAPTCHA_SITE_KEY = raw(import.meta.env.VITE_RECAPTCHA_SITE_KEY)

