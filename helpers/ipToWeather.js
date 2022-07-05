
const Busqueda = require('../Busqueda/busqueda');
const Clima = require('../models/clima');

const IpToWeather = async (busqueda = Busqueda, clima = Clima, type = 0) => {
    // Metodo que permite, a partir de una IP, obtener el clima de una ciudad
    // type 0 es para el Endpoint Current
    // Type 1 es para el Endpoit Forecast

    const { statusClima, cityDB } = await clima.BuscarCiudadDB();

    if (statusClima == 'Encontrada') {
        const { FechaUltimaActualizacionCurrent, FechaUltimaActualizacionForecast, _id } = cityDB;
        const fechaActual = new Date();


        if (type == 0) {
            let diferenciaTiempo = (fechaActual - FechaUltimaActualizacionCurrent) / (1000 * 60); // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días
            if (diferenciaTiempo > 15) {
                console.log('Requiere realizar nueva consulta Current');
                try {
                    await busqueda.ObtenerClimaActual();
                } catch (error) {
                    console.log(error)
                    throw new Error(error);
                }

                await clima.ActualizarClimaActual(busqueda.dataClimaActual, _id);
            } else {
                console.log('Debo mostrar el clima Current sin cambiar');
                busqueda.dataClimaActual = cityDB;
            }
        } else {
            // (FechaUltimaActualizacionForecast==undefined)?FechaUltimaActualizacionForecast=0:None;
            let diferenciaTiempo = (fechaActual - FechaUltimaActualizacionForecast) / (1000 * 60); // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días
            if (FechaUltimaActualizacionForecast==undefined){
                diferenciaTiempo=10000
            }
            console.log(diferenciaTiempo)
            if (diferenciaTiempo > 60) {
                console.log('Requiere realizar nueva consulta Forecast');
                try {
                    await busqueda.ObtenerClimaFuturo();
                } catch (error) {
                    console.log(error)
                    throw new Error(error);
                }
                await clima.ActualizarClimaFuturo(busqueda.dataClimaFuturo);
            } else {
                console.log(FechaUltimaActualizacionForecast==undefined)
                console.log('Debo mostrar el clima Forecast sin cambiar');
                busqueda.dataClimaFuturo = cityDB.ForecastWeather;
            };
        };


    } else {
        console.log('Ciudad No encontrada');
        try {
            await busqueda.ObtenerClimaActual();
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
        clima.CargarNuevoClima(busqueda.dataClimaActual);
        if (type == 1) {
            try {
                await busqueda.ObtenerClimaFuturo();
            } catch (error) {
                console.log(error)
                throw new Error(error);
            }
            await clima.ActualizarClimaFuturo(busqueda.dataClimaFuturo);
        };
    };
    // busqueda.ObtenerClimaActual()
}

module.exports = { IpToWeather }; 