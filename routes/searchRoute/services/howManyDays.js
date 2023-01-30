const getWeekDaysTime = (query) => {
    return Object.fromEntries(
        Object.entries(query).filter(([key]) => !key.includes('search_query'))
    )
}

const removeVideoData = (videosData, howManyVideosRemove = 1) => {
    return videosData.splice(0, howManyVideosRemove)
}

const getVideoDuration = (videoData) => {
    return Math.ceil(Number(videoData.duration))
}

const dayTimeWasBiggerDuration = (index) => {
    return index !== 0
}

const hasVideos = (howManyVideosRemove, videosData) => {
    return howManyVideosRemove < videosData.length
}

const countHowManyDays = (videosData, weekDaysTime, howManyDays = 0) => {
    let currentVideosData = [...videosData]
    Object.values(weekDaysTime).forEach((time) => {
        let dayTime = Number(time)
        let howManyVideosRemove = 0
        currentVideosData.every((videoData, index) => {
            const videoDuration = getVideoDuration(videoData)
            howManyVideosRemove += videoDuration <= dayTime ? 1 : 0

            if (videoDuration > dayTime) {
                howManyDays += 1
                if (dayTimeWasBiggerDuration(index)) {
                    removeVideoData(currentVideosData, howManyVideosRemove)
                }
            } else if (videoDuration === dayTime) {
                howManyDays += 1
                removeVideoData(currentVideosData, howManyVideosRemove)
            } else if (videoDuration < dayTime) {
                if (hasVideos(howManyVideosRemove, currentVideosData)) {
                    dayTime -= videoDuration
                    return true
                }
                howManyDays += 1
                removeVideoData(currentVideosData, howManyVideosRemove)
            }
            return false
        })
    }
    )
    if (currentVideosData.length > 0) {
        howManyDays = countHowManyDays(currentVideosData, weekDaysTime, howManyDays)
    }
    return howManyDays
}

const getHowManyDaysWatchAllVideos = (query, videosData) => {
    const weekDaysTime = getWeekDaysTime(query)
    let howManyDays = countHowManyDays(videosData, weekDaysTime)
    return howManyDays
}

module.exports = {
    getHowManyDaysWatchAllVideos,
    countHowManyDays,
    hasVideos,
    dayTimeWasBiggerDuration,
    getVideoDuration,
    removeVideoData,
    getWeekDaysTime
}