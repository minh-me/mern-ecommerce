import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  token: '',
  user: null,
  error: '',
  success: '',
  isLoggedIn: JSON.parse(localStorage.getItem('_appSigning')) || false,
}

const authRequest = state => {
  state.loading = true
  state.success = ''
}

const authRequestFail = (state, action) => {
  state.loading = false
  state.error = action.payload
}

const loginSuccess = state => {
  state.loading = false
  state.isLoggedIn = true
}

const getTokenSuccess = (state, action) => {
  state.token = action.payload
}

const getUserSuccess = (state, action) => {
  state.user = action.payload
}
const updateUserSuccess = (state, action) => {
  state.user = action.payload
  state.success = 'Updated user success'
  state.loading = false
}

const logoutSuccess = (state, action) => {
  state.loading = false
  state.token = ''
  state.user = null
  state.error = ''
  state.isLoggedIn = false
  state.success = action.payload
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequest,
    authRequestFail,
    loginSuccess,
    getTokenSuccess,
    getUserSuccess,
    updateUserSuccess,
    logoutSuccess,
  },
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
