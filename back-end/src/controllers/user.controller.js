import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { userService } from '../services'
import { tranSuccess } from '../../lang/en'

/**
 * Create a user
 * @POST api/users/
 * @access private
 */
const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body)
  res.status(201).send(user)
})

/**
 * Get all users
 * @GET api/users
 * @access public
 */
const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['firstName', 'lastName', 'role', 'email'])
  const options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await userService.queryUsers(filter, options)
  res.send(result)
})

/**
 * Get a user by user id
 * @GET api/users/:userId
 * @access public
 */
const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId)
  if (!user) {
    throw createError.NotFound()
  }
  res.send(user)
})

/**
 * Update a user by userId
 * @PATCH api/users/:userId
 * @access private
 */
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body)
  res.send(user)
})

/**
 * Delete user by userId
 * @DELETE api/users/:userId
 * @access private
 */
const deleteUser = catchAsync(async (req, res) => {
  const result = await userService.deleteUserById(req.params.userId)
  res.send(result)
})

/**
 * Get info user when logged in
 * @GET api/users/me
 * @access private
 */
const getMe = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id)
  res.send(user)
})

/**
 * Update user when logged in
 * @PATCH api/users/update-me
 * @access private
 */
const updateMe = catchAsync(async (req, res, next) => {
  const user = await userService.updateUserById(req.user.id, req.body)
  res.send(user)
})

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
}
