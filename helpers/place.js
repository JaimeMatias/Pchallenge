const Busqueda = require('../Busqueda/busqueda');
const Ciudad = require('../models/city');

const getPlace = async (search = Busqueda, cityNew = Ciudad, cityInput = '') => {
    try {
        if (cityInput == '') {
            const { status, city } = await cityNew.SearchCity(search.Ip);
            if (status == 'FoundBD') {
                search.data = city;
            } else {
                console.log('Looking for the city')
                // Como es una IP que no tengo guardada, la almaceno
                await search.ObtenerIpLocation();
                cityNew.CargarCiudad(search.data);
            }

        } else {
            const cityFormat = cityInput[0].toUpperCase() + cityInput.slice(1).toLowerCase();

            const { status, city } = await cityNew.SearchCity('',cityFormat);
            if (status == 'FoundBD') {
                const { City, Latitud, Longitud } = city
                search.data = { City, Latitud, Longitud };
            } else {
                console.log('Looking for the city');
                await search.ObtenerCoordenadasCiudad(cityFormat);
                cityNew.CargarCiudad(search.data)
            };
        }
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
 

};

module.exports = { getPlace };