import { Box, Typography } from '@mui/material';
import { useTranslation } from '../../../hooks/useTranslation.js';

export default function DiscoverHeader() {
  const { t } = useTranslation();
  return (
    <Box sx={{ textAlign: 'center', mb: 8 }}>
      <Typography
        id="discover-heading"
        component="h2"
        variant="h3"
        sx={{
          color: 'rgb(75, 85, 99)',
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: '2.5rem', md: '3.75rem' },
        }}
      >
        {t('discover.title')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: '1.5rem',
          color: 'rgb(55, 65, 81)',
          fontWeight: 600,
          mb: 2,
        }}
      >
        {t('discover.subtitle')}
      </Typography>
      <Typography
        component="p"
        sx={{ fontSize: '1.25rem', color: 'rgb(75, 85, 99)', fontWeight: 600 }}
      >
        {t('discover.subtitle2')}
      </Typography>
    </Box>
  );
}
