import { Injectable } from '@nestjs/common';
import { Bot, Filter, session } from 'grammy';
import { BotService } from './bot.service';
import { StartHandler } from './handlers/start-handler';
import { HelpHandler } from './handlers/help-handler';
import { WeatherHadler } from './handlers/weather-handler';
import { MainMenu } from './menus/main-menu';
import { FileAdapter } from '@grammyjs/storage-file';
import { MyContext, SessionData } from './my-context';
import { Menu } from '@grammyjs/menu';
import { messages } from './messages/messages';
import { WeatherMenu } from './menus/weather-menu';
import { buildLocationMenu } from './menus/location-menu';
import { LocationHandler } from './handlers/location-handler';
import { openMenu } from './handlers/menu-handler';

@Injectable()
export class BotUpdate {
    private readonly bot: Bot<MyContext>;

    constructor(
        private readonly botService: BotService,
        private readonly locationHandler: LocationHandler,
    ) {
        this.bot = this.botService.botInstance();

        this.bot.use(
            session<SessionData, MyContext>({
                initial: () => ({}),
                storage: new FileAdapter({ dirName: 'sessions' }),
            }),
        );

        this.bot.use(MainMenu);
        /*this.bot.use(HelpMenu);
        this.bot.use(WeatherMenu);
        this.bot.use(LocationMenu);*/

        this.bot.command('start', (context: MyContext) =>
            openMenu(context, 'Главное меню', MainMenu),
        );
        this.bot.command('weather', (context: MyContext) =>
            openMenu(context, 'Погода', WeatherMenu),
        );
        this.bot.command('location', (context: MyContext) =>
            openMenu(context, 'Локация', buildLocationMenu(locationHandler)),
        );
        this.bot.command('help', (context: MyContext) =>
            openMenu(context, 'Помощь', MainMenu),
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
