const { response } = require('express');
const Busqueda = require('../Busqueda/busqueda');
const { IpToPlace } = require('../helpers/ipToPlace');
const Ciudad = require('../models/city');
const { LocationGet } = require('./locationController');
const { EndPointNoValido } = require('./notValidController');

const CurrentGet = async (req, res = response) => {
    const { id } = req.params
    const buscar = new Busqueda(req);
    const ciudad = new Ciudad();
    try {
        await IpToPlace(buscar, ciudad)
    } catch (error) {
        // res.status(400).json({msg:'PROBLEMAS GRAVES'})
    }

    switch (id) {
        case 'city':
            res.json(buscar.data);
            break;
        case undefined:
            res.json(buscar.data);
            break
        default:
            await EndPointNoValido(req, res);
    }

}
module.exports = { CurrentGet }