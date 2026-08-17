import { Box } from '@mui/material'
import schoolExperienceImage from '../../../assets/images/school_2nd_section.png'
import { useIntroYoutubeVideo } from '../../../hooks/useIntroYoutubeVideo.js'
import { useTranslation } from '../../../hooks/useTranslation.js'
import YoutubePosterPlayer from '../../common/YoutubePosterPlayer.jsx'

export default function EnglishExperienceMedia() {
  const { t } = useTranslation()
  const { videoId } = useIntroYoutubeVideo()
  const title = t('schools.experience.imageAlt')

  return (
    <Box
      sx={{
        maxWidth: 900,
        width: '100%',
        mx: 'auto',
        borderRadius: 1,
        boxShadow: 'none',
        transition: 'box-shadow 0.25s ease',
        '&:hover': {
          boxShadow: 12,
        },
      }}
    >
      <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <YoutubePosterPlayer
          videoId={videoId}
          title={title}
          playLabel={t('schools.experience.videoPlayLabel')}
          posterSrc={schoolExperienceImage}
          posterAlt={title}
          showPlayButton={false}
          naturalPoster
        />
      </Box>
    </Box>
  )
}
