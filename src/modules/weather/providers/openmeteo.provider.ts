import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CurrentNormalized } from '../types/types';

export type OpenMeteoNow = {
    tempC?: number;
    windMs?: number;
};

type OpenMeteoResponse = {
    current_weather?: {
        temperature: number;
        windspeed: number;
    };
};

@Injectable()
export class OpenMeteoProvider {
    readonly name = 'openmeteo';
    private readonly base = 'https://api.open-meteo.com/v1/forecast';

    async fetch(lat: number, lon: number): Promise<CurrentNormalized> {
        try {
            const { data } = await axios.get<OpenMeteoResponse>(this.base, {
                timeout: 4000,
                params: {
                    latitude: lat,
                    longitude: lon,
                    current_weather: true,
                    timezone: 'UTC',
                    windspeed_unit: 'ms',
                },
            });

            const cw = data.current_weather;
            if (!cw || typeof cw.temperature !== 'number') {
                throw new Error(
                    'Open-meteo: нет поля current_weather.temperature в ответе API',
                );
            }
            return {
                source: this.name,
                fetchedAt: new Date().toISOString(),
                tempC: cw.temperature,
                windMs:
                    typeof cw.windspeed === 'number' ? cw.windspeed : undefined,
            };
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            }
            throw new Error('Ошибка при обращении к Open-meteo');
        }
    }
}
