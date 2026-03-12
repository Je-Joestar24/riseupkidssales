import { Box, Container, Grid } from '@mui/material'
import EnglishHeader from './EnglishHeader.jsx'
import EnglishLeftPanel from './EnglishLeftPanel.jsx'
import EnglishRightPanel from './EnglishRightPanel.jsx'
import EnglishFooterCta from './EnglishFooterCta.jsx'

export default function EnglishMain() {
  return (
    <Box
      component="section"
      aria-labelledby="english-heading"
      sx={{
        px: { xs: 3, sm: 4 },
        py: 10,
        bgcolor: '#fff',
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
          <EnglishHeader />
          <Grid
            container
            spacing={5}
            sx={{ maxWidth: 1152, mx: 'auto', display: 'flex', justifyContent: 'space-around' }}
          >
            <Grid item xs={12} md={6} maxWidth={550}>
              <EnglishLeftPanel />
            </Grid>
            <Grid item xs={12} md={6} maxWidth={550}>
              <EnglishRightPanel />
            </Grid>
          </Grid>
          <EnglishFooterCta />
        </Box>
      </Container>
    </Box>
  )
}
