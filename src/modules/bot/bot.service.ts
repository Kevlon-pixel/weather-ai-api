import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bot } from 'grammy';
import { Logger } from 'nestjs-pino';
import { MyContext } from './my-context';

@Injectable()
export class BotService implements OnModuleInit, OnModuleDestroy {
    private bot: Bot<MyContext>;
    private started = false;

    constructor(
        private readonly config: ConfigService,
        private readonly logger: Logger,
    ) {
        const token = this.config.get<string>('TELEGRAM_BOT_TOKEN');
        if (!token) {
            throw new Error('Токен не был найден');
        }

        this.bot = new Bot<MyContext>(token);
        this.bot.catch((err) =>
            this.logger.error(`Global error: ${err.name}: ${err.message}`),
        );
    }

    async onModuleInit() {
        if (!this.started) {
            this.bot.start();
            this.logger.log('Bot started');
            this.started = true;
        }
    }

    async onModuleDestroy() {
        if (this.bot) {
            await this.bot.stop();
            this.logger.log('Bot stopped');
            this.started = false;
        }
    }

    public botInstance(): Bot<MyContext> {
        if (!this.bot) {
            throw new Error('Бот не был инициализирован');
        }
        return this.bot;
    }
}
