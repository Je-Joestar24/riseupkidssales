import { useCallback, useState } from 'react'
import { useTranslation } from './useTranslation.js'
import { submitSchoolApplication } from '../services/schoolApplicationService.js'

const INITIAL_VALUES = {
  schoolName: '',
  cityCountry: '',
  role: '',
  whatsapp: '',
  email: '',
  studentCount: '',
  ageGroup: '',
  currentEnglish: '',
  interest: '',
}

const REQUIRED_FIELDS = Object.keys(INITIAL_VALUES)

export function useSchoolApplicationForm() {
  const { language } = useTranslation()
  const [values, setValues] = useState(INITIAL_VALUES)
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = useCallback((field) => (event) => {
    setError(false)
    setValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }, [])

  const handleBlur = useCallback((field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }, [])

  const validate = useCallback(() => {
    return REQUIRED_FIELDS.every((field) => {
      const value = values[field]
      return typeof value === 'string' ? value.trim().length > 0 : Boolean(value)
    })
  }, [values])

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      const allTouched = REQUIRED_FIELDS.reduce((acc, key) => ({ ...acc, [key]: true }), {})
      setTouched(allTouched)

      if (!validate()) return

      setLoading(true)
      setSuccess(false)
      setError(false)

      try {
        await submitSchoolApplication({
          schoolName: values.schoolName.trim(),
          cityCountry: values.cityCountry.trim(),
          role: values.role,
          whatsapp: values.whatsapp.trim(),
          email: values.email.trim(),
          studentCount: values.studentCount.trim(),
          ageGroup: values.ageGroup.trim(),
          currentEnglish: values.currentEnglish,
          interest: values.interest.trim(),
          language,
        })
        setSuccess(true)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    },
    [language, validate, values],
  )

  const isInvalid = useCallback(
    (field) => touched[field] && !values[field]?.toString().trim(),
    [touched, values],
  )

  return {
    values,
    loading,
    success,
    error,
    handleChange,
    handleBlur,
    handleSubmit,
    isInvalid,
  }
}

export default useSchoolApplicationForm
