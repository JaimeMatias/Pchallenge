const { response } = require('express');
const Busqueda = require('../Busqueda/busqueda');

const currentGet = async (req, res = response) => {
    const buscar = new Busqueda();
    try {

        const resIP = await buscar.ConvertirIpLocation(req);
        res.json(resIP);
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            msg: 'Problema en la solicitud'
        });
    };



    // console.log(resIP)
}
module.exports = { currentGet }