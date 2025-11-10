import { z } from 'zod'

export const AuthBaseSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255)
})

export const AuthRegisterSchema = AuthBaseSchema.extend({
  username: z.string().min(3).max(50),
  profile_picture_url: z.string().url().nullable().optional(),
  bio: z.string().nullable().optional(),
  keyboard: z.string().max(50).nullable().optional(),
  github_username: z.string().max(50).nullable().optional(),
  twitter_username: z.string().max(50).nullable().optional(),
  website_url: z.string().url().nullable().optional(),
  profile_score: z.number().int().default(0),
  tests_started: z.number().int().default(0),
  tests_completed: z.number().int().default(0),
  time_typing: z.iso.time().nullable().optional(),
  preferred_language: z.string().length(2).default('en'),
  is_active: z.boolean().default(true)
})

export const AuthLoginSchema = AuthBaseSchema.extend({
  remember_me: z.boolean().default(false)
})
