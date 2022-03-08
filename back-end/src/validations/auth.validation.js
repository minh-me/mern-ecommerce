import * as yup from 'yup'
import { transValidations } from '../../lang/en'
import config from './config.validation'

const register = {
  name: yup.string().required(),
  email: yup.string().required().email(),
  birthday: yup.string().required(),
  phone: yup.string().required(),
  gender: yup
    .mixed()
    .oneOf(['male', 'female', 'other'])
    .required()
    .label('Gender'),
  password: yup
    .string()
    .matches(config.regexPassword, transValidations.password_incorrect)
    .required(),
}

const activate = {
  activation_token: yup.string().required(),
}

const login = {
  email: yup.string().required(),
  password: yup
    .string()
    .matches(config.regexPassword, transValidations.password_incorrect)
    .required(),
}

const forgotPassword = {
  email: yup.string().email().required(),
}

const resetPassword = {
  password: yup
    .string()
    .matches(config.regexPassword, transValidations.password_incorrect)
    .required(),
}

const singout = {
  refreshToken: yup.string().required(),
}

const updateUser = {
  name: yup.string(),
  email: yup.string().email(),
  birthday: yup.string(),
  phone: yup.string(),
  gender: yup.mixed().oneOf(['male', 'female', 'other']).label('Gender'),
  password: yup
    .string()
    .matches(config.regexPassword, transValidations.password_incorrect),
}

export default {
  register,
  activate,
  login,
  forgotPassword,
  resetPassword,
  singout,
  updateUser,
}
