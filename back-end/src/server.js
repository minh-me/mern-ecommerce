import express from 'express'
import path from 'path'
import morgan from 'morgan'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import cors from 'cors'
import httpError from 'http-errors'
import 'colors'

import jwtStrategy from './config/passport'
import config from './config/config'
import db from './config/db'
import logger from './config/logger'
import { authLimiter } from './config/rateLimit'
import errorHandler from './middlewares/error'
import routes from './routes/_index'

// connect to database
db.connect()

// init app
const app = express()

// body parser
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// cookie parser
app.use(cookieParser(config.jwt.secret.refresh))

// dev logging middleware
if (config.env === 'development') {
  app.use(morgan('dev'))
}

// sanitize data
app.use(mongoSanitize())

// set security headers
app.use(helmet())

// prevent XSS attacks
app.use(xss())

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/api/auth', authLimiter)
}

// prevent http param pollution
app.use(hpp())

// enable CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

// jwt authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

// Set static folder
app.use(express.static(path.join(__dirname, 'src', 'uploads')))

// api routes
app.use('/api', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  return next(new httpError.NotFound('Not found api request'))
})

// handle error
app.use(errorHandler)

const server = app.listen(
  config.port,
  logger.info(
    `Server running in ${config.env} mode on port ${config.port}`.cyan
  )
)

// Handle unhandled promise rejections
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}
const unexpectedErrorHandler = error => {
  logger.error(error)
  exitHandler()
}
process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})
