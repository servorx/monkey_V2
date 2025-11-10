import { z } from 'zod'

export const UserSettingsBaseSchema = z.object({
  user_id: z.number().int(),
  theme_name: z.string().min(3).max(50).default('monkey'),
  font_name: z.string().min(3).max(50).default('Roboto Mono'),
  test_options: z.string().nullable().optional()
})

export const UserSettingsCreateSchema = UserSettingsBaseSchema
export const UserSettingsUpdateSchema = UserSettingsBaseSchema.partial()
export const UserSettingsDeleteSchema = z.object({
  id: z.number().int()
})

export const UserSettingsResponseSchema = UserSettingsBaseSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
