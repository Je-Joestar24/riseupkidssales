import { useState } from 'react'
import { Box, Typography, IconButton, InputBase } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useTranslation } from '../../../hooks/useTranslation.js'
import SelectProduct from './SelectProduct.jsx'
import SelectBox from './SelectBox.jsx'

const MIN_CHILDREN = 1
const MAX_CHILDREN = 10

function SelectCard() {
  const { t } = useTranslation()
  const [childCount, setChildCount] = useState(1)

  const handleDecrement = () => {
    setChildCount((prev) => Math.max(MIN_CHILDREN, prev - 1))
  }

  const handleIncrement = () => {
    setChildCount((prev) => Math.min(MAX_CHILDREN, prev + 1))
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    if (value === '') return
    const num = parseInt(value, 10)
    if (!Number.isNaN(num)) {
      setChildCount(Math.min(MAX_CHILDREN, Math.max(MIN_CHILDREN, num)))
    }
  }

  return (
    <Box component="section" aria-labelledby="plan-heading">
      <Typography
        id="plan-heading"
        component="h2"
        sx={{
          fontSize: '1.5rem',
          mb: 2,
          color: 'secondary.main',
          fontWeight: 700,
        }}
      >
        {t('checkout.select.planTitle')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 2,
        }}
      >
        <Typography component="span" sx={{ fontSize: '1rem', color: 'text.secondary', fontWeight: 600 }}>
          {t('checkout.select.numberOfChildren')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <IconButton
            onClick={handleDecrement}
            disabled={childCount <= MIN_CHILDREN}
            aria-label={t('checkout.select.numberOfChildren')}
            sx={{
              width: 40,
              height: 40,
              border: '2px solid',
              borderColor: 'secondary.main',
              borderRadius: 1,
              bgcolor: 'white',
              color: 'secondary.main',
              '&:hover': { bgcolor: 'action.hover' },
              '&.Mui-disabled': { opacity: 0.3 },
            }}
          >
            <RemoveIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <InputBase
            type="number"
            value={childCount}
            onChange={handleInputChange}
            inputProps={{
              min: MIN_CHILDREN,
              max: MAX_CHILDREN,
              'aria-label': t('checkout.select.numberOfChildren'),
            }}
            sx={{
              width: 56,
              mx: 0.5,
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'secondary.main',
              '& .MuiInputBase-input': {
                textAlign: 'center',
                border: '2px solid',
                borderColor: 'secondary.main',
                borderRadius: 1,
                py: 1,
                px: 0.5,
                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
                '&[type=number]': { MozAppearance: 'textfield' },
              },
            }}
          />
          <IconButton
            onClick={handleIncrement}
            disabled={childCount >= MAX_CHILDREN}
            aria-label={t('checkout.select.numberOfChildren')}
            sx={{
              width: 40,
              height: 40,
              border: '2px solid',
              borderColor: 'secondary.main',
              borderRadius: 1,
              bgcolor: 'white',
              color: 'secondary.main',
              '&:hover': { bgcolor: 'action.hover' },
              '&.Mui-disabled': { opacity: 0.3 },
            }}
          >
            <AddIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>
      <SelectProduct childCount={childCount} />
      <SelectBox childCount={childCount} />
    </Box>
  )
}

export default SelectCard
