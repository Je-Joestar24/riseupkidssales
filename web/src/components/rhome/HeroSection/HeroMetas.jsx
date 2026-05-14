import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { LucideSparklesIcon, LucideEarthIcon, LucideBookOpenIcon } from './HeroMetaLucideIcons.jsx'

const pillSx = (borderColor) => ({
  bgcolor: 'background.paper',
  px: 3,
  py: 1.5,
  borderRadius: 9999,
  borderWidth: 4,
  borderStyle: 'solid',
  borderColor,
  boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.08)',
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  maxWidth: '100%',
})

const ICON_PX = 24

export default function HeroMetas() {
  const { t } = useTranslation()

  const items = [
    {
      key: 'structure',
      label: t('rhome.hero.pillStructure'),
      borderColor: 'primary.main',
      iconColor: 'primary.main',
      Icon: LucideSparklesIcon,
    },
    {
      key: 'context',
      label: t('rhome.hero.pillContext'),
      borderColor: 'orange.main',
      iconColor: 'orange.main',
      Icon: LucideEarthIcon,
    },
    {
      key: 'interactive',
      label: t('rhome.hero.pillInteractive'),
      borderColor: 'warning.main',
      iconColor: 'warning.main',
      Icon: LucideBookOpenIcon,
    },
  ]

  return (
    <Stack
      direction="row"
      component="div"
      flexWrap="wrap"
      justifyContent="center"
      gap={2}
      sx={{ pt: { xs: 3, md: 4 }, width: '100%' }}
    >
      {items.map(({ key, label, borderColor, iconColor, Icon }) => (
        <Box key={key} sx={pillSx(borderColor)}>
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              flexShrink: 0,
              color: iconColor,
              lineHeight: 0,
            }}
            aria-hidden
          >
            <Icon size={ICON_PX} />
          </Box>
          <Typography
            component="span"
            sx={{
              fontSize: '1.125rem',
              lineHeight: 1.4,
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {label}
          </Typography>
        </Box>
      ))}
    </Stack>
  )
}
