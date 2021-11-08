'use strict'
const axios = require('axios');
const cache = require('./cache.js')

async function handleGetWeather(req,res){
    const {lat,lon} = req.query;
    try {
      let response = await axios.get(`http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`);
      let weatherData = response.data.data.map(data => new Weatherforecast(data));
      res.status(200).send(weatherData);
    } catch(error) {
        res.status(500).send('server error')
    }
  }

  class Weatherforecast {
    constructor(obj) {
      this.vis = obj.vis;
      this.wind_cdir = obj.wind_cdir;
      this.wind_spd = obj.wind_spd;
    }
  }

  module.exports = handleGetWeather