const express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config({path: __dirname + '/.env'});

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

app.get('/', (req, res) => {
  res.send('\n\nHello, world dawgggg!\n\n');
});

app.get('/shipwrecks/', (req, res) => {
  res.send('Get shipwrecks');
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