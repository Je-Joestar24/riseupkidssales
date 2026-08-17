import { Box } from '@mui/material'
import { themeColors } from '../../config/themeColors.js'
import { useYoutubePosterPlayer } from '../../hooks/useYoutubePosterPlayer.js'

function PlayIcon({ size = 56 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
    </svg>
  )
}

export default function YoutubePosterPlayer({
  videoId,
  title,
  playLabel,
  posterSrc,
  posterAlt,
  autoplay = true,
  showPlayButton = true,
  naturalPoster = false,
}) {
  const { isPlaying, embedUrl, startPlayback } = useYoutubePosterPlayer({
    videoId,
    autoplay,
  })
  const useNaturalPoster = naturalPoster && !isPlaying

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        pt: useNaturalPoster ? 0 : '56.25%',
        bgcolor: 'common.black',
      }}
    >
      {!isPlaying ? (
        <Box
          component="button"
          type="button"
          onClick={startPlayback}
          aria-label={playLabel}
          sx={{
            position: useNaturalPoster ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: useNaturalPoster ? 'auto' : '100%',
            cursor: 'pointer',
            border: 0,
            p: 0,
            m: 0,
            display: 'block',
            bgcolor: 'transparent',
            ...(showPlayButton
              ? {
                  '&:hover .play-overlay': {
                    bgcolor: 'rgba(0,0,0,0.3)',
                  },
                  '&:hover .play-button': {
                    transform: 'scale(1.1)',
                  },
                }
              : {}),
          }}
        >
          <Box
            component="img"
            src={posterSrc}
            alt={posterAlt || title}
            sx={
              useNaturalPoster
                ? {
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                  }
                : {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }
            }
          />
          {showPlayButton ? (
            <Box
              className="play-overlay"
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(0,0,0,0.2)',
                transition: 'background-color 0.2s ease',
              }}
            >
              <Box
                className="play-button"
                sx={{
                  width: { xs: 80, md: 112 },
                  height: { xs: 80, md: 112 },
                  bgcolor: themeColors.accent,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 6,
                  color: 'white',
                  transition: 'transform 0.2s ease',
                  pl: '6px',
                  '& svg': {
                    width: { xs: 40, md: 56 },
                    height: { xs: 40, md: 56 },
                  },
                }}
              >
                <PlayIcon size={56} />
              </Box>
            </Box>
          ) : null}
        </Box>
      ) : (
        <Box
          component="iframe"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
        />
      )}
    </Box>
  )
}
