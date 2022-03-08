import axiosClient from './axiosClient'
export const orderApi = {
  findAll(token) {
    return axiosClient.get('/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  create(order, token) {
    return axiosClient.post('/orders', order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  findById(id, token) {
    return axiosClient.get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  getMyOrders(token) {
    return axiosClient.get('/orders/myOrders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  updateToPaid(id, data, token) {
    return axiosClient.patch(`/orders/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  },
}
