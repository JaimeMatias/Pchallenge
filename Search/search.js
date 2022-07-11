
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

    /**
     * It returns the IP from where the request is made
     * If the IP is internal, we continue with the default
     * If the IP is external, update the value in the class
     * @aync
     * @function GetIP
     * @param  req - The Request to the Server
     */
    async GetIP(req) {
        const ipInfo = ipware(req);
        const { clientIp } = ipInfo;

        if (clientIp != '::1' && clientIp != '::ffff:127.0.0.1') {
            this.Ip = clientIp;
        }

    }

    /**
     * It returns the IP data from IPAPI
     * @aync
     * @function GetLocation
       */
    async GetLocation() {
        // t returns the IP data from IPAPI
        let response = {}

        try {
            response = await axios.get(`https://ipapi.co/${this.Ip}/json/`)
        } catch (error) {

            throw new Error('Request failure in IPAPI Bad Query');
        }
        console.log('Go through IPapi');
        const { status } = response //Extract the status to verify if it is correct or not
        if (status != 200) {
            throw new Error('Failure in the request in IPAPI Without Information');
        }

        //Since it has already been verified that it is correct, the data can be extracted and returned
        const { data } = response;
        console.log(data)
        //Rename the fields to match the names of my DB
        const { ip: IpSolicitud, city: City, latitude: Latitud, longitude: Longitud } = data;
        this.data = { IpSolicitud, City, Latitud, Longitud };

    }
    /**
     * It returns the current weather data from OPENWEATHER
     * @aync
     * @function GetCurrentWeather
       */
    async GetCurrentWeather() {

        const { City, Latitud, Longitud } = this.data;
        console.log('Go through OpenWeather current');
        let response = {}

        try {
            response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${Latitud}&lon=${Longitud}&appid=${process.env.OpenWeatherMap_Key}&units=${this.unit}`);
        } catch (error) {

            throw new Error('Request failure in OPENWEATHER Bad Query');
        }

        const { status } = response //Extract the status to verify if it is correct or not
        if (status != 200) {
            throw new Error('Failure in the request in OpenWeather');
        }

        ///Since it has already been verified that it is correct, the data can be extracted and returned
        const { data } = response;
        const { main, description } = data.weather[0];

        //Rename the fields to match the names of my DB
        const { main: temperature, visibility, wind, clouds } = data;
        this.CurrentWeather = { City, Longitud, Latitud, main, description, temperature, visibility, wind, clouds };
    }



    /**
     * It returns the Forecast weather data from OPENWEATHER
     * @aync
     * @function GetForecastWeather
       */
    async GetForecastWeather() {

               const { City, Latitud, Longitud } = this.data;
        console.log('Go through OpenWeather Forecast');
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${Latitud}&lon=${Longitud}&appid=${process.env.OpenWeatherMap_Key}&units=${this.unit}`);
        const { status } = response; //Extract the status to verify if it is correct or not
        if (status != 200) {
            throw new Error('Request failure in OPENWEATHER Bad Query');
        }
        ///Since it has already been verified that it is correct, the data can be extracted and returned
        const { data } = response;
        const { list } = data;
        this.ForecastWeather = list;
    }
  /**
     * It returns the City data from MapBox
     * @aync
     * @function GetForecastWeather
     * @param name - The name of the place
       */
    async GetCoordinates(name) {

        let response = {}
        try {
            response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json?access_token=${process.env.MapBox_Key}&limit=1`);
        } catch (error) {
            throw new Error('Request failure in Mapbox Bad Query');
        }

        console.log('Go through Mapbox Present');
        const { status } = response; //Extract the status to verify if it is correct or not
        if (status != 200) {
            throw new Error('Request failure in Mapbox');
        }
        const { data } = response;

        const { features } = data;
        if (!features.length) {
            this.data = { msg: 'No cities were found with that criteria' };
            console.log('Without results');
        } else {
            const Longitud = features[0].center[0];
            const Latitud = features[0].center[1];
            this.data = { City: name, Latitud, Longitud };

        }

    };
};

module.exports = Search;