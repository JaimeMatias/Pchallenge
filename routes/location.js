
const express = require('express');
const { LocationGet } = require('../controllers/locationController');
const router = express.Router();
/** Generate a call to the Controller LocationGet when this Endpoint is called  */
router.get('/',LocationGet);
module.exports = router;