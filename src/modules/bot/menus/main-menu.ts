import { Menu } from '@grammyjs/menu';
import { MyContext } from '../my-context';
import { LocationHandler } from '../handlers/location-handler';
import { WeatherMenu } from './weather-menu';
import { HelpMenu } from './help-menu';
import { buildLocationMenu } from './location-menu';

export const MainMenu = new Menu<MyContext>('main')
    .text('Помощь', (context) => {
        context.menu.nav('help');
        context.editMessageText('Помощь');
    })
    .text('Погода', (context) => {
        context.menu.nav('weather');
        context.editMessageText('Погода');
    })
    .text('Локация', (context) => {
        context.menu.nav('location');
        context.editMessageText('Локация');
    });

MainMenu.register(HelpMenu);
MainMenu.register(WeatherMenu);
MainMenu.register(buildLocationMenu(new LocationHandler));
