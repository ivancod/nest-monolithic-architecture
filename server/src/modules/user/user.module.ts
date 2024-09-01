import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from '../../database/models/user.model';
import { UserController } from './user.controller';

@Module({
	imports: [SequelizeModule.forFeature([User])],
	providers: [UserService, UserRepository],
	exports: [UserService],
	controllers: [UserController],
})
export class UserModule {}