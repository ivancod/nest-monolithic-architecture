import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	/**
	 * This method is used to create a new user.
	 * 
	 * @param createUserDto 
	 * @returns The ID and email of the created user
	 * 
	 * @throws BadRequestException
	 */
	async createUser(createUserDto: CreateUserDto) {
		const existingUser = await this.userRepository.findByEmail(createUserDto.email);
		if (existingUser) {
			throw new BadRequestException('User with this email already exists');
		}

		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
		const user = await this.userRepository.create({
			...createUserDto,
			password: hashedPassword,
		});

		return { id: user.id, email: user.email };
	}

	/**
	 * This method is used to get a user by their email.
	 * 
	 * @param email The email of the user
	 * @returns The user object
	 * 
	 * @throws NotFoundException
	 */
	async getUserByEmail(email: string) {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	/**
	 * This method is used to get a user by their ID.
	 * 
	 * @param id The ID of the user
	 * @returns The user object
	 * 
	 * @throws NotFoundException
	 */
	async getUserById(id: number) {
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	/**
	 * This method is used to update the refresh token of a user.
	 * 
	 * @param id The ID of the user
	 * @param refreshToken The new refresh token
	 * 
	 * @throws NotFoundException
	 */
	async updateRefreshToken(id: number, refreshToken: string) {
		await this.userRepository.updateRefreshToken(id, refreshToken);
	}

	/**
	 * This method is used to remove the refresh token of a user.
	 * 
	 * @param id The ID of the user
	 * 
	 * @throws NotFoundException
	 */
	async removeRefreshToken(id: number) {
		await this.userRepository.removeRefreshToken(id);
	}
}
