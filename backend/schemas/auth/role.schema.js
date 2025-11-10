import { z } from 'zod'

export const RoleBaseSchema = z.object({
  role_name: z.string().min(3).max(20),
  description: z.string().max(255)
})

export const RoleCreateSchema = RoleBaseSchema
export const RoleUpdateSchema = RoleBaseSchema.partial()
export const RoleDeleteSchema = z.object({
  id: z.number().int()
})

export const RoleResponseSchema = RoleBaseSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
