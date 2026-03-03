import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

const CONTACT_EMAIL = 'contato@riseup.kids'

function SelectFooter() {
  const { t } = useTranslation()

  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        textAlign: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: '0.875rem',
          color: 'text.secondary',
          fontWeight: 600,
          mb: 1,
        }}
      >
        {t('checkout.footer.contactPrompt')}{' '}
        <Typography
          component="a"
          href={`mailto:${CONTACT_EMAIL}`}
          sx={{ color: 'secondary.main', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          {CONTACT_EMAIL}
        </Typography>
      </Typography>
      <Typography
        sx={{
          fontSize: '0.875rem',
          color: 'text.secondary',
          fontWeight: 600,
        }}
      >
        {t('checkout.footer.copyright')}
      </Typography>
    </Box>
  )
}

export default SelectFooter
