import axios from 'axios';
import { CurrentNormalized } from '../types/types';
import { ConfigService } from '@nestjs/config';

type MetNoResponse = {
    properties?: {
        timeseries?: Array<{
            data?: {
                instant?: {
                    details?: {
                        air_temperature?: number;
                        wind_speed?: number;
                    };
                };
            };
            time?: string;
        }>;
    };
};

export class MetNoProvider {
    constructor(private readonly config: ConfigService) {}
    readonly name = 'met.no';
    private readonly base =
        'https://api.met.no/weatherapi/locationforecast/2.0/compact';

    async fetch(lat: number, lon: number): Promise<CurrentNormalized> {
        const { data } = await axios.get<MetNoResponse>(this.base, {
            timeout: 4000,
            headers: {
                'User-Agent':
                    this.config.get<string>('APP_USER_AGENT') ||
                    'weather-mvp/0.1 your_email@example.com',
                Accept: 'application/json',
            },
            params: { lat, lon },
        });

        const now = data.properties?.timeseries?.[0]?.data?.instant?.details;
        if (!now) {
            throw new Error('met.no: нет данных в timeseries/instant.details');
        }

        return {
            source: this.name,
            fetchedAt: new Date().toISOString(),
            tempC: now.air_temperature,
            windMs: now.wind_speed,
        };
    }
}
