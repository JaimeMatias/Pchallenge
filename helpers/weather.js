
const Search = require('../Search/search');
const WeatherModel = require('../models/WeatherModel');
/** Helper use to obtain the Weather of a City
 * @function GetWeather
 * @param  search - Class Search
 * @param  weather -Class Weather
 * @param  type -0 is for the Endpoint Current, 1 is for Forecast
 */
const GetWeather = async (search = Search, weather = WeatherModel, type = 0) => {
    try {
        const { statusWeather, cityDB } = await weather.SearchWeather();
        if (statusWeather == 'FoundDB') {
            const { DateLastupdateCurrent, DateLastupdateForecast, _id } = cityDB;
            const ActualDate = new Date();


            if (type == 0) {
                let TimeGap = (ActualDate - DateLastupdateCurrent) / (1000 * 60); // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días
                if (TimeGap > 15) {
                    console.log('Requires a new CURRENT query');
                    await search.GetCurrentWeather();
                    await weather.UpdateWeather(search.CurrentWeather, _id);
                } else {
                    console.log('show the Current weather without changing');
                    search.CurrentWeather = cityDB;
                }
            } else {
                let TimeGap = (ActualDate - DateLastupdateForecast) / (1000 * 60); // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días
                if (DateLastupdateForecast == undefined) {
                    TimeGap = 10000
                }
                if (TimeGap > 60) {
                    console.log('Requires a new FORECAST query');

                    await search.GetForecastWeather();

                    await weather.UpdateWeather(search.ForecastWeather);
                } else {
                    console.log('show the FORECAST weather without changing');
                    search.ForecastWeather = cityDB.ForecastWeather;
                };
            };


        } else {
            console.log('City Not Found');

            await search.GetCurrentWeather();

            weather.SaveWeather(search.CurrentWeather);
            if (type == 1) {

                await search.GetForecastWeather();

                await weather.UpdateWeather(search.ForecastWeather);
            };
        };

    } catch (error) {
        console.log(error)
        throw new Error(error);
    }

}

module.exports = { GetWeather }; 