import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '../../store/slices/languageSlice.js'
import { resolveLanguageFromSearch } from '../../utils/salesLanguage.js'

/** URL `?lang=` is the source of truth, including Portuguese (`pt` or omitted). */
export default function LanguageQuerySync() {
  const dispatch = useDispatch()
  const language = useSelector((state) => state.language.current)
  const location = useLocation()

  useEffect(() => {
    const fromUrl = resolveLanguageFromSearch(location.search)
    if (fromUrl !== language) {
      dispatch(setLanguage(fromUrl))
    }
  }, [location.search, language, dispatch])

  return null
}
