/** Lucide-style stroke icons for link cards (paths match Lucide `users`, `school`, `play`). */
const svgCommon = {
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function LucideUsersIcon({ size = 80 }) {
  return (
    <svg {...svgCommon} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" fill="none" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export function LucideSchoolIcon({ size = 80 }) {
  return (
    <svg {...svgCommon} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
      <path d="m18 10 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10" />
      <path d="M18 5v17" />
      <path d="m4 6 7.106-3.553a2 2 0 0 1 1.788 0L20 6" />
      <path d="M6 5v17" />
      <circle cx="12" cy="9" r="2" fill="none" />
    </svg>
  )
}

export function LucidePlayIcon({ size = 80 }) {
  return (
    <svg {...svgCommon} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <polygon points="6 3 20 12 6 21 6 3" fill="none" />
    </svg>
  )
}
