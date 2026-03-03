import { Box, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from '../../../hooks/useTranslation.js'

const GUARANTEE_BG = 'rgb(244, 237, 216)'

function SelectSummary() {
  const { t } = useTranslation()
  const includedItems = t('checkout.summary.includedItems')
  const items = Array.isArray(includedItems) ? includedItems : []

  return (
    <Box
      component="aside"
      aria-label={t('checkout.summary.title')}
      sx={{
        bgcolor: 'white',
        boxShadow: 3,
        p: 3,
        borderRadius: 2,
        position: 'sticky',
        top: 32,
        maxWidth: 347,
      }}
    >
      <Typography
        component="h3"
        variant="h6"
        sx={{
          mb: 3,
          color: 'secondary.main',
          fontSize: '1.25rem',
          fontWeight: 700,
        }}
      >
        {t('checkout.summary.title')}
      </Typography>

      <Box sx={{ '& > * + *': { mt: 2 }, mb: 3, pb: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography component="span" sx={{ fontSize: '1rem', color: 'text.secondary', fontWeight: 600 }}>
            {t('checkout.summary.oneChild')}
          </Typography>
          <Typography component="span" sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'secondary.main' }}>
            R$750
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          pb: 3,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography component="span" sx={{ fontSize: '1.25rem', fontWeight: 700 }}>
          {t('checkout.summary.total')}
        </Typography>
        <Typography component="span" sx={{ fontSize: '1.5rem', fontWeight: 700, color: 'secondary.main' }}>
          R$750
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.75rem', color: 'text.secondary', pt: 0.5 }}>
        <LockIcon sx={{ fontSize: 16 }} aria-hidden />
        <Typography component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary', fontWeight: 600 }}>
          {t('checkout.summary.securePayment')}
        </Typography>
      </Box>

      <Typography
        sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 2, mb: 3, fontWeight: 600 }}
      >
        {t('checkout.summary.subscriptionNote')}
      </Typography>

      <Box
        sx={{
          p: 2,
          mb: 3,
          bgcolor: GUARANTEE_BG,
          borderRadius: 2,
        }}
      >
        <Typography
          component="h4"
          sx={{ fontSize: '1rem', mb: 1, color: 'accent.main', fontWeight: 700 }}
        >
          {t('checkout.summary.guaranteeTitle')}
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 1, fontWeight: 600 }}>
          {t('checkout.summary.guaranteeP1')}
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 1, fontWeight: 600 }}>
          {t('checkout.summary.guaranteeP2')}
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 1, fontWeight: 600 }}>
          {t('checkout.summary.guaranteeP3')}
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 1, fontWeight: 600 }}>
          {t('checkout.summary.guaranteeFooter')}
        </Typography>
      </Box>

      <Box>
        <Typography
          component="h4"
          sx={{ fontSize: '1rem', mb: 2, color: 'secondary.main', fontWeight: 700 }}
        >
          {t('checkout.summary.includedTitle')}
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 0, listStyle: 'none', '& > li': { display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 } }}>
          {items.map((item, index) => (
            <Box component="li" key={index}>
              <CheckIcon sx={{ fontSize: 16, color: 'secondary.main', flexShrink: 0, mt: 0.25 }} aria-hidden />
              <Typography component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary', fontWeight: 600 }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default SelectSummary
