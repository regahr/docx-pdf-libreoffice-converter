import express from 'express';
import { TransferController } from '../../controllers/business-account/transfer.controller';
import { TransferMid } from '../../middlewares/business-account/transfer.middleware';
import { PermissionMid } from '../../middlewares/auth/permission.middleware';
import { RolePermission } from '../../variables/enum.variable';

const router = express.Router();

router.get('/lock-exchange-rate', PermissionMid.checkPermission({ name: 'Lock Exchange Rate', code: RolePermission.TRANSFER_CREATE }), TransferMid.lockExchangeRate, TransferController.lockExchangeRate);

module.exports = router;
