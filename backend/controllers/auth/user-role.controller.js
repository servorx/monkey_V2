import { UserRoleCreateSchema, UserRoleUpdateSchema } from '../../schemas/auth/user-role.schema.js'
import { userRoleService } from '../../services/auth/user-role.service.js'

export const userRoleController = {
  async getAll (req, res) {
    const userRoles = await userRoleService.getAllUserRoles()
    res.json(userRoles)
  },

  async getById (req, res) {
    const { id } = req.params
    const userRole = await userRoleService.getUserRoleById(Number(id))
    res.json(userRole)
  },

  async create (req, res) {
    try {
      const data = UserRoleCreateSchema.parse(req.body)
      const newUserRole = await userRoleService.createUserRole(data)
      res.status(201).json(newUserRole)
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ errors: error.errors })
      }
      res.status(500).json({ message: error.message })
    }
  },

  async update (req, res) {
    const { id } = req.params
    const data = UserRoleUpdateSchema.parse(req.body)
    const updated = await userRoleService.updateUserRole(Number(id), data)
    res.json(updated)
  },

  async remove (req, res) {
    const { id } = req.params
    await userRoleService.deleteUserRole(Number(id))
    res.status(204).send()
  }
}
