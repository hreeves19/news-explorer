const routes = require('express').Router();
const request = require('request');
const apiKey = process.env['ALPHA_VANTAGE_API_KEY'];
const searchAlpha = process.env['ALPHA_VANTAGE_EXTERNAL_ROUTE'];

// Get all events
routes.get('/search', async (req, res) => {
    request(`${searchAlpha}function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=${apiKey}`, function (error, response, body) {
        res.send(body)
    });
});

module.exports = routes;