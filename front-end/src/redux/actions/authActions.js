import { authApi } from '../../api'
import { authActions } from '../reducers'
import { getErrorApi } from '../../utils/getErrorApi'

export const login = (email, password) => async dispatch => {
  dispatch(authActions.authRequest())

  try {
    await authApi.login({ email, password })
    dispatch(authActions.loginSuccess())
    localStorage.setItem('_appSigning', true)
  } catch (error) {
    dispatch(authActions.authRequestFail(getErrorApi(error)))
  }
}

export const getToken = () => async dispatch => {
  try {
    const { data } = await authApi.getToken()
    dispatch(authActions.getTokenSuccess(data.access_token))
  } catch (error) {
    dispatch(authActions.logoutSuccess(getErrorApi(error)))
    localStorage.removeItem('_appSigning')
  }
}

export const getUser = token => async dispatch => {
  try {
    const { data } = await authApi.getUser(token)
    dispatch(authActions.getUserSuccess(data))
  } catch (error) {
    dispatch(authActions.authRequestFail(getErrorApi(error)))
  }
}

export const register = data => async dispatch => {
  dispatch(authActions.authRequest())
  try {
    await authApi.register({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      birthday: data.birthday,
      gender: data.gender,
    })
    dispatch(authActions.loginSuccess())
    localStorage.setItem('_appSigning', true)
  } catch (error) {
    dispatch(authActions.authRequestFail(getErrorApi(error)))
  }
}

export const logout = () => async (dispatch, getState) => {
  dispatch(authActions.authRequest())
  try {
    const { data } = await authApi.logout(getState().auth.token)

    dispatch(authActions.logoutSuccess(data.message))
    localStorage.removeItem('_appSigning')
    localStorage.removeItem('authToken')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('cartItems')
  } catch (error) {
    dispatch(authActions.authRequestFail(getErrorApi(error)))
  }
}

export const updateUser = userBody => async (dispatch, getState) => {
  dispatch(authActions.authRequest())
  try {
    const { data } = await authApi.updateUser(getState().auth.token, userBody)
    dispatch(authActions.updateUserSuccess(data))
  } catch (error) {
    dispatch(authActions.authRequestFail(getErrorApi(error)))
  }
}
