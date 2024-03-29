const youtubeApi = require('../../../externalApi/youtubeApi')
const { getSearchQuery } = require('./defaultService')

const getSearchRequestData = (query, lastResponse) => {
    const searchQuery = getSearchQuery(query)
    const searchRequestData = {
        part: 'snippet',
        eventType: 'completed',
        maxResults: 50,
        q: searchQuery,
        regionCode: 'BR',
        type: 'video'
    }
    if (lastResponse) {
        searchRequestData['pageToken'] = lastResponse.nextPageToken
    }
    return searchRequestData
}

const makeSearchRequest = async (videosId, query, lastResponse = null) => {
    const searchRequestData = getSearchRequestData(query, lastResponse)
    const currentResponse = await youtubeApi.search.list(searchRequestData)
    currentResponse.data.items.forEach((item) => { videosId.push(item.id.videoId) })
    videosId.length < 200 && await makeSearchRequest(videosId, query, currentResponse)
}

const getVideosId = async (query) => {
    let videosId = []
    await makeSearchRequest(videosId, query)
    return videosId
}

module.exports = {
    getSearchQuery,
    getSearchRequestData,
    makeSearchRequest,
    getVideosId
} 