import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import LegalDocumentView from '../components/legal/LegalDocumentView.jsx'
import privacyBody from '../../legal/privacy/body.html?raw'

export default function LegalPrivacyPage() {
  useDocumentTitle('Privacy Policy | Rise Up Kids')

  return (
    <LegalDocumentView
      title="Privacy Policy"
      ariaLabel="Privacy Policy"
      bodyHtml={privacyBody}
    />
  )
}
