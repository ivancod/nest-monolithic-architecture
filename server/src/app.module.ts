import { join } from 'path';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ResponseTransformMiddleware } from './middlewares/response-transform.middleware';


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
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(ResponseTransformMiddleware).forRoutes('*');
    }
}
