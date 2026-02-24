import api from '../axios'

export const createFoundingFamilyLead = (payload) =>
  api.post('/sales/founding-families/leads', payload)

