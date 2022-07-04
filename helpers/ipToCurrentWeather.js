
const Busqueda = require('../Busqueda/busqueda');
const Clima = require('../models/clima');

const IpToWeather = async (busqueda = Busqueda, clima = Clima, type = 0) => {

    const { statusClima, cityDB } = await clima.BuscarCiudad();
    if (statusClima == 'Encontrada') {
        const { FechaUltimaActualizacionCurrent,FechaUltimaActualizacionForecast, _id } = cityDB;
        const fechaActual = new Date();

       
        if (type == 0) {
            let  diferenciaTiempo = (fechaActual - FechaUltimaActualizacionCurrent) / (1000 * 60); // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días
            if (diferenciaTiempo > 15) {
                console.log('Requiere realizar nueva consulta Current');
                await busqueda.ObtenerClimaActual();
                await clima.ActualizarClimaActual(busqueda.dataClimaActual, _id);
            } else {
                console.log('Debo mostrar el clima sin cambiar');
                busqueda.dataClimaActual = cityDB;
            }
        } else {
            let  diferenciaTiempo = (fechaActual - FechaUltimaActualizacionForecast) / (1000 * 60); // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días
            if (diferenciaTiempo > 60) {
                console.log('Requiere realizar nueva consulta Forecast');
                await busqueda.ObtenerClimaFuturo();
                await clima.ActualizarClimaFuturo(busqueda.dataClimaFuturo);
            } else {
                console.log('Debo mostrar el clima sin cambiar');
                busqueda.dataClimaFuturo = cityDB.ForecastWeather;
            };
        };


    } else {
        console.log('Ciudad No encontrada');
        await busqueda.ObtenerClimaActual();
        clima.CargarNuevoClima(busqueda.dataClimaActual);
        if (type == 1) {
            await busqueda.ObtenerClimaFuturo();
            await clima.ActualizarClimaFuturo(busqueda.dataClimaFuturo);
        };
    };
    // busqueda.ObtenerClimaActual()
}

module.exports = { IpToWeather }; 