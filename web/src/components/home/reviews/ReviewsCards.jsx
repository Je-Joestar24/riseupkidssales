import { Box, Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { getReviews } from '../../../services/reviewsService.js'
import ReviewCard from './ReviewCard.jsx'

export default function ReviewsCards() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    getReviews()
      .then((data) => {
        if (!cancelled) {
          setReviews(Array.isArray(data) ? data : [])
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || 'Failed to load reviews')
          setReviews([])
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color="text.secondary">Loading…</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  if (!reviews.length) {
    return null
  }

  return (
    <Grid container spacing={4} sx={{ maxWidth: 1280, mx: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {reviews.map((review) => (
        <Grid item xs={12} md={4} key={review.id} >
          <ReviewCard review={review} />
        </Grid>
      ))}
    </Grid>
  )
}
