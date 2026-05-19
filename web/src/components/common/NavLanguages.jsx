import { Button, Stack, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../hooks/useLanguage'

const languages = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
]

function NavLanguages() {
  const { language, setLanguage } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLanguageChange = (code) => {
    setLanguage(code)
    const params = new URLSearchParams(location.search)
    if (code === 'pt') {
      params.delete('lang')
    } else {
      params.set('lang', code)
    }
    const search = params.toString()
    navigate(
      { pathname: location.pathname, search: search ? `?${search}` : '' },
      { replace: true },
    )
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      component="nav"
      aria-label="Language selection"
    >
      {languages.map((lang, index) => {
        const isActive = language === lang.code

        return (
          <Stack key={lang.code} direction="row" alignItems="center" spacing={0.75}>
            <Button
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              aria-pressed={isActive}
              aria-label={`Switch language to ${lang.label}`}
              sx={{
                minWidth: 0,
                px: 0,
                py: 0,
                fontSize: 16,
                fontWeight: 700,
                textTransform: 'none',
                color: isActive ? 'secondary.main' : 'text.secondary',
                '&:hover': {
                  color: 'secondary.main',
                  backgroundColor: 'transparent',
                  opacity: 0.8,
                },
                opacity: 0.7,
              }}
            >
              {lang.label}
            </Button>
            {index < languages.length - 1 && (
              <Typography component="span" variant="body2" sx={{ color: 'grey.300' }}>
                |
              </Typography>
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}

export default NavLanguages

