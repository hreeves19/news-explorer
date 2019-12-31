const express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config({path: __dirname + '/.env'});
const newYorkTimesRoute = require('./routes/newYorkTimesRoute');
const guardianRoute = require('./routes/guardianRoute');
const googleRoute = require('./routes/googleRoute');
const alphaVantageRoute = require('./routes/alphaVanageRoute');
const databaseRoute = require('./routes/database');
const userDbRoutes = require('./routes/userRoute');

// For reading json files
var fs = require('fs');
const countries = require('./json-data/countries.json');
const languages = require('./json-data/iso_639-2.json');

const app = express();
const port = process.env['PORT'];
const host = process.env['HOST'];

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/newyorktimes', newYorkTimesRoute);
app.use('/guardian', guardianRoute);
app.use('/google', googleRoute);
app.use('/alphavantage', alphaVantageRoute);
app.use('/data/user', userDbRoutes);

app.get('/', (req, res) => {
  res.send('\n\nHello, world dawgggg!\n\n');
});

// Returns the json file containing the countries
app.get('/countries/', (req, res) => {
  res.json(countries);
});

// Returns the json file containing all the different languages
app.get('/languages/', (req, res) => {
  res.json(languages);
});

app.get('/about', function (req, res) {
  res.send('about')
});

app.listen(port, host, (e)=> {
  if(e) {
      throw new Error('Internal Server Error');
  }
  console.log(`Express server running on ${host}:${port}`);
});