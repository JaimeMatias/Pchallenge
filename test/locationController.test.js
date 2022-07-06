// Requiring module
const assert = require('assert');
const request = require('supertest');
const Server = require('../models/server');
const server = new Server()
describe('Pruebas sobre LocationController(/v1/location)', () => {


    describe("Prueba Metodos No habilitados", () => {
        it('Mensaje de error con Metodo POST Current', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .post('/v1/location')
                .expect(400)
        });
        it('Mensaje de error con Metodo Put Current', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .put('/v1/location')
                .expect(400)
        })
    });

    describe("Prueba Ruta no habilitada", () => {
        it('Mensaje de error JBad Endpoint ', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .get('/v1/locatio')
                .expect(400)
        });

    });

    describe("Prueba Exito Sin Parametro City", () => {
        let response = {}
        before(async function () {
            this.timeout(10000);
            response = await request(server.app)
                .get('/v1/location')
                .expect(200)
                .expect('Content-Type', /json/)
        });
        it('Consulta exitosa a City', () => {
            const { text } = response
            const respuesta = JSON.parse(text)

            const { City } = respuesta
            // console.log(JSON.parse(text))
            assert(City != undefined, 'La ciudad no tiene valor ')
        });
        it('Consulta exitosa Latitud', () => {
            const { text } = response
            const respuesta = JSON.parse(text)

            const { Latitud } = respuesta
            // console.log(JSON.parse(text))
            assert(Latitud != undefined)
        });
        it('Consulta exitosa Longitud', () => {
            const { text } = response
            const respuesta = JSON.parse(text)

            const { Longitud } = respuesta
            // console.log(JSON.parse(text))
            assert(Longitud != undefined)
        });
        it('Consulta exitosa  ipSolicitud', () => {
            const { text } = response
            const respuesta = JSON.parse(text)

            const { IpSolicitud } = respuesta
            // console.log(JSON.parse(text))
            assert(IpSolicitud != undefined)
        });

    });




});