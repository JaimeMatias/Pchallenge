const express = require('express');
const router = express.Router();
//Generara  ENDPOINT no valido , cuando llegue cualquier peticion que no sea un Get, o cuya ruta no es de las definidas
router.all('/*', (req,res) => {
    console.log('Mal Funciona');
    res.status(400).json(`El endpoint al que quieres acceder no es uno valido`);
})



module.exports = router;