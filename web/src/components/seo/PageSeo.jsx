import { usePageSeo } from '../../hooks/usePageSeo.js'

/**
 * @param {{ seoKey?: 'home' | 'parents' | 'schools' | 'videos' }} props
 */
export default function PageSeo({ seoKey }) {
  usePageSeo(seoKey)
  return null
}
