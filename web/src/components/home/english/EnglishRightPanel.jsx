import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { themeColors } from '../../../config/themeColors.js'

const accentColor = themeColors.accent
const borderDivider = '#d4e6e3'

const BookOpenSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12 7v14" />
    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
  </svg>
)

const CheckSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const quicksand = { fontFamily: 'Quicksand, sans-serif' }

export default function EnglishRightPanel() {
  const { t } = useTranslation()
  const bullets = t('english.year2.bullets')
  const outcomes = t('english.year2.outcomes')
  const bulletList = Array.isArray(bullets) ? bullets : []
  const outcomeList = Array.isArray(outcomes) ? outcomes : []

  return (
    <Box
      component="article"
      aria-labelledby="english-year2-title"
      sx={{
        bgcolor: 'background.paper',
        p: 5,
        boxShadow: 4,
        border: '4px solid',
        borderColor: accentColor,
        borderRadius: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: accentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: themeColors.textInverse,
            '& svg': { width: 36, height: 36 },
          }}
        >
          <BookOpenSvg />
        </Box>
        <Box>
          <Typography
            id="english-year2-title"
            component="h3"
            sx={{
              ...quicksand,
              fontWeight: 700,
              fontSize: '2.25rem',
              color: accentColor,
            }}
          >
            {t('english.year2.title', 'Year 2')}
          </Typography>
          <Typography
            component="p"
            sx={{
              ...quicksand,
              fontWeight: 600,
              fontSize: '1.25rem',
              color: accentColor,
            }}
          >
            {t('english.year2.subtitle', 'Read, write, and expand')}
          </Typography>
        </Box>
      </Box>

      <Typography
        component="p"
        sx={{
          ...quicksand,
          fontWeight: 600,
          fontSize: '1.25rem',
          color: 'text.secondary',
          lineHeight: 1.6,
          mb: 4,
        }}
      >
        {t(
          'english.year2.lead',
          'With the oral foundation in place, reading emerges naturally.'
        )}
      </Typography>

      <Typography
        component="p"
        sx={{
          ...quicksand,
          fontWeight: 600,
          fontSize: '1.125rem',
          color: 'text.secondary',
          lineHeight: 1.6,
          mb: 4,
        }}
      >
        {t(
          'english.year2.italic',
          'Your child expands English into reading and writing, building full fluency in the language.'
        )}
      </Typography>

      <Box component="ul" sx={{ m: 0, pl: 2.5, listStyle: 'none', mb: 4 }}>
        {bulletList.map((text, i) => (
          <Box
            key={i}
            component="li"
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
              py: 1,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: accentColor,
                mt: 1.25,
                flexShrink: 0,
              }}
              aria-hidden
            />
            <Typography
              component="span"
              sx={{
                ...quicksand,
                fontWeight: 600,
                fontSize: '1.125rem',
                color: 'text.secondary',
              }}
            >
              {text}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          borderTop: '4px solid',
          borderColor: borderDivider,
          pt: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        {outcomeList.map((text, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Box sx={{ color: accentColor, flexShrink: 0, '& svg': { width: 28, height: 28 } }}>
              <CheckSvg />
            </Box>
            <Typography
              component="span"
              sx={{
                ...quicksand,
                fontWeight: 600,
                fontSize: '1.25rem',
                color: accentColor,
              }}
            >
              {text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
