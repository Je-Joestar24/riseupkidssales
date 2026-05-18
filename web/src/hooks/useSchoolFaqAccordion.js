import { useCallback, useState } from 'react'

export function useSchoolFaqAccordion(itemCount) {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const isExpanded = useCallback(
    (index) => expandedIndex === index,
    [expandedIndex],
  )

  const toggle = useCallback((index) => {
    setExpandedIndex((current) => (current === index ? null : index))
  }, [])

  return {
    expandedIndex,
    isExpanded,
    toggle,
    itemCount,
  }
}

export default useSchoolFaqAccordion
