const { response } = require('express');
const Busqueda = require('../Busqueda/busqueda');

const CurrentGet = async (req, res = response) => {
    const buscar = new Busqueda();
    try {

        const resIP = await buscar.ObtenerIpLocation(req);
        res.json(resIP);
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            msg: 'Problema en la solicitud'
        });
    };



    // console.log(resIP)
}
module.exports = { CurrentGet }