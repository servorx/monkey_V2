import bcrypt from 'bcryptjs'
import { SALT_ROUNDS } from '../config/config.js'

export const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash)
}
