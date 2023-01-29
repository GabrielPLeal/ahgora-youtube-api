const express = require('express');
const router = express.Router();
const { getVideosId } = require('./services/takeVideosId')
const { getVideosData } = require('./services/takeVideosData')
const { getWeekDaysTime, hasRequiredQuerys } = require('./services/defaultService');
const { creatBodyResponse } = require('./services/createBodyResponse');

router.get('/', async (req, res, next) => {
    try {
        const query = req.query
        if (!hasRequiredQuerys(query)) {
            res.status(400).send({ error: "You need pass all search terms" })
        }

        const weekDaysTime = getWeekDaysTime(query)

        const videosId = await getVideosId(query)

        const videosData = await getVideosData(videosId, query)

        const bodyResponse = creatBodyResponse(videosData)

        res.status(200).send(bodyResponse)
    } catch (error) {
        next(error)
    }
})

module.exports = router;