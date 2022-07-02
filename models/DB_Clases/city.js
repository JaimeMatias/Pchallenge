const { Schema, model } = require('mongoose');
const CitySchema = Schema({
    IpSolicitud: {
        type: String,
        required: [true, 'La IP es obligatoria']
    },
    City: {
        type: String,
        required: [true, 'La Ciudad es obligatoria']
    },
    Latitud: {
        type: Number,
        required: [true, 'La Latitud es obligatoria']
    },
    Longitud: {
        type: Number,
        required: [true, 'La Longitud es obligatoria']
    },

})

module.exports = model('CiudadS', CitySchema);