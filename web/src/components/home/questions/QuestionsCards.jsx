import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function QuestionsCards() {
  const { t } = useTranslation()
  const items = t('questions.items')
  const list = Array.isArray(items) ? items : []

  return (
    <Stack spacing={3}>
      {list.map((item, index) => (
        <Box
          key={index}
          component="article"
          aria-labelledby={`question-${index}-title`}
          sx={{
            bgcolor: 'background.paper',
            p: 4,
            boxShadow: 2,
            border: '2px solid',
            borderColor: 'secondary.main',
            borderRadius: 2,
          }}
        >
          <Typography
            id={`question-${index}-title`}
            component="h3"
            sx={{
              fontSize: { xs: '1.5rem', md: '1.875rem' },
              mb: 2,
              fontWeight: 600,
              color: 'secondary.main',
            }}
          >
            {item?.question ?? ''}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: '1.25rem',
              color: 'grey.700',
              lineHeight: 1.6,
              fontWeight: 600,
              opacity: 0.8,
              whiteSpace: 'pre-line',
            }}
          >
            {item?.answer ?? ''}
          </Typography>
        </Box>
      ))}
    </Stack>
  )
}
