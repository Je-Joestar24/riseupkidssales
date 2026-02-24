import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { useTranslation } from '../hooks/useTranslation.js'
import NavHeaders from '../components/common/NavHeaders.jsx'
import '../assets/css/App.css'

function HomePage() {
  const { t } = useTranslation()
  useDocumentTitle(t('hero.title'))

  return (
    <>
      <NavHeaders />
      <Box className="app" component="main" role="main" aria-label="Rise Up Kids sales site">
        <Box className="hero" component="section" aria-label="Rise Up Kids sales hero section">
        <div className="heroBg" aria-hidden="true">
          <div className="blob blob--a" />
          <div className="blob blob--b" />
          <div className="blob blob--c" />
          <div className="gridGlow" />
        </div>

        <Container maxWidth="lg" className="heroInner">
          <Stack spacing={3} sx={{ pt: { xs: 8, md: 11 }, pb: { xs: 7, md: 9 } }}>
            <Stack direction="row" alignItems="center" spacing={1.25} aria-label="Rise Up Kids brand">
              <Box className="brandDot" aria-hidden="true" />
              <Typography variant="subtitle1" fontWeight={800} letterSpacing={0.2}>
                Rise Up Kids
              </Typography>
            </Stack>

            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 900,
                letterSpacing: -1.2,
                lineHeight: 1.05,
                maxWidth: 820,
              }}
            >
              {t('hero.title')}
              <span className="titleAccent">.</span>
            </Typography>

            <Typography variant="h6" component="p" color="text.secondary" sx={{ maxWidth: 740 }}>
              {t('hero.subtitle')}
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              role="group"
              aria-label="Primary actions"
              sx={{ alignItems: { sm: 'center' }, pt: 0.5 }}
            >
              <Button
                size="large"
                variant="contained"
                disableElevation
                aria-label="Become a founding family"
                sx={{ py: 1.4, px: 2.25 }}
              >
                Quero ser uma Família Fundadora
              </Button>
              <Button
                size="large"
                variant="outlined"
                aria-label="Discover how English becomes natural"
                sx={{ py: 1.4, px: 2.25 }}
              >
                Ver como o inglês se torna natural
              </Button>
            </Stack>

            <Box component="ul" className="pillars" role="list" aria-label="Rise Up Kids pillars">
              <Box component="li" className="pillarsItem" role="listitem" aria-label="Immersive English">
                <Paper className="pillarsCard" elevation={0} variant="outlined">
                  <div className="pillarsIcon" aria-hidden="true">
                    <AutoStoriesOutlinedIcon fontSize="small" />
                  </div>
                  <div className="pillarsText">
                    <Typography variant="subtitle1" fontWeight={800}>
                      Inglês Imersivo
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Experiências significativas com a língua.
                    </Typography>
                  </div>
                </Paper>
              </Box>

              <Box component="li" className="pillarsItem" role="listitem" aria-label="Real teachers">
                <Paper className="pillarsCard" elevation={0} variant="outlined">
                  <div className="pillarsIcon pillarsIconAlt" aria-hidden="true">
                    <GroupsOutlinedIcon fontSize="small" />
                  </div>
                  <div className="pillarsText">
                    <Typography variant="subtitle1" fontWeight={800}>
                      Professores Reais
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Vivência humana do idioma.
                    </Typography>
                  </div>
                </Paper>
              </Box>

              <Box component="li" className="pillarsItem" role="listitem" aria-label="Natural learning">
                <Paper className="pillarsCard" elevation={0} variant="outlined">
                  <div className="pillarsIcon pillarsIconSoft" aria-hidden="true">
                    <PsychologyOutlinedIcon fontSize="small" />
                  </div>
                  <div className="pillarsText">
                    <Typography variant="subtitle1" fontWeight={800}>
                      Aprendizado Natural
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Da compreensão à expressão.
                    </Typography>
                  </div>
                </Paper>
              </Box>
            </Box>
          </Stack>
        </Container>
        </Box>
      </Box>
    </>
  )
}

export default HomePage

