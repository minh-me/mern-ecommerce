import createError from 'http-errors'
import { Order } from '../models'

/**
 * Get orders by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<orders>}
 */
const queryOrders = async (filter, options) => {
  const customLabels = {
    docs: 'orders',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
    totalDocs: 'totalOrders',
  }
  options = { ...options, customLabels }
  const orders = await Order.paginate(filter, options)
  return orders
}

/**
 * Find order by id
 * @param {ObjectId} orderId
 * @returns {Promise<order>}
 */
const getOrderById = async orderId => {
  const order = await Order.findById(orderId).populate('user', 'user email')
  return order
}

/**
 * Create order
 * @param {Object} body
 * @returns {Promise<order>}
 */
const createOrder = async orderBody => {
  const newOrder = await Order.create(orderBody)
  return newOrder
}
/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} body
 * @returns {Promise<order>}
 */
const updateOrderById = async (orderId, body) => {
  const order = Order.findByIdAndUpdate(orderId, body)
  return order
}

/**
 * Delte order by id
 * @param {ObjectId} orderId
 * @returns {Promise<order>}
 */
const deleteOrderById = async orderId => {
  const order = await getOrderById(orderId)
  if (!order) {
    throw createError.NotFound()
  }
  const result = await order.remove()
  return result
}

export default {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
}
