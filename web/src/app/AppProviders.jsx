import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import { Provider } from 'react-redux'
import { theme } from '../config/theme.js'
import ClientRouter from './router/ClientRouter.jsx'
import { createEmotionCache } from '../ssg/emotionCache.js'

/**
 * Root tree for the browser: Redux, MUI theme, Emotion cache (aligned with SSG), routes.
 */
export default function AppProviders({ store, emotionCache }) {
  const cache = emotionCache ?? createEmotionCache()

  return (
    <Provider store={store}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ClientRouter />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}
