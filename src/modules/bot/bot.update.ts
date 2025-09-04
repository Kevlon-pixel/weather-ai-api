import { Injectable } from '@nestjs/common';
import { Bot, Context, Filter, session } from 'grammy';
import { BotService } from './bot.service';
import { StartHandler } from './handlers/start-handler';
import { HelpHandler } from './handlers/help-handler';
import { WeatherHadler } from './handlers/weather-handler';
import { MainMenu } from './menus/main-menu';
import { FileAdapter } from '@grammyjs/storage-file';
import { MyContext, SessionData } from './my-context';

@Injectable()
export class BotUpdate {
    private readonly bot: Bot;

    constructor(
        private readonly botService: BotService,
        private readonly startHandler: StartHandler,
        private readonly helpHandler: HelpHandler,
        private readonly weatherHandler: WeatherHadler,
    ) {
        this.bot = this.botService.botInstance();

        this.bot.use(
            session<SessionData, Context>({
                initial: () => ({}),
                storage: new FileAdapter({ dirName: 'sessions' }),
            }),
        );

        this.bot.use(MainMenu);
        /*this.bot.use(HelpMenu);
        this.bot.use(WeatherMenu);
        this.bot.use(LocationMenu);*/

        this.bot.command('start', (context: Context) =>
            context.reply('Главное меню', { reply_markup: MainMenu }),
        );
        /*this.bot.command('help', (context: Context) =>
            context.reply('Помощь', { reply_markup: HelpMenu }),
        );
        this.bot.command('weather', (context: Context) =>
            context.reply('Погода', { reply_markup: WeatherMenu }),
        );
        this.bot.command('location', (context: Context) =>
            context.reply('Локация', { reply_markup: LocationMenu }),
        );*/

        this.bot.callbackQuery('start', (context) =>
            this.startHandler.execute(context),
        );
        this.bot.callbackQuery('help', (context: Context) =>
            this.helpHandler.execute(context),
        );
        this.bot.callbackQuery('weather', (context: Context) =>
            this.weatherHandler.execute(context),
        );

        this.bot.on(
            'message:text',
            async (context: Filter<MyContext, 'message:text'>) => {
                if (context.session.awaiting !== 'location') return;

                const input = context.message?.text.trim();
                const match = input.match(
                    /^(-?\d+(?:[\.,]\d+)?)\s+(-?\d+(?:[\.,]\d+)?)$/,
                );
                if (!match) {
                    return context.reply(
                        'Неверный формат ввода. Пример, `59.9386 30.3141`',
                        { parse_mode: 'Markdown' },
                    );
                }

                const lat = parseFloat(match[1].replace(',', '.'));
                const lon = parseFloat(match[2].replace(',', '.'));

                if (
                    isNaN(lat) ||
                    isNaN(lon) ||
                    lat < -90 ||
                    lat > 90 ||
                    lon < -180 ||
                    lon > 180
                ) {
                    return context.reply(
                        'Кординаты находятся вне диапозона. lat ∈ [-90,90], lon ∈ [-180,180].',
                    );
                }

                context.session.location = { lat, lon };
                context.session.awaiting = undefined;

                await context.reply(`Локация сохранена: ${lat} ${lon}`);
            },
        );
    }
}
