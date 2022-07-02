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
CitySchema.methods.toJSON= function(){
    const {_id,__v,estado,...resto}=this.toObject(); // Extraigo los datos del ID y de la Version de la respuesta obtenida de la BD
    const uid=_id;
    const ciudad={...resto};
    return ciudad
}
module.exports = model('CiudadS', CitySchema);