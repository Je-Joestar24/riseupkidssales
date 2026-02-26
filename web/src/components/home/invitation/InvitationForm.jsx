import { useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function InvitationForm() {
    const { t } = useTranslation()
    const [values, setValues] = useState({
        name: '',
        email: '',
        whatsapp: '',
        age: '',
    })
    const [touched, setTouched] = useState({})

    const handleChange = (field) => (e) => {
        setValues((prev) => ({ ...prev, [field]: e.target.value }))
    }

    const handleBlur = (field) => () => {
        setTouched((prev) => ({ ...prev, [field]: true }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setTouched({ name: true, email: true, age: true })
        // TODO: wire to API
    }

    const nameError = touched.name && !values.name.trim()
    const emailError = touched.email && !values.email.trim()
    const ageError = touched.age && !values.age.trim()

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ '& > * + *': { mt: 3 } }}
        >
            <Grid container spacing={3} sx={{ justifyContent: 'space-evenly', marginBottom: 3 }}>
                <Grid item xs={12} md={6} sx={{ width: { sm: '100%', md: '48%' } }}>
                    <Typography
                        component="label"
                        htmlFor="invitation-name"
                        sx={{
                            display: 'block',
                            fontSize: { xs: '1.125rem', md: '1.25rem' },
                            mb: { xs: 1, md: 1.5 },
                            color: 'black',
                            opacity: 0.75,
                            fontWeight: 600,
                        }}
                    >
                        {t('invitation.form.nameLabel')}
                    </Typography>
                    <TextField
                        id="invitation-name"
                        type="text"
                        required
                        fullWidth
                        placeholder={t('invitation.form.namePlaceholder')}
                        value={values.name}
                        onChange={handleChange('name')}
                        onBlur={handleBlur('name')}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                fontSize: { xs: '1.125rem', md: '1.25rem' },
                                px: { xs: 2, md: 3 },
                                fontWeight: 600,
                                borderRadius: 2,
                                bgcolor: 'white',
                                borderWidth: 2,
                                '& fieldset': { borderWidth: 2, borderColor: 'secondary.main' },
                                '&:hover fieldset': { borderColor: 'secondary.dark' },
                                '&.Mui-focused fieldset': {
                                    borderWidth: 2,
                                    borderColor: 'secondary.main',
                                    boxShadow: '0 0 0 4px rgba(98, 202, 202, 0.3)',
                                },
                            },
                        }}
                        inputProps={{
                            'aria-required': true,
                            'aria-invalid': nameError,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{ width: { sm: '100%', md: '48%' } }}>
                    <Typography
                        component="label"
                        htmlFor="invitation-email"
                        sx={{
                            display: 'block',
                            fontSize: { xs: '1.125rem', md: '1.25rem' },
                            mb: { xs: 1, md: 1.5 },
                            color: 'grey.700',
                            opacity: 0.75,
                            fontWeight: 600,
                        }}
                    >
                        {t('invitation.form.emailLabel')}
                    </Typography>
                    <TextField
                        id="invitation-email"
                        type="email"
                        required
                        fullWidth
                        placeholder={t('invitation.form.emailPlaceholder')}
                        value={values.email}
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                fontSize: { xs: '1.125rem', md: '1.25rem' },
                                px: { xs: 2, md: 3 },
                                borderRadius: 2,
                                bgcolor: 'white',
                                '& fieldset': { borderWidth: 2, borderColor: 'secondary.main' },
                                '&:hover fieldset': { borderColor: 'secondary.dark' },
                                '&.Mui-focused fieldset': {
                                    borderWidth: 2,
                                    borderColor: 'secondary.main',
                                    boxShadow: '0 0 0 4px rgba(98, 202, 202, 0.3)',
                                },
                                fontWeight: 600,
                            },
                        }}
                        inputProps={{
                            'aria-required': true,
                            'aria-invalid': emailError,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{ width: { sm: '100%', md: '48%' } }}>
                    <Typography
                        component="label"
                        htmlFor="invitation-whatsapp"
                        sx={{
                            display: 'block',
                            fontSize: { xs: '1.125rem', md: '1.25rem' },
                            mb: { xs: 1, md: 1.5 },
                            color: 'grey.700',
                            opacity: 0.75,
                            fontWeight: 600,
                        }}
                    >
                        {t('invitation.form.whatsappLabel')}
                    </Typography>
                    <TextField
                        id="invitation-whatsapp"
                        type="tel"
                        fullWidth
                        placeholder={t('invitation.form.whatsappPlaceholder')}
                        value={values.whatsapp}
                        onChange={handleChange('whatsapp')}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                fontSize: { xs: '1.125rem', md: '1.25rem' },
                                px: { xs: 2, md: 3 },
                                borderRadius: 2,
                                bgcolor: 'white',
                                fontWeight: 600,
                                '& fieldset': { borderWidth: 2, borderColor: 'secondary.main' },
                                '&:hover fieldset': { borderColor: 'secondary.dark' },
                                '&.Mui-focused fieldset': {
                                    borderWidth: 2,
                                    borderColor: 'secondary.main',
                                    boxShadow: '0 0 0 4px rgba(98, 202, 202, 0.3)',
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{ width: { sm: '100%', md: '48%' } }}>
                    <Typography
                        component="label"
                        htmlFor="invitation-age"
                        sx={{
                            display: 'block',
                            fontSize: { xs: '1.125rem', md: '1.25rem' },
                            mb: { xs: 1, md: 1.5 },
                            color: 'grey.700',
                            opacity: 0.75,
                            fontWeight: 600,
                        }}
                    >
                        {t('invitation.form.ageLabel')}
                    </Typography>
                    <TextField
                        id="invitation-age"
                        type="text"
                        required
                        fullWidth
                        placeholder={t('invitation.form.agePlaceholder')}
                        value={values.age}
                        onChange={handleChange('age')}
                        onBlur={handleBlur('age')}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                fontSize: { xs: '1.125rem', md: '1.25rem' },
                                px: { xs: 2, md: 3 },
                                borderRadius: 2,
                                bgcolor: 'white',
                                fontWeight: 600,
                                '& fieldset': { borderWidth: 2, borderColor: 'secondary.main' },
                                '&:hover fieldset': { borderColor: 'secondary.dark' },
                                '&.Mui-focused fieldset': {
                                    borderWidth: 2,
                                    borderColor: 'secondary.main',
                                    boxShadow: '0 0 0 4px rgba(98, 202, 202, 0.3)',
                                },
                            },
                        }}
                        inputProps={{
                            'aria-required': true,
                            'aria-invalid': ageError,
                        }}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
                startIcon={
                    <StarIcon
                        sx={{ color: '#FFD54F', width: 40, height: 40, stroke: '#FFD54F', strokeWidth: 2 }}
                        aria-hidden
                    />
                }
                sx={{
                    py: { xs: 2, md: 3 },
                    px: { xs: 4, md: 6 },
                    fontSize: { xs: '1.5rem', md: '1.875rem' },
                    borderRadius: 2,
                    boxShadow: 2,
                    color: 'white',
                    '&:hover': {
                        boxShadow: 4,
                        transform: 'scale(1.02)',
                    },
                    '&:active': {
                        transform: 'scale(0.98)',
                    },
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
                aria-label={t('invitation.form.submit')}
            >
                {t('invitation.form.submit')}
            </Button>
        </Box>
    )
}
