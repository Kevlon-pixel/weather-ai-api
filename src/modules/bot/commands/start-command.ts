import { Injectable } from '@nestjs/common';
import { Context } from 'grammy';
import { messages } from '../messages/messages';
import { startKeyboard } from '../keyboards/start-keyboard';


@Injectable()
export class StartCommand {
    async execute(context: Context) {
        return context.reply(messages.START, {
            reply_markup: startKeyboard(),
        });
    }
}
