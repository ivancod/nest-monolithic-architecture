// database/database.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import dbConfig from '../config/db.config';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: dbConfig.host,
            port: dbConfig.port,
            username: dbConfig.username,
            password: dbConfig.password,
            database: dbConfig.database,
            models: [User],
            autoLoadModels: true,
            synchronize: true,
            logging: false,
        }),
    ],
    exports: [SequelizeModule],
})
export class DatabaseModule {}
