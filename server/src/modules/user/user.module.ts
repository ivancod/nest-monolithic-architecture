import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from '../../database/models/user.model';

@Module({
	imports: [SequelizeModule.forFeature([User])],
	providers: [UserService, UserRepository],
	exports: [UserService],
})
export class UserModule {}