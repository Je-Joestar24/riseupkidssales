import axios from 'axios'

/**
 * Submit sales page invitation to Flodesk (no user account created).
 * @param {Object} data - { parentName, email, whatsapp, age }
 * @returns {Promise<Object>} API response with success and data
 */
export async function submitInvitation(data) {
  const response = await axios.post('/api/invitation', {
    parentName: data.parentName,
    email: data.email,
    whatsapp: data.whatsapp,
    age: data.age,
  })
  return response.data
}
