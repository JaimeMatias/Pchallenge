// Requiring module
const assert = require('assert');
const request = require('supertest');
const Server = require('../models/server');
const server = new Server()
describe('Tests on ForeCastController(/v1/forecast)', () => {


    describe("Test Methods Not Enabled", () => {
        it('Error message with POST Forecast Method', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .post('/v1/forecast')
                .expect(400)
        });
        it('Error message with Put Forecast Method', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .put('/v1/forecast')
                .expect(400)
        })
    });

    describe("Test Route not enabled", () => {
        it('Bad Hierarchy City error message ', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .get('/v1/forecast/city')
                .expect(400)
        });
        it('Bad endpoint error message ', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .get('/v1/forecas')
                .expect(400)
        });
    })

    describe("Test Success Without Parameter City", () => {
        let response = {}
        before(async function () {
            this.timeout(10000);
            response = await request(server.app)
                .get('/v1/forecast/')
                .expect(200)
                .expect('Content-Type', /json/)
        });
        it('Successful Query to City', () => {
            const { text } = response
            const respuesta = JSON.parse(text)

            const { City } = respuesta
          
            assert(City != undefined)
        });
        it('Latitude query successful', () => {
            const { text } = response
            const respuesta = JSON.parse(text)

            const { Latitud } = respuesta
            
            assert(Latitud != undefined)
        });
        it('Longitud query successful', () => {
            const { text } = response
            const respuesta = JSON.parse(text)

            const { Longitud } = respuesta
          
            assert(Longitud != undefined)
        });
        it('Forecast Weather Query Successful', () => {
            const { text } = response
            const respuesta = JSON.parse(text)

            const { ForecastWeather } = respuesta
           
            assert(ForecastWeather != undefined)
        });

    });

    describe("Test Success with Parameter City", () => {
        let response = {} //All the information obtained from the query
        let datos = {} //The information I really need
        const ciudad = 'Barcelona'
        before(async function () {
            this.timeout(10000);
            response = await request(server.app)
                .get(`/v1/forecast?city=${ciudad}`)
                .expect(200)
                .expect('Content-Type', /json/)

            const { text } = response
            datos = JSON.parse(text)
        });
        it('Successful Query to City', () => {
            const { City } = datos
            assert(City != undefined)
        });
        it('Latitude query successful', () => {
            const { Latitud } = datos
            assert(Latitud != undefined)
        });
        it('Longitud query successful', () => {
            const { Longitud } = datos
            assert(Longitud != undefined)
        });
        it('Forecast Weather Query Successful', () => {
            const { ForecastWeather } = datos
            assert(ForecastWeather == undefined)
        });

    });

    describe("Test Fails with Parameter City", () => {
        let response = {} //Toda la infomracion obtenida de la consulta
        const ciudad = 'Barcelona'

        it('Query Failed Temperature', async function () {
            this.timeout(10000);
            response = await request(server.app)
                .get(`/v1/current?city=${ciudad}`)
                .expect(200)
                .expect('Content-Type', /json/)

            const { text } = response
            datos = JSON.parse(text)
            const { temperatura } = datos
            assert(temperatura == undefined)
        });

    });


});