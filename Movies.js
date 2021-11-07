'use strict'
const axios = require('axios');



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

  module.exports = handleGetMovies