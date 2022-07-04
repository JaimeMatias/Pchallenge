
const Busqueda = require('../Busqueda/busqueda');
const Ciudad = require('../models/city');
const Clima = require('../models/clima');

const CityToPlace = async (cityBuscada, busqueda = Busqueda, ciudad = Ciudad) => {
    //0 es current, 1 es Forecast
    const cityFormat = cityBuscada[0].toUpperCase() + cityBuscada.slice(1).toLowerCase();

    const { status, city } = await ciudad.BuscarCiudadName(cityFormat);
    if (status == 'Encontrada') {
        const { City, Latitud, Longitud } = city
        busqueda.data = { City, Latitud, Longitud };
    } else {
        console.log('Se busca la ciudad');
        await busqueda.ObtenerCoordenadasCiudad(cityFormat);
        await ciudad.CargarCiudad(busqueda.data)
    };

    console.log(busqueda.data);



}
module.exports = { CityToPlace };