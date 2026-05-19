import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '../../store/slices/languageSlice.js'

/** Applies `?lang=` from the URL to Redux on load and when the query changes. */
export default function LanguageQuerySync() {
  const dispatch = useDispatch()
  const language = useSelector((state) => state.language.current)
  const location = useLocation()

  useEffect(() => {
    const fromUrl = new URLSearchParams(location.search).get('lang')
    if (fromUrl === 'pt' || fromUrl === 'en' || fromUrl === 'es') {
      if (fromUrl !== language) {
        dispatch(setLanguage(fromUrl))
      }
    }
  }, [location.search, language, dispatch])

  return null
}
