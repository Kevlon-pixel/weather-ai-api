import { MenuFlavor } from '@grammyjs/menu';
import { Context, SessionFlavor } from 'grammy';

export type SessionData = {
    active?: number;
    menuMsgId?: number;
    location?: { lat: number; lon: number };
    awaiting?: 'location';
};

export type MyContext = Context & SessionFlavor<SessionData> & MenuFlavor;
