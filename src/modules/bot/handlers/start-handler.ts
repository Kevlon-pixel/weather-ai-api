import { Context } from 'grammy';

export class StartHandler {
    async execute(context: Context) {
        await context.answerCallbackQuery();

        if (context.callbackQuery?.message) {
            await context.reply('Кнопка старт нажата');
        } else {
            
        }
    }
}
