
const axios = require('axios').default;
const ipware = require('ipware')().get_ip;
require('dotenv').config();

class Busqueda {
    constructor(req) {
        this.Ip = ''
        this.data = {}
        this.ObtenerIP(req)
        this.dataClimaActual = {}
        this.dataClimaFuturo = {}
        this.unit = 'metric'
        this.cnt = 24
    }
    async ObtenerIP(req) {
        // Me devuelve la IP desde donde se realiza el request
        const ipInfo = ipware(req);
        const { clientIp } = ipInfo
        if (clientIp != '::1') {
            this.Ip = clientIp
        }
    }


    async ObtenerIpLocation() {
        // Me devuelve los datos de la IP desde IPAPI

        const response = await axios.get(`https://ipapi.co/${this.Ip}/json/`);
        console.log('Pasa por IPapi')
        const { status } = response //Extraigo primero el status para verificar si esta correcto o no
        if (status != 200) {
            console.log('Debe generar error')
            throw new Error('Falla en la solicitud')
        }

        //Como ya verifique que esta correcto, puedo extraer los datos y devolverlos
        const { data } = response;
        const { ip: IpSolicitud, city: City, latitude: Latitud, longitude: Longitud } = data;
        // const FechaAlta=Date.now()
        this.data = { IpSolicitud, City, Latitud, Longitud }
    }

    async ObtenerClimaActual() {
        // Me devuelve los datos actuales del clima
        const { City, Latitud, Longitud } = this.data
        console.log('Pasa por OpenWeather current')
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${Latitud}&lon=${Longitud}&appid=${process.env.OpenWeatherMap_Key}&units=${this.unit}`);
        const { status } = response //Extraigo primero el status para verificar si esta correcto o no
        if (status != 200) {
            throw new Error('Falla en la solicitud')
        }
        const { data } = response;
        const { main, description } = data.weather[0];
        const { main: temperatura, visibility, wind, clouds } = data
        this.dataClimaActual = { City, Longitud, Latitud, main, description, temperatura, visibility, wind, clouds }
    }

    async ObtenerClimaFuturo() {
        const { City, Latitud, Longitud } = this.data
        console.log('Pasa por OpenWeather Futuro')
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${Latitud}&lon=${Longitud}&appid=${process.env.OpenWeatherMap_Key}&units=${this.unit}&cnt=24`);
        const { status } = response //Extraigo primero el status para verificar si esta correcto o no
        if (status != 200) {
            console.log('Debe generar error')
            throw new Error('Falla en la solicitud')
        }
        const { data } = response;
        const { list } = data
        this.dataClimaFuturo = list
        // this.dataClimaFuturo={City, Longitud, Latitud}
    }

    async ObtenerCoordenadasCiudad(nombre) {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${nombre}.json?access_token=${process.env.MapBox_Key}&limit=1`);
        console.log('Pasa por Mapbox Presente')
        const { status } = response //Extraigo primero el status para verificar si esta correcto o no
        if (status != 200) {
            console.log('Debe generar error')
            throw new Error('Falla en la solicitud')
        }
        const { data } = response;

        const { features } = data
        if (!features.length) {
            this.data = { msg: 'No se encontraron ciudades con ese criterio' }
            console.log('Sin resultados')
        } else {
            const Longitud = features[0].center[0]
            const Latitud = features[0].center[1]
            this.data = { City: nombre, Latitud, Longitud }

        }
        // console.log(features[0].center[0])
        // 
        // c
        // 
        // 
    }
}

module.exports = Busqueda;