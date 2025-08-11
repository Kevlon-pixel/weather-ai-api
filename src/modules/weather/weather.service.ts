import { Injectable } from '@nestjs/common';
import { OpenMeteoProvider } from 'src/weather/openmeteo.provider';

@Injectable()
export class WeatherService {
  private openmeteo = new OpenMeteoProvider();

  async byCoord(lat: number, lon: number) {
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      throw new Error('Неверные координаты');
    }

    const om = await this.openmeteo.getNow(lat, lon);
    return {
      source: 'open-meteo',
      fetchedAt: new Date().toString(),
      current: om,
    };
  }
}
