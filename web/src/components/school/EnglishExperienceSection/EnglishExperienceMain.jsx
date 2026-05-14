import { Box, Container, Stack } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import EnglishExperienceTitle from './EnglishExperienceTitle.jsx'
import EnglishExperienceSubtitle from './EnglishExperienceSubtitle.jsx'
import EnglishExperienceMedia from './EnglishExperienceMedia.jsx'

export default function EnglishExperienceMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-label={t('schools.experience.sectionAria')}
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 12, md: 15 },
        bgcolor: 'common.white',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1152,
          mx: 'auto',
        }}
      >
        <Stack
          spacing={0}
          sx={{
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <EnglishExperienceTitle />
          <EnglishExperienceSubtitle />
          <EnglishExperienceMedia />
        </Stack>
      </Container>
    </Box>
  )
}
