import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import config from '../config/config'
import logger from '../config/logger'
import { transEmail } from '../../lang/en'
// create stmp transporter
const transporter = nodemailer.createTransport(config.email.smtp)

/* istanbul ignore next */
if (config.env !== 'test') {
  transporter
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn(
        'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
      )
    )
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {text|html} htmlContent
 */
const sendEmail = async (to, subject, htmlContent) => {
  const info = {
    from: config.email.from,
    to,
    subject,
    html: htmlContent,
  }
  await transporter.sendMail(info)
}

/**
 * Send email register
 * @param {string} to
 * @param {string} token
 */
const sendEmailRegister = async (to, token) => {
  const subject = 'ACTIVATE YOUR ACCOUNT'
  // replace this url with the link to the reset password page of your front-end app
  const url = `http://localhost:8888/api/auth/activate/${token}`
  const text = 'Verify your email'

  const title = `<span>Welcome !</span> And thank you for registering !`
  const desc = `Please validate your email by clicking the button below 🙂`
  const htmlContent = transEmail.template(title, desc, url, text)

  await sendEmail(to, subject, htmlContent)
}

/**
 * Sen email reset password
 * @param {string} to
 * @param {string} token
 * @param {string} name
 */
const sendEmailResetPassword = async (to, token, name) => {
  const subject = 'RESET YOUR PASSWORD'
  // replace this url with the link to the reset password page of your front-end app
  const url = `http://localhost:3000/auth/reset-password/${token}`
  const text = 'Reset your password'

  const title = `<span>Hey</span> ${name}`
  const desc = 'Please click the button below to reset your password.'
  const htmlContent = transEmail.template(title, desc, url, text)
  // template_reset_password(url, text, name)
  await sendEmail(to, subject, htmlContent)
}

export default { sendEmail, sendEmailRegister, sendEmailResetPassword }
