const express = require('express');
require('dotenv').config();
const { ConectDB } = require('../database/config');

const router = express.Router();
/**
 * Creates a new Server, and the one in charge of orchestrating the entire system
 * @class
 */
class Server {
    /** @constructor */
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.ConectDB(); //Conect the DB

        this.routes(); //Server's Route
    };

    /** List all the available API's Routes as well as the exception when the route is not valid */
    routes() {
        //Correct Routes
        this.app.use('/v1', require("../routes/base"));
        this.app.use('/v1/location', require("../routes/location"));
        this.app.use('/v1/current', require("../routes/current"));
        this.app.use('/v1/forecast', require("../routes/forecast"));

        //Invalid Routes
        this.app.use('/*', require("../routes/notValid"))

    };

    /**
     * Conect to the DB
     * @async
     */
    async ConectDB() {
        try {
            await ConectDB();
        } catch (error) {

            throw new Error(error);
        }

    };
    /** Start Listeinig the diferent API Calls */
    listen() {
        this.app.listen(this.port, () => {

            console.log('Start listeing on the port:', this.port);

        })
    };
}

module.exports = Server;