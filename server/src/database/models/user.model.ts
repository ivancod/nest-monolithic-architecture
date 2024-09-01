import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
	tableName: 'users',
	timestamps: true,
})
export class User extends Model<User> {
	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	email: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	refreshToken: string;
}
