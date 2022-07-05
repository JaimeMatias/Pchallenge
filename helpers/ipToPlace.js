
const Busqueda = require('../Busqueda/busqueda');
const Ciudad = require('../models/city');
const Clima = require('../models/clima');

const IpToPlace = async (busqueda = Busqueda, ciudad = Ciudad) => {
    // Metodo que permite, a partir de una IP, obtener los datos de la ciudad
 
    const { status, city } = await ciudad.BuscarCiudadIP(busqueda.Ip);
    if (status == 'Encontrada') {
        console.log('Ciudad encontrada en la BD')
        busqueda.data = city;
    } else {
        console.log('Ciudad No encontrada en la BD')
        // Como es una IP que no tengo guardada, la almaceno
        try {

            await busqueda.ObtenerIpLocation();
        } catch (error) {
            console.log(error)
            throw new Error(error);
        };

        ciudad.CargarCiudad(busqueda.data);
    };


};

module.exports = { IpToPlace };