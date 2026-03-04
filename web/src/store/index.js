import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './slices/languageSlice'
import checkoutReducer from './slices/checkoutSlice'

export const store = configureStore({
  reducer: {
    language: languageReducer,
    checkout: checkoutReducer,
  },
})

