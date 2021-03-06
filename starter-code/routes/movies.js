const express = require('express');
const { _router } = require('../app');
const router = express.Router();

const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

router.get('/movies', (req, res) => {
  console.log('new movies page');
  Movie.find()
    .populate('cast')
    .then((movies) => {
      console.log(movies);
      res.render('movies/index', { moviesList: movies });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/movies/new', (req, res) => {
  Celebrity.find().then((dbCelebrities) => {
    res.render('movies/new', { celebrities: dbCelebrities });
  });
});

router.get('/movies/:id/edit', (req, res) => {
    Movie.findById(req.params.id)
    .then((movie) => {
      Celebrity.find()
      .then (celebs => {
        // console.log(celebs);
        res.render('movies/edit', { movie, celebs })
      })
    })
    .catch(err => console.log(err))
  })
//   router.get('/movies/:id/edit', async (req, res) => {
//     const movie = await Movie.findById(req.params.id);
//     const celebs = await Celebrity.find();
//     res.render('movies/edit', { movie, celebs })
    

router.post('/movies', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  console.log(title, genre, plot, cast);
  Movie.create({
    title,
    genre,
    plot,
    cast
  })
    .then((movie) => {
      console.log(`${movie.name} was added to the database`);
      res.redirect('/movies');
    })
    .catch((err) => {
      console.log(err);
      res.render('/movies/new');
    });
});

router.post('/movies/:id/edit', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(req.params.id, {
        title,
        genre,
        plot,
        cast
    }).then(() => {
      res.redirect('/movies');
    });
  });

module.exports = router;
