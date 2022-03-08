import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    user: '',
    loading: false,
    error: '',
    success: '',
  },
  reducers: {
    userActionRequest: state => {
      state.loading = true
    },
    userListSuccess: (state, action) => {
      state.loading = false
      state.users = action.payload
    },
    userRequestFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false
      state.users = state.users.filter(user => user.id !== action.payload)
    },
    userDetailsSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
    },
    userUpdatedSuccess: state => {
      state.loading = false
    },
  },
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
