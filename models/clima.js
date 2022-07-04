const Climas = require("./DB_Clases/clima");

class Clima {
    // Clase encargada de todas las interacciones con la DB de la clase clima

    constructor(City) {
        this.mockWeather = 'cloudy';
        this.ciudad = City;
        this.id = '';
        this.cityDB = {};
        this.FechaUltimaActualizacion = Date();


    };

    async CargarNuevoClima(climaActual) {
        const nuevoClima = {
            ...climaActual,
            FechaUltimaActualizacionCurrent: this.FechaUltimaActualizacion,
        };

        const clima = new Climas(nuevoClima);


        this.id = clima._id;
        try {
            await clima.save();
        } catch (error) {
            throw new Error('No se pudo acceder a la base de datos');
        };

        console.log('Clima guardada');
    };


    async BuscarCiudad() {
        try {
            this.cityDB = await Climas.findOne({ City: this.ciudad });
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
        await Climas.findByIdAndUpdate(id, { climaActual, FechaUltimaActualizacionCurrent: this.FechaUltimaActualizacion });
        console.log('Clima Actual Actualizado');
    };


    async ActualizarClimaFuturo(ClimaFuturo) {
        await Climas.findByIdAndUpdate(this.id, { ForecastWeather: ClimaFuturo, FechaUltimaActualizacionForecast: this.FechaUltimaActualizacion });
        console.log('Clima Futuro Actualizado');
    };
};





module.exports = Clima;