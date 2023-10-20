import express from 'express';
import { WalletController } from '../../controllers/business-account/wallet.controller';
import { PermissionMid } from '../../middlewares/auth/permission.middleware';
import { RolePermission } from '../../variables/enum.variable';

const router = express.Router();

router.get('/', PermissionMid.checkPermission({ name: 'Get Wallet Detail', code: RolePermission.BA_SEE_BA_DETAIL }), WalletController.getWallets);

module.exports = router;
