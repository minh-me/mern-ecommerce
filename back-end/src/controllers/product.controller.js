import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { productService, uploadService } from '../services'
import { tranSuccess } from '../../lang/en'

/**
 * Create a product
 * @POST api/products/
 * @access private
 */
const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct({
    ...req.body,
    user: req.user.id,
  })
  res.status(201).json(product)
})

/**
 * Get all product
 * @GET api/products
 * @access public
 */
const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'price', 'rating', 'category'])
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await productService.queryProducts(filter, options)
  res.send(result)
})

/**
 * Get a product by product id
 * @GET api/products/:productId
 * @access public
 */
const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId)
  if (!product) {
    throw createError.NotFound()
  }
  res.send(product)
})

/**
 * Update a product by productId
 * @PATCH api/products/:productId
 * @access private
 */
const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(
    req.params.productId,
    req.body
  )
  res.send(product)
})

/**
 * Delete product by productId
 * @DELETE api/products/:productId
 * @access private
 */
const deleteProduct = catchAsync(async (req, res) => {
  const result = await productService.deleteProductById(req.params.productId)
  res.send(result)
})

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
