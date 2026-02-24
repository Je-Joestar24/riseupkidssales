import { useLanguage } from './useLanguage'
import { translations } from '../i18n/translations'

const getFromPath = (obj, path) =>
  path.split('.').reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), obj)

export const useTranslation = () => {
  const { language } = useLanguage()

  const t = (key) => {
    const value = getFromPath(translations[language], key)
    if (value !== undefined) return value
    const fallback = getFromPath(translations.pt, key)
    return fallback ?? key
  }

  return { t, language }
}

export default useTranslation

