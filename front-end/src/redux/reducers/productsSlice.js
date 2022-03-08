import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {
    products: [],
    info: {},
  },
  loading: true,
  error: '',
}

const productsRequest = state => {
  state.loading = true
}

const productsSuccess = (state, action) => {
  state.loading = false
  state.data = action.payload
}

const productsFail = (state, action) => {
  state.loading = false
  state.error = action.payload
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productsRequest,
    productsSuccess,
    productsFail,
  },
})

export const productsActions = productsSlice.actions
export const productsReducer = productsSlice.reducer
