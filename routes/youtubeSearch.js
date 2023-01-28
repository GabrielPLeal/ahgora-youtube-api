const express = require('express');
const router = express.Router();
const youtubeApi = require('../api')

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

        res.status(200).send(response.data)
    } catch (error) {
        next(error)
    }
})

module.exports = router;