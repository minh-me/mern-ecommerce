import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    loading: false,
    success: false,
    order: {},
    error: '',
  },
  reducers: {
    orderCreateRequest: state => {
      state.loading = true
    },
    orderCreateSuccess: (state, action) => {
      state.loading = false
      state.success = true
      state.order = action.payload
      state.error = ''
    },
    orderCreateFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const orderActions = orderSlice.actions
export const orderReducer = orderSlice.reducer
