// Requiring module

const request = require('supertest');
const Server = require('../models/server');
const server = new Server()
describe('tests on rBaseController(/v1)', () => {

    describe("Test Methods Not Enabled", () => {
        it('Error message with POST ', async function () {
            const response = await request(server.app)
                .post('/v1')
                .expect(400)
        });
        it('Error message with PUT ', async function () {
            const response = await request(server.app)
                .put('/v1')
                .expect(400)
        })
    });

    describe("Test Route not enabled",()=>{
        it('Bad endpoint error message /v', async function () {
            const response = await request(server.app)
                .get('/v')
                .expect(400)
        })
    })

    describe("Test Success ",()=>{
        it('Successful Query to /v1', async function () {
            const response = await request(server.app)
                .get('/v1')
                .expect(200)
                .expect('Content-Type', /json/)
        })
    })
});