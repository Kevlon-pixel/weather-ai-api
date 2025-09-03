import { Context } from 'grammy';
import { messages } from '../messages/messages';
import { weatherKeyboard } from '../keyboards/weather-keyboard';

export class WeatherCommand {
    async execute(context: Context) {
        return context.reply(messages.WEATHER, {
            reply_markup: weatherKeyboard(),
        });
    }
}
