import { createSlice } from '@reduxjs/toolkit'

const orderPaySlice = createSlice({
  name: 'orderPay',
  initialState: {
    loading: false,
    success: false,
    error: '',
  },
  reducers: {
    orderPayRequest: state => {
      state.loading = true
    },
    orderPaySuccess: state => {
      state.loading = false
      state.success = true
    },
    orderPayFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    orderPayReset: state => {
      state = {}
    },
  },
})

export const orderPayActions = orderPaySlice.actions
export const orderPayReducer = orderPaySlice.reducer
