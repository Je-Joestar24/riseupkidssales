import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import LegalDocumentView from '../components/legal/LegalDocumentView.jsx'
import termsBody from '../../legal/terms/body.html?raw'

export default function LegalTermsPage() {
  useDocumentTitle('Terms of Use | Rise Up Kids')

  return (
    <LegalDocumentView
      title="Terms of Use"
      ariaLabel="Terms of Use"
      bodyHtml={termsBody}
    />
  )
}
