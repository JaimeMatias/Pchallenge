const express = require('express');
const router = express.Router();
router.get('/*', (req,res) => {
    console.log('Funciona');
    res.status(400).json(`404 Resource Not Found`);
})

module.exports = router;