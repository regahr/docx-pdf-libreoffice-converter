import express from 'express';
import { CountryController } from '../../controllers/general/country.controller';

const router = express.Router();

// CRUD
router.get('/', CountryController.getAllCountries);

// CUSTOM
router.get('/currency', CountryController.getAllCurrencies);

module.exports = router;
