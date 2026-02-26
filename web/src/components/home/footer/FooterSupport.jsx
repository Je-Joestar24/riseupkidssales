import { Box, Link, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function FooterSupport() {
  const { t } = useTranslation()
  const email = t('footer.contactEmail')

  return (
    <Box>
      <Typography
        component="h4"
        sx={{
          fontSize: '1.5rem',
          mb: 2,
          color: 'secondary.main',
          fontWeight: 600
        }}
      >
        {t('footer.support')}
      </Typography>
      <Box sx={{ '& > * + *': { mt: 1 } }}>
        <Typography
          component="span"
          sx={{
            display: 'block',
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'grey.700',
            fontWeight: 600
          }}
        >
          {t('footer.contact')}
        </Typography>
        <Link
          href={`mailto:${email}`}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '1.125rem',
            color: 'secondary.main',
            textDecoration: 'none',
            '&:hover': { opacity: 0.8 },
            transition: 'opacity 0.2s ease',
            fontWeight: 600
          }}
          aria-label={email}
        >
          {email}
          <ArrowForwardIcon sx={{ width: 20, height: 20 }} aria-hidden />
        </Link>
      </Box>
    </Box>
  )
}
