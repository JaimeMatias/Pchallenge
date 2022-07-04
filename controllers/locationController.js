const { response } = require('express');
const Busqueda = require('../Busqueda/busqueda');
const { IpToPlace } = require('../helpers/ipToPlace');
const Ciudad = require('../models/city');

const LocationGet = async (req, res = response) => {
    const buscar = new Busqueda(req);
    const ciudad = new Ciudad();
   
    try {
        await IpToPlace(buscar, ciudad)
    } catch (error) {
        // res.status(400).json({msg:'PROBLEMAS GRAVES'})
    }
    res.status(200).json(buscar.data)


}
module.exports = { LocationGet }
