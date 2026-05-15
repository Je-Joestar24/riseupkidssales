import { Box, Typography } from '@mui/material'
import { themeColors } from '../../../config/themeColors.js'
import { useTranslation } from '../../../hooks/useTranslation.js'
import RiseUpKidsApproachCheckIcon from './RiseUpKidsApproachCheckIcon.jsx'

const ROW_KEYS = ['row1', 'row2', 'row3', 'row4']

const cellPadding = { xs: 3, md: 4 }

export default function RiseUpKidsApproachTable() {
  const { t } = useTranslation()

  return (
    <Box
      role="region"
      aria-labelledby="school-comparison-heading"
      sx={{
        bgcolor: 'common.white',
        borderRadius: 6,
        boxShadow: 12,
        overflow: 'hidden',
        border: '4px solid',
        borderColor: 'secondary.main',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          background: themeColors.schoolComparisonHeaderGradient,
        }}
      >
        <Box
          sx={{
            p: cellPadding,
            textAlign: 'center',
            borderRight: { sm: '2px solid' },
            borderColor: { sm: 'common.white' },
            borderBottom: { xs: '2px solid', sm: 'none' },
            borderBottomColor: { xs: 'common.white' },
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 700,
              color: 'grey.700',
              m: 0,
            }}
          >
            {t('schools.comparison.colTraditional')}
          </Typography>
        </Box>
        <Box sx={{ p: cellPadding, textAlign: 'center' }}>
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 700,
              color: 'common.white',
              m: 0,
            }}
          >
            {t('schools.comparison.colRuk')}
          </Typography>
        </Box>
      </Box>

      {ROW_KEYS.map((rowKey, index) => {
        const isAlt = index % 2 === 1
        return (
          <Box
            key={rowKey}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              bgcolor: isAlt ? 'grey.50' : 'common.white',
            }}
          >
            <Box
              sx={{
                p: cellPadding,
                borderRight: { sm: '2px solid' },
                borderColor: { sm: 'grey.200' },
                borderBottom: { xs: '1px solid', sm: 'none' },
                borderBottomColor: { xs: 'grey.200' },
              }}
            >
              <Typography
                component="p"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.6,
                  fontWeight: 600,
                  color: 'grey.600',
                  m: 0,
                }}
              >
                {t(`schools.comparison.${rowKey}.traditional`)}
              </Typography>
            </Box>
            <Box sx={{ p: cellPadding }}>
              <Typography
                component="p"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.6,
                  fontWeight: 600,
                  color: 'secondary.main',
                  m: 0,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                <Box component="span" sx={{ flexShrink: 0, mt: 0.25, lineHeight: 0 }}>
                  <RiseUpKidsApproachCheckIcon />
                </Box>
                <Box component="span">{t(`schools.comparison.${rowKey}.ruk`)}</Box>
              </Typography>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
