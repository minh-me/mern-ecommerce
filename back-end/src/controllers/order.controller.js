import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { orderService } from '../services'
import { tranSuccess } from '../../lang/en'

/**
 * Create a order
 * @POST api/order/
 * @access private
 */
const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder({
    ...req.body,
    user: req.user.id,
  })
  res.status(201).json(order)
})

/**
 * Get all order
 * @GET api/order
 * @access public
 */
const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['firstName', 'lastName', 'role', 'email'])
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await orderService.queryOrders(filter, options)
  res.send(result)
})

/**
 * Get a order by order id
 * @GET api/order/:orderId
 * @access public
 */
const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId)
  if (!order) {
    throw createError.NotFound()
  }
  res.send(order)
})

/**
 * Get logged in user orders
 * @GET api/orders/myorders
 * @access private
 */
const getMyOrders = catchAsync(async (req, res) => {
  const filter = { user: req.user.id }
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const order = await orderService.queryOrders(filter, options)
  res.send(order)
})

/**
 * Update a order by orderId
 * @PATCH api/order/:orderId
 * @access private
 */
const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.orderId, req.body)
  res.send(order)
})

/**
 * Update order to paid by orderId
 * @PATCH api/order/:orderId/pay
 * @access private
 */
const updateOrderToPaid = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.orderId, {
    isPaid: true,
    paidAt: Date.now(),
    paymentResult: req.body,
  })
  res.send(order)
})

/**
 * Delete order by orderId
 * @DELETE api/order/:orderId
 * @access private
 */
const deleteOrder = catchAsync(async (req, res) => {
  const result = await orderService.deleteOrderById(req.params.orderId)
  res.send(result)
})

export default {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  updateOrderToPaid,
  getMyOrders,
}
