import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  NAV_APP_BAR_COMPACT_HEIGHT_PX,
  NAV_APP_BAR_HEIGHT_PX,
  NAV_HEADER_SCROLL_THRESHOLD_PX,
  NAV_HEADER_TRANSITION_MS,
} from '../config/constants.js'
import { isHeaderScrolled } from '../utils/scrolledHeader.js'

const srcRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

describe('Compact sticky header', () => {
  it('keeps the expanded header at 250px and compact height in the 60–65px range', () => {
    expect(NAV_APP_BAR_HEIGHT_PX).toBe(250)
    expect(NAV_APP_BAR_COMPACT_HEIGHT_PX).toBeGreaterThanOrEqual(60)
    expect(NAV_APP_BAR_COMPACT_HEIGHT_PX).toBeLessThanOrEqual(65)
  })

  it('compacts after leaving the top and expands again when returning to the top', () => {
    expect(isHeaderScrolled(0)).toBe(false)
    expect(isHeaderScrolled(NAV_HEADER_SCROLL_THRESHOLD_PX)).toBe(false)
    expect(isHeaderScrolled(NAV_HEADER_SCROLL_THRESHOLD_PX + 1)).toBe(true)
    expect(isHeaderScrolled(400)).toBe(true)
  })

  it('uses a 250–300ms morph transition', () => {
    expect(NAV_HEADER_TRANSITION_MS).toBeGreaterThanOrEqual(250)
    expect(NAV_HEADER_TRANSITION_MS).toBeLessThanOrEqual(300)
  })

  it('uses a fixed header over a stable spacer so the page does not jump', () => {
    const headers = readFileSync(join(srcRoot, 'components/common/NavHeaders.jsx'), 'utf8')
    const logo = readFileSync(join(srcRoot, 'components/common/NavLogo.jsx'), 'utf8')
    const hook = readFileSync(join(srcRoot, 'hooks/useScrolledHeader.js'), 'utf8')

    expect(headers).toContain('position="fixed"')
    expect(headers).toContain('NAV_APP_BAR_HEIGHT_PX')
    expect(headers).toContain('height: NAV_APP_BAR_HEIGHT_PX')
    expect(headers).toContain('transition:')
    expect(headers).toContain('height ${morph}')
    expect(headers).toContain("left: scrolled ? 0 : '50%'")
    expect(headers).toContain("transform: scrolled ? 'translateY(-50%)' : 'translateX(-50%)'")
    expect(logo).toContain('height: compact ? 42 : 130')
    expect(logo).toContain("justifyContent: compact ? 'flex-start' : 'center'")
    expect(hook).toContain("typeof window === 'undefined'")
    expect(hook).toContain('visualViewport')
    expect(hook).not.toContain('getHeaderScrollCompensationPx')
  })

  it('does not shrink the schools hero offset constant', () => {
    const hero = readFileSync(join(srcRoot, 'components/school/HeroSection/HeroMain.jsx'), 'utf8')
    expect(hero).toContain('NAV_APP_BAR_HEIGHT_PX')
    expect(hero).not.toContain('NAV_APP_BAR_COMPACT_HEIGHT_PX')
  })
})
