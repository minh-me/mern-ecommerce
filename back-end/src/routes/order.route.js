import { Router } from 'express'
import validate from '../middlewares/validate'
import { orderValidation } from '../validations'
import auth from '../middlewares/auth'
import { orderController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(
    auth(),
    validate(orderValidation.createOrder),
    orderController.createOrder
  )
  .get(auth(), validate(orderValidation.getOrders), orderController.getOrders)

router.get('/myOrders', auth(), orderController.getMyOrders)

router.patch(
  '/:orderId/pay',
  auth(),
  validate(orderValidation.updateOrder),
  orderController.updateOrderToPaid
)

router
  .route('/:orderId')
  .get(auth(), validate(orderValidation.getOrder), orderController.getOrder)
  .patch(
    auth(),
    validate(orderValidation.updateOrder),
    orderController.updateOrder
  )
  .delete(
    auth(),
    validate(orderValidation.deleteOrder),
    orderController.deleteOrder
  )

export default router
