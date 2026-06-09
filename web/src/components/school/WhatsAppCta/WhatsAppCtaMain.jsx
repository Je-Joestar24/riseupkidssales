import { Box, Container, Stack } from '@mui/material'
import { useSchoolWhatsAppCta } from '../../../hooks/useSchoolWhatsAppCta.js'
import { themeColors } from '../../../config/themeColors.js'
import WhatsAppCtaPrompt from './WhatsAppCtaPrompt.jsx'
import WhatsAppCtaButton from './WhatsAppCtaButton.jsx'

export default function WhatsAppCtaMain() {
  const { prompt, buttonLabel, buttonAria, sectionAria, href, isAvailable } = useSchoolWhatsAppCta()

  if (!isAvailable) return null

  return (
    <Box
      component="section"
      id="school-whatsapp-cta"
      aria-labelledby="school-whatsapp-cta-heading"
      aria-label={sectionAria}
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 10, md: 12 },
        bgcolor: themeColors.schoolIconWellMint,
        scrollMarginTop: { xs: 72, md: 88 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 768,
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            bgcolor: 'common.white',
            borderRadius: 3,
            boxShadow: 4,
            px: { xs: 3, sm: 4, md: 5 },
            py: { xs: 4, md: 5 },
            border: '2px solid',
            borderColor: themeColors.primary,
            textAlign: 'center',
          }}
        >
          <Stack spacing={0} alignItems="center">
            <WhatsAppCtaPrompt prompt={prompt} />
            <WhatsAppCtaButton href={href} buttonLabel={buttonLabel} buttonAria={buttonAria} />
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
