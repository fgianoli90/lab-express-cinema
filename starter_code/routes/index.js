const express = require('express');
const router  = express.Router();
// const movieData = require('../bin/seeds.js')
const mongoose = require('mongoose');
const Movie = require('../models/Movie.js');

//connect to mongooseDB and initialize database
mongoose
.connect('mongodb://localhost/movieDB', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.catch(err => console.error('Error connecting to mongo', err));

  /* GET home page */
//Set up home page. This renders the homepage "/"
router.get('/', (req, res, next) => {
  res.render('index.hbs', { img:'/images/cinema.jpg'} );
});

//Iteration 3: List movies on movies page
router.get('/movies', (req, res, next) => {
  Movie.find()
    .then(eachMovie => {
      console.log('Retrieved movie from DB:', eachMovie);
      res.render('movies', { movies: eachMovie });
    })
    .catch(error => {
      console.log('Error while getting the movies from the DB: ', error);
    })
});

//Iteration 4: open up movie details page for movie selected. See movies.hbs to see where params is passed on <a></a> tag
router.get('/movie/:movieId', (req, res, next) => {
  Movie.findById(req.params.movieId) //Looks into 'Movie' data and finds param ID passed 
    .then(theMovie => {
      res.render('movie-details', { movie: theMovie });
    })
    .catch(error => {
      console.log('Error while retrieving book details: ', error);
    })
});

//Create movie database for iteration 3
// Movie.create(movieData)
// .then(movie => console.log('The movie is saved and its value is: ', movie))
// .catch(error =>
//   console.log('An error happened while looking for movie:', error)
// );
module.exports = router;

mongoose.connection.close();