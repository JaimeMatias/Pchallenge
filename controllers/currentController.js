const { response } = require('express');
const Busqueda = require('../Busqueda/busqueda');
const { CityToPlace } = require('../helpers/cityToPlace');
const { IpToWeather } = require('../helpers/ipToWeather');
const { IpToPlace } = require('../helpers/ipToPlace');
const Ciudad = require('../models/city');
const Clima = require('../models/clima');
const { getPlace } = require('../helpers/place');


const CurrentGet = async (req, res = response) => {
    //Metodo del endpoint Current,
    //Devuelve los datos de ubicación city o la ubicación actual según ip-api y el estado del tiempo actual.

    const { city } = req.query;

    const buscar = new Busqueda(req);
    const ciudad = new Ciudad();

    if (city != undefined) { //Ingresaron el parametro City
        //Devuelve los datos de ubicación city
        try {
            await CityToPlace(city, buscar, ciudad);
        } catch (error) {
            res.status(400).json({ msg: 'Estamos teniendo Inconvenientes, Intente mas Tarde' })
            return
        };
       

        res.json(buscar.data);
    } else {
        //Devuelve la ubicación actual según ip-api y el estado del tiempo actual
        try {
            await getPlace(buscar, ciudad);
        } catch (error) {
            res.status(400).json({ msg: 'Estamos teniendo Inconvenientes, Intente mas Tarde' })
            return
        };

        const clima = new Clima(buscar.data.City);
        try {
            await IpToWeather(buscar, clima, 0);
        } catch (error) {
            res.status(400).json({ msg: 'Estamos teniendo Inconvenientes, Intente mas Tarde' })
            return
        }


        res.json(buscar.dataClimaActual);


    };


};
module.exports = { CurrentGet };