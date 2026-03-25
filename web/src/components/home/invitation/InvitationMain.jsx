import { Box, Container } from '@mui/material'
import InvitationBadge from './InvitationBadge.jsx'
import InvitationTitle from './InvitationTitle.jsx'
import InvitationSubtitle from './InvitationSubtitle.jsx'
import InvitationForm from './InvitationForm.jsx'
import InvitationFooter from './InvitationFooter.jsx'

export default function InvitationMain() {
  return (
    <Box
      id="founder-form"
      component="section"
      aria-labelledby="invitation-heading"
      sx={{
        px: { xs: 0, md: 3 },
        py: 10,
        background: 'linear-gradient(to bottom right, #62caca, #85c2b9)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: { xs: 2, md: 6, lg: 8 },
            boxShadow: 4,
            border: '4px solid',
            borderColor: 'white',
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              mb: 8,
            }}
          >
            <InvitationBadge />
            <InvitationTitle />
            <InvitationSubtitle />
          </Box>
          <Box
            sx={{
              bgcolor: 'custom.bgMethodology',
              p: { xs: 2, md: 5 },
              borderRadius: 3,
              border: '4px solid',
              borderColor: 'secondary.main',
            }}
          >
            <InvitationForm />
            <InvitationFooter />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
