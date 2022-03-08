import dotenv from 'dotenv'

dotenv.config()

const {
  NODE_ENV,
  PORT,
  MONGODB_URL,

  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRATION,

  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION,

  JWT_ACTIVATE_SECRET,
  JWT_ACTIVATE_EXPIRATION,

  JWT_RESET_PASSWORD_SECRET,
  JWT_RESET_PASSWORD_EXPIRATION,

  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,

  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  EMAIL_FROM,
} = process.env

const config = {
  env: NODE_ENV,
  port: PORT,
  mongodbUrl: MONGODB_URL,
  jwt: {
    secret: {
      access: JWT_ACCESS_SECRET,
      refresh: JWT_REFRESH_SECRET,
      activate: JWT_ACTIVATE_SECRET,
      resetPassword: JWT_RESET_PASSWORD_SECRET,
    },
    expiration: {
      access: JWT_ACCESS_EXPIRATION,
      refresh: JWT_REFRESH_EXPIRATION,
      activate: JWT_ACTIVATE_EXPIRATION,
      resetPassword: JWT_RESET_PASSWORD_EXPIRATION,
    },
    options: {
      expiresIn: '12h', // 1d
    },
    cookie: {
      path: '/api/auth/access-token',
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: true,
    },
  },
  cloudinaryV2: {
    config: {
      cloud_name: CLOUD_NAME,
      api_key: CLOUD_API_KEY,
      api_secret: CLOUD_API_SECRET,
    },
  },

  email: {
    smtp: {
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: SMTP_USERNAME, // generated ethereal user
        pass: SMTP_PASSWORD, // generated ethereal password
      },
    },
    from: EMAIL_FROM,
  },
  app: {
    max_event_listeners: 30,
    upload_directory: 'src/uploads',
    upload_limit_size: 1048576, // 1048576 byte = 1MB
    image_types: ['image/jpg', 'image/png', 'image/jpeg'],
  },
}
export default config
