const { response } = require('express');
const Busqueda = require('../Busqueda/busqueda');
const { IpToWeather } = require('../helpers/ipToCurrentWeather');
const { IpToPlace } = require('../helpers/ipToPlace');
const Ciudad = require('../models/city');
const Clima = require('../models/clima');

const { EndPointNoValido } = require('./notValidController');

const ForcastGet = async (req, res = response) => {
    console.log(req.query);
    const { id } = req.params;
    const buscar = new Busqueda(req);
    const ciudad = new Ciudad();
    try {
        await IpToPlace(buscar, ciudad);
    } catch (error) {
        // res.status(400).json({msg:'PROBLEMAS GRAVES'})
    };

    switch (id) {
        case 'city':
            res.json(buscar.data);
            break;
        case undefined:
            const clima=new Clima(buscar.data.City);
            await IpToWeather(buscar,clima,1);
            const {City,Longitud,Latitud}=buscar.data;

            const ForecastWeather=buscar.dataClimaFuturo;
            res.json({City,Longitud,Latitud,ForecastWeather});
            break;
        default:
            await EndPointNoValido(req, res);
    }

}
module.exports = { ForcastGet };