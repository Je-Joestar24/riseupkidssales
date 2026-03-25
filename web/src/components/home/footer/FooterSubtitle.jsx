import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function FooterSubtitle() {
  const { t } = useTranslation()

  return (
    <Typography
      component="p"
      sx={{
        fontSize: '1rem',
        color: 'grey.700',
        textAlign: { xs: 'center', md: 'left' },
        mt: 2,
        fontWeight: 600,
        maxWidth: { xs: '100%', md: '250px' },
      }}
    >
      {t('footer.subtitle')}
    </Typography>
  )
}
