import cloudinary from 'cloudinary'
import fs from 'fs'
import config from '../config/config'

// Config cloudinary
cloudinary.v2.config(config.cloudinaryV2.config)

/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 * @param {string} folder store in cloudinary
 */
const upload = async (path, options = {}) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(path, options, (err, result) => {
      if (err) return reject(err)
      fs.unlinkSync(path)
      return resolve(result.secure_url)
    })
  })
}

/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 *  @returns {Promise<url>}
 */
const uploadAvatar = async path => {
  const options = {
    folder: 'avatar',
    width: 150,
    height: 150,
    crop: 'fill',
  }
  const url = await upload(path, options)
  return url
}

/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 *  @returns {Promise<url>}
 */
const uploadProductImage = async path => {
  const options = {
    folder: 'products',
    crop: 'fill',
  }
  const url = await upload(path, options)
  return url
}

export default { upload, uploadAvatar, uploadProductImage }
