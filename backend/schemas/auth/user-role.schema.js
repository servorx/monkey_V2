import { z } from 'zod'

export const UserRoleSchema = z.object({
  user_id: z.number().int(),
  role_id: z.number().int()
})

export const UserRoleCreateSchema = UserRoleSchema
export const UserRoleUpdateSchema = UserRoleSchema.partial()
export const UserRoleDeleteSchema = z.object({
  user_id: z.number().int(),
  role_id: z.number().int()
})

export const UserRoleResponseSchema = UserRoleSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
