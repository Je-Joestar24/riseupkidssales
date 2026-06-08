import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './slices/languageSlice'
import checkoutReducer from './slices/checkoutSlice'
import schoolApplicationReducer from './slices/schoolApplicationSlice'

const rootReducer = {
  language: languageReducer,
  checkout: checkoutReducer,
  schoolApplication: schoolApplicationReducer,
}

/** @param {object|undefined} preloadedState Redux preloaded state for SSR/hydration */
export function createAppStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export const store = createAppStore()

