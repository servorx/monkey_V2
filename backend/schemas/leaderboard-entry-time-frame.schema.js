import { z } from 'zod'

export const LeaderboardEntryTimeFrameBaseSchema = z.object({
  time_frame: z.string().min(3).max(50).unique()
})

export const LeaderboardEntryTimeFrameCreateSchema = LeaderboardEntryTimeFrameBaseSchema
export const LeaderboardEntryTimeFrameUpdateSchema = LeaderboardEntryTimeFrameBaseSchema.partial()
export const LeaderboardEntryTimeFrameDeleteSchema = z.object({
  id: z.number().int()
})

export const LeaderboardEntryTimeFrameResponseSchema = LeaderboardEntryTimeFrameBaseSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
