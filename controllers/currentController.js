const { response } = require('express');
const Busqueda = require('../Busqueda/busqueda');
const { CityToPlace } = require('../helpers/cityToPlace');
const { IpToWeather } = require('../helpers/ipToCurrentWeather');
const { IpToPlace } = require('../helpers/ipToPlace');
const Ciudad = require('../models/city');
const Clima = require('../models/clima');

const { EndPointNoValido } = require('./notValidController');

const CurrentGet = async (req, res = response) => {

    const { city } = req.query;

    console.log(city == undefined);
    const buscar = new Busqueda(req);
    const ciudad = new Ciudad();
    if (city != undefined) {
        console.log('Ingresa ');
       await  CityToPlace(city,buscar,ciudad,0);
       console.log('Sale ');
        res.json(buscar.data);
    } else {
        const { id } = req.params;

     
        try {
            await IpToPlace(buscar, ciudad, 0);
        } catch (error) {
            // res.status(400).json({msg:'PROBLEMAS GRAVES'})
        };

        switch (city) {
            case 'city':
                res.json(buscar.data);
                break;
            case undefined:
                const clima = new Clima(buscar.data.City);
                await IpToWeather(buscar, clima, 0);

                res.json(buscar.dataClimaActual);
                // res.json(buscar.dataClimaActual);
                break
            default:
                // await EndPointNoValido(req, res);
                res.json(buscar.data);
        };
    };


};
module.exports = { CurrentGet };