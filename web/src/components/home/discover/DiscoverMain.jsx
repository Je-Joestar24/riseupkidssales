import { Box, Container } from '@mui/material';
import DiscoverHeader from './DiscoverHeader';
import DiscoverVideo from './DiscoverVideo';
import DiscoverCta from './DiscoverCta';

export default function DiscoverMain(props) {
  return (
    <Box
      component="section"
      aria-labelledby="discover-heading"
      sx={{ px: { xs: 2, sm: 3 }, py: 10, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        <DiscoverHeader />
        <DiscoverVideo videoId={props.videoId} autoplay={props.videoAutoplay} />
        <DiscoverCta onClick={props.onCtaClick} href={props.ctaHref}>
          {props.ctaLabel}
        </DiscoverCta>
      </Container>
    </Box>
  );
}
