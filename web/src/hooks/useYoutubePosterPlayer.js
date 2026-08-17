import { useEffect, useState } from 'react'
import { getIntroYoutubeEmbedUrl } from '../config/introYoutubeVideos.js'

export function useYoutubePosterPlayer({ videoId, autoplay = true }) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setIsPlaying(false)
  }, [videoId])

  return {
    isPlaying,
    embedUrl: getIntroYoutubeEmbedUrl(videoId, { autoplay }),
    startPlayback: () => setIsPlaying(true),
  }
}

export default useYoutubePosterPlayer
