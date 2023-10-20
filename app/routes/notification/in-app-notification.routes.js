import express from 'express';
import { InAppNotificationController } from '../../controllers/notification/in-app-notification.controller';
import { InAppNotificationMid } from '../../middlewares/notification/inAppNotification.middleware';

const router = express.Router();

router.get('/', InAppNotificationController.getData);
router.post('/', InAppNotificationController.createData);
router.put('/is-read', InAppNotificationMid.updateIsRead, InAppNotificationController.updateIsRead);

module.exports = router;
