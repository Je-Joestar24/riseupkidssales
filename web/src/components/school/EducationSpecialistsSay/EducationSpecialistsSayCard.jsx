import { Box, Paper, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function EducationSpecialistsSayCard({
  personKey,
  imageSrc,
  borderColor,
  dividerColor,
}) {
  const { t } = useTranslation()
  const baseKey = `schools.educationSpecialists.${personKey}`
  const credentials = t(`${baseKey}.credentials`)

  return (
    <Paper
      elevation={0}
      component="article"
      sx={{
        bgcolor: 'common.white',
        borderRadius: 6,
        boxShadow: 6,
        border: '2px solid',
        borderColor,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: (theme) =>
          theme.transitions.create('transform', {
            duration: theme.transitions.duration.short,
          }),
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <Box
        sx={{
          height: 320,
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt={t(`${baseKey}.imageAlt`)}
          loading="lazy"
          decoding="async"
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </Box>
      <Box
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Box sx={{ mb: 2.5 }}>
          <Typography
            component="h3"
            sx={{
              fontSize: '1.25rem',
              lineHeight: 1.35,
              fontWeight: 600,
              color: 'grey.600',
              mb: 1,
            }}
          >
            {t(`${baseKey}.name`)}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: '1rem',
              lineHeight: 1.5,
              fontWeight: 600,
              color: 'grey.600',
              mb: credentials ? 0.5 : 0,
              m: 0,
            }}
          >
            {t(`${baseKey}.role`)}
          </Typography>
          {credentials ? (
            <Typography
              component="p"
              sx={{
                fontSize: '0.875rem',
                lineHeight: 1.5,
                fontWeight: 600,
                color: 'grey.500',
                m: 0,
              }}
            >
              {credentials}
            </Typography>
          ) : null}
        </Box>
        <Box
          sx={{
            borderTop: '2px solid',
            borderColor: dividerColor,
            opacity: 0.3,
            mb: 2.5,
          }}
          aria-hidden
        />
        <Typography
          component="blockquote"
          sx={{
            fontSize: '1rem',
            lineHeight: 1.65,
            fontWeight: 600,
            fontStyle: 'italic',
            color: 'grey.700',
            m: 0,
            flexGrow: 1,
            border: 'none',
            pl: 0,
          }}
        >
          &ldquo;{t(`${baseKey}.quote`)}&rdquo;
        </Typography>
      </Box>
    </Paper>
  )
}
