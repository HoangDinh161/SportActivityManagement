const express = require('express');
const router = express.Router();
const authController = require('../app/controller/AuthController');
const verifySignup = require('../middleware/verifySignup');

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
});
router.post('/signup', [verifySignup.checkExistUserEmail], authController.signUp);
router.post('/login', authController.logIn);
router.post('/refreshtoken', authController.refreshToken);

module.exports = router;
