import { Context } from 'grammy';

export class HelpHandler {
    async execute(context: Context) {
        await context.answerCallbackQuery();

        if (context.callbackQuery?.message) {
            await context.reply('Кнопка помощь была нажата');
        }
    }
}
