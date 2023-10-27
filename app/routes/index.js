import express from 'express';

import process from './process';

const router = express.Router();

router.use('/process', process);

module.exports = router;
