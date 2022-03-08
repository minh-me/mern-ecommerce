import { createSlice } from '@reduxjs/toolkit'

const orderListMySlice = createSlice({
  name: 'orderListMy',
  initialState: {
    loading: false,
    success: false,
    error: '',
    orders: [],
    info: {},
  },
  reducers: {
    orderListMyRequest: state => {
      state.loading = true
    },
    orderListMySuccess: (state, action) => {
      state.loading = false
      state.orders = action.payload
    },
    orderListMyFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const orderListMyActions = orderListMySlice.actions
export const orderListMyReducer = orderListMySlice.reducer
