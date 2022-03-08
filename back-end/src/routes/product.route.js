import { Router } from 'express'
import validate from '../middlewares/validate'
import { productValidation } from '../validations'
import auth from '../middlewares/auth'
import { productController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(
    auth(),
    validate(productValidation.createProduct),
    productController.createProduct
  )
  .get(validate(productValidation.getProducts), productController.getProducts)

router
  .route('/:productId')
  .get(validate(productValidation.getProduct), productController.getProduct)
  .patch(
    auth(),
    validate(productValidation.updateProduct),
    productController.updateProduct
  )
  .delete(
    auth(),
    validate(productValidation.deleteProduct),
    productController.deleteProduct
  )

export default router
