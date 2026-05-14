import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import '@fontsource/quicksand/300.css'
import '@fontsource/quicksand/400.css'
import '@fontsource/quicksand/500.css'
import '@fontsource/quicksand/600.css'
import '@fontsource/quicksand/700.css'
import '../assets/css/index.css'
import AppProviders from '../app/AppProviders.jsx'
import { createAppStore } from '../store/index.js'
import { createEmotionCache } from '../ssg/emotionCache.js'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Missing #root')
}

const preloaded = window.__RUK_PRELOADED_STATE__
if (preloaded) {
  delete window.__RUK_PRELOADED_STATE__
}

const store = createAppStore(preloaded)
const emotionCache = createEmotionCache()

const tree = (
  <StrictMode>
    <AppProviders store={store} emotionCache={emotionCache} />
  </StrictMode>
)

if (container.firstChild) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
