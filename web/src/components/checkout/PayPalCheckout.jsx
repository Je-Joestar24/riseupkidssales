/**
 * PayPalCheckout.jsx
 *
 * React PayPal checkout component for one-time yearly payments.
 * Supports PayPal and Pay Later (Pay in 4) via @paypal/react-paypal-js.
 *
 * Usage on checkout page (similar to Stripe flow):
 *   - Parent selects payment method (e.g. "Pay with PayPal" vs "Pay with card (Stripe)").
 *   - When PayPal is selected: ensure parent is authenticated (register first if needed), then render:
 *     <PayPalCheckout
 *       tier={getPaypalTier(childCount, "USD")}
 *       amount={planPricing.amount}
 *       currency="USD"
 *       token={parentToken}
 *       onSuccess={({ orderID }) => { navigate("/checkout/success"); }}
 *       onError={(err) => setError(err.message); }}
 *     />
 *
 * How tier maps to backend:
 *   - tier must match backend valid tiers from paypalFamilyPlanPrices.json (18 prices: 3 currencies × 6 tiers each).
 *   - Base: "1_child", "2_children", "3_children" (Pay in 4 when available).
 *   - Yearly: "1_child_yearly", "2_children_yearly", "3_children_yearly" (when Pay in 4 not available in region).
 *   - Format: "{tierKey}_{CURRENCY}" (e.g. "1_child_USD", "2_children_yearly_BRL").
 *   - Use getPaypalTier(childCount, currency, useYearly) from checkoutService to build tier.
 *   - Backend create-order validates tier and returns orderID; capture-order updates user subscription.
 *
 * Pay Later messaging:
 *   - PayPal shows Pay in 4 / Pay Later automatically when eligible (no extra config).
 *   - Optional <PayPalMessages /> displays messaging above the button; amount prop should match order total.
 *
 * Customization with checkoutService:
 *   - createPaypalOrder({ token, tier }) and capturePaypalOrder({ token, orderID }) are used here.
 *   - To plug in analytics or other side effects, call them inside onSuccess or wrap the service functions.
 *
 * Env:
 *   - VITE_PAYPAL_CLIENT_ID (or REACT_APP_PAYPAL_CLIENT_ID): PayPal JS SDK client ID
 *   - VITE_API_URL: base URL for backend (used by checkoutService)
 */

import React, { useCallback } from 'react'
import { PayPalScriptProvider, PayPalButtons, PayPalMessages } from '@paypal/react-paypal-js'
import { createPaypalOrder, capturePaypalOrder } from '../../services/checkoutService'

// Prefer Vite env; fallback for CRA or if only REACT_APP_ is set (e.g. in .env)
const PAYPAL_CLIENT_ID =
  import.meta.env?.VITE_PAYPAL_CLIENT_ID ||
  import.meta.env?.REACT_APP_PAYPAL_CLIENT_ID ||
  ''

/**
 * @param {Object} props
 * @param {string} props.tier - Backend tier (e.g. "1_child_USD", "2_children_BRL")
 * @param {number} props.amount - Order amount for display / Pay Later messaging (e.g. 799)
 * @param {string} [props.currency='USD'] - Currency code for PayPal Messages (USD, BRL, EUR)
 * @param {string} [props.token] - JWT for create-order and capture-order (required for authenticated parent)
 * @param {function} [props.onSuccess] - Called after successful capture with { orderID, success, message }
 * @param {function} [props.onError] - Called on create/capture error with Error or message string
 * @param {boolean} [props.showPayLaterMessage=true] - Whether to render PayPalMessages (Pay in 4)
 * @param {boolean} [props.skipScriptProvider=false] - When true, do not wrap in PayPalScriptProvider (caller provides it)
 * @param {string} [props.className] - Optional class for the wrapper
 * @param {object} [props.sx] - Optional MUI sx for the wrapper (if using MUI)
 */
function PayPalCheckout({
  tier,
  amount,
  currency = 'USD',
  token,
  onSuccess,
  onError,
  showPayLaterMessage = true,
  skipScriptProvider = false,
  className,
  sx,
}) {
  const handleCreateOrder = useCallback(
    async () => {
      if (!tier?.trim()) {
        const err = new Error('Tier is required for PayPal checkout')
        if (onError) onError(err)
        else console.error('[PayPalCheckout]', err.message)
        throw err
      }
      try {
        const { orderID } = await createPaypalOrder({ token, tier: tier.trim() })
        return orderID
      } catch (err) {
        const message = err?.response?.data?.message || err?.message || 'Failed to create order'
        if (onError) onError(err)
        else console.error('[PayPalCheckout] createOrder:', message)
        throw err
      }
    },
    [tier, token, onError]
  )

  const handleApprove = useCallback(
    async (data) => {
      const orderID = data?.orderID
      if (!orderID) {
        const err = new Error('No orderID in approval data')
        if (onError) onError(err)
        else console.error('[PayPalCheckout]', err.message)
        return
      }
      try {
        const result = await capturePaypalOrder({ token, orderID })
        if (onSuccess) {
          onSuccess({ orderID, success: result.success, message: result.message })
        }
      } catch (err) {
        const message = err?.response?.data?.message || err?.message || 'Failed to capture order'
        if (onError) onError(err)
        else console.error('[PayPalCheckout] capture:', message)
      }
    },
    [token, onSuccess, onError]
  )

  const handleError = useCallback(
    (err) => {
      const message = err?.message || (typeof err === 'string' ? err : 'PayPal error')
      if (onError) onError(err)
      else console.error('[PayPalCheckout] onError:', message)
    },
    [onError]
  )

  if (!PAYPAL_CLIENT_ID) {
    return (
      <div className={className} style={sx}>
        <p role="alert">PayPal is not configured (missing client ID).</p>
      </div>
    )
  }

  const scriptOptions = {
    clientId: PAYPAL_CLIENT_ID,
    currency: currency?.toUpperCase() || 'USD',
    intent: 'capture',
    // Load buttons and messages (Pay Later) – messages component required for <PayPalMessages />
    components: showPayLaterMessage ? 'buttons,messages' : 'buttons',
  }

  const messagesAmount = amount != null && Number.isFinite(Number(amount)) ? String(Number(amount)) : undefined

  const inner = (
    <div className={className} style={sx}>
      {/* Pay Later / Pay in 4 messaging – PayPal supports USD, EUR, GBP for messages; hide for BRL to avoid wrong currency. */}
      {showPayLaterMessage && messagesAmount && ['USD', 'EUR', 'GBP'].includes((currency || 'USD').toUpperCase()) && (
        <PayPalMessages
          amount={messagesAmount}
          currency={(currency || 'USD').toUpperCase()}
          style={{ layout: 'text' }}
        />
      )}
      <PayPalButtons
        createOrder={handleCreateOrder}
        onApprove={handleApprove}
        onError={handleError}
        style={{ layout: 'vertical', shape: 'rect', color: 'gold' }}
        disabled={!tier?.trim() || !token}
      />
    </div>
  )

  if (skipScriptProvider) {
    return inner
  }

  return (
    <PayPalScriptProvider options={scriptOptions}>
      {inner}
    </PayPalScriptProvider>
  )
}

export default PayPalCheckout
export { PayPalCheckout }
