import { orderApi } from '../../api/orderApi'
import {
  orderActions,
  orderDetailsActions,
  orderListMyActions,
  orderPayActions,
} from '../reducers'

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch(orderActions.orderCreateRequest())
    const { data } = await orderApi.create(order, getState().auth.token)
    localStorage.removeItem('cartItems')
    dispatch(orderActions.orderCreateSuccess(data))
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message

    dispatch(orderActions.orderCreateFail(errorMessage))
  }
}

export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsActions.orderDetailsFail())
    const { data } = await orderApi.findById(id, getState().auth.token)
    console.log({ data })
    dispatch(orderDetailsActions.orderDetailsSuccess(data))
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message
    console.log({ error })
    dispatch(orderDetailsActions.orderDetailsFail(errorMessage))
  }
}

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderPayActions.orderPayRequest())
      const { data } = await orderApi.updateToPaid(
        orderId,
        paymentResult,
        getState().auth.token
      )

      dispatch(orderPayActions.orderPaySuccess(data))
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message
      dispatch(orderPayActions.orderPayFail(errorMessage))
    }
  }

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderListMyActions.orderListMyRequest())
    const { data } = await orderApi.getMyOrders(getState().auth.token)
    dispatch(orderListMyActions.orderListMySuccess(data.orders))
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message
    dispatch(orderListMyActions.orderListMyFail(errorMessage))
  }
}
