const express = require('express');
const { CurrentGet } = require('../controllers/currentController');
const router = express.Router();
router.get('/',CurrentGet )
router.get('/:id',CurrentGet )
module.exports = router;