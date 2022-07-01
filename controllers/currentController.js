const { response } = require('express');
const currentGet = (req, res= response) => {
    const {id:ciudad} = req.params
    console.log(' Funciona');
    console.log(ciudad)
    res.json(`current ${ciudad}`);
}
module.exports={currentGet}