import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { OpenMeteoProvider } from 'src/modules/weather/providers/openmeteo.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LlmService } from '../llm/llm.service';

@Module({
    imports: [ConfigModule],
    providers: [WeatherService, OpenMeteoProvider, ConfigService, LlmService],
    exports: [OpenMeteoProvider, WeatherService],
})
export class WeatherModule {}
