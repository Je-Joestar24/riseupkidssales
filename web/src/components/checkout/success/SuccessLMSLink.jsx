import { Box } from '@mui/material'

const CORAL = '#E98A68'
const LMS_URL = import.meta.env.VITE_LMS_URL || ''

function ArrowRightIcon() {
  return (
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export default function SuccessLMSLink({ label }) {
  const href = LMS_URL || '#'

  return (
    <Box
      component="a"
      href={href}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        px: 4,
        py: 2.5,
        fontSize: '1.5rem',
        fontWeight: 600,
        color: 'white',
        backgroundColor: CORAL,
        borderRadius: 2,
        boxShadow: 2,
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.02)',
          backgroundColor: CORAL,
          color: 'white',
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
      }}
    >
      {label}
      <ArrowRightIcon />
    </Box>
  )
}
