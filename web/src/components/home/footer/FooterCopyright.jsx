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
            }}
        >
            <Typography component="div" sx={{
                fontSize: '1.125rem', color: 'grey.600',
                fontWeight: 600
            }}>
                {t('footer.copyright')}
            </Typography>
            <Typography component="div" sx={{
                fontSize: '1.125rem', color: 'grey.600',
                fontWeight: 600
            }}>
                {t('footer.rightsReserved')}
            </Typography>
        </Box>
    )
}
