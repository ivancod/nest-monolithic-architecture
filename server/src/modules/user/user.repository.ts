import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) {}

    /**
     * This method is used to create a new user.
     * @param createUserDto 
     * @returns The created user object
     * 
     * @throws BadRequestException
     */
    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userModel.create(createUserDto);
    }

    /**
     * This method is used to find a user by their email.
     * @param email The email of the user
     * @returns The user object
     * 
     * @throws NotFoundException
     * @throws UnauthorizedException
     * @throws ForbiddenException
     * @throws BadRequestException
     */
    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ where: { email } });
    }

    /**
     * This method is used to find a user by their ID.
     * @param id The ID of the user
     * @returns The user object
     * 
     * @throws NotFoundException
     * @throws UnauthorizedException
     * @throws ForbiddenException
     * @throws BadRequestException
     */
    async findById(id: number): Promise<User | null> {
        return this.userModel.findByPk(id);
    }

    /**
     * This method is used to update the refresh token of a user.
     * @param id The ID of the user
     * @param refreshToken The new refresh token
     * 
     * @throws NotFoundException
     * @throws UnauthorizedException
     * @throws ForbiddenException
     * @throws BadRequestException
     */
    async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
        await this.userModel.update({ refreshToken }, { where: { id } });
    }

    /**
     * This method is used to remove the refresh token of a user.
     * @param id The ID of the user
     * 
     * @throws NotFoundException
     * @throws UnauthorizedException
     * @throws ForbiddenException
     * @throws BadRequestException
     */
    async removeRefreshToken(id: number): Promise<void> {
        await this.userModel.update({ refreshToken: null }, { where: { id } });
    }
}
