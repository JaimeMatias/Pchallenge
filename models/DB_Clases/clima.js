const { Schema, model } = require('mongoose');
/**
 * Schema of the Weather, I will save the information so that it can be acceded easily later
 */
const WeatherSchema = Schema({
    City: {
        type: String,

    },
    Latitud: {
        type: Number,
    },
    Longitud: {
        type: Number,

    },
    main: {
        type: String,
    },
    description: {
        type: String,
    },
    temperature: {
        type: Array,
    },
    visibility: {
        type: Number,

    },
    wind: {
        type: Array,
    },
    clouds: {
        type: Array,
    },
    FechaUltimaActualizacionCurrent: {
        type: Date,
    },
    FechaUltimaActualizacionForecast: {
        type: Date,
    },
    ForecastWeather: {
        type: Array,

    }

})
WeatherSchema.methods.toJSON = function () {

    let { _id, City, Latitud, Longitud, main, description, temperature, visibility, wind, clouds } = this.toObject();

    //Destructuring of some objects so that the information obtained by OpenWeather and what is in the DB look the same
    const { temp, feels_like, temp_min, temp_max, pressure, humidity } = temperature[0];
    temperature = { temp, feels_like, temp_min, temp_max, pressure, humidity };
    const { speed, deg } = wind[0];
    wind = { speed, deg };
    const { all } = clouds[0];
    clouds = { all };

    const weather = { City, Latitud, Longitud, main, description, temperature, visibility, wind, clouds };
    return weather;
}
module.exports = model('weatherDB', WeatherSchema);