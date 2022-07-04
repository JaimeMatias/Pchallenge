const express = require('express');
require('dotenv').config();
const { ConectarDB } = require('../database/config');

const router = express.Router();

class Server {
    //Clase Servidor y la encargada de orquestar todo el sistema
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Conectar a base de Datos
        this.ConectarDB();

        //Rutas de mi aplicacion
        this.routes();
    };

    // Middlewares
    middlewares() {

    };

    routes() {
        //Rutas Validas
        this.app.use('/v1', require("../routes/location"));
        this.app.use('/v1/location', require("../routes/location"));
        this.app.use('/v1/current', require("../routes/current"));
        this.app.use('/v1/forecast', require("../routes/forecast"));

        //Cualquier otra ruta, se considera invalida
        this.app.use('/*', require("../routes/notValid"))

    };
    async ConectarDB() {
        try {
            await ConectarDB();
        } catch (error) {

            throw new Error(error);
        }

    };

    listen() {
        this.app.listen(this.port, () => {

            console.log('Inicializando Aplicacion puerto:', this.port);

        })
    };
}

module.exports = Server;