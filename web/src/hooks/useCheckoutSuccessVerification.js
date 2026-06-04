import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  getCheckoutSessionDetails,
  verifyPagseguroCheckout,
} from '../services/checkoutService.js'

const PAGSEGURO_VERIFY_ATTEMPTS = 10
const PAGSEGURO_VERIFY_DELAY_MS = 2000

function readPagseguroCheckoutId(searchParams) {
  const fromQuery =
    searchParams.get('checkout_id')?.trim() ||
    searchParams.get('checkoutId')?.trim() ||
    ''
  if (fromQuery) return fromQuery
  try {
    return (
      sessionStorage.getItem('pagseguro_checkout_id') ||
      localStorage.getItem('pagseguro_checkout_id') ||
      ''
    ).trim()
  } catch (_) {
    return ''
  }
}

function clearPagseguroStorage() {
  try {
    sessionStorage.removeItem('checkout_provider')
    sessionStorage.removeItem('pagseguro_checkout_id')
    localStorage.removeItem('pagseguro_checkout_id')
  } catch (_) {}
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function verifyPagseguroWithRetry(checkoutId) {
  let lastError = null
  for (let attempt = 1; attempt <= PAGSEGURO_VERIFY_ATTEMPTS; attempt += 1) {
    try {
      const result = await verifyPagseguroCheckout(checkoutId)
      return result
    } catch (err) {
      lastError = err
      if (!err?.pending || attempt === PAGSEGURO_VERIFY_ATTEMPTS) {
        throw err
      }
      await sleep(PAGSEGURO_VERIFY_DELAY_MS)
    }
  }
  throw lastError || new Error('Payment not completed yet.')
}

/**
 * Resolves checkout success for Stripe, PayPal, and PagSeguro.
 * @returns {{ status: 'loading' | 'success' | 'error', errorMessage: string | null }}
 */
export function useCheckoutSuccessVerification() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState(null)

  const sessionId = searchParams.get('session_id')
  const provider = searchParams.get('provider')

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      const storedProvider =
        typeof window !== 'undefined'
          ? window.sessionStorage?.getItem('checkout_provider')
          : null

      const isPayPal =
        provider === 'paypal' || storedProvider === 'paypal'

      if (isPayPal) {
        clearPagseguroStorage()
        try {
          sessionStorage.removeItem('checkout_provider')
        } catch (_) {}
        if (!cancelled) setStatus('success')
        return
      }

      const isPagseguro =
        provider === 'pagseguro' || storedProvider === 'pagseguro'
      const pagseguroCheckoutId = readPagseguroCheckoutId(searchParams)

      if (isPagseguro) {
        if (!pagseguroCheckoutId) {
          if (!cancelled) {
            setErrorMessage('missing_checkout')
            setStatus('error')
          }
          return
        }

        try {
          await verifyPagseguroWithRetry(pagseguroCheckoutId)
          clearPagseguroStorage()
          if (!cancelled) setStatus('success')
        } catch (err) {
          if (!cancelled) {
            setErrorMessage(err?.message || 'payment_pending')
            setStatus('error')
          }
        }
        return
      }

      const stripeSessionId = sessionId?.trim()
      if (!stripeSessionId) {
        navigate('/checkout/register', { replace: true })
        return
      }

      try {
        await getCheckoutSessionDetails(stripeSessionId)
        if (!cancelled) setStatus('success')
      } catch (err) {
        if (!cancelled) {
          setErrorMessage(err?.message || 'invalid_session')
          setStatus('error')
        }
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [sessionId, provider, searchParams, navigate])

  return { status, errorMessage }
}

export function persistPagseguroCheckoutSession(checkoutId) {
  if (!checkoutId) return
  try {
    sessionStorage.setItem('checkout_provider', 'pagseguro')
    sessionStorage.setItem('pagseguro_checkout_id', checkoutId)
    localStorage.setItem('pagseguro_checkout_id', checkoutId)
  } catch (_) {}
}
