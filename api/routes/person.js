/**
 * Express router for person-related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const personController = require('../controllers/person');
const router = express.Router();

// Get all persons
router.get('/', personController.getAll);

// Get a single person by ID
router.get('/:id', personController.getOne);

// Create a new person
router.post('/', personController.postOne);

// Update a person by ID
router.put('/:id', personController.updateOne);

// Update the password
router.patch('/:id', personController.updatePw);

module.exports = router;
