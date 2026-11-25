import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { translations } from '../i18n/translations.js'

/**
 * Guards: the checkout holds NO price and NO box. Prices come only from the backend (the one price list), so a
 * number typed back into a page or a translation is caught here, and so is the activity box coming back.
 */
const src = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (...parts) => readFileSync(join(src, ...parts), 'utf8')

function filesIn(dir, ext) {
  const out = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out.push(...filesIn(full, ext))
    else if (ext.some((e) => name.endsWith(e))) out.push(full)
  }
  return out
}

const checkoutFiles = [
  join(src, 'services', 'checkoutService.js'),
  join(src, 'services', 'pricing.js'),
  join(src, 'hooks', 'useCheckout.js'),
  join(src, 'store', 'slices', 'checkoutSlice.js'),
  join(src, 'pages', 'CheckoutPage.jsx'),
  join(src, 'pages', 'CheckoutRegister.jsx'),
  ...filesIn(join(src, 'components', 'checkout'), ['.js', '.jsx']),
]

/** Source without comments and blank lines (comments may talk about prices and the old box). */
function code(file) {
  return readFileSync(file, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .filter((line) => !line.trim().startsWith('//'))
    .map((line) => line.replace(/\s\/\/\s.*$/, '')) // a trailing "// note" (a space before it keeps https:// safe)
    .join('\n')
}

describe('no price tables or limits in the checkout code', () => {
  it('has files to check', () => {
    expect(checkoutFiles.length).toBeGreaterThan(10)
  })

  it.each(checkoutFiles.map((f) => [relative(src, f).replace(/\\/g, '/'), f]))('%s has no price table, box or hard-coded child limit', (_name, file) => {
    const text = code(file)
    expect(text).not.toMatch(/PLAN_PRICES|BOX_PRICE_PER_CHILD|getBoxTotal|getBoxPrice|getTotalPricing/)
    expect(text).not.toMatch(/\baddBox\b|\bsetAddBox\b|\bboxTotal\b|SelectBox/)
    expect(text).not.toMatch(/\bMAX_CHILDREN(_UI)?\b/)
  })

  it('the checkout code has no price written with a currency symbol and a number', () => {
    // pricing.js formats with a symbol and a number it is given; the symbols alone are fine, a typed amount is not
    const offenders = []
    for (const file of checkoutFiles) {
      code(file)
        .split('\n')
        .forEach((line, index) => {
          if (/(R\$|[$€])\s?\d/.test(line) && !/\$\{/.test(line)) offenders.push(`${relative(src, file)}:${index + 1}  ${line.trim()}`)
        })
    }
    expect(offenders).toEqual([])
  })

  it('the box component is switched off: the file is kept for later but all of it is commented out', () => {
    const file = join(src, 'components', 'checkout', 'select', 'SelectBox.jsx')
    expect(readFileSync(file, 'utf8')).toContain('SWITCHED OFF') // the note on how to switch it on again
    expect(readFileSync(file, 'utf8')).toContain('function SelectBox') // the code is really still there
    expect(code(file).trim()).toBe('') // ...and none of it is live
  })

  it('nothing shows or imports the box component', () => {
    const users = filesIn(src, ['.js', '.jsx'])
      .filter((file) => !file.endsWith('SelectBox.jsx') && !file.includes(`${join('src', 'tests')}`))
      .filter((file) => /SelectBox/.test(code(file)))
    expect(users.map((f) => relative(src, f))).toEqual([])
  })

  it('the checkout link no longer carries a box choice', () => {
    // the box choice itself (the link parameter and the state), not CSS names like "box-shadow"
    expect(code(join(src, 'components', 'checkout', 'select', 'SelectCta.jsx'))).not.toMatch(/\baddBox\b|\.set\('box'|boxParam/)
    expect(code(join(src, 'pages', 'CheckoutRegister.jsx'))).not.toMatch(/'box'|"box"|boxParam/)
  })
})

describe('no price and no box in the checkout translations', () => {
  function* walk(object, path = '') {
    if (Array.isArray(object)) object.forEach((item, i) => walk(item, `${path}[${i}]`))
    else if (object && typeof object === 'object') for (const [key, value] of Object.entries(object)) yield* walk(value, path ? `${path}.${key}` : key)
    else if (typeof object === 'string') yield [path, object]
  }
  const collect = (value, path = '', out = []) => {
    if (Array.isArray(value)) value.forEach((item, i) => collect(item, `${path}[${i}]`, out))
    else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) collect(v, path ? `${path}.${k}` : k, out)
    else if (typeof value === 'string') out.push([path, value])
    return out
  }

  it.each(['pt', 'en', 'es'])('%s: no checkout text has a typed price (it used to say "ou R$799 à vista")', (lang) => {
    const offenders = collect(translations[lang].checkout, 'checkout').filter(([, text]) => /(R\$|[$€])\s?\d/.test(text))
    expect(offenders).toEqual([])
  })

  it.each(['pt', 'en', 'es'])('%s: the box texts are kept for later (switched off, with no price in them)', (lang) => {
    const box = translations[lang].checkout.box
    expect(box.title).toBeTruthy()
    expect(box.addBoxLabel).toBeTruthy()
    expect(collect(box).filter(([, text]) => /(R\$|[$€])\s?\d/.test(text))).toEqual([])
  })

  it('...but no live code uses them', () => {
    const users = checkoutFiles.filter((file) => /checkout\.box\./.test(code(file)))
    expect(users.map((f) => relative(src, f))).toEqual([])
  })

  it.each(['pt', 'en', 'es'])('%s: has the texts for loading, failing and trying again', (lang) => {
    const { pricing } = translations[lang].checkout
    expect(pricing.loading).toBeTruthy()
    expect(pricing.error).toBeTruthy()
    expect(pricing.retry).toBeTruthy()
  })

  it('walk helper is not needed by the assertions above (kept simple on purpose)', () => {
    expect([...walk({ a: 'x' })]).toEqual([['a', 'x']])
  })
})
