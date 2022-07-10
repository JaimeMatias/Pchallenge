/**
 * The application that will be run 
 */

const Server = require("./models/server");

const server= new Server(); //Generates a new server

server.listen(); //Start listening 
