import { Box, Button } from '@mui/material'
import whatsappLogo from '../../../assets/images/school/whatsapplogo.png'
import { themeColors } from '../../../config/themeColors.js'

const WHATSAPP_GREEN = '#25D366'

export default function WhatsAppCtaButton({ href, buttonLabel, buttonAria }) {
  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="outlined"
      aria-label={buttonAria}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: { xs: 1.5, md: 2 },
        px: { xs: 3.5, md: 4.5 },
        py: { xs: 1.75, md: 2 },
        fontSize: { xs: '1.0625rem', md: '1.125rem' },
        fontWeight: 700,
        lineHeight: 1.35,
        borderRadius: 2,
        textTransform: 'none',
        bgcolor: 'common.white',
        color: themeColors.schoolHeroLeadText,
        borderWidth: 3,
        borderColor: WHATSAPP_GREEN,
        boxShadow: 2,
        transition: 'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': {
          bgcolor: 'rgba(37, 211, 102, 0.08)',
          borderColor: WHATSAPP_GREEN,
          borderWidth: 3,
          boxShadow: 4,
          transform: 'scale(1.02)',
        },
      }}
    >
      <Box
        component="img"
        src={whatsappLogo}
        alt=""
        aria-hidden
        decoding="async"
        sx={{
          display: 'block',
          width: { xs: 32, md: 36 },
          height: { xs: 32, md: 36 },
          flexShrink: 0,
          objectFit: 'contain',
        }}
      />
      {buttonLabel}
    </Button>
  )
}
