const { default: mongoose } = require('mongoose');
const config = require('../../config/auth');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const Organization = require('../models/Organization');

class AuthController {
    logIn(req, res) {
        console.log(req);
        User.findOne({ username: req.body.username }).exec(async (err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: 'User Not found.' });
            }
            let isCorrectPassword = bcrypt.compare(req.body.password, user.password);
            if (!isCorrectPassword) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Wrong Password!',
                });
            }
            let token = jwt.sign({ id: user._id }, config.accessTokenKey, {
                expiresIn: config.jwtExpiration,
            });
            console.log(user);

            let refreshToken = await RefreshToken.createToken(user);

            res.status(200).send({
                id: user._id,
                username: user.username,
                name: user.userInfo.name,
                email: user.userInfo.email,
                org_id: user.organization,
                accessToken: token,
                refreshToken: refreshToken,
            });
        });
    }
    async refreshToken(req, res) {
        const { refreshToken: requestToken } = req.body;

        if (requestToken == null) {
            return res.status(403).json({ message: 'Refresh Token is not required!' });
        }

        try {
            let refreshToken = await RefreshToken.findOne({ token: requestToken });

            if (!refreshToken) {
                res.status(403).json({ message: 'Refresh token is not in database!' });
                return;
            }

            if (RefreshToken.verifyExpiration(refreshToken)) {
                RefreshToken.findByIdAndRemove(refreshToken._id, {
                    useFindAndModify: false,
                }).exec();

                res.status(403).json({
                    message: 'Refresh token was expired. Please make a new signin request',
                });
                return;
            }

            let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.accessTokenKey, {
                expiresIn: config.jwtExpiration,
            });

            return res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: refreshToken.token,
            });
        } catch (err) {
            return res.status(500).send({ message: err });
        }
    }
    signUp(req, res) {
        console.log(req);
        let nUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            userInfo: {
                email: req.body.email,
                name: req.body.name,
            },
        });
        nUser.save((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: 'User was registered successfully!' });
        });
    }
}

module.exports = new AuthController();
