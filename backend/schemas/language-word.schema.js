import z from 'zod'

export const LanguageWordBaseSchema = z.object({
  language_id: z.number().int(),
  word_id: z.number().int()
})

export const LanguageWordCreateSchema = LanguageWordBaseSchema
export const LanguageWordUpdateSchema = LanguageWordBaseSchema.partial()
export const LanguageWordDeleteSchema = LanguageWordBaseSchema

export const LanguageWordResponseSchema = LanguageWordBaseSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
