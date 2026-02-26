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
                <Grid container spacing={6} sx={{ mb: 6, display: 'flex'}} columns={12}>
                    <Grid item xs={12} md={3} maxWidth={'24%'} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                        <Stack
                            alignItems={{ xs: 'center', md: 'flex-start' }}
                            spacing={0}
                        >
                            <FooterLogo />
                            <FooterSubtitle />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={3} maxWidth={'24%'} display={'flex'} justifyContent={'center'} alignContent={'center'} marginX={'auto'}>
                        <FooterHowItworks />
                    </Grid>
                    <Grid item xs={12} md={3} maxWidth={'24%'} display={'flex'} justifyContent={'center'} alignContent={'center'} marginX={'auto'}>
                        <FooterSupport />
                    </Grid>
                    <Grid item xs={12} md={3} maxWidth={'24%'} display={'flex'} justifyContent={'center'} alignContent={'center'} marginX={'auto'}>
                        <FooterTerms />
                    </Grid>
                </Grid>
                <FooterCopyright />
            </Container>
        </Box>
    )
}
