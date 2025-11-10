import { z } from 'zod'

export const UsersWordsBaseSchema = z.object({
  user_id: z.number().int(),
  word_id: z.number().int()
})

export const UsersWordsCreateSchema = UsersWordsBaseSchema
export const UsersWordsUpdateSchema = UsersWordsBaseSchema.partial()
export const UsersWordsDeleteSchema = UsersWordsBaseSchema

export const UsersWordsResponseSchema = UsersWordsBaseSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
