import { MyContext } from '../my-context';

export class WeatherHadler {
    async execute(context: MyContext) {
        await context.answerCallbackQuery();

        if (context.callbackQuery?.message) {
            context.reply('Кнопка погоды была нажата');
        }
    }
}
