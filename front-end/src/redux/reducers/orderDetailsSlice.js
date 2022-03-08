import { createSlice } from '@reduxjs/toolkit'

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {
    loading: false,
    success: false,
    order: {},
    error: '',
  },
  reducers: {
    orderDetailsRequest: state => {
      state.loading = true
    },
    orderDetailsSuccess: (state, action) => {
      state.loading = false
      state.order = action.payload
    },
    orderDetailsFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const orderDetailsActions = orderDetailsSlice.actions
export const orderDetailsReducer = orderDetailsSlice.reducer
