import { RoleCreateSchema, RoleUpdateSchema } from '../../schemas/auth/role.schema.js'
import { roleService } from '../../services/auth/role.service.js'

export const roleController = {
  async getAll (req, res) {
    const roles = await roleService.getAllRoles()
    res.json(roles)
  },

  async getById (req, res) {
    const { id } = req.params
    const role = await roleService.getRoleById(Number(id))
    res.json(role)
  },

  async create (req, res) {
    try {
      const data = RoleCreateSchema.parse(req.body)
      const newRole = await roleService.createRole(data)
      res.status(201).json(newRole)
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ errors: error.errors })
      }
      res.status(500).json({ message: error.message })
    }
  },

  async update (req, res) {
    const { id } = req.params
    const data = RoleUpdateSchema.parse(req.body)
    const updated = await roleService.updateRole(Number(id), data)
    res.json(updated)
  },

  async remove (req, res) {
    const { id } = req.params
    await roleService.deleteRole(Number(id))
    res.status(204).send()
  }
}
