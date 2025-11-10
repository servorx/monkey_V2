import { z } from 'zod'

export const RefreshTokenBaseSchema = z.object({
  user_id: z.number().int(),
  token: z.string(),
  expires_at: z.string(),
  is_revoked: z.boolean().default(false),
  revoked_at: z.string().nullable().optional()
})

export const RefreshTokenCreateSchema = RefreshTokenBaseSchema
export const RefreshTokenUpdateSchema = RefreshTokenBaseSchema.partial()
