/**
 * Express router for contact routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const contactController = require('../controllers/contact');
const router = express.Router();

// post a new message
router.post('/new', contactController.postOne);

module.exports = router;
