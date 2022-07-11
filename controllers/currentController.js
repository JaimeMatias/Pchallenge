const { response } = require('express');
const Search = require('../Search/search');
const CityModel = require('../models/cityModel');
const WeatherModel = require('../models/WeatherModel');
const { GetPlace } = require('../helpers/place');
const { GetWeather } = require('../helpers/weather');

/**
 * Generate a message when the End Point is the Current
 *   Returns the location data of the city according or current location based on ip-api and current weather
 * @async
 * @function CurrentGet
 * @param req - The Request to the Server
 * @param res - The Response from the Server
 */
const CurrentGet = async (req, res = response) => {
    const { city } = req.query;
    const search = new Search(req);
    const cityC = new CityModel();
    try {
        if (city != undefined) { // They entered the parameter City
            //Returns the city location data
            await GetPlace(search, cityC, city);
            res.json(search.data);
        } else {
            //Returns the current location based on ip-api and current weather status
            await GetPlace(search, cityC);
            const weather = new WeatherModel(search.data.City);
            await GetWeather(search, weather, 0);
            res.json(search.CurrentWeather);
        };
    } catch (error) {
        res.status(400).json({ msg: 'Estamos teniendo Inconvenientes, Intente mas Tarde' })
        return
    }



};
module.exports = { CurrentGet };