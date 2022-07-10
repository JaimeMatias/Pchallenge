const weatherDB = require("./DB_Clases/Weather");

class WeatherModel {
    // Clase encargada de todas las interacciones con la DB de la clase clima

    constructor(City) {
        this.mockWeather = 'cloudy';
        this.ciudad = City; //El nombre de la Ciudad a buscar
        this.id = '';
        this.cityDB = {};
        this.DateLastupdateForecast = Date();


    };

    async SaveWeather(climaActual) {
        //Guardar el clima en la BD
        const nuevoClima = {
            ...climaActual,
            DateLastupdateCurrent: this.DateLastupdateForecast,
        };

        const clima = new weatherDB(nuevoClima);


        this.id = clima._id;
        try {
            await clima.save();
        } catch (error) {
            throw new Error('No se pudo acceder a la base de datos');
        };

        console.log('Clima guardada');
    };


    async SearchWeather() {
        try {
            this.cityDB = await weatherDB.findOne({ City: this.ciudad });
        } catch (error) {
            throw new Error('No se pudo crear el objeto en la base de datos');
        };

        if (!this.cityDB) {

            //     console.log('La ciudad existe en la base de datos')
            //   const city=this.city
            return { statusClima: 'No FoundDB', city: null };
        };
        this.id = this.cityDB._id;
        return { statusClima: 'FoundDB', cityDB: this.cityDB };
    }
    
    async UpdateWeather(Clima,id=''){
        if(id==''){
            await weatherDB.findByIdAndUpdate(this.id, { ForecastWeather: Clima, DateLastupdateForecast: this.DateLastupdateForecast });
        console.log('Clima Futuro Actualizado');
        }else{
            await weatherDB.findByIdAndUpdate(id, { Clima, DateLastupdateCurrent: this.DateLastupdateForecast });
            console.log('Clima Actual Actualizado');
        }

    };
};





module.exports = WeatherModel;