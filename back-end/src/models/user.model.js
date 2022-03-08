import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { roles } from '../config/roles'
import { transValidations } from '../../lang/en'
import toJSON from './plugins/toJson'
import paginate from './plugins/paginate'

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      index: true,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [emailRegex, transValidations.email_incorrect],
    },
    phone: {
      type: String,
      index: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      match: [passwordRegex, transValidations.password_incorrect],
    },
    birthday: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password
        delete ret.createdAt
        delete ret.updatedAt
        return ret
      },
    },
  }
)

userSchema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

userSchema.methods = {
  /**
   * Check if password matches the user's password
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  async isPasswordMatch(password) {
    return bcrypt.compare(password, this.password)
  },
}

// add plugin that converts mongoose to json
userSchema.plugin(toJSON)
userSchema.plugin(paginate)

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema)

export default User
