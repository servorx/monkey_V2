import { UserCreateSchema, UserUpdateSchema } from '../../schemas/auth/user.schema.js'
import { userService } from '../../services/auth/user.service.js'

export const userController = {
  async getAll (req, res) {
    const users = await userService.getAllUsers()
    res.json(users)
  },

  async getById (req, res) {
    const { id } = req.params
    const user = await userService.getUserById(Number(id))
    res.json(user)
  },

  async create (req, res) {
    try {
      const data = UserCreateSchema.parse(req.body)
      const newUser = await userService.createUser(data)
      res.status(201).json(newUser)
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ errors: error.errors })
      }
      res.status(500).json({ message: error.message })
    }
  },

  async update (req, res) {
    const { id } = req.params
    const data = UserUpdateSchema.parse(req.body)
    const updated = await userService.updateUser(Number(id), data)
    res.json(updated)
  },

  async remove (req, res) {
    const { id } = req.params
    await userService.deleteUser(Number(id))
    res.status(204).send()
  }
}
