const {
    getHowManyDaysWatchAllVideos,
    countHowManyDays,
    hasVideos,
    dayTimeWasBiggerDuration,
    getVideoDuration,
    removeVideoData,
    getWeekDaysTime
} = require('../../../../routes/searchRoute/services/howManyDays')
const {
    mockAllQuery,
    mockVideosData,
} = require('../../../mock/mockData')

describe('Test Get Week Days Time Function', () => {
    it('Pass the request query should return the week days time', () => {
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

describe('Test Count How Many Days Function', () => {
    it('Pass the query and fourteen videos data should return seven days', () => {
        const query = mockAllQuery()
        const videosData = mockVideosData(14)
        const howManyDays = getHowManyDaysWatchAllVideos(query, videosData)
        expect(howManyDays).toBe(7)
    });
    it('Pass the query and one video data should return two days', () => {
        const query = mockAllQuery()
        const videosData = mockVideosData(1)
        const howManyDays = getHowManyDaysWatchAllVideos(query, videosData)
        expect(howManyDays).toBe(2)
    });
})

describe('Test Get How Many Days Watch All Videos Function', () => {
    it('Pass the fourteen videos data and week days time should return seven days', () => {
        const query = mockAllQuery()
        const videosData = mockVideosData(14)
        const weekDaysTime = getWeekDaysTime(query)
        let howManyDays = countHowManyDays(videosData, weekDaysTime)
        expect(howManyDays).toBe(7)
    });
    it('Pass the query and one video data should return two days', () => {
        const query = mockAllQuery()
        const videosData = mockVideosData(1)
        const howManyDays = getHowManyDaysWatchAllVideos(query, videosData)
        expect(howManyDays).toBe(2)
    });
})

describe('Test Has Videos Function', () => {
    it('Pass the how many videos are removes less than videosData length should return true', () => {
        const howManyVideosRemove = 1
        const videosData = mockVideosData(2)
        expect(hasVideos(howManyVideosRemove, videosData)).toBeTruthy()
    });
    it('Pass the how many videos are removes equal to videosData length should return false', () => {
        const howManyVideosRemove = 1
        const videosData = mockVideosData(1)
        expect(hasVideos(howManyVideosRemove, videosData)).toBeFalsy()
    });
    it('Pass the how many videos are removes bigger than videosData length should return false', () => {
        const howManyVideosRemove = 2
        const videosData = mockVideosData(1)
        expect(hasVideos(howManyVideosRemove, videosData)).toBeFalsy()
    });
})

describe('Test Day Time Was Bigger Duration Function', () => {
    it('Pass index equal of 0 should return false', () => {
        const index = 0
        expect(dayTimeWasBiggerDuration(index)).toBeFalsy()
    });
    it('Pass index different of 0 should return true', () => {
        const index = 1
        expect(dayTimeWasBiggerDuration(index)).toBeTruthy()
    });
})

describe('Test Get Video Duration Function', () => {
    it('Pass videoData should return arround duration', () => {
        const videosData = mockVideosData(1)
        expect(getVideoDuration(videosData[0])).toBe(30)
    });
})

describe('Test Remove Video Data Function', () => {
    it('Pass video data and how many videos are removed should remove videos datas from index 0 to the quantity to be removed', () => {
        const videosData = mockVideosData(4)
        const howManyVideosRemove = 2
        removeVideoData(videosData, howManyVideosRemove)
        expect(videosData).toHaveLength(2)
    });
})

