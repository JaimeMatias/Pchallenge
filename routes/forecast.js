const express = require('express');
const { ForcastGet } = require('../controllers/forecastController'); //Metodo a llamar en el Endpoint definido mas abajo
const router = express.Router();
router.get('/',ForcastGet);
module.exports = router;