import { useEffect } from 'react'

const HTML_LANG = { pt: 'pt-BR', es: 'es', en: 'en' }

/** Keeps <html lang> in step with the page language, and puts it back on leaving. */
export function useHtmlLang(language) {
  useEffect(() => {
    const previous = document.documentElement.lang
    document.documentElement.lang = HTML_LANG[language] || 'pt-BR'
    return () => {
      document.documentElement.lang = previous
    }
  }, [language])
}

export default useHtmlLang
