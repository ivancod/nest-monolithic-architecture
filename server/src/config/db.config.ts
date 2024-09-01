import 'dotenv/config';

const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;

export default {
    host: DATABASE_HOST || 'DB_HOST',
    username: DATABASE_USER || 'DB_USER',
    password: DATABASE_PASSWORD || 'DB_PASSWORD',
    database: DATABASE_NAME || 'DB_NAME',
	port: 3306,
    dialect: 'mysql',
}
