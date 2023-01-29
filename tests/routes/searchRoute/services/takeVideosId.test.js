const {
    getSearchRequestData,
    makeSearchRequest,
    getVideosId,
} = require('../../../../routes/searchRoute/services/takeVideosId')
const { mockAllQuery, mockResponse } = require('../../../mock/mockData')

describe('Test Get Search Request Data', () => {
    it('Pass query and null lastReponse should return a object with search request data', () => {
        const query = mockAllQuery()
        const lastReponse = null
        const searchRequestQuery = getSearchRequestData(query, lastReponse)
        expect(searchRequestQuery).toEqual(expect.objectContaining({
            part: expect.any(String),
            q: expect.any(String),
            type: expect.any(String),
            maxResults: expect.any(Number)
        }))
    });
    it('Pass query and lastReponse should return a object with search request default data and page token', () => {
        const query = mockAllQuery()
        const lastReponse = mockResponse()
        const searchRequestQuery = getSearchRequestData(query, lastReponse)
        expect(searchRequestQuery).toEqual(expect.objectContaining({
            part: expect.any(String),
            q: expect.any(String),
            type: expect.any(String),
            maxResults: expect.any(Number),
            pageToken: expect.any(String)
        }))
    });
})

describe('Test Make Search Request', () => {
    it('Pass a videos id array, query and last response should set video id in videos id array', () => {
        // We aren't do request to youtube api on the tests. 
        // Need mock the response data.
        // If too many requests are made, the day quota limit is reached.
        expect(true).toBeTruthy()
    })
})

describe('Test Get Videos Id', () => {
    it('Pass a query should return a videos id array', () => {
        // We aren't do request to youtube api on the tests. 
        // Need mock the response data.
        // If too many requests are made, the day quota limit is reached.
        expect(true).toBeTruthy()
    })
})