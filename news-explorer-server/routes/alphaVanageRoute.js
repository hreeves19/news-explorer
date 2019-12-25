const routes = require('express').Router();
const request = require('request');
const alphaVantageKey = process.env['ALPHA_VANTAGE_API_KEY'];
const alpha = require('alphavantage')({
    key: alphaVantageKey.toString()
});

// Get all events
routes.get('/search', async (req, res) => {
    alpha.data.intraday(`msft`).then(data => {
        console.log(data);
    });
});

module.exports = routes;