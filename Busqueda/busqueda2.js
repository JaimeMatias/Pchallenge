
const axios = require('axios').default;
const ipware = require('ipware')().get_ip;
require('dotenv').config();

class Busqueda2 {
    constructor(req) {
        this.mockIp='8.8.8.8'
        this.Ip = ''
        this.data = {}
        this.ObtenerIP(req)
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
        console.log('Pasa por IPapi')
        const response = await axios.get(`https://ipapi.co/${this.Ip}/json/`);
      
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
console.log('Datos Clima Actual')
        // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPM_KEY}`);

    }
    async ObtenerClimaFuturo(){
        console.log('Datos Clima Futuro')
    }
}

module.exports = Busqueda2;