import express from 'express';
import { SystemVariableController } from '../../controllers/general/system-variable.controller';

const router = express.Router();

router.get('/', SystemVariableController.getAllVariables);
router.get('/single', SystemVariableController.getSingleVariable);

module.exports = router;
