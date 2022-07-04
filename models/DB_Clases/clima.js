const { Schema, model } = require('mongoose');
const ClimaSchema = Schema({
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
    temperatura: {
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
    ForecastWeather:{
        type: Array,

    }

})
ClimaSchema.methods.toJSON = function () {
    let { _id, City, Latitud, Longitud, main, description, temperatura, visibility, wind, clouds,ForecastWeather} = this.toObject(); // Extraigo los datos del ID y de la Version de la respuesta obtenida de la BD
    const uid = _id;
    const { temp, feels_like, temp_min, temp_max, pressure, humidity } = temperatura[0];
    temperatura={ temp, feels_like, temp_min, temp_max, pressure, humidity };
    const {speed,deg}= wind[0];
    wind={speed,deg};
    const {all}= clouds[0];
    clouds={all};
    const clima = { City, Latitud, Longitud, main, description, temperatura, visibility, wind, clouds };
    return clima;
}
module.exports = model('Climas', ClimaSchema);