const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ProgramController = require('../app/controller/ProgramController');
const PageController = require('../app/controller/PageController');
const RegistrationController = require('../app/controller/RegistrationController');
const SearchController = require('../app/controller/SearchController');

router.patch(
    '/program/:slug/update',
    [auth.verifyToken, auth.hasOrg],
    ProgramController.updateProgram,
);
router.post(
    '/program/get-register-req/:reqId',
    [auth.verifyToken, auth.hasOrg],
    ProgramController.getRegisterRequire,
);
router.patch(
    '/program/regis-req/:programId/update',
    [auth.verifyToken, auth.hasOrg],
    ProgramController.updateRegisReq,
);
router.post('/:orgSlug/publish-programs', [auth.verifyToken], PageController.showPublishPrograms);
router.get(
    '/program/:programSlug/get-register',
    [auth.verifyToken],
    PageController.showProgramRegister,
);
router.post(
    '/program/:programSlug/register',
    [auth.verifyToken],
    RegistrationController.createRegistration,
);
router.patch(
    '/registrations/:regisId/update-status',
    [auth.verifyToken, auth.hasOrg],
    RegistrationController.updateStatusRegistration,
);
router.get(
    '/program/get-publish-programs',
    [auth.verifyToken],
    SearchController.showAllPublishPrograms,
);
router.get(
    '/program/get-publish-organizations',
    [auth.verifyToken],
    SearchController.showAllPublishOrganizations,
);
// router.post('/program/:programSlug/register',[auth.verifyToken], PageController.)
module.exports = router;
