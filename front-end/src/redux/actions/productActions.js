import { productApi } from '../../api'
import { productActions } from '../reducers'

export const getProduct = productId => async dispatch => {
  try {
    dispatch(productActions.productRequest())
    const { data } = await productApi.findById(productId)
    dispatch(productActions.productSuccess(data))
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message

    dispatch(productActions.productSuccess(errorMessage))
  }
}
