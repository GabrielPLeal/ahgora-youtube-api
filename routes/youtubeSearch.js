const express = require('express');
const router = express.Router();
const youtubeApi = require('../api')
const { creatBodyResponse } = require('../utils/createBodyResponse')

router.get('/', async (req, res, next) => {
    try {
        const searchQuery = req.query.search_query || null

        if (searchQuery === null) {
            res.status(400).send({ error: "Search term is required!" })
        }

        const response = await youtubeApi.search.list({
            part: 'snippet',
            q: searchQuery,
            type: 'video'
        })

        const bodyResponse = creatBodyResponse(response)

        res.status(200).send(bodyResponse)
    } catch (error) {
        next(error)
    }
})

module.exports = router;