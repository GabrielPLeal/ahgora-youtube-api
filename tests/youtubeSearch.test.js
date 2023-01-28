const request = require('supertest')
const app = require('../app')

describe('Youtube api tests', () => {
    it('Test request with search term should return status code 200', async () => {
        const searchTerm = 'test'
        const response = await request(app).get(`/search?search_query=${searchTerm}`);
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("items")
    })

    it('Test resquest without search term should return error status code 400', async () => {
        const response = await request(app).get('/search')
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe("Search term is required!")
    })
})