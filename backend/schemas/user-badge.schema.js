import { z } from 'zod'

export const UserBadgeBaseSchema = z.object({
  user_id: z.number().int(),
  badge_id: z.number().int()
})

export const UserBadgeCreateSchema = UserBadgeBaseSchema
export const UserBadgeUpdateSchema = UserBadgeBaseSchema.partial()
export const UserBadgeDeleteSchema = UserBadgeBaseSchema

export const UserBadgeResponseSchema = UserBadgeBaseSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
