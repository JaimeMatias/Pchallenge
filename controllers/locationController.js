const { response } = require('express');
const Busqueda = require('../Busqueda/busqueda');
const Ciudad = require('../models/city');
const { getPlace } = require('../helpers/place');

/**
 * Generate a message when the End Point is the Location,  Returns the location data of the city according to ip-api
 * @async
 * @function LocationGet
 * @param req - The Request to the Server
 * @param res - The Response from the Server
 */
const LocationGet = async (req, res = response) => {
    const search = new Busqueda(req);
    const city = new Ciudad();
   
    try {
        await getPlace(search, city);
    } catch (error) {
         res.status(400).json({msg:'We are having problems, please try again later'})
         return
    };
    res.status(200).json(search.data);


};
module.exports = { LocationGet };
