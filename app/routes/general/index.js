import express from 'express';
import country from './country.routes';
import GeneralController from '../../controllers/general/general.controller';
import systemVariable from './system-variable.routes';

const router = express.Router();

router.use('/country', country);
router.get('/dropdown-data', GeneralController.getDropdownData);
router.use('/variables', systemVariable);

module.exports = router;
