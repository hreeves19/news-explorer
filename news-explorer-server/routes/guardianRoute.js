const routes = require('express').Router();
const request = require('request');
const externalRouteGaurdian = process.env['GUARDIAN_EXTERNAL_ROUTE'];
const gaurdianKey = process.env['GUARDIAN_API_KEY'];

// https://english.api.rakuten.net/mikilior1/api/Guardian/details
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

routes.post('/search', (req, res) => {
  let search = parameterizeObject(req.body);
  request(`${externalRouteGaurdian}?api-key=${gaurdianKey}&${search}`, function (error, response, body) {
    // console.log('error:', error); // Print the error if one occurred and handle it
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    res.json(body)
  });
});

function parameterizeObject(obj) {
  var str = "";
  for (var key in obj) {
      if (str != "") {
          str += "&";
      }
      str += key + "=" + encodeURIComponent(obj[key]);
  }

  return str;
}

module.exports = routes;