import { z } from 'zod';

export const envSchema = z.object({
  /*OPENAI_API_KEY: z.string().min(1),
  REDIS_URL: z.string().url().optional(),*/
  PORT: z.coerce.number().default(3000),
});
export type Env = z.infer<typeof envSchema>;
