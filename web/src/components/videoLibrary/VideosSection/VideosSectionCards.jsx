import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { VIDEO_LIBRARY_ITEMS } from '../../../config/videoLibraryVideos.js'
import VideosSectionCard from './VideosSectionCard.jsx'

export default function VideosSectionCards() {
  const { t } = useTranslation()

  if (VIDEO_LIBRARY_ITEMS.length === 0) {
    return (
      <Typography
        component="p"
        role="status"
        sx={{
          textAlign: 'center',
          fontSize: { xs: '1.125rem', md: '1.25rem' },
          fontWeight: 600,
          color: 'grey.600',
          maxWidth: 640,
          mx: 'auto',
          py: 4,
        }}
      >
        {t('videos.section.empty')}
      </Typography>
    )
  }

  return (
    <Box
      role="list"
      aria-label={t('videos.section.gridAria')}
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 3,
      }}
    >
      {VIDEO_LIBRARY_ITEMS.map((video) => (
        <Box key={video.id} role="listitem" sx={{ minWidth: 0 }}>
          <VideosSectionCard {...video} videoId={video.id} />
        </Box>
      ))}
    </Box>
  )
}
