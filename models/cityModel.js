const cityDB = require("./DB_Clases/city");
/**Class in charge of all interactions with the DB of the City class
 * 
 */
class CityModel {

    /**
     * @constructor
     */
    constructor() {
        this.city = {};
    };

    /**
     * Save the City in the DB
     * @async
     * @function SaveCity
     * @param data - The object that has all the information of the city
     */
    async SaveCity(data) {
        //Guardar el clima en la BD
        const city = new cityDB(data);

        await city.save();
        console.log('City added to the DB');
    }


    /**
 * Search for  City in the DB
 * @async
 * @function SearchCity
 * @param ip - The IP of a Request from which we want to know the City
 * @param name - The name of a place from which we want to know the City
 */
    async SearchCity(ip = '', name = '') {
        try {
            if (ip != '') {
                const IpSolicitud = ip;
                console.log('Search by IP')
                const city = await cityDB.findOne({ IpSolicitud });
                this.city = city;

            };
            if (name != '') {
                const City = name
                console.log('Search by Name')
                const city = await cityDB.findOne({ City });
                this.city = city;

            };
        } catch (error) {
            throw new Error('Database could not be accessed');
        }
        //The city was not found in the DB
        if (!this.city) {
            return { status: 'Not FoundBD', city: null };
        }
        //The city was found in the DB
        return { status: 'FoundBD', city: this.city };

    }
};

module.exports = CityModel;