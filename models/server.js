const express = require('express');
const { ConectarDB } = require('../database/config');
require('dotenv').config();
const router = express.Router();
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT

        //Conectar a base de Datos
        this.ConectarDB()

        //Rutas de mi aplicacion
        this.routes()
    }

    // Middlewares
    middlewares() {

    }
    // Metodos
    // routes() {
    //     this.app.get('/V2', function (req, res) {

    //         res.json(`Hola Mundo`)
    //     })
    //     this.app.get('/*', function (req, res) {

    //         res.status(404).json(`404 Pagina no encontrada`)
    //     })
    // }

    routes() {
        this.app.use('/v1', require("../routes/location"))
        this.app.use('/v1/location', require("../routes/location"))
        this.app.use('/v1/current', require("../routes/current"))
        this.app.use('/v1/forecast', require("../routes/forecast"))
        // this.app.use('/*', require("../routes/notValid"))

    }
    async ConectarDB() {
        try {
            await ConectarDB();
        } catch (error) {

            throw new Error(error)
        }

    }

    listen() {
        this.app.listen(this.port, () => {

            console.log('Inicializando Aplicacion puerto:', this.port)

        })
    }
}

module.exports = Server;