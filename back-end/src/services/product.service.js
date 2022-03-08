import createError from 'http-errors'
import { Product } from '../models'

/**
 * Get products by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<products>}
 */
const queryProducts = async (filter, options) => {
  const customLabels = {
    docs: 'products',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
    totalDocs: 'totalProducts',
  }
  options = { ...options, customLabels }
  const products = await Product.paginate(filter, options)
  return products
}

/**
 * Find product by id
 * @param {ObjectId} productId
 * @returns {Promise<product>}
 */
const getProductById = async productId => {
  const product = await Product.findById(productId)
  return product
}

/**
 * Create product
 * @param {Object} body
 * @returns {Promise<product>}
 */
const createProduct = async productBody => {
  const newProduct = await Product.create(productBody)
  return newProduct
}
/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} body
 * @returns {Promise<product>}
 */
const updateProductById = async (productId, body) => {
  const product = await getProductById(productId)

  if (!product) {
    throw createError.NotFound()
  }

  if (body.email && (await getProductByEmail(body.email))) {
    throw createError.BadRequest('Email already exists')
  }

  Object.assign(product, body)
  await product.save()
  return product
}

/**
 * Delte product by id
 * @param {ObjectId} productId
 * @returns {Promise<product>}
 */
const deleteProductById = async productId => {
  const product = await getProductById(productId)
  if (!product) {
    throw createError.NotFound()
  }
  const result = await product.remove()
  return result
}

export default {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
}
