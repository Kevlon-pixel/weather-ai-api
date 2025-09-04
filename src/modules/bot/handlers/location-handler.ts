import { Context } from 'grammy';
import { MyContext } from '../my-context';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationHandler {
    async currentLocation(context: MyContext) {
        await context.answerCallbackQuery();

        if (context.session.location) {
            return context.reply(
                `Текущая локация: lat = ${context.session.location.lat}, lon = ${context.session.location.lon}`,
            );
        } else {
            await context.reply('У вас пока нет заданной локации');
        }
    }

    async changeLocation(context) {
        await context.answerCallbackQuery();

        context.session.awaiting = 'location';

        await context.reply(
            'Введите координаты в формате: `lat lon` (например, `59.9386 30.3141`)',
            { parse_mode: 'Markdown' },
        );
    }
}
