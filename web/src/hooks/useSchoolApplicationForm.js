import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from './useTranslation.js'
import {
  submitSchoolApplicationForm,
  clearSchoolApplicationError,
  resetSchoolApplicationState,
} from '../store/slices/schoolApplicationSlice.js'

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
  const dispatch = useDispatch()
  const { language } = useTranslation()
  const { loading, success, error: submitError } = useSelector(
    (state) => state.schoolApplication,
  )

  const [values, setValues] = useState(INITIAL_VALUES)
  const [touched, setTouched] = useState({})

  const handleChange = useCallback(
    (field) => (event) => {
      dispatch(clearSchoolApplicationError())
      setValues((prev) => ({
        ...prev,
        [field]: event.target.value,
      }))
    },
    [dispatch],
  )

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

      dispatch(clearSchoolApplicationError())

      try {
        await dispatch(
          submitSchoolApplicationForm({
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
          }),
        ).unwrap()
      } catch {
        // Error stored in Redux slice
      }
    },
    [dispatch, language, validate, values],
  )

  const resetForm = useCallback(() => {
    setValues(INITIAL_VALUES)
    setTouched({})
    dispatch(resetSchoolApplicationState())
  }, [dispatch])

  const isInvalid = useCallback(
    (field) => touched[field] && !values[field]?.toString().trim(),
    [touched, values],
  )

  return {
    values,
    loading,
    success,
    error: Boolean(submitError),
    errorMessage: submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isInvalid,
  }
}

export default useSchoolApplicationForm
