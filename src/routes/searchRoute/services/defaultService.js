const hasRequiredQuerys = (query) => {
    const requiredKeys = [
        "search_query", "mon", "tues",
        "wed", "thurs", "fri", "sat", "sun"
    ]
    return requiredKeys.every((key) => { return query.hasOwnProperty(key) }
    )
}

const getSearchQuery = (query) => {
    return query.search_query
}

module.exports = {
    getSearchQuery,
    hasRequiredQuerys
}