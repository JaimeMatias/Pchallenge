const { response } = require('express');
const Busqueda = require('../Busqueda/busqueda');

const locationGet = async (req, res = response) => {
    const buscar = new Busqueda();
    try {


        const resIP = await buscar.ConvertirIpLocation();
        console.log(resIP)
        res.json(resIP);
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            msg: 'Problema en la solicitud'
        });
    };


}
module.exports = { locationGet }