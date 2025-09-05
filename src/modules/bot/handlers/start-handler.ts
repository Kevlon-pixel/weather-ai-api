import { MyContext } from '../my-context';

export class StartHandler {
    async execute(context: MyContext) {
        await context.answerCallbackQuery();

        if (context.callbackQuery?.message) {
            await context.reply('Кнопка старт нажата');
        } else {
            
        }
    }
}
