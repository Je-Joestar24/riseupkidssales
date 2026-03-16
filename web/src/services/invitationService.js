import axios from 'axios'

/**
 * Submit sales page invitation to Flodesk (no user account created).
 * @param {Object} data - { parentName, email, whatsapp, age, language, consent }
 * @returns {Promise<Object>} API response with success and data
 */
export async function submitInvitation(data) {
  const response = await axios.post('/api/invitation', {
    parentName: data.parentName,
    email: data.email,
    whatsapp: data.whatsapp,
    age: data.age,
    language: data.language,
    consent: data.consent,
  })
  return response.data
}
