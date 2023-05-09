const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const organizationController = require('../app/controller/OrganizationController');
const ProgramController = require('../app/controller/ProgramController');
const PageController = require('../app/controller/PageController');
// router.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
//     next();
// });

router.post('/program', [auth.verifyToken, auth.hasOrg], organizationController.showPrograms);
router.post('/program/new', [auth.verifyToken, auth.hasOrg], ProgramController.createProgram);
router.post('/program/:slug', [auth.verifyToken, auth.hasOrg], ProgramController.showProgram);
router.delete('/program/:slug/delete', [auth.verifyToken], ProgramController.deleteProgram);
// router.post('/activity', [auth.verifyToken, auth.hasOrg], organizationController.showActivities);
// router.post('/activity/new', [auth.verifyToken, auth.hasOrg], ProgramController.createActivity);
// router.post('/activity/:slug', [auth.verifyToken, auth.hasOrg], ProgramController.showActivity);
router.post(
    '/registration',
    [auth.verifyToken, auth.hasOrg],
    organizationController.showRegistrations,
);
router.post('/member', [auth.verifyToken, auth.hasOrg], organizationController.showMembers);
router.post('/member/add', [auth.verifyToken, auth.hasOrg], organizationController.addMember);
router.post(
    '/member/:orgId/:userId/delete',
    [auth.verifyToken],
    organizationController.deleteMember,
);
router.get('/:orgSlug/get-info', [auth.verifyToken], PageController.showPageAboutInfo);

module.exports = router;
