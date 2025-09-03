import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { envSchema } from './common/validation/env.validation';
import { LoggerModule } from 'nestjs-pino';
import { WeatherModule } from './modules/weather/weather.module';
import { BotModule } from './modules/bot/bot.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: (env) => envSchema.parse(env),
            envFilePath: ['.env'],
        }),
        LoggerModule.forRoot({
            pinoHttp: {
                level: 'trace',
                transport: {
                    target: 'pino-pretty',
                    options: { singleLine: true },
                },
                serializers: {
                    req: (req) => ({
                        method: req.method,
                        url: req.url,
                        params: req.params,
                        query: req.query,
                    }),
                    res: (res) => ({
                        statusCode: res.statusCode,
                    }),
                },
            },
        }),
        ScheduleModule.forRoot(),
        WeatherModule,
        BotModule,
    ],
    providers: [ConfigService],
})
export class AppModule {}
