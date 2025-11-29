const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET register
router.get('/register', (req, res) => {
  res.render('auth/register', { errors: [] });
});

// POST register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const errors = [];

  if (!username || !email || !password) errors.push('All fields are required.');
  if (password && password.length < 6) errors.push('Password must be at least 6 characters.');

  if (errors.length) return res.render('auth/register', { errors, username, email });

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      errors.push('Email already registered.');
      return res.render('auth/register', { errors, username, email });
    }
    const user = new User({ username, email, password });
    await user.save();
    req.session.user = { _id: user._id, username: user.username, email: user.email };
    return res.redirect('/');
  } catch (err) {
    console.error(err);
    errors.push('Registration failed — try again.');
    return res.render('auth/register', { errors, username, email });
  }
});

// GET login
router.get('/login', (req, res) => {
  res.render('auth/login', { errors: [] });
});

// POST login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const errors = [];
  if (!email || !password) {
    errors.push('Email and password required.');
    return res.render('auth/login', { errors, email });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      errors.push('Invalid credentials.');
      return res.render('auth/login', { errors, email });
    }
    const match = await user.comparePassword(password);
    if (!match) {
      errors.push('Invalid credentials.');
      return res.render('auth/login', { errors, email });
    }
    req.session.user = { _id: user._id, username: user.username, email: user.email };
    return res.redirect('/');
  } catch (err) {
    console.error(err);
    errors.push('Login failed - try again.');
    return res.render('auth/login', { errors, email });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    return res.redirect('/');
  });
});

module.exports = router;
