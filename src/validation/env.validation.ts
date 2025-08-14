import { z } from 'zod';

export const envSchema = z.object({
  OPENAI_API_KEY: z.string(),
  OPENWEATHER_API_KEY: z.string(),
  PORT: z.coerce.number().default(3000),
});
export type Env = z.infer<typeof envSchema>;
