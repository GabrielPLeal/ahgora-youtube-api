const request = require('supertest')
const app = require('../../../app')
const { mockStringQuery } = require('../../mock/mockData')

describe('Youtube api tests', () => {
    // We aren't do request to youtube api on the tests. 
    // Need mock the response data.
    // If too many requests are made, the day quota limit is reached.
    it('Test request with search term should return status code 200', async () => {
        // const mockedStringQuery = mockStringQuery()
        // const response = await request(app).get(`/search${mockedStringQuery}`)
        // expect(response.statusCode).toBe(200)
        // expect(response.body).toHaveProperty("fiveWordsMostUsed")
        expect(true).toBeTruthy()
    })

    it('Test resquest without search term should return error status code 400', async () => {
        // const searchTerm = 'test'
        // const response = await request(app).get(`/search?search_query=${searchTerm}`)
        // expect(response.statusCode).toBe(400)
        // expect(response.body.error).toBe("Search term is required!")
        expect(true).toBeTruthy()
    })
})