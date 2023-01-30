const youtubeApi = require('../../../externalApi/youtubeApi')
const { getVideosId } = require('./takeVideosId')
const { getWeekDaysTime } = require('./howManyDays')

const getNextFiftyVideosId = (videosId, videosData) => {
    const initialIndex = videosData.length
    return videosId.slice(initialIndex, initialIndex + 50).join()
}

const getVideosRequestData = (videosData, videosId) => {
    const nextFiftyVideosId = getNextFiftyVideosId(videosId, videosData)
    const videosRequestData = {
        part: ['snippet, contentDetails'],
        id: [nextFiftyVideosId],
        maxResults: 50
    }
    return videosRequestData
}

const getVideoUrl = (videoId) => {
    return `https://www.youtube.com/watch?v=${videoId}`
}

const durationToMinutes = (duration) => {
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

    match = match.slice(1).map(function (x) {
        if (x != null) {
            return x.replace(/\D/, '')
        }
    });

    var hours = (parseInt(match[0]) || 0)
    var minutes = (parseInt(match[1]) || 0)
    var seconds = (parseInt(match[2]) || 0)

    return (hours * 60 + minutes + seconds / 100).toFixed(2)
}

const getVideoData = (item) => {
    return {
        videoId: item.id,
        url: getVideoUrl(item.id),
        title: item.snippet.title,
        description: item.snippet.description,
        duration: durationToMinutes(item.contentDetails.duration)
    }
}

const getLongestWeekDayTime = (query) => {
    const weekDaysTime = getWeekDaysTime(query)
    let longestWeekDayTime = 0
    Object.values(weekDaysTime).forEach((time) => {
        const dayTime = Number(time)
        if (dayTime > longestWeekDayTime) {
            longestWeekDayTime = dayTime
        }
    })
    return longestWeekDayTime
}

const isDurationBiggerLongestTime = (videoData, query) => {
    const longestWeekDayTime = getLongestWeekDayTime(query)
    return Number(videoData.duration) > longestWeekDayTime
}

const makeVideosRequest = async (videosData, videosId) => {
    const videosRequestData = getVideosRequestData(videosData, videosId)
    const response = await youtubeApi.videos.list(videosRequestData)
    response.data.items.forEach(
        item => videosData.push(getVideoData(item))
    )
    videosData.length < 200 && await makeVideosRequest(videosData, videosId)
}

const getVideosData = async (query) => {
    const videosId = await getVideosId(query)
    let videosData = []
    await makeVideosRequest(videosData, videosId)
    return videosData.filter(videoData => !isDurationBiggerLongestTime(videoData, query))
}

module.exports = {
    getNextFiftyVideosId,
    getVideosRequestData,
    getVideoUrl,
    getVideoData,
    makeVideosRequest,
    getVideosData,
    durationToMinutes,
    getLongestWeekDayTime,
    isDurationBiggerLongestTime
}