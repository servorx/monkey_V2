import { z } from 'zod'

export const UserRoleSchema = z.object({
  user_id: z.number().int(),
  role_id: z.number().int()
})
