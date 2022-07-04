const Climas = require("./DB_Clases/clima");

class Clima {
    constructor(City) {
        this.mockWeather = 'cloudy'
        this.ciudad = City;
        //  this.IpSolicitud = data.IpSolicitud
        //  this.Latitud = data.Latitud
        //  this.Longitud = data.Longitud
        this.cityDB = {}
        this.FechaUltimaActualizacion = Date()


    }

    async CargarNuevoClima(climaActual) {
        const nuevoClima = {
            ...climaActual,
            FechaUltimaActualizacion: this.FechaUltimaActualizacion
        }

        const clima = new Climas(nuevoClima)

        try {
            await clima.save();
        } catch (error) {
            throw new Error('No se pudo acceder a la base de datos')
        }

        console.log('Clima guardada')
    }

    async BuscarCiudad() {
        try {
            this.cityDB = await Climas.findOne({ City: this.ciudad })
        } catch (error) {
            throw new Error('No se pudo crear el objeto en la base de datos')
        }

        if (!this.cityDB) {

            //     console.log('La ciudad existe en la base de datos')
            //   const city=this.city
            return { statusClima: 'No Encontrada', city: null }
        }
        return { statusClima: 'Encontrada', cityDB: this.cityDB }
    }
    async ActualizarClimaActual(climaActual, id) {
        console.log(climaActual)
        await Climas.findByIdAndUpdate(id, { climaActual,FechaUltimaActualizacion:this.FechaUltimaActualizacion })
        console.log('Ciudad Actualizada')
    }
    // async ActualizarIpCiudad() {
    //     let { IpSolicitud } = this.cityDB
    //     console.log(this.cityDB._id)
    //     console.log(`Ip BUscada: ${this.IpSolicitud}`)
    //     console.log(IpSolicitud)
    //     if (IpSolicitud.includes(this.IpSolicitud)) {
    //         return
    //     }
    //     IpSolicitud.push(this.IpSolicitud)
    //     console.log(IpSolicitud)
    
    //      console.log('Ip anadida a la lista')
    //     console.log(citty)


    // }

}

module.exports = Clima;