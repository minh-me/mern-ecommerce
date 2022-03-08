import axios from 'axios'

const baseURL = 'http://localhost:8888/api'

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosClient
