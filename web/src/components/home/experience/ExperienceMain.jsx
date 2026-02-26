import { Box, Container, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import ExperienceHeader from './ExperienceHeader.jsx'
import ExperienceList from './ExperienceList.jsx'

export default function ExperienceMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-labelledby="experience-heading"
      sx={{
        px: { xs: 2, sm: 3 },
        py: 10,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
          }}
        >
          <ExperienceHeader />
        </Box>
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: { xs: 4, md: 6 },
            boxShadow: 3,
            border: '4px solid',
            borderColor: 'secondary.main',
            borderRadius: 3,
          }}
        >
          <ExperienceList />
          <Box
            sx={{
              mt: 4,
              pt: 4,
              borderTop: '2px solid',
              borderColor: '#d4e6e3',
            }}
          >
            <Typography
              component="p"
              sx={{
                fontSize: '1.125rem',
                color: 'grey.700',
                lineHeight: 1.6,
              }}
            >
              <Box component="span" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                {t('experience.footerPhysical')}
              </Box>
              <br />
              <Box component="span" sx={{ fontWeight: 600,fontSize: '1rem' }}>
                {t('experience.footerDigital')}
              </Box>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
