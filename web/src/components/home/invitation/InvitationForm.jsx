import { useState } from 'react'
import { Box, Button, CircularProgress, Grid, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { submitInvitation } from '../../../services/invitationService.js'

export default function InvitationForm() {
    const { t, language } = useTranslation()
    const [values, setValues] = useState({
        name: '',
        email: '',
        whatsapp: '',
        age: '',
        consent: false,
    })
    const [touched, setTouched] = useState({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = (field) => (e) => {
        const value = field === 'consent' ? e.target.checked : e.target.value
        setValues((prev) => ({ ...prev, [field]: value }))
    }

    const handleBlur = (field) => () => {
        setTouched((prev) => ({ ...prev, [field]: true }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched({ name: true, email: true, whatsapp: true, age: true, consent: true })
        const hasError =
            !values.name.trim() ||
            !values.email.trim() ||
            !values.whatsapp.trim() ||
            !values.age.trim() ||
            !values.consent
        if (hasError) return

        setLoading(true)
        setSuccess(false)
        try {
            await submitInvitation({
                parentName: values.name.trim(),
                email: values.email.trim(),
                whatsapp: values.whatsapp.trim(),
                age: values.age.trim(),
                language,
                consent: values.consent,
            })
            setSuccess(true)
        } catch {
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const nameError = touched.name && !values.name.trim()
    const emailError = touched.email && !values.email.trim()
    const whatsappError = touched.whatsapp && !values.whatsapp.trim()
    const ageError = touched.age && !values.age.trim()
    const consentError = touched.consent && !values.consent

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ '& > * + *': { mt: { xs: 2, md: 2.5 } } }}
        >
            <Grid
                container
                spacing={{ xs: 2, md: 2.5 }}
                sx={{ justifyContent: 'space-between', marginBottom: { xs: 2, md: 3 } }}
            >
                <Grid item xs={12} md={6} sx={{ width: { xs: '100%', md: '48%' } }}>
                    <Typography
                        component="label"
                        htmlFor="invitation-name"
                        sx={{
                            display: 'block',
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            mb: { xs: 0.75, md: 1 },
                            color: 'grey.900',
                            opacity: 0.9,
                            fontWeight: 700,
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
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                px: { xs: 1.75, md: 2.5 },
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
                <Grid item xs={12} md={6} sx={{ width: { xs: '100%', md: '48%' } }}>
                    <Typography
                        component="label"
                        htmlFor="invitation-email"
                        sx={{
                            display: 'block',
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            mb: { xs: 0.75, md: 1 },
                            color: 'grey.900',
                            opacity: 0.9,
                            fontWeight: 700,
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
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                px: { xs: 1.75, md: 2.5 },
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
                <Grid item xs={12} md={6} sx={{ width: { xs: '100%', md: '48%' } }}>
                    <Typography
                        component="label"
                        htmlFor="invitation-whatsapp"
                        sx={{
                            display: 'block',
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            mb: { xs: 0.75, md: 1 },
                            color: 'grey.900',
                            opacity: 0.9,
                            fontWeight: 700,
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
                        onBlur={handleBlur('whatsapp')}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                px: { xs: 1.75, md: 2.5 },
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
                <Grid item xs={12} md={6} sx={{ width: { xs: '100%', md: '48%' } }}>
                    <Typography
                        component="label"
                        htmlFor="invitation-age"
                        sx={{
                            display: 'block',
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            mb: { xs: 0.75, md: 1 },
                            color: 'grey.900',
                            opacity: 0.9,
                            fontWeight: 700,
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
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                px: { xs: 1.75, md: 2.5 },
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
            <Box sx={{ my: { xs: 1.5, md: 2 } }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={values.consent}
                            onChange={handleChange('consent')}
                            color="primary"
                            inputProps={{
                                'aria-required': true,
                                'aria-invalid': consentError,
                            }}
                        />
                    }
                    label={t('invitation.form.consentLabel')}
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontFamily: 'Quicksand, sans-serif',
                            fontWeight: 600,
                            opacity: 0.9,
                            color: 'grey.900',
                            fontSize: { xs: '0.95rem', md: '1rem' },
                        },
                    }}
                />
            </Box>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
                disabled={loading || success || !values.consent}
                sx={{
                    py: { xs: 1.5, md: 2.25 },
                    px: { xs: 2.5, md: 5 },
                    fontSize: { xs: '1.2rem', sm: '1.35rem', md: '1.75rem' },
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
                aria-label={success ? t('invitation.form.success') : t('invitation.form.submit')}
                aria-busy={loading}
            >
                {loading ? (
                    <>
                        <CircularProgress size={28} sx={{ color: 'white', mr: 1.5 }} aria-hidden />
                        {t('invitation.form.sending')}
                    </>
                ) : success ? (
                    t('invitation.form.success')
                ) : (
                    t('invitation.form.submit')
                )}
            </Button>
        </Box>
    )
}
