import axios from 'axios'
import { cartActions } from '../reducers'

const url = 'http://localhost:8888/api'

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${url}/products/${productId}`)
    const payload = {
      product: data.id,
      name: data.name,
      price: data.price,
      countInStock: data.countInStock,
      image: data.image,
      qty,
    }

    dispatch(cartActions.cartAddItem(payload))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (error) {}
}

export const removeFromCart = productId => async (dispatch, getState) => {
  try {
    dispatch(cartActions.cartRemoveItem(productId))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (error) {}
}

export const saveShippingAddress = data => async dispatch => {
  dispatch(cartActions.cartSaveShippingAddress(data))
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = data => dispatch => {
  dispatch(cartActions.cartSavePaymentMethod(data))
  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
