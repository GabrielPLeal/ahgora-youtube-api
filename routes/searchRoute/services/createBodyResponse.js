const { getVideosData } = require('./takeVideosData')
const { getHowManyDaysWatchAllVideos } = require('./howManyDays')
const { getFiveMostUsedWords } = require('./topFiveWords')

const creatBodyResponse = async (query) => {
    const videosData = await getVideosData(query)
    const fiveWordsMostUsed = getFiveMostUsedWords(videosData)
    const howManyDaysWatchAllVideos = getHowManyDaysWatchAllVideos(query, videosData)
    return {
        fiveWordsMostUsed: fiveWordsMostUsed,
        howManyDaysWatchAllVideos: howManyDaysWatchAllVideos,
        videosData: videosData
    }
}

module.exports = creatBodyResponse