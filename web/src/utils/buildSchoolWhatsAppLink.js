const SCHOOL_WHATSAPP_MESSAGES = {
  en: 'Hello! I would like to speak with the Rise Up Kids team about bringing the program to my school.',
  pt: 'Olá! Gostaria de falar com a equipe Rise Up Kids sobre levar o programa para minha escola.',
  es: '¡Hola! Me gustaría hablar con el equipo de Rise Up Kids sobre llevar el programa a mi escuela.',
}

export function normalizeWhatsAppPhone(phone) {
  return String(phone || '').replace(/\D/g, '')
}

/**
 * @param {{ phone: string, language?: string }} params
 * @returns {string | null}
 */
export function buildSchoolWhatsAppLink({ phone, language = 'en' }) {
  const normalized = normalizeWhatsAppPhone(phone)
  if (!normalized) return null

  const lang = String(language || 'en').toLowerCase()
  const message = SCHOOL_WHATSAPP_MESSAGES[lang] || SCHOOL_WHATSAPP_MESSAGES.en

  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
}
