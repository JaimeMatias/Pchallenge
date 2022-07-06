// Requiring module

const request = require('supertest');
const Server = require('../models/server');
const server = new Server()
describe('Pruebas sobre rBaseController(/v1)', () => {

    describe("Prueba Metodos No habilitados", () => {
        it('Mensaje de error con Metodo POST', async function () {
            const response = await request(server.app)
                .post('/v1')
                .expect(400)
        });
        it('Mensaje de error con Metodo Put', async function () {
            const response = await request(server.app)
                .put('/v1')
                .expect(400)
        })
    });

    describe("Prueba Ruta no habilitada",()=>{
        it('Mensaje de error con Ruta /v', async function () {
            const response = await request(server.app)
                .get('/v')
                .expect(400)
        })
    })

    describe("Prueba Exito",()=>{
        it('Consulta exitosa a /v1', async function () {
            const response = await request(server.app)
                .get('/v1')
                .expect(200)
                .expect('Content-Type', /json/)
        })
    })
});