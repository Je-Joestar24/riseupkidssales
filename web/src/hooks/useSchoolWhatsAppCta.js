import { SCHOOLS_WHATSAPP_PHONE } from '../constants/env.js'
import { buildSchoolWhatsAppLink } from '../utils/buildSchoolWhatsAppLink.js'
import { useTranslation } from './useTranslation.js'

export function useSchoolWhatsAppCta() {
  const { t, language } = useTranslation()

  const href = buildSchoolWhatsAppLink({
    phone: SCHOOLS_WHATSAPP_PHONE,
    language,
  })

  return {
    prompt: t('schools.whatsappCta.prompt'),
    buttonLabel: t('schools.whatsappCta.button'),
    buttonAria: t('schools.whatsappCta.buttonAria'),
    sectionAria: t('schools.whatsappCta.sectionAria'),
    href,
    isAvailable: Boolean(href),
  }
}

export default useSchoolWhatsAppCta
