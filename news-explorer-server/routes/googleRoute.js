const routes = require('express').Router();
const request = require('request');
const NewsAPI = require('newsapi');
const googleNewsKey = process.env['GOOGLE_NEWS_API_KEY'];
const newsapi = new NewsAPI(googleNewsKey);

// https://newsapi.org/docs/endpoints/everything
let googleSearch = {
    
};

// Get all events
routes.get('/headlines', async (req, res) => {
    newsapi.v2.topHeadlines({
      language: 'en',
      country: 'us'
    }).then(response => {
      res.json(response);
    });
});

routes.post('/searchHeadlines', (req, res) => {
  newsapi.v2.topHeadlines(req.body).then(response => {
    res.json(response);
  });
});

module.exports = routes;