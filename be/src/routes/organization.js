const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const organizationController = require('../app/controller/OrganizationController');
const activityController = require('../app/controller/ActivityController');
// router.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
//     next();
// });

router.post('/schedule', [auth.verifyToken, auth.hasOrg], organizationController.showSchedules);
router.post('/schedule/new', [auth.verifyToken, auth.hasOrg], activityController.createSchedule);
router.get('/activity', [auth.verifyToken, auth.hasOrg], organizationController.showActivities);
router.get(
    '/registration',
    [auth.verifyToken, auth.hasOrg],
    organizationController.showRegistrations,
);
router.get('/member', [auth.verifyToken, auth.hasOrg], organizationController.showMembers);
module.exports = router;
