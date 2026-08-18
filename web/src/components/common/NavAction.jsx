import { Button } from '@mui/material'
import { useTranslation } from '../../hooks/useTranslation'
import { LMS_LOGIN_URL } from '../../constants/env'

function NavAction({ compact = false }) {
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
        px: compact ? 2 : 3,
        py: compact ? 0.75 : 1.5,
        borderRadius: 2,
        fontSize: compact ? 14 : 16,
        fontWeight: 700,
        textTransform: 'none',
        boxShadow: 'none',
        transition: 'padding 0.25s ease, font-size 0.25s ease',
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

