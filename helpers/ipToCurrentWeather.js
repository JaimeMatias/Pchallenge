
const Busqueda = require('../Busqueda/busqueda');
const Clima = require('../models/clima');

const IpToWeather = async (busqueda = Busqueda, clima = Clima, type = 0) => {

    const { statusClima, cityDB } = await clima.BuscarCiudad()
    if (statusClima == 'Encontrada') {
        const { FechaUltimaActualizacion, _id } = cityDB
        const fechaActual = new Date()

        const diferenciaTiempo = (fechaActual - FechaUltimaActualizacion) / (1000 * 60) // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días
        if (diferenciaTiempo > 15) {

            console.log('Requiere realizar nueva consulta');
            if (type == 0) {
                await busqueda.ObtenerClimaActual()
                console.log(_id)
                clima.ActualizarClimaActual(busqueda.dataClimaActual,_id)
            } else {

            }
        } else {
            console.log('Debo mostrar el clima sin cambiar')
            if (type == 0) {
                busqueda.dataClimaActual = cityDB
            } else {

            }
        }
        // console.log(cityDB)

    } else {
        console.log('Ciudad No encontrada')
        if (type == 0) {
            await busqueda.ObtenerClimaActual()
            clima.CargarNuevoClima(busqueda.dataClimaActual)
        } else {
            await busqueda.ObtenerClimaFuturo()
        }
    }
    // busqueda.ObtenerClimaActual()
}

module.exports = { IpToWeather }