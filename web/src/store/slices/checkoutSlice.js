import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MIN_CHILDREN, fetchCheckoutPricing } from '../../services/checkoutService.js'

/**
 * Checkout state: how many children, and the prices the backend sent.
 * The prices (and the most children a family can have) are NOT written here: they are loaded from the backend
 * (GET /api/checkout/pricing) so what the page shows is what is charged.
 *
 * pricing.status: 'idle' (not asked yet) | 'loading' | 'ready' | 'error'
 */

/** Loads the prices once. Asking again while loading or already loaded does nothing; after an error it tries again. */
export const loadPricing = createAsyncThunk(
  'checkout/loadPricing',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCheckoutPricing()
    } catch (err) {
      return rejectWithValue(err?.message || 'Could not load prices.')
    }
  },
  {
    condition: (_, { getState }) => {
      const status = getState().checkout?.pricing?.status
      return status !== 'loading' && status !== 'ready'
    },
  }
)

const initialState = {
  childCount: MIN_CHILDREN,
  // addBox: false,   // activity box: switched off (see docs/ACTIVITY_BOX_DISABLED.md in the main repository)
  pricing: { status: 'idle', data: null, error: null },
}

/** Whole number, at least the minimum, and not above the backend limit once that is known. */
function clampCount(value, maxChildren) {
  let n = Math.floor(Number(value))
  if (!Number.isFinite(n)) n = MIN_CHILDREN
  n = Math.max(MIN_CHILDREN, n)
  return maxChildren === undefined ? n : Math.min(maxChildren, n)
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setChildCount(state, action) {
      // Before the prices are loaded the limit is not known yet: the count is checked again as soon as they arrive
      state.childCount = clampCount(action.payload, state.pricing.data?.maxChildren)
    },
    // setAddBox(state, action) {   // activity box: switched off
    //   state.addBox = Boolean(action.payload)
    // },
    incrementChildren(state) {
      const max = state.pricing.data?.maxChildren
      if (max !== undefined && state.childCount < max) state.childCount += 1
    },
    decrementChildren(state) {
      if (state.childCount > MIN_CHILDREN) state.childCount -= 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPricing.pending, (state) => {
        state.pricing.status = 'loading'
        state.pricing.error = null
      })
      .addCase(loadPricing.fulfilled, (state, action) => {
        state.pricing.status = 'ready'
        state.pricing.data = action.payload
        state.pricing.error = null
        // A count chosen before the limit was known (a shared link) is brought inside it
        state.childCount = clampCount(state.childCount, action.payload.maxChildren)
      })
      .addCase(loadPricing.rejected, (state, action) => {
        state.pricing.status = 'error'
        state.pricing.error = action.payload || action.error?.message || 'Could not load prices.'
      })
  },
})

// (activity box: add `setAddBox` to this list again)
export const { setChildCount, incrementChildren, decrementChildren } = checkoutSlice.actions
export default checkoutSlice.reducer
