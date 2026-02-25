import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

const svgBase = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    width: 64,
    height: 64,
    'aria-hidden': true,
}

function IconEar(props) {
    return (
        <svg {...svgBase} {...props}>
            <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" />
            <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" />
        </svg>
    )
}

function IconMessageSquare(props) {
    return (
        <svg {...svgBase} {...props}>
            <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
        </svg>
    )
}

function IconVolume2(props) {
    return (
        <svg {...svgBase} {...props}>
            <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
            <path d="M16 9a5 5 0 0 1 0 6" />
            <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
        </svg>
    )
}

function IconMic(props) {
    return (
        <svg {...svgBase} {...props}>
            <path d="M12 19v3" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <rect x="9" y="2" width="6" height="13" rx="3" />
        </svg>
    )
}

function IconArrowRight(props) {
    return (
        <svg
            {...svgBase}
            {...props}
            width={48}
            height={48}
            style={{ strokeWidth: 3, ...props.style }}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}

const JOURNEY_CARDS = [
    {
        key: 'comprehension',
        Icon: IconEar,
        color: '#62caca',
    },
    {
        key: 'interaction',
        Icon: IconMessageSquare,
        color: '#f2af10',
    },
    {
        key: 'expression',
        Icon: IconVolume2,
        color: '#e98a68',
    },
    {
        key: 'speaking',
        Icon: IconMic,
        color: '#85c2b9',
    },
]

export default function JourneyCards() {
    const { t } = useTranslation()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                maxWidth: 'xl',
                mx: 'auto',
            }}
        >
            {JOURNEY_CARDS.map(({ key, Icon, color }, index) => (
                <Box
                    key={key}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        gap: 3,
                        width: { xs: '100%', md: 'auto' },
                        position: 'relative',
                        overflow: 'visible'
                    }}
                >
                    <Box sx={{
                        width: '100%', maxWidth: { md: 256 },
                        position: 'relative',
                        overflow: 'visible'
                    }}>
                        <Card
                            component="article"
                            aria-labelledby={`journey-card-${key}-title`}
                            sx={{
                                p: 5,
                                borderRadius: 3,
                                boxShadow: 1,
                                height: '100%',
                                transition: 'box-shadow 0.2s ease',
                                '&:hover': {
                                    boxShadow: 2,
                                },
                                position: 'relative',
                                overflow: 'visible'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    position: 'relative',
                                }}
                            >
                                <Box sx={{ mb: 3 }} style={{ color }}>
                                    <Icon />
                                </Box>
                                <Typography
                                    id={`journey-card-${key}-title`}
                                    component="h3"
                                    variant="h3"
                                    sx={{
                                        fontSize: '1.875rem',
                                        mb: 2.5,
                                        letterSpacing: '0.1em',
                                        color,
                                        position: 'absolute',
                                        top: 70,
                                        zIndex: '',
                                    }}
                                >
                                    {t(`journey.cards.${key}.title`)}
                                </Typography>
                                <Typography
                                    component="p"
                                    sx={{
                                        fontSize: '1.125rem',
                                        color: 'grey.500',
                                        lineHeight: 1.6,
                                        wordBreak: 'break-word',
                                        mt: 4,
                                    }}
                                >
                                    {t(`journey.cards.${key}.description`)}
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                    {index < JOURNEY_CARDS.length - 1 && (
                        <Box
                            sx={{
                                flexShrink: 0,
                                display: { xs: 'none', md: 'flex' },
                            }}
                            style={{ color: JOURNEY_CARDS[index].color }}
                            aria-hidden
                        >
                            <IconArrowRight />
                        </Box>
                    )}
                </Box>
            ))}
        </Box>
    )
}
