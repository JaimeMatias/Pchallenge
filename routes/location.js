
const express = require('express');
const { LocationGet } = require('../controllers/locationController'); //Metodo a llamar en el Endpoint definido mas abajo
const router = express.Router();
router.get('/',LocationGet);
module.exports = router;