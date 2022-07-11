const weatherDB = require("./DB_Clases/Weather");
/**Class in charge of all interactions with the DB of the weather class
 * 
 */
class WeatherModel {

/**
 * @constructor
 * @param City - Name of the city we want to know the weather
 */
    constructor(City) {
        this.ciudad = City; 
        this.id = '';
        this.cityDB = {};
        this.DateLastupdateForecast = Date();


    };
/**
 * Save the Weather in the DB
 * @async
 * @function SaveWeather
 * @param currentWeather - The object that has all the information of the current Weather
 */
    async SaveWeather(currentWeather) {
      
        const newWeather = {
            ...currentWeather,
            DateLastupdateCurrent: this.DateLastupdateForecast,
        };

        const weather = new weatherDB(newWeather);


        this.id = weather._id;
        try {
            await weather.save();
        } catch (error) {
            throw new Error('Database could not be accessed');
        };

        console.log('Weather added to the DB');
    };

/**
 * Search for the Weather of a City in the DB
 * @async
 * @function SearchWeather
 */
    async SearchWeather() {
        try {
            this.cityDB = await weatherDB.findOne({ City: this.ciudad });
        } catch (error) {
            throw new Error('Could not create object in database');
        };

        if (!this.cityDB) {
            return { statusWeather: 'No FoundDB', city: null };
        };
        this.id = this.cityDB._id;
        return { statusWeather: 'FoundDB', cityDB: this.cityDB };
    }

/**
 * Update  the Weather of a City in the DB
 * @async
 * @function UpdateWeather
 * @param weather - The information to be saved in the DB
 * @param id - The ID of the Entity to Update
 */
    async UpdateWeather(weather, id = '') {
        if (id == '') {
            await weatherDB.findByIdAndUpdate(this.id, { ForecastWeather: weather, DateLastupdateForecast: this.DateLastupdateForecast });
            console.log('Forecast Weather Updated');
        } else {
            await weatherDB.findByIdAndUpdate(id, { weather, DateLastupdateCurrent: this.DateLastupdateForecast });
            console.log('Current Weather Updated');
        }

    };
};

module.exports = WeatherModel;