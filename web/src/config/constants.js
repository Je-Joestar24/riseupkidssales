// API configuration (mirrors main frontend behavior)
const envApiUrl = (import.meta.env.VITE_API_URL || '').trim()
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

// App meta
export const APP_NAME = 'Rise Up Kids – Sales'
export const APP_VERSION = '1.0.0'

// Shared user roles (if needed later)
export const USER_ROLES = {
  ADMIN: 'admin',
  PARENT: 'parent',
  CHILD: 'child',
}

// Shared storage keys (tokens, preferences)
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
}

