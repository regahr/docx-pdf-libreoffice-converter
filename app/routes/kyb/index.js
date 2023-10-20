import express from 'express';
import document from './document.routes';

const router = express.Router();

router.use('/documents', document);

module.exports = router;
