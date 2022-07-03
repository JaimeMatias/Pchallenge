const { Schema, model } = require('mongoose');
const ClimaSchema = Schema({
    City: {
        type: String,

    },
    IpSolicitud:
        [{
            type: String,

        }]
    ,

    Latitud: {
        type: Number,

    },
    Longitud: {
        type: Number,

    },
    FechaUltimaActualizacion: {
        type: Date,

    }

})
ClimaSchema.methods.toJSON = function () {
    const { _id, __v, estado, ...resto } = this.toObject(); // Extraigo los datos del ID y de la Version de la respuesta obtenida de la BD
    const uid = _id;
    const clima = { ...resto };
    return clima
}
module.exports = model('Climas', ClimaSchema);