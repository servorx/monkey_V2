import { UserCreateSchema } from '../../schemas/auth/user.schema.js'
import { comparePasswords, hashPassword } from '../../utils/password-hasher.js'
import { ValidationError, AuthError, DatabaseError } from '../../utils/errors.js'

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new ValidationError('Email and password are required')
    }

    const user = await UserCreateSchema.findOne({ email })
    if (!user) {
      throw new AuthError('Invalid credentials')
    }

    const isMatch = await comparePasswords(password, user.password)
    if (!isMatch) {
      throw new AuthError('Invalid credentials')
    }

    const token = user.generateAuthToken()

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email
      }
    })
  } catch (error) {
    next(error instanceof AuthError || error instanceof ValidationError
      ? error
      : new DatabaseError('Failed to process login', error.message))
  }
}

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new ValidationError('Email and password are required')
    }

    const existingUser = await UserCreateSchema.findOne({ email })
    if (existingUser) {
      throw new ValidationError('User already exists')
    }

    const hashedPassword = await hashPassword(password)
    const newUser = await UserCreateSchema.create({
      email,
      password: hashedPassword
    })

    const token = newUser.generateAuthToken()

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        email: newUser.email
      }
    })
  } catch (error) {
    next(error instanceof ValidationError
      ? error
      : new DatabaseError('Failed to create user', error.message))
  }
}
