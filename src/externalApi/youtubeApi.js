require('dotenv').config({ path: __dirname + '/.env' })
const { google } = require('googleapis')
const apiKey = process.env.API_KEY
const youtubeApi = google.youtube({
    version: "v3",
    auth: apiKey
})

module.exports = youtubeApi;