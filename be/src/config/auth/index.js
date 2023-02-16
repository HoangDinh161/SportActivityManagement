const dotenv = require('dotenv');
dotenv.config();

const auth = {
    accessTokenKey: process.env.JWT_ACCESS_KEY,
    refreshTokenKey: process.env.JWT_REFRESH_KEY,

    jwtExpiration: 3600, // 1 hour
    jwtRefreshExpiration: 86400, // 24 hours
};

module.exports = auth;
