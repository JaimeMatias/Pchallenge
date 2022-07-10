const express = require('express');
const { ForcastGet } = require('../controllers/forecastController'); 
const router = express.Router();
/** Generate a call to the Controller ForcastGet when this Endpoint is called  */
router.get('/',ForcastGet);
module.exports = router;