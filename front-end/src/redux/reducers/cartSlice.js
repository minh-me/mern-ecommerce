import { createSlice } from '@reduxjs/toolkit'

const cartItemsFromLocalstorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAddressFromLocalstorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFromLocalstorage =
  localStorage.getItem('paymentMethod') || ''

const initialState = {
  cartItems: cartItemsFromLocalstorage,
  shippingAddress: shippingAddressFromLocalstorage,
  paymentMethod: paymentMethodFromLocalstorage,
}
const cartAddItem = (state, action) => {
  const item = action.payload
  const existItem = state.cartItems.find(
    cartItem => cartItem.product === item.product
  )
  if (!existItem) state.cartItems.push(item)
  else existItem.qty = item.qty
}

const cartRemoveItem = (state, action) => {
  state.cartItems = state.cartItems.filter(
    item => item.product !== action.payload
  )
}

const cartSaveShippingAddress = (state, action) => {
  state.shippingAddress = action.payload
}

const cartSavePaymentMethod = (state, action) => {
  state.paymentMethod = action.payload
}

const cartResetItems = state => {
  state.cartItems = []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartAddItem,
    cartRemoveItem,
    cartSaveShippingAddress,
    cartSavePaymentMethod,
  },
})

export const cartActions = cartSlice.actions
export const cartReducer = cartSlice.reducer
