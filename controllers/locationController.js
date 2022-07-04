const { response } = require('express');
const Busqueda = require('../Busqueda/busqueda');
const Ciudad = require('../models/city');
const { IpToPlace } = require('../helpers/ipToPlace');


const LocationGet = async (req, res = response) => {
    //Metodo del endpoint Location, el cual Devuelve los datos de ubicación city según ip-api.
    const buscar = new Busqueda(req);
    const ciudad = new Ciudad();
   
    try {
        await IpToPlace(buscar, ciudad);
    } catch (error) {
         res.status(400).json({msg:'Estamos teniendo Inconvenientes, Intente mas Tarde'})
         return
    };
    res.status(200).json(buscar.data);


};
module.exports = { LocationGet };
