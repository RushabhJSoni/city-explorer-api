'use strict';


require('dotenv').config();
const app = require('express')();
const axios = require('axios');
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT 

app.get('/weather', handleGetWeather);

app.get('/*' , (req,res) => res.status(403).send('not found'))

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

app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));

