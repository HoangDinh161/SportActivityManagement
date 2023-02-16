const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const meController = require('../app/controller/MeController');
const organizationController = require('../app/controller/OrganizationController');
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
});
router.post('/createOrg', [auth.verifyToken], organizationController.createOrg);
// router.get('/stored/schedules', meController.showSc;
// router.get('/stored/activities', meController.showActivites);
// router.get('/stored/members', meController.showMembers);
module.exports = router;
