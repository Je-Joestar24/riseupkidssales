import { Box } from '@mui/material'
import CheckoutHeader from '../components/common/CheckoutHeader.jsx'
import SelectHeader from '../components/checkout/select/SelectHeader.jsx'
import SelectMain from '../components/checkout/select/SelectMain.jsx'
import SelectFooter from '../components/checkout/select/SelectFooter.jsx'

const CHECKOUT_PAGE_BG = 'rgb(252, 249, 243)'

function CheckoutPage() {
  return (
    <Box
      component="main"
      role="main"
      aria-label="Checkout - Complete sua matrícula"
      sx={{
        minHeight: '100vh',
        bgcolor: CHECKOUT_PAGE_BG,
      }}
    >
      <CheckoutHeader />
      <Box
        sx={{
          maxWidth: 1120,
          mx: 'auto',
          py: 4,
          px: 2,
        }}
      >
        <SelectHeader />
        <SelectMain />
        <SelectFooter />
      </Box>
    </Box>
  )
}

export default CheckoutPage
