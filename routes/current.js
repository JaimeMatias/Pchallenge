const express = require('express');
const { CurrentGet } = require('../controllers/currentController'); 
const router = express.Router(); 

/** Generate a call to the Controller CurrentGet when this Endpoint is called  */
router.get('/',CurrentGet );
module.exports = router;