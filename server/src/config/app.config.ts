import 'dotenv/config';

const { APP_PORT, APP_HOST, APP_MODE, TOKEN_SECRET } = process.env;

export default {
    port: APP_PORT || 3000,
    host: APP_HOST || 'localhost',
    mode: APP_MODE,
    jwt: {
        secret: TOKEN_SECRET,
        accessTokenExpiration: '15m',
        refreshTokenExpiration: '7d',
    }
}
