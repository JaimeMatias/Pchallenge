// Requiring module
const assert = require('assert');
const request = require('supertest');
const Server = require('../models/server');
const server = new Server()
describe('tests on LocationController(/v1/location)', () => {


    describe("Test Methods Not Enabled", () => {
        it('Error message with POST', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .post('/v1/location')
                .expect(400)
        });
        it('Error message with Put', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .put('/v1/location')
                .expect(400)
        })
    });

    describe("Test Route not enabled", () => {
        it('Bad endpoint error message ', async function () {
            this.timeout(10000);
            const response = await request(server.app)
                .get('/v1/locatio')
                .expect(400)
        });

    });

    describe("Test Success Without Parameter City", () => {
        let response = {}
        before(async function () {
            this.timeout(10000);
            response = await request(server.app)
                .get('/v1/location')
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
        it('Successful query IP', () => {
            const { text } = response
            const respuesta = JSON.parse(text)

            const { IpSolicitud } = respuesta
            assert(IpSolicitud != undefined)
        });

    });




});