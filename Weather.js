'use strict'
const axios = require('axios');
const { response } = require('express');
const cache = require('./cache.js')

function getWeather(request, response){
    const {lat,lon} = request.query;
    if(cache[{lat,lon}] && Date.now()-Date.now()<50000) {
      console.log("cache hit")
      response.status(200).send(cache[{lat,lon}]);
      return;
    }
    const link = `http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;


axios
.get(link)
.then(result => {
  let weatherData = result.data.data.map(data => new Weatherforecast(data));
  console.log("cache miss");
  cache[{lat,lon}] = weatherData;
  response.status(200).send(weatherData);
})
  .catch(error => {
    console.error(`error`,error);
    response.status(200).send('Sorry. Something went wrong!')
  })
}
  class Weatherforecast {
    constructor(obj) {
      this.vis = obj.vis;
      this.wind_cdir = obj.wind_cdir;
      this.wind_spd = obj.wind_spd;
    }
  }

  module.exports = getWeather



  // try {
    //   let response = await axios.get(`http://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`);
    //   let weatherData = response.data.data.map(data => new Weatherforecast(data));
    //   res.status(200).send(weatherData);
    // } catch(error) {
    //     res.status(500).send('server error')
    // }