import { useState } from 'react';
import { Box } from '@mui/material';
import videoBackground from '../../../assets/images/video_background.png';

const DEFAULT_VIDEO_ID = 'dQw4w9WgXcQ';

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
  );
}

export default function DiscoverVideo({ videoId = DEFAULT_VIDEO_ID, autoplay = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  const handlePlay = () => setIsPlaying(true);

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'background.paper',
        p: { xs: 2, md: 4 },
        boxShadow: 3,
        border: '2px solid',
        borderColor: '#62caca',
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          pt: '56.25%',
        }}
      >
        {!isPlaying ? (
          <Box
            component="button"
            type="button"
            onClick={handlePlay}
            aria-label="Play video: Rise Up Kids - Como Funciona"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              border: 0,
              p: 0,
              m: 0,
              display: 'block',
              '&:hover .play-overlay': {
                bgcolor: 'rgba(0,0,0,0.3)',
              },
              '&:hover .play-button': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <Box
              component="img"
              src={videoBackground}
              alt="Rise Up Kids - Como Funciona"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
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
                  bgcolor: '#f2af10',
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
          </Box>
        ) : (
          <Box
            component="iframe"
            src={embedUrl}
            title="Rise Up Kids - Como Funciona"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        )}
      </Box>
    </Box>
  );
}
