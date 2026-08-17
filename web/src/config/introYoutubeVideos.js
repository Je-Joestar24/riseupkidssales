import { normalizeSalesPageLanguage } from '../constants/salesPageConfig.js'

export const INTRO_YOUTUBE_VIDEO_IDS = {
  en: 'LF4X4pTTYqA',
  es: 'TzrPbeTtu1k',
  pt: 'pwBgh8H6quo',
}

export function getIntroYoutubeVideoId(language) {
  const code = normalizeSalesPageLanguage(language)
  return INTRO_YOUTUBE_VIDEO_IDS[code] || INTRO_YOUTUBE_VIDEO_IDS.pt
}

export function getIntroYoutubeEmbedUrl(videoId, { autoplay = true } = {}) {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
  })
  if (autoplay) params.set('autoplay', '1')
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}
