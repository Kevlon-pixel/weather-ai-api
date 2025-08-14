import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { OpenMeteoProvider } from 'src/modules/weather/providers/openmeteo.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LlmService } from '../llm/llm.service';

@Module({
  imports: [ConfigModule],
  controllers: [WeatherController],
  providers: [WeatherService, OpenMeteoProvider, ConfigService, LlmService],
  exports: [OpenMeteoProvider],
})
export class WeatherModule {}
