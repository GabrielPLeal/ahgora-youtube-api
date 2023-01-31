const express = require('express');
const router = express.Router();
const { hasRequiredQuerys } = require('./services/defaultService');
const creatBodyResponse = require('./services/createBodyResponse');

router.get('/', async (req, res, next) => {
    try {
        const query = req.query
        if (!hasRequiredQuerys(query)) {
            res.status(400).send({ error: "You need pass all search terms" })
        }
        const bodyResponse = await creatBodyResponse(query)
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.status(200).send(bodyResponse)
    } catch (error) {
        next(error)
    }
})

module.exports = router;