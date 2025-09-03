import { Injectable } from '@nestjs/common';
import { Bot, Context } from 'grammy';
import { BotService } from './bot.service';
import { StartCommand } from './commands/start-command';
import { StartHandler } from './handlers/start-handler';
import { HelpCommand } from './commands/help-command';
import { HelpHandler } from './handlers/help-handler';
import { WeatherHadler } from './handlers/weather-handler';
import { WeatherCommand } from './commands/weather-command';

@Injectable()
export class BotUpdate {
    private readonly bot: Bot;

    constructor(
        private readonly botService: BotService,
        private readonly startCommand: StartCommand,
        private readonly startHandler: StartHandler,
        private readonly helpCommand: HelpCommand,
        private readonly helpHandler: HelpHandler,
        private readonly weatherCommand: WeatherCommand,
        private readonly weatherHandler: WeatherHadler,
    ) {
        this.bot = this.botService.botInstance();

        this.bot.command('start', (context: Context) =>
            this.startCommand.execute(context),
        );
        this.bot.callbackQuery('start', (context) =>
            this.startHandler.execute(context),
        );

        this.bot.command('help', (context: Context) =>
            this.helpCommand.execute(context),
        );
        this.bot.callbackQuery('help', (context: Context) =>
            this.helpHandler.execute(context),
        );

        this.bot.command('weather', (context: Context) =>
            this.weatherCommand.execute(context),
        );
        this.bot.callbackQuery('weather', (context: Context) =>
            this.weatherHandler.execute(context),
        );
    }
}
