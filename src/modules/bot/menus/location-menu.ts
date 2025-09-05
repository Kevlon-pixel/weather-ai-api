import { Menu } from '@grammyjs/menu';
import { MyContext } from '../my-context';
import { LocationHandler } from '../handlers/location-handler';

export function buildLocationMenu(handler: LocationHandler) {
    const LocationMenu = new Menu<MyContext>('location')
        .text('Текущая локация', (context: MyContext) => {
            handler.currentLocation(context);
        })
        .text('Указать локацию', (context: MyContext) => {
            handler.changeLocation(context);
        })
        .row()
        .back('В главное меню', (context) => {
            context.editMessageText('Главное меню');
        });

    return LocationMenu;
}
