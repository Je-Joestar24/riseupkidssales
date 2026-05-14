import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './slices/languageSlice'
import checkoutReducer from './slices/checkoutSlice'

const rootReducer = {
  language: languageReducer,
  checkout: checkoutReducer,
}

/** @param {object|undefined} preloadedState Redux preloaded state for SSR/hydration */
export function createAppStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export const store = createAppStore()

