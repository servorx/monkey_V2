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
export const RefreshTokenDeleteSchema = z.object({
  id: z.number().int()
})

// respuesta al crear un token de refresco
export const RefreshTokenResponseSchema = RefreshTokenBaseSchema.extend({
  id: z.number().int(),
  created_at: z.string(),
  updated_at: z.string()
})
