const { Schema, model } = require('mongoose');

/**
 * Schema of a City, I will save the information so that it can be acceded easily later
 */
const CitySchema = Schema({
    IpSolicitud: {
        type: String,
    },
    City: {
        type: String,
        required: [true, 'The city is mandatory']
    },
    Latitud: {
        type: Number,
        required: [true, 'The Latitud is mandatory']
    },
    Longitud: {
        type: Number,
        required: [true, 'The Longitud is mandatory']
    },

});

CitySchema.methods.toJSON= function(){
    const {_id,__v,estado,...resto}=this.toObject(); //Extract the ID and Version so they do not appear in the response
    const uid=_id;
    const city={...resto};
    return city;
};
module.exports = model('cityDB', CitySchema);