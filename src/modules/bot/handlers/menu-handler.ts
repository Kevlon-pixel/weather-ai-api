import { Menu } from '@grammyjs/menu';
import { MyContext } from '../my-context';

export async function openMenu(
    context: MyContext,
    text: string,
    menu: Menu<MyContext>,
) {
    if (context.message) {
        try {
            await context.api.deleteMessage(
                context.chat!.id,
                context.message.message_id,
            );
        } catch {}
    }

    if (context.callbackQuery) {
        try {
            await context.editMessageText(text, { reply_markup: menu });
            return;
        } catch {}
    }

    const mid = context.session.menuMsgId;
    if (mid) {
        try {
            await context.api.editMessageText(context.chat!.id, mid, text, {
                reply_markup: menu,
            });
            return;
        } catch {
            try {
                await context.api.deleteMessage(context.chat!.id, mid);
            } catch {}
        }
    }

    const m = await context.reply(text, { reply_markup: menu });
    context.session.menuMsgId = m.message_id;
}
