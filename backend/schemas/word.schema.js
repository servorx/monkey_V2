import z from 'zod'

export const WordBaseSchema = z.object({
  word: z.string().min(3, 'Word must be at least 3 characters long').max(50, 'Word must be at most 85 characters long'),
  points: z.number().int().default(0),
  user_id: z.number().int().nullable().optional()
})

export const WordCreateSchema = WordBaseSchema
export const WordUpdateSchema = WordBaseSchema.partial()
export const WordDeleteSchema = z.object({
  id: z.number().int()
})

export const WordResponseSchema = WordBaseSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
