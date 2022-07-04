const { Schema, model } = require('mongoose');
//Clase Ciudad de la BD
// La misma guarda la informacion que debe ser devuelta cuando se realice una consulta a la ciudad
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
    ForecastWeather: {
        type: Array,

    }

})
ClimaSchema.methods.toJSON = function () {

    // Extraigo los datos del ID y de la Version de la respuesta obtenida de la BD
    let { _id, City, Latitud, Longitud, main, description, temperatura, visibility, wind, clouds } = this.toObject();

    //Desestructuracion de algunos objetos para que se vea igual la informacion obtenida por OpenWeather y lo que se encuentra en mi DB
    const { temp, feels_like, temp_min, temp_max, pressure, humidity } = temperatura[0];
    temperatura = { temp, feels_like, temp_min, temp_max, pressure, humidity };
    const { speed, deg } = wind[0];
    wind = { speed, deg };
    const { all } = clouds[0];
    clouds = { all };

    const clima = { City, Latitud, Longitud, main, description, temperatura, visibility, wind, clouds };
    return clima;
}
module.exports = model('Climas', ClimaSchema);