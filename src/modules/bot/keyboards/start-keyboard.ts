import { InlineKeyboard } from 'grammy';

export const startKeyboard = () => {
    return new InlineKeyboard()
        .text('Старт', 'start')
        .text('Помощь', 'help')
        .row()
        .text('Погода на сегодня', 'weather');
};
