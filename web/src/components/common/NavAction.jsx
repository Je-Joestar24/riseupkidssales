import { Button } from '@mui/material'
import { useTranslation } from '../../hooks/useTranslation'

function NavAction() {
  const { t } = useTranslation()

  return (
    <Button
      type="button"
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

