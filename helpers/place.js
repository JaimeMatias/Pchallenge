const Search = require('../Search/search');
const CityModel = require('../models/cityModel');

const GetPlace = async (search = Search, cityNew = CityModel, cityInput = '') => {
    try {
        if (cityInput == '') {
            const { status, city } = await cityNew.SearchCity(search.Ip);
            if (status == 'FoundBD') {
                search.data = city;
            } else {
                console.log('Looking for the city')
                // Como es una IP que no tengo guardada, la almaceno
                await search.GetLocation();
                console.log(search.data)
                cityNew.SaveCity(search.data);
            }

        } else {
            const cityFormat = cityInput[0].toUpperCase() + cityInput.slice(1).toLowerCase();

            const { status, city } = await cityNew.SearchCity('',cityFormat);
            if (status == 'FoundBD') {
                const { City, Latitud, Longitud } = city
                search.data = { City, Latitud, Longitud };
            } else {
                console.log('Looking for the city');
                await search.GetCoordinates(cityFormat);
                cityNew.SaveCity(search.data)
            };
        }
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
 

};

module.exports = { GetPlace };