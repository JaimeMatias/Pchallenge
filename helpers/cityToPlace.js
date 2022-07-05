
const Busqueda = require('../Busqueda/busqueda');
const Ciudad = require('../models/city');
const Clima = require('../models/clima');

const CityToPlace = async (cityBuscada, busqueda = Busqueda, ciudad = Ciudad) => {
    // Metodo que permite, a partir de un nombre, obtener los datos de la ciudad
 
    const cityFormat = cityBuscada[0].toUpperCase() + cityBuscada.slice(1).toLowerCase();

    const { status, city } = await ciudad.BuscarCiudadName(cityFormat);
    if (status == 'Encontrada') {
        const { City, Latitud, Longitud } = city
        busqueda.data = { City, Latitud, Longitud };
    } else {
        console.log('Se busca la ciudad');
        try {
            await busqueda.ObtenerCoordenadasCiudad(cityFormat);
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
       
        await ciudad.CargarCiudad(busqueda.data)
    };

}
module.exports = { CityToPlace };