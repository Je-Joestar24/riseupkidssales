import { Typography } from '@mui/material'

export default function WhatsAppCtaPrompt({ prompt }) {
  return (
    <Typography
      component="p"
      id="school-whatsapp-cta-heading"
      sx={{
        fontSize: { xs: '1.25rem', md: '1.5rem' },
        fontWeight: 700,
        color: 'grey.800',
        lineHeight: 1.5,
        mb: { xs: 3, md: 3.5 },
        maxWidth: 520,
        mx: 'auto',
      }}
    >
      {prompt}
    </Typography>
  )
}
