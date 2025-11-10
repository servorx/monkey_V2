import z from 'zod'

export const WordMasteryBaseSchema = z.object({
  user_id: z.number().int(),
  word_id: z.number().int(),
  total_correct_attempts: z.number().int().default(0),
  total_error_count: z.number().int().default(0),
  confidence_score: z.number().min(0).max(1).default(0.0000),
  last_played: z.iso.date().nullable().optional(),
  unique: z.boolean().default(false)
})

export const WordMasteryCreateSchema = WordMasteryBaseSchema
export const WordMasteryUpdateSchema = WordMasteryBaseSchema.partial()
export const WordMasteryDeleteSchema = z.object({
  id: z.number().int()
})

export const WordMasteryResponseSchema = WordMasteryBaseSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
