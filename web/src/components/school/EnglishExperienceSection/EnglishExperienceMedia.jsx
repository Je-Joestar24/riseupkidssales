import { Box } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import schoolExperienceImage from '../../../assets/images/school_2nd_section.png'

export default function EnglishExperienceMedia() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        maxWidth: 900,
        width: '100%',
        mx: 'auto',
        borderRadius: 1,
        overflow: 'hidden',
        boxShadow: 12,
      }}
    >
      <Box
        component="img"
        src={schoolExperienceImage}
        alt={t('schools.experience.imageAlt')}
        loading="lazy"
        decoding="async"
        sx={{
          display: 'block',
          width: '100%',
          height: 'auto',
        }}
      />
    </Box>
  )
}
