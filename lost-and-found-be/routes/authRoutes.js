// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// (generateToken function here)

// @route   POST /api/auth/register
// @desc    Register a new user account
// @access  Public
router.post('/register', async (req, res) => { // <--- ENSURE NO MIDDLEWARE HERE!
    // ... your registration logic ...
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get a login token
// @access  Public
router.post('/login', async (req, res) => { // <--- ENSURE NO MIDDLEWARE HERE!
    // ... your login logic ...
});

module.exports = router;