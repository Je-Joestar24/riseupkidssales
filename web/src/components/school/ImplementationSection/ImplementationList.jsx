import { Box, Paper, Stack, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import ImplementationCheckIcon from './ImplementationCheckIcon.jsx'

const ITEM_KEYS = ['item1', 'item2', 'item3']

export default function ImplementationList() {
  const { t } = useTranslation()

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'common.white',
        borderRadius: 6,
        boxShadow: 8,
        p: { xs: 4, md: 5 },
        border: '4px solid',
        borderColor: 'orange.main',
        mb: 4,
      }}
    >
      <Stack
        component="ul"
        spacing={3}
        sx={{ listStyle: 'none', m: 0, p: 0 }}
        aria-labelledby="school-implementation-heading"
      >
        {ITEM_KEYS.map((key) => (
          <Box
            key={key}
            component="li"
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <Box
              sx={{
                bgcolor: 'orange.main',
                borderRadius: '50%',
                p: 1,
                mt: 0.25,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'common.white',
              }}
              aria-hidden
            >
              <ImplementationCheckIcon />
            </Box>
            <Typography
              component="p"
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                lineHeight: 1.5,
                fontWeight: 600,
                color: 'grey.700',
                m: 0,
                flex: 1,
              }}
            >
              {t(`schools.implementation.${key}`)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  )
}
