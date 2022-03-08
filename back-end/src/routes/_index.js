import { Router } from 'express'
import authRoutes from './auth.route'
import userRoutes from './user.route'
import uploadRoutes from './upload.route'
import productRoutes from './product.route'
import orderRoutes from './order.route'

const router = new Router()

const defaultRoutes = [
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/uploads',
    route: uploadRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
