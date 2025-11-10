import { z } from 'zod'

export const registerUserSchema = z.object({
  username: z
    .string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(50),
  email: z.email('Email inválido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(255),
  profile_picture_url: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  keyboard: z.string().max(50).optional(),
  github_username: z.string().optional(),
  twitter_username: z.string().optional(),
  website_url: z.url().optional(),
  profile_score: z.number().default(0),
  tests_started: z.number().default(0),
  tests_completed: z.number().default(0),
  time_typing: z.string().default('00:00:00'),
  is_active: z.boolean().default(true),
  preferred_language: z.string().default('en')
})

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(50),
  email: z.email('Email inválido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(255),
  profile_picture_url: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  keyboard: z.string().max(50).optional(),
  github_username: z.string().optional(),
  twitter_username: z.string().optional(),
  website_url: z.url().optional(),
  profile_score: z.number().default(0),
  tests_started: z.number().default(0),
  tests_completed: z.number().default(0),
  time_typing: z.string().default('00:00:00'),
  is_active: z.boolean().default(true),
  preferred_language: z.string().default('en')
})

export const userResponseSchema = z.object({
  id: z.number(),
  username: z.string()
})

export const deleteUserSchema = z.object({
  id: z.number()
})
