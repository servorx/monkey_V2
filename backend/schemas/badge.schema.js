import { z } from 'zod'

export const BadgeBaseSchema = z.object({
  name: z.string().min(3).max(50).unique(),
  description: z.string().nullable().optional(),
  icon_url: z.string().url().nullable().optional(),
  min_score: z.number().int().default(0)
})

export const BadgeCreateSchema = BadgeBaseSchema

export const BadgeUpdateSchema = BadgeBaseSchema.partial()

export const BadgeDeleteSchema = z.object({
  id: z.number().int()
})

export const BadgeResponseSchema = BadgeBaseSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
