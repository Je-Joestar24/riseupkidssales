import { Box } from '@mui/material'
import heroSrc from '../../../assets/images/hero.png'

const DECORATIONS = [
    { top: 40, left: 40, emoji: '⭐', size: '3rem' },
    { top: 80, right: 80, emoji: '🎨', size: '2.5rem' },
    { bottom: 80, left: 80, emoji: '📚', size: '2.5rem' },
    { bottom: 40, right: 40, emoji: '✨', size: '3rem' },
]

export default function HeroImage() {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    width: '100%',
                    maxWidth: 450,
                    mx: 'auto',
                    borderRadius: 3,
                    overflow: 'hidden',
                    aspectRatio: '1 / 1.618',
                }}
            >
                <Box
                    aria-hidden
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.3,
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
                    alt="Children smiling together"
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </Box>
        </Box>
    )
}
