
const Search = require('../Search/search');
const WeatherModel = require('../models/WeatherModel');

const GetWeather = async (busqueda = Search, clima = WeatherModel, type = 0) => {
    // Metodo que permite, a partir de una IP, obtener el clima de una ciudad
    // type 0 es para el Endpoint Current
    // Type 1 es para el Endpoit Forecast
    try {
        const { statusClima, cityDB } = await clima.SearchWeather();
        console.log(statusClima)
        if (statusClima == 'FoundDB') {
            const { DateLastupdateCurrent, DateLastupdateForecast, _id } = cityDB;
            const fechaActual = new Date();


            if (type == 0) {
                let diferenciaTiempo = (fechaActual - DateLastupdateCurrent) / (1000 * 60); // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días
                if (diferenciaTiempo > 15) {
                    console.log('Requiere realizar nueva consulta Current');
                    await busqueda.ObtenerClimaActual();
                    await clima.UpdateWeather(busqueda.dataClimaActual, _id);
                } else {
                    console.log('Debo mostrar el clima Current sin cambiar');
                    busqueda.dataClimaActual = cityDB;
                }
            } else {
                // (FechaUltimaActualizacionForecast==undefined)?FechaUltimaActualizacionForecast=0:None;
                let diferenciaTiempo = (fechaActual - DateLastupdateForecast) / (1000 * 60); // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días
                if (DateLastupdateForecast == undefined) {
                    diferenciaTiempo = 10000
                }
                if (diferenciaTiempo > 60) {
                    console.log('Requiere realizar nueva consulta Forecast');

                    await busqueda.ObtenerClimaFuturo();

                    await clima.UpdateWeather(busqueda.dataClimaFuturo);
                } else {
                    console.log('Debo mostrar el clima Forecast sin cambiar');
                    busqueda.dataClimaFuturo = cityDB.ForecastWeather;
                };
            };


        } else {
            console.log('Ciudad No encontrada');

            await busqueda.ObtenerClimaActual();

            clima.SaveWeather(busqueda.dataClimaActual);
            if (type == 1) {

                await busqueda.ObtenerClimaFuturo();

                await clima.UpdateWeather(busqueda.dataClimaFuturo);
            };
        };
        // busqueda.ObtenerClimaActual()
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }

}

module.exports = { GetWeather }; 