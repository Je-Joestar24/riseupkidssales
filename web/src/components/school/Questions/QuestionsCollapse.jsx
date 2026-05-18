import { Box, Collapse, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { useSchoolFaqAccordion } from '../../../hooks/useSchoolFaqAccordion.js'
import { themeColors } from '../../../config/themeColors.js'

function ChevronDown({ expanded }) {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      sx={{
        width: 24,
        height: 24,
        flexShrink: 0,
        color: themeColors.secondary,
        transition: 'transform 0.2s ease',
        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <path d="m6 9 6 6 6-6" />
    </Box>
  )
}

export default function QuestionsCollapse() {
  const { t } = useTranslation()
  const items = t('schools.faq.items')
  const list = Array.isArray(items) ? items : []
  const { isExpanded, toggle } = useSchoolFaqAccordion(list.length)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {list.map((item, index) => {
        const expanded = isExpanded(index)
        const panelId = `school-faq-panel-${index}`
        const headerId = `school-faq-header-${index}`

        return (
          <Box
            key={headerId}
            sx={{
              bgcolor: 'common.white',
              borderRadius: 2,
              boxShadow: 3,
              border: '4px solid',
              borderColor: themeColors.secondary,
              overflow: 'hidden',
            }}
          >
            <Box
              component="button"
              type="button"
              id={headerId}
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              sx={{
                width: '100%',
                p: { xs: 2.5, md: 3 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                textAlign: 'left',
                border: 'none',
                bgcolor: 'common.white',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  bgcolor: 'grey.50',
                },
                '&:focus-visible': {
                  outline: `3px solid ${themeColors.secondary}`,
                  outlineOffset: -3,
                },
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: { xs: '1.125rem', md: '1.25rem' },
                  fontWeight: 700,
                  color: themeColors.secondary,
                  pr: 1,
                  flex: 1,
                }}
              >
                {item?.question ?? ''}
              </Typography>
              <ChevronDown expanded={expanded} />
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                sx={{ px: { xs: 2.5, md: 3 }, pb: { xs: 2.5, md: 3 }, pt: 0 }}
              >
                <Typography
                  component="p"
                  sx={{
                    fontSize: { xs: '1.0625rem', md: '1.125rem' },
                    color: 'grey.700',
                    lineHeight: 1.7,
                    fontWeight: 600,
                  }}
                >
                  {item?.answer ?? ''}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        )
      })}
    </Box>
  )
}
