
const Busqueda = require('../Busqueda/busqueda');
const Ciudad = require('../models/city');
const Clima = require('../models/clima');

const IpToPlace = async (busqueda = Busqueda, ciudad = Ciudad) => {

    let ipBuscada = '';
    (busqueda.Ip == '') ? ipBuscada = '190.57.244.234' : ipBuscada = busqueda.Ip;
    const { status, city } = await ciudad.BuscarCiudadIP(ipBuscada);
    if (status == 'Encontrada') {
        busqueda.data = city;
    } else {
        // Como es una IP que no tengo guardada, la almacen
        try {

            await busqueda.ObtenerIpLocation();
        } catch (error) {
            throw new Error(error);
        };

        ciudad.CargarCiudad(busqueda.data);
    };


};

module.exports = { IpToPlace };