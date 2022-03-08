import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  product: {},
  loading: true,
  error: '',
}

const productRequest = state => {
  state.loading = true
}

const productSuccess = (state, action) => {
  state.loading = false
  state.product = action.payload
}

const productFail = (state, action) => {
  state.loading = false
  state.error = action.payload
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productRequest,
    productSuccess,
    productFail,
  },
})

export const productActions = productSlice.actions
export const productReducer = productSlice.reducer
