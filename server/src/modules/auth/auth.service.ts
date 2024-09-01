import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import appConfig from 'src/config/app.config';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	/**
	 * Register a new user
	 * 
	 * @param registerDto
	 */
	async register(registerDto: RegisterDto) {
		return this.userService.createUser(registerDto);
	}

	/**
	 * Login a user
	 * 
	 * @param loginDto
	 */
	async login(loginDto: LoginDto) {
		const user = await this.userService.getUserByEmail(loginDto.email);
		const passwordMatches = await bcrypt.compare(loginDto.password, user.password);

		if (!passwordMatches) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const payload = { sub: user.id, email: user.email };
		const accessToken = this.jwtService.sign(payload, { expiresIn: appConfig.jwt.accessTokenExpiration });
		const refreshToken = this.jwtService.sign(payload, { expiresIn: appConfig.jwt.refreshTokenExpiration });

		const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
		await this.userService.updateRefreshToken(user.id, hashedRefreshToken);

		return {
			accessToken,
			refreshToken,
		};
	}

	/**
	 * Refresh access and refresh tokens
	 * 
	 * @param userId
	 * @param refreshToken
	 * @returns
	 * @throws ForbiddenException
	 */
	async refreshTokens(userId: number, refreshToken: string) {
		const user = await this.userService.getUserById(userId);

		if (!user || !user.refreshToken) {
			throw new ForbiddenException('Access Denied');
		}

		const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);

		if (!refreshTokenMatches) {
			throw new ForbiddenException('Invalid refresh token');
		}

		const payload = { sub: user.id, email: user.email };
		const newAccessToken = this.jwtService.sign(payload, { expiresIn: appConfig.jwt.accessTokenExpiration });
		const newRefreshToken = this.jwtService.sign(payload, { expiresIn: appConfig.jwt.refreshTokenExpiration });

		const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);
		await this.userService.updateRefreshToken(user.id, hashedRefreshToken);

		return {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		};
	}

	/**
	 * Logout a user
	 * 
	 * @param userId
	 */
	async logout(userId: number) {
		await this.userService.removeRefreshToken(userId);
	}
}
