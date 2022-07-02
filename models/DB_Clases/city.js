const {Schema,model}=require('mongoose');
const CitySchema =Schema({
    IpSolicitud:{
        type:String,
        required:[true,'La IP es obligatorio']
    },
    City:{
        type:String,
        required:[true,'La Ciudad es obligatorio']
    },
    Latitud:{
        type:Number,
        required:[true,'La Latitud es obligatorio']
    },
    Longitud:{
        type:Number,
        required:[true,'La Longitud es obligatorio']
    },
})

module.exports = model('Ciudad', CitySchema);