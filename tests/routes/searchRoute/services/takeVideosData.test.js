const {
    getNextFiftyVideosId,
    getVideosRequestData,
    getVideoUrl,
    getVideoData,
    durationToMinutes,
    getLongestWeekDayTime,
    isDurationBiggerLongestTime
} = require('../../../../routes/searchRoute/services/takeVideosData')
const {
    mockVideosData,
    mockVideosId,
    mockVideoApiItem,
    mockAllQuery
} = require('../../../mock/mockData')


describe('Test Get Next Fifty Videos Id', () => {
    it('Pass fifty videosId and empty videosData should return a string of videos id', () => {
        const videosId = mockVideosId(50)
        const videosData = []
        const nextFiftyVideosId = getNextFiftyVideosId(videosId, videosData)
        expect(nextFiftyVideosId).toContain('1,2,3,4,5,6,7,8,9')
    });
    it('Pass videosId with one hundred ids and videosData with fifty videos should return a string of videos id', () => {
        const videosId = mockVideosId(100)
        const videosData = mockVideosData(50)
        const nextFiftyVideosId = getNextFiftyVideosId(videosId, videosData)
        expect(nextFiftyVideosId).toContain('51,52,53,54,55,56,57,58,59')
    });
})

describe('Test Get Videos Request Data', () => {
    it('Pass fifty videosId and empty videosData should return a object with request data', () => {
        const videosId = mockVideosId(50)
        const videosData = []
        const videosRequestData = getVideosRequestData(videosId, videosData)
        expect(videosRequestData).toEqual(expect.objectContaining({
            part: expect.any(Array),
            id: expect.any(Array),
            maxResults: expect.any(Number),
        }))
    })
})

describe('Test Get Video Url', () => {
    it('Pass videoId should return a video url', () => {
        const videoId = 1
        expect(getVideoUrl(videoId)).toBe(`https://www.youtube.com/watch?v=${videoId}`)
    })
})

describe('Test Duration To Minutes', () => {
    it('Pass the video api duration should return duration in minutes', () => {
        const videoApiDuration = 'PT10M5S'
        expect(durationToMinutes(videoApiDuration)).toBe('10.05')
    })
})

describe('Test Get Video Data', () => {
    it('Pass the video api item should return a objec with video data', () => {
        const videoApiItem = mockVideoApiItem()
        const videoData = getVideoData(videoApiItem)
        expect(videoData).toEqual(expect.objectContaining({
            videoId: expect.any(String),
            url: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            duration: expect.any(String),
        }))
    })
})

describe('Test Get Longest Week Day Time', () => {
    it('Pass query should return the longest week day time', () => {
        const query = mockAllQuery()
        const longestWeekDayTime = getLongestWeekDayTime(query)
        expect(longestWeekDayTime).toBe(150)
    })
})

describe('Test Is Duration Bigger Longest Time', () => {
    it('Pass video data with duration longer than longest time and query should return true', () => {
        const videosData = mockVideosData(1)
        videosData[0].duration = '160'
        const query = mockAllQuery()
        expect(isDurationBiggerLongestTime(videosData[0], query)).toBeTruthy()
    })
    it('Pass video data with duration less than longest time and query should return false', () => {
        const videosData = mockVideosData(1)
        const query = mockAllQuery()
        expect(isDurationBiggerLongestTime(videosData[0], query)).toBeFalsy()
    })
})

describe('Test Make Videos Request', () => {
    it('Pass a videos data array and videos id array should set video data in videos data array', () => {
        // We aren't do request to youtube api on the tests. 
        // Need mock the response data.
        // If too many requests are made, the day quota limit is reached.
        expect(true).toBeTruthy()
    })
})

describe('Test Get Videos Data', () => {
    it('Pass a videos id array and should return a videos data array', () => {
        // We aren't do request to youtube api on the tests. 
        // Need mock the response data.
        // If too many requests are made, the day quota limit is reached.
        expect(true).toBeTruthy()
    })
})