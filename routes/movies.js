// routes/movies.js
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// require-logged-in middleware
function ensureLoggedIn(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/login');
}

// ======= NEW: GET /movies  (index) =======
// List all movies (so /movies works as a home/list page)
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().populate('user', 'username').sort({ createdAt: -1 });
    // Render the same index view you use at '/'
    res.render('index', { movies, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// GET add movie form
router.get('/add', ensureLoggedIn, (req, res) => {
  res.render('movies/add', { errors: [] });
});

// POST add movie
router.post('/add', ensureLoggedIn, async (req, res) => {
  const { name, description, year, genres, rating } = req.body;
  const errors = [];
  if (!name || !description) errors.push('Name and description are required.');
  if (rating && (rating < 0 || rating > 10)) errors.push('Rating must be between 0 and 10.');
  if (errors.length) return res.render('movies/add', { errors, name, description, year, genres, rating });

  try {
    await Movie.create({
      name,
      description,
      year: year ? Number(year) : undefined,
      genres, // stored as string in your model; convert to array if you change the model
      rating: rating ? Number(rating) : undefined,
      user: req.session.user._id
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    errors.push('Could not add movie.');
    res.render('movies/add', { errors, name, description, year, genres, rating });
  }
});

// GET movie details
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('user', 'username');
    if (!movie) return res.redirect('/');
    res.render('movies/details', { movie });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// GET edit form (only owner)
router.get('/:id/edit', ensureLoggedIn, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.redirect('/');
    // owner check
    if (!req.session.user || String(movie.user) !== String(req.session.user._id)) return res.redirect('/');
    res.render('movies/edit', { movie, errors: [] });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// PUT edit (only owner)
router.put('/:id', ensureLoggedIn, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.redirect('/');
    if (!req.session.user || String(movie.user) !== String(req.session.user._id)) return res.redirect('/');

    const { name, description, year, genres, rating } = req.body;
    movie.name = name;
    movie.description = description;
    movie.year = year ? Number(year) : undefined;
    movie.genres = genres;
    movie.rating = rating ? Number(rating) : undefined;

    await movie.save();
    res.redirect(`/movies/${movie._id}`);
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// DELETE movie (only owner)
router.delete('/:id', ensureLoggedIn, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.redirect('/');
    if (!req.session.user || String(movie.user) !== String(req.session.user._id)) return res.redirect('/');
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
