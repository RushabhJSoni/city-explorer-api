'use strict';


require('dotenv').config();
const express = require('express');
const weather = require('./data/weather.json');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
const PORT = process.env.PORT || 3001
app.get('/weather', handleGetWeather);
// app.get('/*' , (req,res) => res.status(403).send('not found'))

function handleGetWeather(req,res){
  const { lat, lon } = req.query;
  const url = `http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  const cityName = req.query.city;
  const lat = req.query.lat;
  const lon = req.query.lon;
  const cityToSend =weather.find(city=>{
    if((city.city_name === cityName)){
      return true;
    } return false;
  });
  if(cityToSend){
    const forecastData =cityToSend.data.map(city=> new Weatherforecast(city));
res.send(forecastData);
}else{
  res.send.status(404);
}
}

class Weatherforecast {
  constructor(obj){
    this.min_temp= obj.min_temp;
    this.max_temp=obj.max_temp;
    this.description = obj.weather.description;
  }
}

app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));