import * as yup from 'yup'
import { transValidations } from '../../lang/en'
import config from './config.validation'

const createUser = {
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

const getUsers = {
  name: yup.string(),
  email: yup.string().email(),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sortBy: yup.string(),
  select: yup.string(),
}

const getUser = {
  userId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateUser = {
  userId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  name: yup.string(),
  phone: yup.string().required(),
  role: yup.string().required(),
  email: yup.string().email(),
  checkbox_selection: yup.string().when(['name', 'email', 'role', 'phone'], {
    is: (name, email) => !name && !email && !role && !phone,
    then: yup.string().required(),
  }),
}

const deleteUser = {
  userId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateMe = {
  name: yup.string(),
  email: yup.string().email(),
  checkbox_selection: yup.string().when(['name', 'email'], {
    is: (name, email) => !name && !email,
    then: yup.string().required(),
  }),
}

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
}
