'use strict';


require('dotenv').config();
const app = require('express')();
const axios = require('axios');
const cors = require('cors');
app.use(cors());
const handleGetWeather = require("./Weather.js");
const handleGetMovies = require("./Movies.js")

const PORT = process.env.PORT 

app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);

app.get('/*' , (req,res) => res.status(403).send('not found'))
 
app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));

