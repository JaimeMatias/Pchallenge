const express = require('express');
const { RBaseController } = require('../controllers/rBaseController');
const router = express.Router(); 
router.get('/',RBaseController );
module.exports = router;