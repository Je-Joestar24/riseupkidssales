import { Stack, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

const bodySx = {
  fontSize: { xs: '1.125rem', md: '1.25rem' },
  lineHeight: 1.65,
  fontWeight: 600,
  color: 'grey.700',
  m: 0,
}

export default function DifferentApproachBody() {
  const { t } = useTranslation()

  return (
    <Stack spacing={3} sx={{ textAlign: 'left' }}>
      <Typography component="p" sx={bodySx}>
        {t('schools.differentApproach.p1')}
      </Typography>
      <Typography component="p" sx={bodySx}>
        {t('schools.differentApproach.p2')}
      </Typography>
      <Typography
        component="p"
        sx={{
          ...bodySx,
          color: 'orange.main',
          fontWeight: 600,
        }}
      >
        {t('schools.differentApproach.p3')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          lineHeight: 1.5,
          fontWeight: 700,
          color: 'orange.main',
          m: 0,
          pt: 2,
        }}
      >
        {t('schools.differentApproach.p4')}
      </Typography>
    </Stack>
  )
}
