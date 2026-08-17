import { getIntroYoutubeVideoId } from '../config/introYoutubeVideos.js'
import { useTranslation } from './useTranslation.js'

export function useIntroYoutubeVideo() {
  const { language } = useTranslation()

  return {
    videoId: getIntroYoutubeVideoId(language),
  }
}

export default useIntroYoutubeVideo
