import { Box } from '@mui/material'

const DECORATIONS = [
    { top: 40, left: 40, emoji: '⭐', size: '3rem' },
    { top: 80, right: 80, emoji: '🎨', size: '2.5rem' },
    { bottom: 80, left: 80, emoji: '📚', size: '2.5rem' },
    { bottom: 40, right: 40, emoji: '✨', size: '3rem' },
]

export default function HeroImage() {
    const heroSrc =
        'https://images.unsplash.com/photo-1586503452950-997923af27f9?w=1080&q=80'

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'self-start',
                justifyContent: 'center',
                marginBottom: 'auto'
            }}
        >
            <Box sx={{ position: 'relative', marginBottom: 'auto', display: 'flex' }}>
                <Box
                    aria-hidden
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.3,
                        marginBottom: 'auto'
                    }}
                >
                    {DECORATIONS.map(({ emoji, size, ...pos }, i) => (
                        <Box
                            key={i}
                            component="span"
                            sx={{
                                position: 'absolute',
                                fontSize: size,
                                ...pos,
                            }}
                        >
                            {emoji}
                        </Box>
                    ))}
                </Box>
                <Box
                    component="img"
                    src={heroSrc}
                    alt="Happy child learning"
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: 3
                    }}
                />
            </Box>
        </Box>
    )
}
