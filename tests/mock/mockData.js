const item = () => {
    return {
        snippet: {
            title: 'That is a title',
            description: 'That is a description'
        }
    }
}

const mockedResponse = () => {
    return {
        data: {
            items: [
                item(),
                item(),
                item()
            ]
        }
    }
}

module.exports = {
    item,
    mockedResponse
}