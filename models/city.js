const CiudadS = require("./DB_Clases/city");

class Ciudad {
        // Clase encargada de todas las interacciones con la DB de la clase clima

    constructor() {
        this.city={};
    };

    async CargarCiudad(data) {
        //Guardar el clima en la BD
        const city = new CiudadS(data);

        await city.save();
        console.log('ciudad guardada');
    }

    async BuscarCiudadIP(ip){
        //Busca en la BD una ciudad por IP
        const IpSolicitud=ip;
        try {
            const city = await CiudadS.findOne({IpSolicitud});
            this.city=city;
        } catch (error) {
            throw new Error ('No se pudo acceder a la base de datos');
        }

         if(!this.city){

        //     console.log('La ciudad existe en la base de datos')
        //   const city=this.city
           return {status:'No Encontrada',city:null};
        }
        return {status:'Encontrada',city:this.city};
    }

    async BuscarCiudadName(name){
        //Busca en la BD una ciudad por nombre
        const City=name
       
        console.log(`La ciudad con la letra minuscula: ${City}`)
        try {
            const city = await CiudadS.findOne({City});
            this.city=city;
        } catch (error) {
            throw new Error ('No se pudo acceder a la base de datos');
        };

         if(!this.city){

        //     console.log('La ciudad existe en la base de datos')
        //   const city=this.city
           return {status:'No Encontrada',city:null};
        };
        return {status:'Encontrada',city:this.city};
    };
};

module.exports = Ciudad;