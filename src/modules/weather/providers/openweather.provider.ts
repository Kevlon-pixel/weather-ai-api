import axios from 'axios';
import { CurrentNormalized } from '../types';

type OWResponse = {
  main?: { temp?: number };
  wind?: { speed?: number };
};

export class OpenWeatherProvider {
  readonly name = 'openweather';
  private base = 'https://api.openweathermap.org/data/2.5/weather';
  private apikey = process.env.OPENWEATHER_API_KEY;

  async fetch(lat: number, lon: number): Promise<CurrentNormalized> {
    try {
      if (!this.apikey) {
        throw new Error('OPENWEATHER_API_KEY отсутствует');
      }

      const { data } = await axios.get<OWResponse>(this.base, {
        timeout: 4000,
        params: {
          lat,
          lon,
          appid: this.apikey,
          units: 'metric',
        },
      });

      return {
        source: this.name,
        fetchedAt: new Date().toISOString(),
        tempC: data.main?.temp,
        windMs: data.wind?.speed,
      };
    } catch (err) {
      throw new Error('Ошибка получения данных OpenWeather');
    }
  }
}
