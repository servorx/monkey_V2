import { z } from 'zod'

export const LanguageBaseSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().nullable().optional()
})

export const LanguageCreateSchema = LanguageBaseSchema
export const LanguageUpdateSchema = LanguageBaseSchema.partial()
export const LanguageDeleteSchema = z.object({
  id: z.number().int()
})

export const LanguageResponseSchema = LanguageBaseSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
