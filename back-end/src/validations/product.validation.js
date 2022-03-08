import * as yup from 'yup'
import { transValidations } from '../../lang/en'
import config from './config.validation'

const createProduct = {
  name: yup.string().required(),
  brand: yup.string().required(),
  image: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().required(),
  rating: yup.number().required().default(0),
  numReviews: yup.number().required().default(0),
  price: yup.number().required().default(0),
  countInStock: yup.number().required().default(0),
}

const getProducts = {
  name: yup.string(),
  brand: yup.string(),
  category: yup.string(),
  price: yup.number(),
  numReviews: yup.number(),

  page: yup.number().integer(),
  limit: yup.number().integer(),
  sortBy: yup.string(),
  select: yup.string(),
}

const getProduct = {
  productId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateProduct = {
  productId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  name: yup.string(),
  brand: yup.string(),
  category: yup.string(),
  description: yup.string(),
  rating: yup.number(),
  numReviews: yup.number(),
  price: yup.number(),
  countInStock: yup.number(),
}

const deleteProduct = {
  productId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
