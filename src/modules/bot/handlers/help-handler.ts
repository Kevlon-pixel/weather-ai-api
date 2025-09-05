import { MyContext } from '../my-context';

export class HelpHandler {
    async execute(context: MyContext) {
        await context.answerCallbackQuery();

        if (context.callbackQuery?.message) {
            await context.reply('Кнопка помощь была нажата');
        }
    }
}
