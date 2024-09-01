import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RefreshTokenGuard } from '../../common/guards/refresh-token.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Register a new user
	 * 
	 * @param registerDto
	 * @returns
	 */
	@Post('register')
	async register(@Body() registerDto: RegisterDto) {
		const user = await this.authService.register(registerDto);
		return { message: 'User successfully registered', user };
	}

	/**
	 * Login a user
	 * 
	 * @param loginDto LoginDto
	 * @returns
	 */
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}

	/**
	 * Refresh access and refresh tokens
	 * 
	 * @param req
	 * @returns
	 */
	@UseGuards(RefreshTokenGuard)
	@HttpCode(HttpStatus.OK)
	@Post('refresh')
	async refreshTokens(@Req() req: Request) {
		const userId = req.user['sub'];
		const refreshToken = req.user['refreshToken'];
		return this.authService.refreshTokens(userId, refreshToken);
	}

	/**
	 * Logout a user
	 * 
	 * @param
	 * @returns
	 */
	@UseGuards(JwtAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post('logout')
	async logout(@Req() req: Request) {
		const userId = req.user['sub'];
		await this.authService.logout(userId);
		return { message: 'User successfully logged out' };
	}
}
