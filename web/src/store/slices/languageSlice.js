import { createSlice } from '@reduxjs/toolkit'
import { normalizeSalesPageLanguage } from '../../constants/salesPageConfig.js'

const getLangFromUrl = () => {
  if (typeof window === 'undefined') return null
  const param = new URLSearchParams(window.location.search).get('lang')
  if (param === 'pt' || param === 'en' || param === 'es') return normalizeSalesPageLanguage(param)
  return null
}

const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return 'pt'
  }
  const fromUrl = getLangFromUrl()
  if (fromUrl) return fromUrl
  const stored = window.localStorage.getItem('lang')
  if (stored === 'pt' || stored === 'en' || stored === 'es') {
    return normalizeSalesPageLanguage(stored)
  }
  return 'pt'
}

const initialState = {
  current: getInitialLanguage(),
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.current = normalizeSalesPageLanguage(action.payload)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('lang', action.payload)
      }
    },
  },
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer

