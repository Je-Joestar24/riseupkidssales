import { Stack, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

const paragraphSx = {
  fontSize: { xs: '1.125rem', md: '1.25rem' },
  lineHeight: 1.65,
  fontWeight: 600,
  color: 'grey.700',
  textAlign: 'center',
  m: 0,
}

export default function ImplementationSubtitle() {
  const { t } = useTranslation()

  return (
    <Stack spacing={2} sx={{ mb: 4 }}>
      <Typography component="p" sx={paragraphSx}>
        {t('schools.implementation.p1')}
      </Typography>
      <Typography component="p" sx={paragraphSx}>
        {t('schools.implementation.p2')}
      </Typography>
    </Stack>
  )
}
