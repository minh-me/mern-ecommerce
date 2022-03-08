import { Router } from 'express'
import validate from '../middlewares/validate'
import { userValidation } from '../validations'
import auth from '../middlewares/auth'
import { userController } from '../controllers'

const router = new Router()

router.get('/me', auth(), userController.getMe)
router.patch(
  '/update-me',
  auth(),
  validate(userValidation.updateMe),
  userController.updateMe
)

router
  .route('/')
  .post(
    auth('admin'),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(
    auth('admin'),
    validate(userValidation.getUsers),
    userController.getUsers
  )

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(
    auth('admin'),
    validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    auth('admin'),
    validate(userValidation.deleteUser),
    userController.deleteUser
  )

export default router
