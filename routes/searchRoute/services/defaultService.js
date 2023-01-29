const hasRequiredQuerys = (query) => {
    const requiredKeys = [
        "search_query", "mon", "tues",
        "wed", "thurs", "fri", "sat", "sun"
    ]
    return requiredKeys.every((key) => { return query.hasOwnProperty(key) }
    )
}

const getWeekDaysTime = (query) => {
    return Object.fromEntries(
        Object.entries(query).filter(([key]) => !key.includes('search_query'))
    )
}

const getSearchQuery = (query) => {
    return query.search_query
}

module.exports = {
    getWeekDaysTime,
    getSearchQuery,
    hasRequiredQuerys
}