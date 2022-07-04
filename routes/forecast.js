const express = require('express');
const { ForcastGet } = require('../controllers/forecastController');
const router = express.Router();
router.get('/',ForcastGet)
module.exports = router;