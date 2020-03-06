const express = require('express');
const router  = express.Router();
// const movieData = require('../bin/seeds.js')
const mongoose = require('mongoose');
const Movie = require('../models/Movie.js');


mongoose
.connect('mongodb://localhost/movieDB', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.catch(err => console.error('Error connecting to mongo', err));

  /* GET home page */
router.get('/', (req, res, next) => {
  res.render('index.hbs', { img:'/images/cinema.jpg'} );
});

// router.get('/about', (req, res, next) => {
//   res.render('about.hbs', { 
//       greeting: "Welcome to Spanish Class", 
//       verbs: ['correr', 'saltar', 'caminar', 'estudiar', 'bailar', 'matar'],
//       words: [{  adjective: 'lindo'}, {  adjective: 'fao'}, {  adjective: 'bonito'}, {  adjective: 'chismosa'}],
//     })
// })


// router.get('/newpage', (req, res, next) => {
//   res.render('newpage')
// })


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

router.get('/movie/:movieId', (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then(theMovie => {
      res.render('movie-details', { movie: theMovie });
    })
    .catch(error => {
      console.log('Error while retrieving book details: ', error);
    })
});

// Movie.create(movieData)
// .then(movie => console.log('The movie is saved and its value is: ', movie))
// .catch(error =>
//   console.log('An error happened while looking for movie:', error)
// );

module.exports = router;
