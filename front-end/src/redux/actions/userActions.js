import { userActions } from '../reducers'
import { userApi } from '../../api/userApi'

const getErrorMessage = error =>
  error.response && error.response.data.error
    ? error.response.data.error
    : error.message

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch(userActions.userActionRequest())
    const { data } = await userApi.findAll(getState().auth.token)
    dispatch(userActions.userListSuccess(data.users))
  } catch (error) {
    dispatch(userActions.userRequestFail(getErrorMessage(error)))
  }
}

export const deleteUser = userId => async (dispatch, getState) => {
  try {
    dispatch(userActions.userActionRequest())
    const { data } = await userApi.deleteUser(userId, getState().auth.token)
    dispatch(userActions.deleteUserSuccess(data.id))
  } catch (error) {
    dispatch(userActions.userRequestFail(getErrorMessage(error)))
  }
}

export const getUser = userId => async (dispatch, getState) => {
  try {
    dispatch(userActions.userActionRequest())
    const { data } = await userApi.findById(userId, getState().auth.token)
    dispatch(userActions.userDetailsSuccess(data))
  } catch (error) {
    dispatch(userActions.userRequestFail(getErrorMessage(error)))
  }
}

export const updateUser = (userId, userBody) => async (dispatch, getState) => {
  try {
    dispatch(userActions.userActionRequest())
    const { data } = await userApi.updateUser(
      userId,
      userBody,
      getState().auth.token
    )
    dispatch(userActions.userUpdatedSuccess())
    dispatch(userActions.userDetailsSuccess(data))
  } catch (error) {
    dispatch(userActions.userRequestFail(getErrorMessage(error)))
  }
}
