import { z } from 'zod';

export const envSchema = z.object({
    OPENAI_API_KEY: z.string(),
    OPENWEATHER_API_KEY: z.string(),
    TELEGRAM_BOT_TOKEN: z.string(),
    PORT: z.coerce.number().default(3000),
    APP_USER_AGENT: z.string(),
});
export type Env = z.infer<typeof envSchema>;
