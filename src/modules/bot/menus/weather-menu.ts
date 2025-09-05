import { Menu } from '@grammyjs/menu';
import { MyContext } from '../my-context';

export const WeatherMenu = new Menu<MyContext>('weather')
    .text('Погода сейчас')
    .row()
    .text('Погода на сегодня')
    .text('Погода на завтра')
    .row()
    .text('Погода на 3 дня')
    .text('Погода на 7 дней')
    .row()
    .back('В главное меню', (context) => {
        context.editMessageText('Главное меню');
    });
