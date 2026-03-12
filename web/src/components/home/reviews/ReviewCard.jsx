import { Box, Typography } from '@mui/material'
import { themeColors } from '../../../config/themeColors.js'

const STAR_PATH =
  'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'

const starColor = themeColors.accent
const borderDivider = '#d4e6e3'
const quicksand = { fontFamily: 'Quicksand, sans-serif' }

function StarIcon({ filled = true }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={filled ? starColor : 'none'}
      stroke={starColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={STAR_PATH} />
    </svg>
  )
}

/**
 * Single review card — reusable, receives data from parent (e.g. reviewsService).
 * Review content (text, authorName, authorRole) is displayed as-is, not translated.
 *
 * @param {{ id: string, rating: number, text: string, authorName: string, authorRole: string }} review
 */
export default function ReviewCard({ review }) {
  if (!review) return null

  const { id, rating = 5, text, authorName, authorRole } = review
  const stars = Math.min(5, Math.max(0, Math.round(rating)))

  return (
    <Box
      component="article"
      aria-labelledby={`review-author-${id}`}
      sx={{
        bgcolor: '#fff',
        p: 4,
        boxShadow: 3,
        border: '2px solid',
        borderColor: starColor,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400,
        mx: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', gap: 0.5, mb: 3 }} role="img" aria-label={`${stars} stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Box key={i} sx={{ '& svg': { width: 24, height: 24 } }}>
            <StarIcon filled={i < stars} />
          </Box>
        ))}
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
          flex: 1,
        }}
      >
        {text}
      </Typography>

      <Box
        sx={{
          borderTop: '2px solid',
          borderColor: borderDivider,
          pt: 3,
        }}
      >
        <Typography
          id={`review-author-${id}`}
          component="div"
          sx={{
            ...quicksand,
            fontWeight: 700,
            fontSize: '1.5rem',
            color: 'text.secondary',
            mb: 0.5,
          }}
        >
          {authorName}
        </Typography>
        <Typography
          component="div"
          sx={{
            ...quicksand,
            fontWeight: 600,
            fontSize: '1.125rem',
            color: themeColors.secondary,
          }}
        >
          {authorRole}
        </Typography>
      </Box>
    </Box>
  )
}
