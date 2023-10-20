import express from 'express';
import { TokenMid } from '../../middlewares/auth/token.middleware';
import { RolesController } from '../../controllers/auth/roles.controller';

const router = express.Router();

router.get('/', TokenMid.verifyToken, RolesController.getAll);

module.exports = router;
