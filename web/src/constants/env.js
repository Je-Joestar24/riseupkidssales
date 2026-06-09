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

