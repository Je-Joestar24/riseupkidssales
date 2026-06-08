import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { submitSchoolApplication } from '../../services/schoolApplicationService.js'

export const submitSchoolApplicationForm = createAsyncThunk(
  'schoolApplication/submit',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await submitSchoolApplication(payload)
      return response
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'School application submission failed'
      return rejectWithValue(message)
    }
  },
)

const initialState = {
  loading: false,
  success: false,
  error: null,
}

const schoolApplicationSlice = createSlice({
  name: 'schoolApplication',
  initialState,
  reducers: {
    resetSchoolApplicationState: () => initialState,
    clearSchoolApplicationError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSchoolApplicationForm.pending, (state) => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(submitSchoolApplicationForm.fulfilled, (state) => {
        state.loading = false
        state.success = true
        state.error = null
      })
      .addCase(submitSchoolApplicationForm.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload || 'School application submission failed'
      })
  },
})

export const { resetSchoolApplicationState, clearSchoolApplicationError } =
  schoolApplicationSlice.actions

export default schoolApplicationSlice.reducer
