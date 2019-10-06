const routes = require('express').Router();
const request = require('request');
const NewsAPI = require('newsapi');
const googleNewsKey = process.env['GOOGLE_NEWS_API_KEY'];
const newsapi = new NewsAPI(googleNewsKey);

// https://developer.nytimes.com/docs/articlesearch-product/1/routes/articlesearch.json/get
let googleSearch = {
    
};

// Get all events
routes.get('/', async (req, res) => {
    newsapi.v2.topHeadlines({
      language: 'en',
      country: 'us'
    }).then(response => {
      res.json(response);
    });
});

module.exports = routes;