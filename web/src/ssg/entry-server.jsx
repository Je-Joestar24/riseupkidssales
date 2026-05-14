import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'
import { theme } from '../config/theme.js'
import { createAppStore } from '../store/index.js'
import ScrollToTop from '../app/router/ScrollToTop.jsx'
import { AppRouteSwitch } from '../app/router/AppRouteSwitch.jsx'
import { createEmotionCache } from './emotionCache.js'

/**
 * Vite SSR entry: render the app for a given URL and return HTML + Emotion styles + Redux state.
 */
export function render(url) {
  const emotionCache = createEmotionCache()
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(emotionCache)
  const store = createAppStore()

  const appHtml = renderToString(
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StaticRouter location={url}>
            <ScrollToTop />
            <AppRouteSwitch />
          </StaticRouter>
        </ThemeProvider>
      </CacheProvider>
    </Provider>,
  )

  const chunks = extractCriticalToChunks(appHtml)
  const emotionStyleTags = constructStyleTagsFromChunks(chunks)
  const preloadedState = store.getState()

  return { appHtml, emotionStyleTags, preloadedState }
}
