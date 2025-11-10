import z from 'zod'

export const TestRunBaseSchema = z.object({
  user_id: z.number().int(),
  wpm: z.number().min(0).max(1000).default(0),
  accuracy: z.number().min(0).max(1).default(0.0000),
  raw_wpm: z.number().min(0).max(1000).default(0),
  consistency: z.number().min(0).max(1).default(0.0000),
  error_count: z.number().int().default(0),
  mode_type: z.string().min(3).max(50).default('time'),
  mode_value: z.number().int().default(60),
  duration_ms: z.number().int().default(0),
  raw_data: z.string().nullable().optional(),
  category_id: z.number().int().nullable().optional(),
  score: z.number().int().default(0),
  created_at: z.iso.date().default(new Date()),
  unique: z.boolean().default(false)
})

export const TestRunCreateSchema = TestRunBaseSchema
export const TestRunUpdateSchema = TestRunBaseSchema.partial()
export const TestRunDeleteSchema = z.object({
  id: z.number().int()
})

export const TestRunResponseSchema = TestRunBaseSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
