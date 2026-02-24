import { useEffect } from 'react'
import { APP_NAME } from '../config/constants'

export const useDocumentTitle = (pageTitle) => {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME
  }, [pageTitle])
}

export default useDocumentTitle

