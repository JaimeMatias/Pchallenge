const express = require('express');
const { currentGet } = require('../controllers/currentController');
const router = express.Router();
router.get('/',currentGet )
router.get('/:id',currentGet )
module.exports = router;