import { Injectable } from '@nestjs/common';
import { Context } from 'grammy';
import { messages } from '../messages/messages';
import { helpKeyboard } from '../keyboards/help-keybaord';

@Injectable()
export class HelpCommand {
    async execute(context: Context) {
        return context.reply(messages.HELP, {
            reply_markup: helpKeyboard(),
        });
    }
}
