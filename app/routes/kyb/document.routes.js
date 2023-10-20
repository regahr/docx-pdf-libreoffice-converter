import express from 'express';
import { DocumentMid } from '../../middlewares/kyb/document.middleware';
import { TokenMid } from '../../middlewares/auth/token.middleware';
import { DocumentController } from '../../controllers/kyb/document.controller';

const router = express.Router();

router.post('/upload', TokenMid.verifyTokenWithoutOrganization, DocumentMid.upload, DocumentController.upload);
router.get('/download/:documentId', TokenMid.verifyTokenForDownload, DocumentMid.download, DocumentController.downloadFile);

module.exports = router;
