import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function FooterCopyright() {
    const { t } = useTranslation()

    return (
        <Box
            sx={{
                textAlign: 'center',
                pt: 4,
                borderTop: '4px solid',
                borderColor: '#d4e6e3',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
            }}
        >
            <Typography
                component="p"
                sx={{
                    fontSize: { xs: '14px', sm: '16px' },
                    color: 'grey.600',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    m: 0,
                }}
            >
                {t('footer.copyright')}
            </Typography>
            <Typography
                component="p"
                sx={{
                    fontSize: { xs: '14px', sm: '16px' },
                    color: 'grey.600',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    m: 0,
                }}
            >
                {t('footer.headquarters')}
            </Typography>
        </Box>
    )
}
