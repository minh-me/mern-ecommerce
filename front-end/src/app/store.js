import { configureStore } from '@reduxjs/toolkit'
import {
  productsReducer,
  productReducer,
  cartReducer,
  authReducer,
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  userReducer,
} from '../redux/reducers'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    user: userReducer,
  },
})
