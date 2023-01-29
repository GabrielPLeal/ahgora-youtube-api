const mockVideoData = () => {
    return {
        videoId: 'u5NmlCarb3M',
        url: `https://www.youtube.com/watch?v=u5NmlCarb3M`,
        title: 'That is a title',
        description: 'That is a description',
        duration: 10
    }
}

const mockVideosData = (qty) => {
    return arrayRange(1, qty, 1).map(
        index => mockVideoData()
    )
}

const arrayRange = (start, stop, step) => {
    return Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    )
}

const mockVideosId = (qty) => {
    return arrayRange(1, qty, 1)
}

const mockVideoApiItem = () => {
    return {
        id: 'u5NmlCarb3M',
        snippet: {
            title: 'That is a title',
            description: 'That is a description',
        },
        contentDetails: {
            duration: 'PT10M5S'
        }
    }
}

const mockResponse = () => {
    return {
        nextPageToken: 'Page Token'
    }
}

const mockAllQuery = () => {
    return {
        search_query: "new",
        mon: "15",
        tues: "20",
        wed: "30",
        thurs: "30",
        fri: "90",
        sat: "40",
        sun: "90",
    }
}

const mockStringQuery = () => {
    let mockedStringQuery = ''
    const mockedQuery = mockAllQuery()
    Object.entries(mockedQuery).forEach(([query, value], index) => {
        const initialSignal = index === 0 ? '?' : '&'
        mockedStringQuery += `${initialSignal}${query}=${value}`
    });
    return mockedStringQuery
}

module.exports = {
    mockVideosId,
    mockVideosData,
    mockAllQuery,
    mockStringQuery,
    mockVideoApiItem,
    mockResponse
}