import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { CurrentNormalized } from '../weather/types/types';

export type WeatherNarrative = {
    title: string;
    summary: string;
    tips?: string[];
};

@Injectable()
export class LlmService {
    private client: OpenAI;

    constructor(private readonly config: ConfigService) {
        const apiKey = config.get<string>('OPENAI_API_KEY');
        if (!apiKey) {
            throw new Error('Отсутвтвует OpenAI apikey');
        }
        this.client = new OpenAI({ apiKey: apiKey });
    }

    async narrative(sources: CurrentNormalized[]) {
        const schema = {
            name: 'weather_narrative',
            strict: true,
            schema: {
                type: 'object',
                properties: {
                    title: { type: 'string' },
                    summary: { type: 'string' },
                    tips: { type: 'array', items: { type: 'string' } },
                },
                required: ['title', 'summary'],
                additionalProperties: false,
            },
        } as const;

        const res = await this.client.responses.create({
            model: 'gpt-4o-mini',
            input: [
                {
                    role: 'system',
                    content:
                        'Кратко и по делу. Возвращай только полезную информацию.' +
                        'Отвечай строго JSON с полями {title, summary, tips?}.',
                },
                {
                    role: 'user',
                    content:
                        'Сформируй краткое описание текущей погоды на русском.\n' +
                        'Источники (все значения уже в °C и м/с): ' +
                        JSON.stringify(sources),
                },
            ],
            text: {
                format: {
                    type: 'json_schema',
                    name: 'weather_narrative',
                    strict: true,
                    schema: {
                        type: 'object',
                        properties: {
                            title: { type: 'string' },
                            summary: { type: 'string' },
                            tips: {
                                type: 'array',
                                items: { type: 'string' },
                                default: [],
                            },
                        },
                        required: ['title', 'summary', 'tips'],
                        additionalProperties: false,
                    },
                },
            },

            max_output_tokens: 200,
        });

        const text = res.output_text;
        if (!text) {
            throw new Error('LLM: пустой ответ');
        }

        const parsed = JSON.parse(text) as WeatherNarrative;
        return parsed;
    }
}
