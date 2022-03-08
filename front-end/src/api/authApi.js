import axios from 'axios'
const baseURl = 'http://localhost:8888/api'
export const authApi = {
  login(dataSignIn) {
    return axios.post(`/api/auth/sign-in`, dataSignIn, {
      withCredentials: true,
    })
  },

  register(dataSignUp) {
    return axios.post(`/api/auth/sign-up`, dataSignUp, {
      withCredentials: true,
    })
  },

  logout(token) {
    return axios.post(
      `/api/auth/sign-out`,
      {},
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },

  getToken() {
    return axios.get(`/api/auth/access-token`, {
      withCredentials: true,
    })
  },

  getUser(token) {
    return axios.get(`/api/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  updateUser(token, data) {
    return axios.patch(`/api/auth/user`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  },
  forgotPassword(email) {
    return axios.post(`/api/auth/forgot-password`, { email })
  },

  resetPassword(password) {
    return axios.post(`/api/auth/reset-password`, { password })
  },
}
