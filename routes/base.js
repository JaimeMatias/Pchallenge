const express = require('express');
const { RBaseController } = require('../controllers/rBaseController');
const router = express.Router(); 
/** Generate a call to the Controller RBaseController when this Endpoint is called  */
router.get('/',RBaseController );
module.exports = router;