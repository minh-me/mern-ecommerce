import catchAsync from '../utils/catchAsync'
import { uploadService } from '../services'

/**
 * Upload avatar
 * @POST api/uploads/Avatar
 * @access private
 */
const uploadAvatar = catchAsync(async (req, res) => {
  const url = await uploadService.uploadAvatar(req.file.path)
  return res.status(201).json({ url })
})

/**
 * Upload avatar
 * @POST api/uploads/product
 * @access private
 */
const uploadProductImage = catchAsync(async (req, res) => {
  const url = await uploadService.uploadProductImage(req.file.path)
  return res.status(201).json({ url })
})

export default { uploadAvatar, uploadProductImage }
