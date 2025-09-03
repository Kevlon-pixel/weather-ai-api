import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { WeatherModule } from '../weather/weather.module';
import { ConfigService } from '@nestjs/config';
import { StartCommand } from './commands/start-command';
import { StartHandler } from './handlers/start-handler';
import { HelpCommand } from './commands/help-command';
import { HelpHandler } from './handlers/help-handler';
import { WeatherCommand } from './commands/weather-command';
import { WeatherHadler } from './handlers/weather-handler';

@Module({
    imports: [WeatherModule],
    providers: [
        BotService,
        BotUpdate,
        ConfigService,
        StartCommand,
        StartHandler,
        HelpCommand,
        HelpHandler,
        WeatherCommand,
        WeatherHadler,
    ],
})
export class BotModule {}
