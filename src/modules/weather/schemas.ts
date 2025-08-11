import { z } from 'zod';

export const NormalizedForecast = z.object({
  source: z.string(),
  fetchedAt: z.string(),
  current: z.object({
    tempC: z.number(),
    feelsLikeC: z.number().optional(),
    windMs: z.number().optional(),
    humidity: z.number().optional(),
    precipMm: z.number().optional(),
    condition: z.string().optional(),
  }),
  hourly: z
    .array(
      z.object({
        time: z.string(),
        tempC: z.number(),
        precipMm: z.number().optional(),
      }),
    )
    .min(1),
});

export type NormalizedForecastT = z.infer<typeof NormalizedForecast>;
