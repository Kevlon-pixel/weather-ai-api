import { Menu } from '@grammyjs/menu';
import { MyContext } from '../my-context';

export const HelpMenu = new Menu<MyContext>('help')
    .text('FAQ')
    .row()
    .back('В главное меню', (context) => {
        context.editMessageText('Главное меню');
    });
