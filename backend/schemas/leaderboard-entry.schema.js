import z from 'zod'

export const LeaderboardEntryBaseSchema = z.object({
  user_id: z.number().int(),
  test_run_id: z.number().int(),
  time_frame_id: z.number().int()
})

export const LeaderboardEntryCreateSchema = LeaderboardEntryBaseSchema
export const LeaderboardEntryUpdateSchema = LeaderboardEntryBaseSchema.partial()
export const LeaderboardEntryDeleteSchema = z.object({
  id: z.number().int()
})

export const LeaderboardEntryResponseSchema = LeaderboardEntryBaseSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
