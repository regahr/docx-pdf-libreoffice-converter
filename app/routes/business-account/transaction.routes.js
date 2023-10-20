import express from 'express';
import { TransactionController } from '../../controllers/business-account/transaction.controller';
import { TransactionMid } from '../../middlewares/business-account/transaction.middleware';
import { PermissionMid } from '../../middlewares/auth/permission.middleware';
import { RolePermission } from '../../variables/enum.variable';

const router = express.Router();

router.get('/', PermissionMid.checkPermission({ name: 'Get Transaction List', code: RolePermission.BA_TRANSACTION_LISTING }), TransactionMid.getTransaction, TransactionController.getTransactions);
router.get('/export', PermissionMid.checkPermission({ name: 'Export Transaction', code: RolePermission.BA_TRANSACTION_LISTING }), TransactionMid.exportTransaction, TransactionController.exportTransactions);

module.exports = router;
