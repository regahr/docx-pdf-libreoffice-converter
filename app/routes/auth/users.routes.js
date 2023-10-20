import express from 'express';
import { UsersController } from '../../controllers/auth/users.controller';
import { UsersMid } from '../../middlewares/auth/users.middleware';
import { TokenMid } from '../../middlewares/auth/token.middleware';

const router = express.Router();

router.put('/self', UsersMid.updateUserByToken, UsersController.updateUserByToken);
router.get('/self', UsersController.getUserByToken);
router.post('/deactivate', TokenMid.verifyToken, UsersController.requestAccountDeactivation);
router.post('/re-activate', TokenMid.verifyToken, UsersController.cancelAccountDeactivation);
router.put('/verify-email/:token', UsersController.verifyUserEmail);

module.exports = router;
