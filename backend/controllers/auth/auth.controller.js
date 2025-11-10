import { User } from '../../models/user.model.js'
import { comparePasswords, hashPassword } from '../../utils/password-hasher.js'

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(401).json({ message: 'Invalid Credentials' })
  }

  if (!comparePasswords(password, user.password)) {
    return res.status(401).json({ message: 'Invalid Credentials' })
  }

  const token = user.generateAuthToken()

  res.status(200).json({
    message: 'Login Successful',
    token
  })
}

export const register = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const hashedPassword = await hashPassword(password)

  const newUser = await User.create({
    email,
    password: hashedPassword
  })

  res.status(201).json({
    message: 'User created successfully',
    token: newUser.generateAuthToken()
  })
}
