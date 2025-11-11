import { z } from 'zod'

export const IdParamSchema = z.object({
  id: z.number().int().positive('ID must be a positive integer')
})

export const NameParamSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty')
})
