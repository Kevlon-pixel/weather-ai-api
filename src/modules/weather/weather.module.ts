import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { OpenMeteoProvider } from 'src/modules/weather/providers/openmeteo.provider';

@Module({
  imports: [],
  controllers: [WeatherController],
  providers: [WeatherService, OpenMeteoProvider],
  exports: [OpenMeteoProvider],
})
export class WeatherModule {}
