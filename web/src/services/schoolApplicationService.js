import api from '../axios'

/**
 * Submit schools page application form.
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function submitSchoolApplication(data) {
  const response = await api.post('/school-application', data)
  return response.data
}
