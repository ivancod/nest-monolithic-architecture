import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
	constructor(private readonly usersService: UserService) {}

	/**
	 * This method is used to get a user by their ID.
	 * 
	 * @param id The ID of the user
	 * @returns The user object
	 * @throws NotFoundException
	 */
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async getUser(@Param('id') id: number) {
		return this.usersService.getUserById(id);
	}
}