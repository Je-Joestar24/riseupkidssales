import { Box, Link as MuiLink, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import legalMeta from '../../../legal/meta.json'

const legalStyles = {
  main: {
    maxWidth: 760,
    mx: 'auto',
    px: { xs: 2.5, sm: 3 },
    py: { xs: 4, sm: 5 },
    bgcolor: '#fff',
    minHeight: '100vh',
    boxSizing: 'border-box',
    fontFamily: 'Georgia, "Times New Roman", serif',
    color: '#1f2937',
    lineHeight: 1.65,
    '& h2': {
      fontSize: '1.25rem',
      mt: 3.5,
      mb: 1,
      color: '#111827',
      fontFamily: 'Georgia, "Times New Roman", serif',
    },
    '& h3': {
      fontSize: '1.05rem',
      mt: 2,
      mb: 1,
      color: '#374151',
      fontFamily: 'Georgia, "Times New Roman", serif',
    },
    '& p': { my: 1.5 },
    '& ul': { my: 1.5, pl: 2.5 },
    '& li': { my: 0.5 },
    '& a': { color: '#0f766e' },
  },
  header: {
    borderBottom: '1px solid #e5e7eb',
    mb: 3,
    pb: 2,
  },
  title: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: '2rem',
    color: '#0f766e',
    mb: 0.5,
  },
  meta: {
    color: '#6b7280',
    fontSize: '0.95rem',
  },
  nav: {
    mt: 2,
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
  },
  footer: {
    mt: 4,
    pt: 2,
    borderTop: '1px solid #e5e7eb',
    color: '#6b7280',
    fontSize: '0.9rem',
  },
}

export default function LegalDocumentView({ title, ariaLabel, bodyHtml }) {
  return (
    <Box component="main" role="main" aria-label={ariaLabel} sx={legalStyles.main}>
      <Box component="header" sx={legalStyles.header}>
        <Typography component="h1" sx={legalStyles.title}>
          {title}
        </Typography>
        <Typography component="p" sx={legalStyles.meta}>
          Last updated: {legalMeta.lastUpdated} · Version {legalMeta.version}
        </Typography>
        <Box component="nav" aria-label="Legal pages" sx={legalStyles.nav}>
          <MuiLink component={Link} to="/privacy" underline="hover">
            Privacy Policy
          </MuiLink>
          <MuiLink component={Link} to="/terms" underline="hover">
            Terms of Use
          </MuiLink>
        </Box>
      </Box>

      <Box dangerouslySetInnerHTML={{ __html: bodyHtml }} />

      <Box component="footer" sx={legalStyles.footer}>
        <Typography component="p">
          Contact:{' '}
          <MuiLink href={`mailto:${legalMeta.contactEmail}`}>{legalMeta.contactEmail}</MuiLink>
        </Typography>
        <Typography component="p">© 2026 Rise Up Kids. All rights reserved.</Typography>
      </Box>
    </Box>
  )
}
