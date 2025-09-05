import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { WeatherModule } from '../weather/weather.module';
import { ConfigService } from '@nestjs/config';

import { StartHandler } from './handlers/start-handler';

import { HelpHandler } from './handlers/help-handler';

import { WeatherHadler } from './handlers/weather-handler';
import { LocationHandler } from './handlers/location-handler';

@Module({
    imports: [WeatherModule],
    providers: [
        BotService,
        BotUpdate,
        ConfigService,
        StartHandler,
        HelpHandler,
        WeatherHadler,
        LocationHandler,
    ],
})
export class BotModule {}
