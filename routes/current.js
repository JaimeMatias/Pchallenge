const express = require('express');
const { CurrentGet } = require('../controllers/currentController'); //Metodo a llamar en el Endpoint definido mas abajo
const router = express.Router(); 
router.get('/',CurrentGet );
module.exports = router;