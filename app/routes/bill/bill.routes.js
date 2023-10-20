import express from 'express';
import { BillController } from '../../controllers/bill/bill.controller';
import { RolePermission } from '../../variables/enum.variable';
import { PermissionMid } from '../../middlewares/auth/permission.middleware';

const router = express.Router();

router.get('/', PermissionMid.checkPermission({ name: 'Get All bill', code: RolePermission.BILL_READ }), BillController.getBills);

module.exports = router;
