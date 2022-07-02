const { response } = require('express');
const Busqueda = require('../Busqueda/busqueda');
const Ciudad = require('../models/city');

const LocationGet = async (req, res = response) => {
    const buscar = new Busqueda(req);
    const ciudad = new Ciudad();
    let ipBuscada = '';
    (buscar.Ip == '') ? ipBuscada = '190.57.244.234' : ipBuscada = buscar.Ip;

    const { status, city } = await ciudad.BuscarCiudadIP(ipBuscada)
    if (status == 'Encontrada') {
        res.status(200).json(city)
    }else {
        try {
            await buscar.ObtenerIpLocation();
    
        } catch (error) {
            res.status(400).json({
                status: 'Fail',
                msg: 'Problema en la solicitud'
            });
        };
        ciudad.CargarCiudad(buscar.data)
        res.status(200).json(buscar.data)
    }

}
module.exports = { LocationGet }