import createCache from '@emotion/cache'

/** Emotion cache key aligned with MUI SSR expectations. */
const EMOTION_KEY = 'mui'

export function createEmotionCache() {
  return createCache({ key: EMOTION_KEY, prepend: true })
}
