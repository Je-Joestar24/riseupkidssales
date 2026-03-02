import { useState } from 'react'
import { Box, FormControlLabel, Switch, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

const BORDER = '#E8E3DC'
const HOVER_BG = '#F9F6F2'

export default function EmailToogles() {
  const { t } = useTranslation()
  const [learning, setLearning] = useState(true)
  const [promotions, setPromotions] = useState(true)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <FormControlLabel
        labelPlacement="start"
        control={
          <Switch
            checked={learning}
            onChange={(e) => setLearning(e.target.checked)}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': { color: 'primary.main' },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: 'primary.main' },
            }}
          />
        }
        label={
          <Typography component="span" sx={{ fontSize: '0.9375rem', color: '#2F2F2F', fontWeight: 600 }}>
            {t('privacySettings.email.learningUpdates')}
          </Typography>
        }
        sx={{
          m: 0,
          height: 44,
          px: 2,
          border: `1px solid ${BORDER}`,
          borderRadius: '10px',
          '&:hover': { bgcolor: HOVER_BG },
          transition: 'background-color 0.2s',
          cursor: 'pointer',
          justifyContent: 'space-between',
          width: '100%',
        }}
      />
      <FormControlLabel
        labelPlacement="start"
        control={
          <Switch
            checked={promotions}
            onChange={(e) => setPromotions(e.target.checked)}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': { color: 'primary.main' },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: 'primary.main' },
            }}
          />
        }
        label={
          <Typography component="span" sx={{ fontSize: '0.9375rem', color: '#2F2F2F', fontWeight: 600 }}>
            {t('privacySettings.email.promotions')}
          </Typography>
        }
        sx={{
          m: 0,
          height: 44,
          px: 2,
          border: `1px solid ${BORDER}`,
          borderRadius: '10px',
          '&:hover': { bgcolor: HOVER_BG },
          transition: 'background-color 0.2s',
          cursor: 'pointer',
          justifyContent: 'space-between',
          width: '100%',
        }}
      />
    </Box>
  )
}
