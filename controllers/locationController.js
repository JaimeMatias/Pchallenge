const { response } = require('express');
const Busqueda = require('../Busqueda/busqueda');
const Ciudad = require('../models/city');
const { IpToPlace } = require('../helpers/ipToPlace');

/**
 * Generate a message when the End Point is the Location,  Returns the location data of the city according to ip-api
 * @async
 * @function LocationGet
 * @param req - The Request to the Server
 * @param res - The Response from the Server
 */
const LocationGet = async (req, res = response) => {
    const buscar = new Busqueda(req);
    const ciudad = new Ciudad();
   
    try {
        await IpToPlace(buscar, ciudad);
    } catch (error) {
         res.status(400).json({msg:'We are having problems, please try again later'})
         return
    };
    res.status(200).json(buscar.data);


};
module.exports = { LocationGet };
