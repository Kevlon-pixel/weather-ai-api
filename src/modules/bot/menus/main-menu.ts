import { Menu } from '@grammyjs/menu';
import { MyContext } from '../my-context';
import { LocationHandler } from '../handlers/location-handler';
import { WeatherMenu } from './weather-menu';
import { buildLocationMenu } from './location-menu';

export const MainMenu = new Menu<MyContext>('main')
    .text('Помощь', async (ctx) => {
        await ctx.menu.nav('help');
        await ctx.editMessageText('Помощь');
    })
    .text('Погода', async (ctx) => {
        await ctx.menu.nav('weather');
        await ctx.editMessageText('Погода');
    })
    .text('Локация', async (ctx) => {
        await ctx.menu.nav('location');
        await ctx.editMessageText('Локация');
    });

//MainMenu.register(HelpMenu);
MainMenu.register(WeatherMenu);
MainMenu.register(buildLocationMenu(new LocationHandler()));
