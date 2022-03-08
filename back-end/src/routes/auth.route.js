import { Router } from 'express'
import { authController } from '../controllers'
import auth from '../middlewares/auth'
import validate from '../middlewares/validate'
import { authValidation, userValidation } from '../validations'

const router = new Router()

router.post(
  '/sign-up',
  validate(userValidation.createUser),
  authController.register
)

router.post('/sign-in', validate(authValidation.login), authController.login)
router.get('/access-token', authController.accessToken)
router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
)
router.post(
  '/reset-password',
  auth(),
  validate(authValidation.resetPassword),
  authController.resetPassword
)

router
  .route('/user')
  .get(auth(), authController.getUser)
  .patch(auth(), validate(authValidation.updateUser), authController.updateUser)

router.post('/sign-out', auth(), authController.logout)

export default router
