const express = require('express');
const app = express();

const youtubeSearch = require('./routes/youtubeSearch')

app.use('/search', youtubeSearch)

module.exports = app;

