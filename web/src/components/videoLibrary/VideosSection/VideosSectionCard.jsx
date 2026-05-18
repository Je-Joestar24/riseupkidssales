import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { Box, CardActionArea, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { themeColors } from '../../../config/themeColors.js'

export default function VideosSectionCard({
  videoId,
  thumbnail,
  duration,
  borderColor,
  overlayGradient,
}) {
  const { t } = useTranslation()
  const title = t(`videos.items.${videoId}.title`)
  const playLabel = t(`videos.items.${videoId}.playLabel`)

  return (
    <CardActionArea
      component="article"
      aria-label={playLabel}
      sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: '4px solid',
        borderColor,
        bgcolor: 'common.white',
        boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.06)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 20px 25px -5px rgba(133, 194, 185, 0.25), 0 8px 10px -6px rgba(15, 23, 42, 0.08)',
        },
        '&:hover .video-card-overlay': {
          background: `linear-gradient(180deg, rgba(255,255,255,0.1) 0%, ${borderColor}73 100%)`,
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={thumbnail}
          alt={title}
          loading="lazy"
          decoding="async"
          sx={{
            display: 'block',
            width: '100%',
            height: 192,
            objectFit: 'cover',
            filter: 'brightness(1.05) saturate(1.08)',
          }}
        />
        <Box
          className="video-card-overlay"
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background: overlayGradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.25s ease',
          }}
        >
          <Box
            sx={{
              bgcolor: 'common.white',
              borderRadius: '50%',
              p: 2,
              boxShadow: '0 10px 25px rgba(133, 194, 185, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlayArrowRoundedIcon
              sx={{
                width: 32,
                height: 32,
                color: themeColors.primary,
              }}
            />
          </Box>
        </Box>
        <Typography
          component="span"
          aria-hidden
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            px: 1.25,
            py: 0.5,
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: 600,
            lineHeight: 1.2,
            color: themeColors.schoolHeroLeadText,
            bgcolor: 'rgba(255, 255, 255, 0.92)',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.12)',
          }}
        >
          {duration}
        </Typography>
      </Box>
    </CardActionArea>
  )
}
