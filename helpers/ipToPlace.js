
const Busqueda = require('../Busqueda/busqueda');
const Ciudad = require('../models/city');
const Clima = require('../models/clima');

const IpToPlace = async (busqueda = Busqueda, ciudad = Ciudad) => {
    // Meotodo que me permite, a partir de una IP, obtener los datos de la ciudad
 
    const { status, city } = await ciudad.BuscarCiudadIP(busqueda.Ip);
    if (status == 'Encontrada') {
        busqueda.data = city;
    } else {
        // Como es una IP que no tengo guardada, la almacen
        console.log('intenta obtener la ip')
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