const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const Organization = require('../app/models/Organization');
const User = require('../app/models/User');

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: 'Unauthorized! Access Token was expired!' });
    }
    return res.sendStatus(401).send({ message: 'Unauthorized!' });
};

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, config.accessTokenKey, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

const hasOrg = (req, res, next) => {
    Organization.findById(req.body.orgId).exec((err, org) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!org) {
            res.status(400).send({ message: 'Please create your Organization first!' });
        }
        next();
    });
};
const auth = { verifyToken, hasOrg };

module.exports = auth;
