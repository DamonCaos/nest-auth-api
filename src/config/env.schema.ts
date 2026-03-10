import * as z from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  APP_NAME: z.string().min(1),
  APP_DESCRIPTION: z.string().min(1),
  APP_VERSION: z.string().min(1),

  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.coerce.number().int().positive(),

  DATABASE_URL: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;