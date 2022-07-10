const express = require('express');
const router = express.Router();
/**
 * Generate an Error Message when the API request is not a valid one
 * @param req - The Request to the Server
 * @param res - The Response from the Server
 */
router.all('/*', (req,res) => {
    console.log('Wrong Attempt ');
    res.status(400).json(`The endpoint you want to access is not a valid one`);
})



module.exports = router;