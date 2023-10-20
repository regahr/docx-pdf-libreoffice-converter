import express from 'express';
import { AuthController } from '../../controllers/auth/index.controller';
import { AuthMid } from '../../middlewares/auth/index.middleware';
import { TokenMid } from '../../middlewares/auth/token.middleware';
import users from './users.routes';
import roles from './roles.routes';

const router = express.Router();

router.use('/users', users);
router.use('/roles', roles);
router.post('/sign-up', AuthMid.signup, AuthController.signup);
router.get('/check-token', AuthController.checkToken);
router.post('/request-code', AuthMid.requestCode, AuthController.requestCode);
router.post('/verify-code', AuthMid.verifyCode, AuthController.verifyCode);
router.post('/onboard-company', AuthMid.onboardCompany, AuthController.onboardCompany);
router.get('/onboard-company', TokenMid.verifyToken, AuthController.getOnboardCompanyDetail);
router.post('/onboard-company/document', TokenMid.verifyToken, AuthController.addOnboardCompanyDocument);
router.post('/sign-in', AuthMid.signin, AuthController.signin);
router.post('/exists-check', AuthMid.existsCheck, AuthController.existsCheck);
router.post('/organization-selection', AuthMid.organizationSelection, AuthController.organizationSelection);
router.get('/nium-tnc', AuthController.getNiumTnc);
router.post('/sign-out', AuthController.signout);
router.post('/check-pin', AuthMid.checkPin, AuthController.checkPin);
router.post('/device-registration', AuthMid.deviceRegistration, AuthController.deviceRegistration);
// router.post('/verify-your-email', TokenMid.verifyToken, AuthController.sendMailVerifyYourEmail);

// TODO re-securing verify-code
router.post('/verify-code/vulnerable', AuthMid.verifyCode, AuthController.verifyCodeVulnerable);

module.exports = router;
