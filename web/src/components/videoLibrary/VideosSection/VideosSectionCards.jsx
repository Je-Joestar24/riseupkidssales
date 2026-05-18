import { Box } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { VIDEO_LIBRARY_ITEMS } from '../../../config/videoLibraryVideos.js'
import VideosSectionCard from './VideosSectionCard.jsx'

export default function VideosSectionCards() {
  const { t } = useTranslation()

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
