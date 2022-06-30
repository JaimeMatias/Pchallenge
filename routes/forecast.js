const express = require('express');
const router = express.Router();
router.get('/', (req,res) => {
    console.log('Funciona');
    res.json(`forecast`);
})
module.exports = router;