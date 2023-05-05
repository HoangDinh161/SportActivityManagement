const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserController = require('../app/controller/UserController');
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
});
router.post('/showUserInfo', auth.verifyToken, UserController.showInfo);
router.patch('/editUser', auth.verifyToken, UserController.updateInfo);
module.exports = router;
