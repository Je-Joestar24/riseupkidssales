import { useState } from 'react'
import { Box, Typography, Checkbox, FormControlLabel } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from '../../../hooks/useTranslation.js'
import boxImage from '../../../assets/images/box.png'

const BOX_PRICE = 297
const BOX_SUMMARY_BG = 'rgb(212, 230, 227)'

function SelectBox({ childCount = 1 }) {
  const { t } = useTranslation()
  const [checked, setChecked] = useState(false)
  const boxTotal = BOX_PRICE * childCount

  return (
    <Box
      component="section"
      aria-labelledby="box-heading"
      sx={{
        bgcolor: 'white',
        boxShadow: 2,
        p: 3,
        borderRadius: 2,
        mt: 3,
      }}
    >
      <Typography
        id="box-heading"
        component="h3"
        sx={{
          fontSize: '2.25rem',
          textAlign: 'center',
          mb: 0,
          color: 'secondary.main',
          fontWeight: 700,
        }}
      >
        {t('checkout.box.title')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 1,
          mt: -2,
        }}
      >
        <Box
          component="img"
          src={boxImage}
          alt={t('checkout.box.title')}
          sx={{
            width: 409,
            maxWidth: '100%',
            height: 'auto',
            height: 409,
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box sx={{ mt: -8, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: 1,
            mb: 2,
          }}
        >
          <Typography component="span" sx={{ fontSize: '2.25rem', color: 'secondary.main', fontWeight: 700 }}>
            R$297
          </Typography>
          <Typography component="span" sx={{ fontSize: '1.125rem', color: 'text.secondary', fontWeight: 600 }}>
            {t('checkout.box.perChild')}
          </Typography>
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              icon={
                <Box
                  component="span"
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: 'grey.500',
                    boxSizing: 'border-box',
                    display: 'block',
                  }}
                />
              }
              checkedIcon={
                <Box
                  component="span"
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: 'secondary.main',
                    bgcolor: 'secondary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <CheckIcon sx={{ fontSize: 16, color: 'white' }} />
                </Box>
              }
              sx={{
                padding: 0.5,
                '&.Mui-checked': {
                  color: 'secondary.main',
                },
              }}
              inputProps={{
                'aria-label': t('checkout.box.addBoxLabel'),
              }}
            />
          }
          label={
            <Typography component="span" sx={{ fontSize: '1rem', color: 'text.secondary', fontWeight: 600 }}>
              {t('checkout.box.addBoxLabel')}
            </Typography>
          }
          sx={{ mb: 2, cursor: 'pointer' }}
        />
        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 2, fontWeight: 600 }}>
          {t('checkout.box.description')}
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5, '& > li': { fontSize: '0.75rem', color: 'text.disabled', fontWeight: 600, mb: 0.5 } }}>
          <li>• {t('checkout.box.bullet1')}</li>
          <li>• {t('checkout.box.bullet2')}</li>
          <li>• {t('checkout.box.bullet3')}</li>
        </Box>
        {checked && (
          <Box
            sx={{
              mt: 2,
              p: 1.5,
              bgcolor: BOX_SUMMARY_BG,
              borderRadius: 1,
            }}
          >
            <Typography sx={{ fontSize: '1.125rem', color: 'secondary.main', fontWeight: 600 }}>
              {childCount === 1
                ? `R$${BOX_PRICE}`
                : `${childCount} ${t('checkout.box.caixas')}: R$${boxTotal}`}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default SelectBox
