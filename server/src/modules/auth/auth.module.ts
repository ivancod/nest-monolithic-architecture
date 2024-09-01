import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import appConfig from 'src/config/app.config';
@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>(appConfig.jwt.secret),
				signOptions: { expiresIn: appConfig.jwt.accessTokenExpiration },
			}),
			inject: [ConfigService],
		}),
		UserModule,
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}