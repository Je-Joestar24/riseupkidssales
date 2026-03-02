import { useState } from 'react'
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

const BORDER = '#E8E3DC'
const HOVER_BG = '#F9F6F2'

export default function MediaCheckboxes() {
  const { t } = useTranslation()
  const [platform, setPlatform] = useState(true)
  const [marketing, setMarketing] = useState(false)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={platform}
              onChange={(e) => setPlatform(e.target.checked)}
              sx={{
                color: BORDER,
                '&.Mui-checked': { color: 'primary.main' },
                p: 0.5,
                mr: 1,
              }}
            />
          }
          label={
            <Typography component="span" sx={{ fontSize: '0.9375rem', color: '#2F2F2F', lineHeight: 1.5, fontWeight: 600 }}>
              {t('privacySettings.media.checkboxPlatform')}
            </Typography>
          }
          sx={{
            alignItems: 'flex-start',
            m: 0,
            minHeight: 44,
            px: 2,
            py: 1.5,
            border: `1px solid ${BORDER}`,
            borderRadius: '10px',
            '&:hover': { bgcolor: HOVER_BG },
            transition: 'background-color 0.2s',
            cursor: 'pointer',
          }}
        />
        <Typography
          component="p"
          sx={{ fontSize: '0.8125rem', color: '#9A9A9A', lineHeight: 1.5, mt: 0.5, ml: 3.5, fontWeight: 600 }}
        >
          {t('privacySettings.media.checkboxPlatformHint')}
        </Typography>
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            sx={{
              color: BORDER,
              '&.Mui-checked': { color: 'primary.main' },
              p: 0.5,
              mr: 1,
            }}
          />
        }
        label={
          <Typography component="span" sx={{ fontSize: '0.9375rem', color: '#2F2F2F', lineHeight: 1.5, fontWeight: 600 }}>
            {t('privacySettings.media.checkboxMarketing')}
          </Typography>
        }
        sx={{
          alignItems: 'flex-start',
          m: 0,
          minHeight: 44,
          px: 2,
          py: 1.5,
          border: `1px solid ${BORDER}`,
          borderRadius: '10px',
          '&:hover': { bgcolor: HOVER_BG },
          transition: 'background-color 0.2s',
          cursor: 'pointer',
        }}
      />
    </Box>
  )
}
