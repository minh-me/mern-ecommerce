import { productsActions } from '../reducers'
import { productApi } from '../../api'

const getErrorMessage = error =>
  error.response && error.response.data.error
    ? error.response.data.error
    : error.message

export const getProducts = () => async dispatch => {
  try {
    dispatch(productsActions.productsRequest())
    const { data } = await productApi.findAll()
    dispatch(
      productsActions.productsSuccess({
        products: data.products,
        info: data.info,
      })
    )
  } catch (error) {
    dispatch(productsActions.productsFail(getErrorMessage(error)))
  }
}
