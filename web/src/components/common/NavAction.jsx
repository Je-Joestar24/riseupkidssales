import { Button } from '@mui/material'
import { useTranslation } from '../../hooks/useTranslation'
import { LMS_LOGIN_URL } from '../../constants/env'

function NavAction() {
  const { t } = useTranslation()
  const isLmsEnabled = Boolean(LMS_LOGIN_URL)

  return (
    <Button
      component={isLmsEnabled ? 'a' : 'button'}
      href={isLmsEnabled ? LMS_LOGIN_URL : undefined}
      target={isLmsEnabled ? '_blank' : undefined}
      rel={isLmsEnabled ? 'noopener noreferrer' : undefined}
      disabled={!isLmsEnabled}
      variant="contained"
      color="secondary"
      aria-label={t('nav.login')}
      sx={{
        px: 3,
        py: 1.5,
        borderRadius: 2,
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
          opacity: 0.9,
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
        },
      }}
    >
      {t('nav.login')}
    </Button>
  )
}

export default NavAction

