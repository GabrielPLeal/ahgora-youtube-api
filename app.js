const express = require('express');
const app = express();

const youtubeSearch = require('./routes/searchRoute')

app.use('/search', youtubeSearch)

module.exports = app;

