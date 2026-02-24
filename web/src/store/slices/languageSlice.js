import { createSlice } from '@reduxjs/toolkit'

const getInitialLanguage = () => {
  const stored = window.localStorage.getItem('lang')
  if (stored === 'pt' || stored === 'en' || stored === 'es') {
    return stored
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
      state.current = action.payload
      window.localStorage.setItem('lang', action.payload)
    },
  },
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer

