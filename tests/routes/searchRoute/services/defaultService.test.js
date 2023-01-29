const { mockAllQuery } = require('../../../mock/mockData')
const {
    getWeekDaysTime,
    getSearchQuery,
    hasRequiredQuerys
} = require('../../../../routes/searchRoute/services/defaultService')

describe('Test Get Week Days Time', () => {
    it('Tess pass the request query should return the week days time', () => {
        const query = mockAllQuery()
        const weekDaysTime = getWeekDaysTime(query)
        expect(weekDaysTime).not.toHaveProperty('search_query')
        expect(weekDaysTime).toEqual(expect.objectContaining({
            mon: expect.any(String),
            tues: expect.any(String),
            wed: expect.any(String),
            thurs: expect.any(String),
            fri: expect.any(String),
            sat: expect.any(String),
            sun: expect.any(String),
        }))
    });
})

describe('Test Get Search Query', () => {
    it('Tess pass the request query should return the search query string', () => {
        const query = mockAllQuery()
        const searchQuery = getSearchQuery(query)
        expect(searchQuery).toBe(query.search_query)
    });
})

describe('Test Has Required Querys', () => {
    it('Tess pass the request query with all required querys should return true', () => {
        const query = mockAllQuery()
        expect(hasRequiredQuerys(query)).toBeTruthy()
    });
    it('Tess pass the request query without all required querys should return true', () => {
        const query = mockAllQuery()
        delete query['mon']
        expect(hasRequiredQuerys(query)).toBeFalsy()
    });
})

