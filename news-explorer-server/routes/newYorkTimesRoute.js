const routes = require('express').Router();
const request = require('request');
const externalRouteNewYorkTimes = process.env['NEW_YORK_TIMES_EXTERNAL_ROUTE'];
const newYorkTimesAPIKey = process.env['NEW_YORK_TIMES_API_KEY'];

// https://developer.nytimes.com/docs/articlesearch-product/1/routes/articlesearch.json/get
let newYorkTimesSearch = {
    begin_date: "", //matches ^\d{8}$, Begin date (e.g. 20120101)
    end_date: "",
    facet: "", // True or false, shows facet count
    facet_fields: "",
    facet_filter: "",
    f1: "",
    fq: "",
    page: null,// page number, integer between 0 <= value <= 100
    q: "",
    sort: "" // Can either be: newest, oldest, relevance
};

// Get all events
routes.get('/', async (req, res) => {
    request(`${externalRouteNewYorkTimes}?api-key=${newYorkTimesAPIKey}`, function (error, response, body) {
      res.json(body)
    });
});

module.exports = routes;