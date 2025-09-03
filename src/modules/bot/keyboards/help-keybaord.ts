import { InlineKeyboard } from 'grammy';

export const helpKeyboard = () => {
    return new InlineKeyboard().text('Помощь', 'help');
};
