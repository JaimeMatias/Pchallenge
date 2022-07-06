
const axios = require('axios').default;
const ipware = require('ipware')().get_ip;
require('dotenv').config();

class Busqueda {

    // Clase que realiza las distintas busquedas a los distintos Endpoins en Internet para traer la informacion
    //Estos endpoint son
    //IPAPI para obtener los datos geograficos mendiante la IP del equipo que realiza una solicitud al servidor
    //OPENWEATHER para obtener el clima mediante los datos geograficos  obtenidos del equipo que realiza la solicitud al servidor
    //MAPBOX para obtener los datos geograficos mediante un nombre(ciudad) obtenidos de la solicitud al servidor

    constructor(req) {
        this.Ip = process.env.IP_Salida; //Cuando la consulta se hace con una IP privada, algunos servicios externos no funcionan correctamente,
        //Por lo tanto se setea como IP por defecto la que figura en el .env

        this.data = {}; //Informacion de la ciudad obtenida de Ipapi

        this.dataClimaActual = {}; //Informacion del clima Actual obtenido desde OpenWeather
        this.dataClimaFuturo = {}; //Informacion del clima Futuro  obtenido desde OpenWeather
        this.unit = 'metric';
        this.cnt = 24;

        this.ObtenerIP(req);
    }
    async ObtenerIP(req) {
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
        const { main: temperatura, visibility, wind, clouds } = data;
        this.dataClimaActual = { City, Longitud, Latitud, main, description, temperatura, visibility, wind, clouds };
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
        this.dataClimaFuturo = list;
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

module.exports = Busqueda;