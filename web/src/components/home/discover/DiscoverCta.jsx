import { Box, Button } from '@mui/material';
import { useTranslation } from '../../../hooks/useTranslation.js';

export default function DiscoverCta({ onClick, href, children }) {
  const { t } = useTranslation();
  const label = children ?? t('discover.cta');
  const buttonSx = {
    bgcolor: '#f2af10',
    color: 'white',
    px: 4,
    py: 2.5,
    fontSize: '1.5rem',
    borderRadius: 2,
    '&:hover': {
      bgcolor: '#e09e0e',
      opacity: 0.9,
    },
  };

  if (href) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Button component="a" href={href} sx={buttonSx} variant="contained" disableElevation>
          {label}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Button type="button" onClick={onClick} sx={buttonSx} variant="contained" disableElevation>
        {label}
      </Button>
    </Box>
  );
}
