import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { useSchoolApplicationForm } from '../../../hooks/useSchoolApplicationForm.js'
import { themeColors } from '../../../config/themeColors.js'

const ROLE_KEYS = ['owner', 'principal', 'coordinator', 'teacher']

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    fontSize: { xs: '1rem', md: '1.125rem' },
    fontWeight: 600,
    borderRadius: 2,
    bgcolor: 'common.white',
    '& fieldset': {
      borderWidth: 4,
      borderColor: 'grey.200',
    },
    '&:hover fieldset': {
      borderColor: themeColors.primary,
    },
    '&.Mui-focused fieldset': {
      borderWidth: 4,
      borderColor: themeColors.primary,
    },
  },
}

const labelSx = {
  display: 'block',
  fontSize: { xs: '1.125rem', md: '1.25rem' },
  fontWeight: 700,
  color: 'grey.700',
  mb: 1.5,
}

function FormField({ id, label, children }) {
  return (
    <Box>
      <Typography component="label" htmlFor={id} sx={labelSx}>
        {label}
      </Typography>
      {children}
    </Box>
  )
}

export default function ExperienceForm() {
  const { t } = useTranslation()
  const {
    values,
    loading,
    success,
    error,
    errorMessage,
    handleChange,
    handleBlur,
    handleSubmit,
    isInvalid,
  } = useSchoolApplicationForm()

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}
    >
      <FormField id="school-name" label={t('schools.applicationForm.fields.schoolName')}>
        <TextField
          id="school-name"
          required
          fullWidth
          value={values.schoolName}
          onChange={handleChange('schoolName')}
          onBlur={handleBlur('schoolName')}
          error={isInvalid('schoolName')}
          sx={fieldSx}
        />
      </FormField>

      <FormField id="school-city-country" label={t('schools.applicationForm.fields.cityCountry')}>
        <TextField
          id="school-city-country"
          required
          fullWidth
          value={values.cityCountry}
          onChange={handleChange('cityCountry')}
          onBlur={handleBlur('cityCountry')}
          error={isInvalid('cityCountry')}
          sx={fieldSx}
        />
      </FormField>

      <FormField id="school-role" label={t('schools.applicationForm.fields.role')}>
        <Select
          id="school-role"
          required
          fullWidth
          displayEmpty
          value={values.role}
          onChange={handleChange('role')}
          onBlur={handleBlur('role')}
          error={isInvalid('role')}
          sx={fieldSx}
          inputProps={{ 'aria-label': t('schools.applicationForm.fields.role') }}
        >
          <MenuItem value="" disabled>
            {t('schools.applicationForm.rolePlaceholder')}
          </MenuItem>
          {ROLE_KEYS.map((key) => (
            <MenuItem key={key} value={key}>
              {t(`schools.applicationForm.roles.${key}`)}
            </MenuItem>
          ))}
        </Select>
      </FormField>

      <FormField id="school-whatsapp" label={t('schools.applicationForm.fields.whatsapp')}>
        <TextField
          id="school-whatsapp"
          type="tel"
          required
          fullWidth
          placeholder={t('schools.applicationForm.placeholders.whatsapp')}
          value={values.whatsapp}
          onChange={handleChange('whatsapp')}
          onBlur={handleBlur('whatsapp')}
          error={isInvalid('whatsapp')}
          sx={fieldSx}
        />
      </FormField>

      <FormField id="school-email" label={t('schools.applicationForm.fields.email')}>
        <TextField
          id="school-email"
          type="email"
          required
          fullWidth
          value={values.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          error={isInvalid('email')}
          sx={fieldSx}
        />
      </FormField>

      <FormField id="school-student-count" label={t('schools.applicationForm.fields.studentCount')}>
        <TextField
          id="school-student-count"
          required
          fullWidth
          value={values.studentCount}
          onChange={handleChange('studentCount')}
          onBlur={handleBlur('studentCount')}
          error={isInvalid('studentCount')}
          sx={fieldSx}
        />
      </FormField>

      <FormField id="school-age-group" label={t('schools.applicationForm.fields.ageGroup')}>
        <TextField
          id="school-age-group"
          required
          fullWidth
          value={values.ageGroup}
          onChange={handleChange('ageGroup')}
          onBlur={handleBlur('ageGroup')}
          error={isInvalid('ageGroup')}
          sx={fieldSx}
        />
      </FormField>

      <Box>
        <Typography component="legend" sx={labelSx}>
          {t('schools.applicationForm.fields.currentEnglish')}
        </Typography>
        <RadioGroup
          row
          name="currentEnglish"
          value={values.currentEnglish}
          onChange={handleChange('currentEnglish')}
          onBlur={handleBlur('currentEnglish')}
          sx={{ gap: 3, mt: 0.5 }}
        >
          <FormControlLabel
            value="yes"
            control={<Radio sx={{ '&.Mui-checked': { color: themeColors.primary } }} />}
            label={
              <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>
                {t('schools.applicationForm.currentEnglish.yes')}
              </Typography>
            }
          />
          <FormControlLabel
            value="no"
            control={<Radio sx={{ '&.Mui-checked': { color: themeColors.primary } }} />}
            label={
              <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>
                {t('schools.applicationForm.currentEnglish.no')}
              </Typography>
            }
          />
        </RadioGroup>
      </Box>

      <FormField id="school-interest" label={t('schools.applicationForm.fields.interest')}>
        <TextField
          id="school-interest"
          required
          fullWidth
          multiline
          minRows={5}
          value={values.interest}
          onChange={handleChange('interest')}
          onBlur={handleBlur('interest')}
          error={isInvalid('interest')}
          sx={fieldSx}
        />
      </FormField>

      {error && (
        <Typography
          role="alert"
          sx={{ color: 'error.main', textAlign: 'center', fontWeight: 600 }}
        >
          {errorMessage || t('schools.applicationForm.error')}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading || success}
        aria-label={t('schools.applicationForm.submit')}
        aria-busy={loading}
        sx={{
          py: { xs: 2, md: 2.5 },
          px: 4,
          fontSize: { xs: '1.35rem', md: '1.5rem' },
          fontWeight: 700,
          borderRadius: 2,
          textTransform: 'none',
          bgcolor: themeColors.primary,
          color: 'common.white',
          boxShadow: 4,
          '&:hover': {
            bgcolor: themeColors.secondary,
            boxShadow: 6,
            transform: 'scale(1.02)',
          },
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        }}
      >
        {loading ? (
          <>
            <CircularProgress size={28} sx={{ color: 'common.white', mr: 1.5 }} aria-hidden />
            {t('schools.applicationForm.sending')}
          </>
        ) : success ? (
          t('schools.applicationForm.success')
        ) : (
          t('schools.applicationForm.submit')
        )}
      </Button>

      <Typography
        component="p"
        sx={{
          textAlign: 'center',
          color: 'grey.600',
          fontSize: { xs: '1.0625rem', md: '1.125rem' },
          lineHeight: 1.7,
          fontWeight: 600,
          pt: 1,
        }}
      >
        {t('schools.applicationForm.footerNote')}
      </Typography>
    </Box>
  )
}
