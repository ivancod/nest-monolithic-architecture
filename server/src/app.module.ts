import { join } from 'path';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ResponseTransformMiddleware } from './middlewares/response-transform.middleware';
import { HttpLoggerMiddleware } from './middlewares/http-logger.middleware';
import { JwtStrategy } from './modules/auth/jwt.strategy';


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'client/build'),
            serveRoot: '', 
        }),
        DatabaseModule,
        AuthModule,
        UserModule,
    ],
    controllers: [],
    providers: [JwtStrategy],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(HttpLoggerMiddleware).forRoutes('*');
        consumer.apply(ResponseTransformMiddleware).forRoutes('*');
    }
}
