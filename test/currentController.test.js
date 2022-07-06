// Requiring module
const assert = require('assert');
const request = require('supertest');
const Server = require('../models/server');
const server = new Server()
describe('Pruebas sobre CurrentController(/v1/current)', () => {


    describe("Prueba Metodos No habilitados", () => {
        it('Mensaje de error con Metodo POST Current', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .post('/v1/current')
                .expect(400)
        });
        it('Mensaje de error con Metodo Put Current', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .put('/v1/current')
                .expect(400)
        })
    });

    describe("Prueba Ruta no habilitada", () => {
        it('Mensaje de error Jerarquia mal City ', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .get('/v1/current/city')
                .expect(400)
        });
        it('Mensaje de error Bad Endpoint ', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .get('/v1/curren')
                .expect(400)
        });
    })

    describe("Prueba Exito Sin Parametro City", () => {
        let response = {}
        before(async function () {
            this.timeout(10000);
            response = await request(server.app)
                .get('/v1/current/')
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
        it('Consulta exitosa Temperatura', () => {
            const { text } = response
            const respuesta = JSON.parse(text)

            const { temperatura } = respuesta
            // console.log(JSON.parse(text))
            assert(temperatura != undefined)
        });

    });

    describe("Prueba Exito con Parametro City", () => {
        let response = {} //Toda la infomracion obtenida de la consulta
        let datos = {} //La informacion que realmente necesito
        const ciudad = 'Barcelona'
        before(async function () {
            this.timeout(10000);
            response = await request(server.app)
                .get(`/v1/current?city=${ciudad}`)
                .expect(200)
                .expect('Content-Type', /json/)

            const { text } = response
            datos = JSON.parse(text)
        });
        it('Consulta exitosa a City', () => {
            const { City } = datos
            // console.log(JSON.parse(text))
            assert(City != undefined, 'La ciudad no tiene valor ')
        });
        it('Consulta exitosa Latitud', () => {
            const { Latitud } = datos
            // console.log(JSON.parse(text))
            assert(Latitud != undefined)
        });
        it('Consulta exitosa Longitud', () => {
            const { Longitud } = datos
            // console.log(JSON.parse(text))
            assert(Longitud != undefined)
        });
        it('Consulta exitosa Temperatura', () => {
            const { temperatura } = datos
            // console.log(JSON.parse(text))
            assert(temperatura == undefined)
        });

    });

    describe("Prueba Fallidas con Parametro City", () => {
        let response = {} //Toda la infomracion obtenida de la consulta
        const ciudad = 'Barcelona'

        it('Consulta Fallida Temperatura', async function () {
            this.timeout(10000);
            response = await request(server.app)
                .get(`/v1/current?city=${ciudad}`)
                .expect(200)
                .expect('Content-Type', /json/)

            const { text } = response
            datos = JSON.parse(text)
            const { temperatura } = datos
            // console.log(JSON.parse(text))
            assert(temperatura == undefined)
        });

    });


});