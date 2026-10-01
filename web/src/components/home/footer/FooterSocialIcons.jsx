import { Box, Stack, Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import PinterestIcon from '@mui/icons-material/Pinterest'
import { useTranslation } from '../../../hooks/useTranslation.js'

const TEAL = '#3F9C9C'
const TEAL_LIGHT = '#EAF8F8'
const TEAL_BRAND = '#62CACA'
const SIZE = 44

// Material Design doesn't ship a TikTok glyph, so this one stays a hand-drawn path.
function TikTokIcon(props) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16 3c.5 2.5 2.2 4 5 4v3.5c-1.9 0-3.6-.6-5-1.6V15a6 6 0 1 1-6-6v3.6a2.5 2.5 0 1 0 2.5 2.5V3z" />
    </svg>
  )
}

// Facebook has no confirmed page URL yet — shown without a link until one is provided.
const SOCIAL_LINKS = [
  { key: 'youtube', label: 'YouTube', Icon: YouTubeIcon, href: 'https://www.youtube.com/@riseup.kids1' },
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/riseupkids1' },
  { key: 'tiktok', label: 'TikTok', Icon: TikTokIcon, href: 'https://www.tiktok.com/@riseup.kids' },
  { key: 'pinterest', label: 'Pinterest', Icon: PinterestIcon, href: 'https://www.pinterest.com/riseupkids1/' },
  { key: 'facebook', label: 'Facebook', Icon: FacebookIcon, href: null },
]

function SocialCircle({ label, Icon, href }) {
  const content = (
    <Box
      sx={{
        width: SIZE,
        height: SIZE,
        borderRadius: '50%',
        bgcolor: TEAL_LIGHT,
        color: TEAL,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
        '&:hover': href
          ? { bgcolor: TEAL_BRAND, color: '#FFFFFF', transform: 'translateY(-2px)' }
          : undefined,
      }}
    >
      <Icon sx={{ width: 22, height: 22 }} />
    </Box>
  )

  if (!href) {
    return (
      <Box aria-label={label} sx={{ cursor: 'default' }}>
        {content}
      </Box>
    )
  }

  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      sx={{ display: 'inline-flex' }}
    >
      {content}
    </Box>
  )
}

export default function FooterSocialIcons() {
  const { t } = useTranslation()

  return (
    <Stack spacing={1.25} sx={{ mt: 3, alignItems: { xs: 'center', md: 'flex-start' } }}>
      <Typography
        component="span"
        sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'grey.900' }}
      >
        {t('footer.followUs')}
      </Typography>
      <Stack direction="row" spacing={1.5}>
        {SOCIAL_LINKS.map(({ key, label, Icon, href }) => (
          <SocialCircle key={key} label={label} Icon={Icon} href={href} />
        ))}
      </Stack>
    </Stack>
  )
}
