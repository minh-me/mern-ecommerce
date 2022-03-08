import axiosClient from './axiosClient'
export const productApi = {
  findAll() {
    return axiosClient.get('/products')
  },
  findById(id) {
    return axiosClient.get(`/products/${id}`)
  },
}
