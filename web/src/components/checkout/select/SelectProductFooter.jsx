import { Box, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import ShieldIcon from '@mui/icons-material/Shield'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from '../../../hooks/useTranslation.js'

function SelectProductFooter() {
  const { t } = useTranslation()

  const items = [
    { Icon: LockIcon, key: 'checkout.select.securePayment' },
    { Icon: ShieldIcon, key: 'checkout.select.sslEncryption' },
    { Icon: CheckIcon, key: 'checkout.select.protectedData' },
  ]

  return (
    <Box component="footer" sx={{ mt: 3 }}>
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'text.disabled',
          fontWeight: 600,
        }}
      >
        {t('checkout.select.taxesIncluded')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          pt: 2,
        }}
      >
        {items.map(({ Icon, key }) => (
          <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon sx={{ fontSize: 16 }} aria-hidden />
            <Typography component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary', fontWeight: 600 }}>
              {t(key)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default SelectProductFooter
