'use strict';


require('dotenv').config();
const app = require('express')();
const axios = require('axios');
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT 

app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);



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

async function handleGetMovies(req,res){
  const {query} = req.query;
  try {
    let response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&images&language=en-US&query=${query}`);
    let movieData = response.data.results.map(results => new Movies(results));
    res.status(200).send(movieData);
  } catch(error) {
      res.status(500).send('server error')
  }
}

app.get('/*' , (req,res) => res.status(403).send('not found'))
 
class Weatherforecast {
  constructor(obj) {
    this.vis = obj.vis;
    this.wind_cdir = obj.wind_cdir;
    this.wind_spd = obj.wind_spd;
  }
}


class Movies {
  constructor(obj) {
    this.original_title = obj.original_title
    this.overview = obj.overview
    this.vote_average = obj.vote_average
    this.vote_count = obj.vote_count
    this.img = obj.poster_path
    this.popularity = obj.popularity
    this.release_date = obj.release_date
    this.id = obj.id
  }
}

app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));

