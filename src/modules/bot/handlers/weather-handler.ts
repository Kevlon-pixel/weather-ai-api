import { Context } from 'grammy';

export class WeatherHadler {
    async execute(context: Context) {
        await context.answerCallbackQuery();

        if (context.callbackQuery?.message) {
            context.reply('Кнопка погоды была нажата');
        }
    }
}
