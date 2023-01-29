const youtubeApi = require('../../../api')

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

const getDurationMinutes = (duration) => {
    const minutesSeconds = duration.replace("PT", "").replace("S", "").split("M")
    return Math.ceil(Number(minutesSeconds.join(".")))
}

const getVideoData = (item) => {
    return {
        videoId: item.id,
        url: getVideoUrl(item.id),
        title: item.snippet.title,
        description: item.snippet.description,
        duration: getDurationMinutes(item.contentDetails.duration)
    }
}

const makeVideosRequest = async (videosData, videosId) => {
    const videosRequestData = getVideosRequestData(videosData, videosId)
    const response = await youtubeApi.videos.list(videosRequestData)
    response.data.items.forEach(
        item => videosData.push(getVideoData(item))
    )
    videosData.length < 200 && await makeVideosRequest(videosData, videosId)
}

const getVideosData = async (videosId) => {
    let videosData = []
    await makeVideosRequest(videosData, videosId)
    return videosData
}

module.exports = {
    getNextFiftyVideosId,
    getVideosRequestData,
    getVideoUrl,
    getDurationMinutes,
    getVideoData,
    makeVideosRequest,
    getVideosData
}