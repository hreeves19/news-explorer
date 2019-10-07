const routes = require('express').Router();
const request = require('request');
const externalRouteGaurdian = process.env['GUARDIAN_EXTERNAL_ROUTE'];
const gaurdianKey = process.env['GUARDIAN_API_KEY'];

// https://developer.nytimes.com/docs/articlesearch-product/1/routes/articlesearch.json/get
let guardianSearch = {
    
};

// Get all events
routes.get('/headlines', async (req, res) => {
    request(`${externalRouteGaurdian}?api-key=${gaurdianKey}`, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred and handle it
      //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      res.json(body)
    });
});

module.exports = routes;