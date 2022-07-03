const Climas = require("./DB_Clases/clima");

class Clima {
    constructor(data) {
        this.mockWeather = 'cloudy'
        this.ciudad = data
        this.cityDB = {}
    }

    async CargarNuevaCiudad() {
        const { City, IpSolicitud, Latitud, Longitud } = this.ciudad
        const FechaUltimaActualizacion = Date()

        const clima = new Climas({ City, IpSolicitud, Latitud, Longitud, FechaUltimaActualizacion })

        await clima.save();
        console.log('Clima guardada')
    }

    async BuscarCiudad() {

        const { City } = this.ciudad
        try {
            this.cityDB = await Climas.findOne({ City })
        } catch (error) {
            throw new Error('No se pudo acceder a la base de datos')
        }

        if (!this.cityDB) {

            //     console.log('La ciudad existe en la base de datos')
            //   const city=this.city
            return { statusClima: 'No Encontrada', city: null }
        }
        return { statusClima: 'Encontrada', cityDB: this.cityDB }
    }

}

module.exports = Clima;