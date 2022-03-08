import axiosClient from './axiosClient'
export const userApi = {
  findAll(token) {
    return axiosClient.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  create(user, token) {
    return axiosClient.post('/users', user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  deleteUser(userId, token) {
    return axiosClient.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  findById(id, token) {
    return axiosClient.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}
