import 'dotenv/config';

const { APP_PORT, APP_MODE, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET  } = process.env;

export default {
    port: APP_PORT,
    mode: APP_MODE,
    jwt: {
        accessTokenSecret: ACCESS_TOKEN_SECRET,
        refreshTokenSecret: REFRESH_TOKEN_SECRET,
    }
}
