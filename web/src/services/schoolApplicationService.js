import api from '../axios'
import { executeRecaptcha } from './recaptchaService.js'

/**
 * Submit schools page application form.
 * @param {Object} data
 * @param {string} data.schoolName
 * @param {string} data.cityCountry
 * @param {string} data.role
 * @param {string} data.whatsapp
 * @param {string} data.email
 * @param {string} data.studentCount
 * @param {string} data.ageGroup
 * @param {string} data.currentEnglish
 * @param {string} data.interest
 * @param {string} data.language - pt | en | es
 * @returns {Promise<Object>} API response with success and data
 */
export async function submitSchoolApplication(data) {
  const captchaToken = await executeRecaptcha('school_application')
  const response = await api.post('/school-application', {
    schoolName: data.schoolName,
    cityCountry: data.cityCountry,
    role: data.role,
    whatsapp: data.whatsapp,
    email: data.email,
    studentCount: data.studentCount,
    ageGroup: data.ageGroup,
    currentEnglish: data.currentEnglish,
    interest: data.interest,
    language: data.language,
    captchaToken,
  })
  return response.data
}
