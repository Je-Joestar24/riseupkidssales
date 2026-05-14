import { Box, ButtonBase, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { themeColors } from '../../../config/themeColors.js'
import { LucideUsersIcon, LucideSchoolIcon, LucidePlayIcon } from './LinksLucideIcons.jsx'

const ARROW = '→'

function LinkCard({
  to,
  borderColor,
  iconWellBg,
  iconWellHoverBg,
  accentColor,
  title,
  description,
  cta,
  Icon,
}) {
  return (
    <ButtonBase
      component={RouterLink}
      to={to}
      focusRipple
      sx={{
        display: 'block',
        flex: { xs: '0 0 auto', md: 1 },
        minHeight: 0,
        width: '100%',
        height: { md: '100%' },
        textAlign: 'left',
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.08)',
        borderWidth: 4,
        borderStyle: 'solid',
        borderColor,
        p: { xs: 4, md: 6 },
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        '&:hover .ruk-link-icon-well': {
          bgcolor: iconWellHoverBg,
        },
        '&:hover .ruk-link-icon': {
          color: 'common.white',
        },
        '&:hover .ruk-link-arrow': {
          transform: 'translateX(8px)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <Box
          className="ruk-link-icon-well"
          sx={{
            borderRadius: '50%',
            p: 4,
            bgcolor: iconWellBg,
            transition: 'background-color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box className="ruk-link-icon" sx={{ color: accentColor, lineHeight: 0, transition: 'color 0.3s ease' }}>
            <Icon size={80} />
          </Box>
        </Box>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.25rem' },
            fontWeight: 700,
            color: accentColor,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography
          component="p"
          sx={{
            fontSize: { xs: '1.125rem', md: '1.25rem' },
            fontWeight: 600,
            color: 'text.secondary',
            lineHeight: 1.6,
            maxWidth: 520,
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            pt: 2,
            fontSize: { xs: '1.125rem', md: '1.25rem' },
            fontWeight: 700,
            color: accentColor,
          }}
        >
          <Typography component="span" sx={{ fontWeight: 700, fontSize: 'inherit' }}>
            {cta}
          </Typography>
          <Box
            component="span"
            className="ruk-link-arrow"
            aria-hidden
            sx={{
              fontSize: '1.875rem',
              lineHeight: 1,
              transition: 'transform 0.3s ease',
            }}
          >
            {ARROW}
          </Box>
        </Box>
      </Box>
    </ButtonBase>
  )
}

export default function LinksCards() {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Two equal columns on md+; single column on small screens */}
      <Box
        sx={{
          display: 'grid',
          width: '100%',
          maxWidth: { md: 960, lg: 1056 },
          mx: { md: 'auto' },
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          gap: 4,
          alignItems: 'stretch',
        }}
      >
        <Box sx={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <LinkCard
            to="/parents"
            borderColor="secondary.main"
            iconWellBg="#d4e6e3"
            iconWellHoverBg="secondary.main"
            accentColor="secondary.main"
            title={t('rhome.links.parents.title')}
            description={t('rhome.links.parents.description')}
            cta={t('rhome.links.parents.cta')}
            Icon={LucideUsersIcon}
          />
        </Box>
        <Box sx={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <LinkCard
            to="/schools"
            borderColor="orange.main"
            iconWellBg={themeColors.bgStudies}
            iconWellHoverBg="orange.main"
            accentColor="orange.main"
            title={t('rhome.links.schools.title')}
            description={t('rhome.links.schools.description')}
            cta={t('rhome.links.schools.cta')}
            Icon={LucideSchoolIcon}
          />
        </Box>
      </Box>
      <Box sx={{ maxWidth: 768, mx: 'auto', width: '100%' }}>
        <LinkCard
          to="/videos"
          borderColor="warning.main"
          iconWellBg="#fef6e6"
          iconWellHoverBg="warning.main"
          accentColor="warning.main"
          title={t('rhome.links.videos.title')}
          description={t('rhome.links.videos.description')}
          cta={t('rhome.links.videos.cta')}
          Icon={LucidePlayIcon}
        />
      </Box>
    </Box>
  )
}
