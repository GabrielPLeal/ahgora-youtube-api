const hasRequiredQuerys = (query) => {
    const requiredKeys = [
        "search", "mon", "tues",
        "wed", "thurs", "fri", "sat", "sun"
    ]
    return requiredKeys.every((key) => { return query.hasOwnProperty(key) }
    )
}

const getSearchQuery = (query) => {
    return query.search
}

module.exports = {
    getSearchQuery,
    hasRequiredQuerys
}