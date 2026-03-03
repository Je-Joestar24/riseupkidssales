import { Box, Grid } from '@mui/material'
import SelectSummary from './SelectSummary.jsx'
import SelectCard from './SelectCard.jsx'
import SelectCta from './SelectCta.jsx'
import SelectProductFooter from './SelectProductFooter.jsx'

/**
 * Two-column layout: main content (2 cols, max 735px) + order summary sidebar (1 col, max 347px).
 */
function SelectMain() {
  return (
    <Grid
      container
      spacing={3}
      sx={{ maxWidth: 1120, mx: 'auto', width: '100%', alignItems: 'stretch' }}
    >
      <Grid item xs={12} md={8} sx={{ maxWidth: 700, width: '100%' }}>
        <Box sx={{ maxWidth: 735, width: '100%' }}>
          <SelectCard />
          <SelectCta />
          <SelectProductFooter />
        </Box>
      </Grid>
      <Grid item xs={12} md={4} sx={{ alignSelf: 'stretch' }}>
        <Box sx={{ maxWidth: 345, width: '100%', height: '100%', minHeight: 0 }}>
          <SelectSummary />
        </Box>
      </Grid>
    </Grid>
  )
}

export default SelectMain
