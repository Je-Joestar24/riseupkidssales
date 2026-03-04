import { createSlice } from '@reduxjs/toolkit'
import { MIN_CHILDREN, MAX_CHILDREN } from '../../services/checkoutService.js'

const initialState = {
  childCount: MIN_CHILDREN,
  addBox: false,
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setChildCount(state, action) {
      const value = action.payload
      state.childCount = Math.min(MAX_CHILDREN, Math.max(MIN_CHILDREN, Number(value) || MIN_CHILDREN))
    },
    setAddBox(state, action) {
      state.addBox = Boolean(action.payload)
    },
    incrementChildren(state) {
      if (state.childCount < MAX_CHILDREN) state.childCount += 1
    },
    decrementChildren(state) {
      if (state.childCount > MIN_CHILDREN) state.childCount -= 1
    },
  },
})

export const { setChildCount, setAddBox, incrementChildren, decrementChildren } = checkoutSlice.actions
export default checkoutSlice.reducer
