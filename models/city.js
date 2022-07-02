const CiudadS = require("./DB_Clases/city");



class Ciudad {
    constructor() {
        this.city={}
    }

    async cargar_ciudad(data) {
        const city = new CiudadS(data)

        await city.save();
        console.log('ciudad guardada')
    }

    async buscarCiudadIP(ip){
        const IpSolicitud=ip
        try {
            const city = await CiudadS.findOne({IpSolicitud})
            this.city=city
        } catch (error) {
            throw new Error ('No se pudo acceder a la base de datos')
        }

         if(!this.city){

        //     console.log('La ciudad existe en la base de datos')
        //   const city=this.city
           return {status:'No Encontrada',city:null}
        }
        return {status:'Encontrada',city:this.city}
    }

}

module.exports = Ciudad;