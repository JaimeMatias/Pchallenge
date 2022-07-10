const cityDB = require("./DB_Clases/city");

class CityModel {
    // Clase encargada de todas las interacciones con la DB de la clase clima

    constructor() {
        this.city = {};
    };

    async SaveCity(data) {
        //Guardar el clima en la BD
        const city = new cityDB(data);

        await city.save();
        console.log('City add to the DB');
    }

    async SearchCity(ip = '', name = '') {
        try {
            if (ip != '') {
                //Busca en la BD una ciudad por IP
                const IpSolicitud = ip;
                console.log('Search by IP')
                const city = await cityDB.findOne({ IpSolicitud });
                this.city = city;
              
            };
            if (name != '') {
                //Busca en la BD una ciudad por nombre
                const City = name
                console.log('Search by Name')
                const city = await cityDB.findOne({ City });
                this.city = city;

            };
        } catch (error) {
            throw new Error('Database could not be accessed');
        }
        if (!this.city) {

            //     console.log('La ciudad existe en la base de datos')
            //   const city=this.city
            return { status: 'Not FoundBD', city: null };
        }

        return { status: 'FoundBD', city: this.city };

    }
};

module.exports = CityModel;