import { Box, Container, Grid, Stack } from '@mui/material'
import FooterLogo from './FooterLogo.jsx'
import FooterSubtitle from './FooterSubtitle.jsx'
import FooterHowItworks from './FooterHowItworks.jsx'
import FooterSupport from './FooterSupport.jsx'
import FooterTerms from './FooterTerms.jsx'
import FooterCopyright from './FooterCopyright.jsx'

export default function FooterMain() {
    return (
        <Box
            component="footer"
            role="contentinfo"
            aria-label="Site footer"
            sx={{
                bgcolor: 'background.paper',
                py: 8,
                px: { xs: 2, sm: 3 },
                borderTop: '4px solid',
                borderColor: '#d4e6e3',
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={{ xs: 4, md: 6 }}
                    sx={{ mb: { xs: 4, md: 6 } }}
                    columns={12}
                >
                    <Grid item xs={12} md={3} sx={{ display: 'flex', marginRight: 'auto', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                        <Stack
                            alignItems={{ xs: 'center', md: 'flex-start' }}
                            spacing={0}
                        >
                            <FooterLogo />
                            <FooterSubtitle />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ display: 'flex', marginRight: 'auto', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                        <Box sx={{ textAlign: { md: 'left' }, width: '100%' }}>
                            <FooterHowItworks />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ display: 'flex', marginRight: 'auto', justifyContent: { xs: 'flex-start', md: 'flex-start' } }}>
                        <Box sx={{ textAlign: 'left', width: '100%' }}>
                            <FooterSupport />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ display: 'flex', marginRight: 'auto', justifyContent: { xs: 'flex-start', md: 'flex-start' } }}>
                        <Box sx={{ textAlign: 'left', width: '100%' }}>
                            <FooterTerms />
                        </Box>
                    </Grid>
                </Grid>
                <FooterCopyright />
            </Container>
        </Box>
    )
}
