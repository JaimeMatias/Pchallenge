const weatherDB = require("./DB_Clases/clima");

class Clima {
    // Clase encargada de todas las interacciones con la DB de la clase clima

    constructor(City) {
        this.mockWeather = 'cloudy';
        this.ciudad = City; //El nombre de la Ciudad a buscar
        this.id = '';
        this.cityDB = {};
        this.FechaUltimaActualizacion = Date();


    };

    async CargarNuevoClima(climaActual) {
        //Guardar el clima en la BD
        const nuevoClima = {
            ...climaActual,
            FechaUltimaActualizacionCurrent: this.FechaUltimaActualizacion,
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


    async BuscarCiudadDB() {
        try {
            this.cityDB = await weatherDB.findOne({ City: this.ciudad });
        } catch (error) {
            throw new Error('No se pudo crear el objeto en la base de datos');
        };

        if (!this.cityDB) {

            //     console.log('La ciudad existe en la base de datos')
            //   const city=this.city
            return { statusClima: 'No Encontrada', city: null };
        };
        this.id = this.cityDB._id;
        return { statusClima: 'Encontrada', cityDB: this.cityDB };
    }
    async ActualizarClimaActual(climaActual, id) {
        await weatherDB.findByIdAndUpdate(id, { climaActual, FechaUltimaActualizacionCurrent: this.FechaUltimaActualizacion });
        console.log('Clima Actual Actualizado');
    };


    async ActualizarClimaFuturo(ClimaFuturo) {
        await weatherDB.findByIdAndUpdate(this.id, { ForecastWeather: ClimaFuturo, FechaUltimaActualizacionForecast: this.FechaUltimaActualizacion });
        console.log('Clima Futuro Actualizado');
    };
};





module.exports = Clima;