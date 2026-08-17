import { Box } from '@mui/material';
import videoBackground from '../../../assets/images/video_background.png';
import { themeColors } from '../../../config/themeColors.js';
import { useIntroYoutubeVideo } from '../../../hooks/useIntroYoutubeVideo.js';
import { useTranslation } from '../../../hooks/useTranslation.js';
import YoutubePosterPlayer from '../../common/YoutubePosterPlayer.jsx';

export default function DiscoverVideo({ autoplay = true }) {
  const { t } = useTranslation();
  const { videoId } = useIntroYoutubeVideo();
  const title = t('discover.videoTitle');

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'background.paper',
        p: { xs: 2, md: 4 },
        boxShadow: 3,
        border: '2px solid',
        borderColor: themeColors.secondary,
        borderRadius: 3,
      }}
    >
      <YoutubePosterPlayer
        videoId={videoId}
        title={title}
        playLabel={t('discover.videoPlayLabel')}
        posterSrc={videoBackground}
        posterAlt={title}
        autoplay={autoplay}
        bgcolor="transparent"
      />
    </Box>
  );
}
