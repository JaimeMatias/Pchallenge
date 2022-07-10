
const axios = require('axios').default;
const ipware = require('ipware')().get_ip;
require('dotenv').config();

/**
 * Class that performs the different searches to the different Endpoints on the Internet to bring the information
 * These endpoints are
 * IPAPI to obtain the geographic data by means of the IP of the equipment that makes a request to the server
 * OPENWEATHER to obtain the weather using the geographical data obtained from the equipment that makes the request to the server
 * MAPBOX to obtain the geographic data by means of a name (city) obtained from the request to the server
 */
class Search {
/**
 * @constructor
 * @param req  - The Request to the Server
 */
    constructor(req) {
        this.Ip = process.env.IP_Salida; //When the query is made with a private IP, some external services do not work correctly,
        //Therefore, the IP that appears in the .env is set as the default IP

        this.data = {}; //City information obtained from Ipapi

        this.CurrentWeather = {}; //Current weather information obtained from OpenWeather
        this.ForecastWeather = {}; //Forecast weather information obtained from OpenWeather
        this.unit = 'metric';
        this.cnt = 24;
        this.GetIP(req);
    }
    async GetIP(req) {
        // Me devuelve la IP desde donde se realiza el request
        // Si la IP es interna, continuamos con la por defecto
        //Si la IP es externa, actualiza el valor en la clase
        const ipInfo = ipware(req);
        const { clientIp } = ipInfo;

        if (clientIp != '::1' && clientIp != '::ffff:127.0.0.1') {
            this.Ip = clientIp;
        }

    }


    async ObtenerIpLocation() {
        // Me devuelve los datos de la IP desde IPAPI
        let response = {}

        try {
            response = await axios.get(`https://ipapi.co/${this.Ip}/json/`)
        } catch (error) {

            throw new Error('Falla en la solicitud en IPAPI Bad Query');
        }
        console.log('Pasa por IPapi');
        const { status } = response //Extraigo primero el status para verificar si esta correcto o no
        if (status != 200) {
            throw new Error('Falla en la solicitud en IPAPI Sin Informacion');
        }

        //Como ya verifique que esta correcto, puedo extraer los datos y devolverlos
        const { data } = response;

        //Renombro los campos para que coincidan con los nombre de mi BD
        const { ip: IpSolicitud, city: City, latitude: Latitud, longitude: Longitud } = data;
        this.data = { IpSolicitud, City, Latitud, Longitud };

    }

    async ObtenerClimaActual() {
        // Me devuelve los datos actuales del clima desde OPENWEATHER
        const { City, Latitud, Longitud } = this.data;
        console.log('Pasa por OpenWeather current');
        let response = {}

        try {
            response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${Latitud}&lon=${Longitud}&appid=${process.env.OpenWeatherMap_Key}&units=${this.unit}`);
        } catch (error) {

            throw new Error('Falla en la solicitud en OPENWeather Bad Query');
        }

        const { status } = response //Extraigo primero el status para verificar si esta correcto o no
        if (status != 200) {
            throw new Error('Falla en la solicitud OpenWeather');
        }

        //Como ya verifique que esta correcto, puedo extraer los datos y devolverlos
        const { data } = response;
        const { main, description } = data.weather[0];

        //Renombro los campos para que coincidan con los nombre de mi BD
        const { main: temperature, visibility, wind, clouds } = data;
        this.CurrentWeather = { City, Longitud, Latitud, main, description, temperature, visibility, wind, clouds };
    }

    async ObtenerClimaFuturo() {

        // Me devuelve los datos Futuros del clima desde OPENWEATHER
        const { City, Latitud, Longitud } = this.data;
        console.log('Pasa por OpenWeather Futuro');
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${Latitud}&lon=${Longitud}&appid=${process.env.OpenWeatherMap_Key}&units=${this.unit}`);
        const { status } = response; //Extraigo primero el status para verificar si esta correcto o no
        if (status != 200) {
            console.log('Debe generar error');
            throw new Error('Falla en la solicitud OpenWeather');
        }
        //Como ya verifique que esta correcto, puedo extraer los datos y devolverlos
        const { data } = response;
        const { list } = data;
        this.ForecastWeather = list;
    }

    async ObtenerCoordenadasCiudad(nombre) {
        // Me devuelve los datos de la ciudad  desde MapBox
        let response = {}
        try {
            response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${nombre}.json?access_token=${process.env.MapBox_Key}&limit=1`);
        } catch (error) {
            throw new Error('Falla en la solicitud en Mapbox Bad Query');
        }

        console.log('Pasa por Mapbox Presente');
        const { status } = response; //Extraigo primero el status para verificar si esta correcto o no
        if (status != 200) {
            console.log('Debe generar error');
            throw new Error('Falla en la solicitud Mapbox');
        }
        const { data } = response;

        const { features } = data;
        if (!features.length) {
            this.data = { msg: 'No se encontraron ciudades con ese criterio' };
            console.log('Sin resultados');
        } else {
            const Longitud = features[0].center[0];
            const Latitud = features[0].center[1];
            this.data = { City: nombre, Latitud, Longitud };

        }

    };
};

module.exports = Search;