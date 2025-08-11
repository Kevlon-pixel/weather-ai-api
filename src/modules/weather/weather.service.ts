import { Injectable } from '@nestjs/common';
import { OpenMeteoProvider } from './providers/openmeteo.provider';
import { CurrentNormalized } from './types';
import { MetNoProvider } from './providers/metno.provider';

@Injectable()
export class WeatherService {
  constructor(private readonly openmeteo: OpenMeteoProvider) {}

  private providers = [
    new MetNoProvider(),
    new OpenMeteoProvider(),
    new OpenMeteoProvider(),
  ];

  async byCoord(lat: number, lon: number): Promise<CurrentNormalized[]> {
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      throw new Error('Неверные координаты');
    }

    const settled = await Promise.allSettled(
      this.providers.map((p) => p.fetch(lat, lon)),
    );

    const results: CurrentNormalized[] = [];
    for (let i = 0; i < settled.length; i++) {
      const r = settled[i];
      if (r.status === 'fulfilled') {
        results.push(r.value);
      }
    }

    console.log(results);
    return results;
  }
}
