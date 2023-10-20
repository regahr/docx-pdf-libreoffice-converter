import express from 'express';
import auth from './auth';
import general from './general';
import kyb from './kyb';

import wallet from './business-account/wallet.routes';
import transaction from './business-account/transaction.routes';
import transfer from './business-account/transfer.routes';
import bill from './bill/bill.routes';
import { TokenMid } from '../middlewares/auth/token.middleware';
import inAppNotification from './notification/in-app-notification.routes';

const router = express.Router();

router.use('/auth', auth);
router.use('/general', general);
router.use('/wallet', TokenMid.verifyToken, wallet);
// transaction stuff
router.use('/transaction', TokenMid.verifyToken, transaction);
router.use('/transfer', TokenMid.verifyToken, transfer);

router.use('/bill', TokenMid.verifyToken, bill);

router.use('/kyb', kyb);

router.use('/in-app-notification', TokenMid.verifyToken, inAppNotification);

module.exports = router;
