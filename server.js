'use strict';


require('dotenv').config();

const express = require('express');


const weather = require('./data/weather.json')
const cors = require('cors');

const app = express();



app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/hello', (request, response) => { response.send('Hello, it works!') })

app.get('/weather', handleWeather);

app.get('/*' , (req,res) => res.status(403).send('not found'))

function handleWeather(req,res) {
  res.status(200).send(weather)
}

app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));