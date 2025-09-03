import axios from 'axios';
import { CurrentNormalized } from '../types/types';
import { ConfigService } from '@nestjs/config';

type OWResponse = {
    main?: { temp?: number };
    wind?: { speed?: number };
};

export class OpenWeatherProvider {
    constructor(private readonly config: ConfigService) {}

    readonly name = 'openweather';
    private base = 'https://api.openweathermap.org/data/2.5/weather';

    async fetch(lat: number, lon: number): Promise<CurrentNormalized> {
        try {
            const apiKey = this.config.get<string>('OPENWEATHER_API_KEY');
            if (!apiKey) {
                throw new Error('OPENWEATHER_API_KEY отсутствует');
            }

            const { data } = await axios.get<OWResponse>(this.base, {
                timeout: 4000,
                params: {
                    lat,
                    lon,
                    appid: apiKey,
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
