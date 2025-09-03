import { InlineKeyboard } from 'grammy';

export const weatherKeyboard = () => {
    return new InlineKeyboard().text('Погода', 'weather');
};
