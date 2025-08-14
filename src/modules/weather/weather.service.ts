import { Injectable } from '@nestjs/common';
import { OpenMeteoProvider } from './providers/openmeteo.provider';
import { CurrentNormalized } from './types';
import { MetNoProvider } from './providers/metno.provider';
import { OpenWeatherProvider } from './providers/openweather.provider';
import { ConfigService } from '@nestjs/config';
import { LlmService, WeatherNarrative } from '../llm/llm.service';

type WeaterResult = {
  sources: CurrentNormalized[];
  fetchedAt: string;
  ai?: WeatherNarrative;
};

@Injectable()
export class WeatherService {
  constructor(
    private readonly openmeteo: OpenMeteoProvider,
    private readonly llmService: LlmService,
  ) {}

  private providers = [
    new MetNoProvider(),
    new OpenMeteoProvider(),
    new OpenWeatherProvider(new ConfigService()),
  ];

  async byCoord(
    lat: number,
    lon: number,
    withSummary = false,
  ): Promise<WeaterResult> {
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      throw new Error('Неверные координаты');
    }

    const settled = await Promise.allSettled(
      this.providers.map((p) => p.fetch(lat, lon)),
    );

    const sources: CurrentNormalized[] = [];
    for (let i = 0; i < settled.length; i++) {
      const r = settled[i];
      if (r.status === 'fulfilled') {
        sources.push(r.value);
      }
    }

    const result: WeaterResult = {
      sources,
      fetchedAt: new Date().toISOString(),
    };
    if (withSummary && sources.length) {
      result.ai = await this.llmService.narrative(sources);
    }

    return result;
  }
}
