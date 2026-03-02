import { Box, Link, Typography } from '@mui/material'
import { useTranslation } from '../../hooks/useTranslation.js'

const TEAL = '#62caca'
const CARD_BORDER = '#d4e6e3'
const INTRO_BORDER = '#62caca'

const SECTIONS = [
  { titleKey: 's1Title', pKeys: ['s1P1', 's1P2'], listKey: null },
  { titleKey: 's2Title', pKeys: ['s2P1'], listKey: null },
  { titleKey: 's3Title', pKeys: ['s3P1', 's3P2'], listKey: 's3List', listAfter: 0 },
  { titleKey: 's4Title', pKeys: ['s4P1', 's4P2', 's4P3'], listKey: null },
  { titleKey: 's5Title', pKeys: ['s5P1'], listKey: 's5List', listAfter: 0 },
  { titleKey: 's6Title', pKeys: ['s6P1', 's6P2'], listKey: 's6List', listAfter: 0 },
  { titleKey: 's7Title', pKeys: ['s7P1', 's7P2', 's7P3', 's7P4'], listKey: 's7List', listAfter: 1 },
  { titleKey: 's8Title', pKeys: ['s8P1', 's8P2'], listKey: 's8List', listAfter: 0 },
  { titleKey: 's9Title', pKeys: ['s9P1', 's9P2'], listKey: 's9List', listAfter: 0 },
  { titleKey: 's10Title', pKeys: ['s10P1', 's10P2'], listKey: 's10List', listAfter: 0 },
  { titleKey: 's11Title', pKeys: ['s11P1'], listKey: null },
  { titleKey: 's12Title', pKeys: ['s12P1', 's12P2'], listKey: 's12List', listAfter: 0 },
  { titleKey: 's13Title', pKeys: ['s13P1'], listKey: null },
  { titleKey: 's14Title', pKeys: ['s14P1'], listKey: null },
]

const bodySx = {
  fontSize: '1.125rem',
  color: 'text.secondary',
  lineHeight: 1.75,
  fontWeight: 600,
}
const headingSx = {
  fontSize: '1.875rem',
  fontWeight: 700,
  color: TEAL,
  mb: 3,
}

export default function PrivacyPolicyCards() {
  const { t } = useTranslation()

  return (
    <Box sx={{ maxWidth: 896, mx: 'auto' }}>
      {/* Intro card */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: { xs: 3, md: 6 },
          borderRadius: '24px',
          boxShadow: 4,
          border: `4px solid ${INTRO_BORDER}`,
          mb: 6,
        }}
      >
        <Typography sx={{ ...bodySx, mb: 2 }}>
          {t('privacyPolicy.introP1Before')}
          <Box component="span" sx={{ fontWeight: 700, color: TEAL }}>
            {t('privacyPolicy.introP1Bold')}
          </Box>
          {t('privacyPolicy.introP1After')}
        </Typography>
        <Typography sx={bodySx}>{t('privacyPolicy.introP2')}</Typography>
      </Box>

      {/* Section cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {SECTIONS.map((section, idx) => {
          const sectionNum = idx + 1
          const title = t(`privacyPolicy.${section.titleKey}`)
          const listItems = section.listKey ? t(`privacyPolicy.${section.listKey}`) : null
          const isArray = Array.isArray(listItems)
          const listAfter = section.listAfter ?? 0

          return (
            <Box
              key={section.titleKey}
              component="article"
              sx={{
                bgcolor: 'background.paper',
                p: { xs: 3, md: 4 },
                borderRadius: '16px',
                boxShadow: 2,
                border: `2px solid ${CARD_BORDER}`,
              }}
            >
              <Typography component="h2" sx={headingSx}>
                {title}
              </Typography>
              {section.pKeys.map((pKey, pIdx) => {
                const key = `privacyPolicy.${pKey}`
                const showListAfterThis = isArray && pIdx === listAfter
                const isS10P2 = sectionNum === 10 && pKey === 's10P2'
                return (
                  <Box key={key}>
                    <Typography sx={{ ...bodySx, mb: 1 }}>
                      {isS10P2 ? (
                        <>
                          {t(key)}{' '}
                          <Link
                            href={`mailto:${t('privacyPolicy.contactEmail')}`}
                            sx={{ fontWeight: 700, color: TEAL, '&:hover': { opacity: 0.8 } }}
                          >
                            {t('privacyPolicy.contactEmail')}
                          </Link>
                        </>
                      ) : (
                        t(key)
                      )}
                    </Typography>
                    {showListAfterThis && (
                      <Box
                        component="ul"
                        sx={{
                          pl: 3,
                          my: 1.5,
                          '& li': { ...bodySx, mb: 0.5 },
                        }}
                      >
                        {listItems.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </Box>
                    )}
                  </Box>
                )
              })}
              {/* Section 14: email link */}
              {sectionNum === 14 && (
                <Typography component="p" sx={{ ...bodySx, mt: 2 }}>
                  <Link
                    href={`mailto:${t('privacyPolicy.contactEmail')}`}
                    sx={{ fontSize: '1.5rem', fontWeight: 700, color: TEAL, '&:hover': { opacity: 0.8 } }}
                  >
                    {t('privacyPolicy.contactEmail')}
                  </Link>
                </Typography>
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
