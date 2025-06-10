/**
 * Express router for unit-related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const unitController = require('../controllers/unit');
const router = express.Router();

// Get all units
router.get('/', unitController.getAll);

// Get a single unit by ID
router.get('/:id', unitController.getOne);

// Create a new unit
router.post('/', unitController.postOne);

// Update a unit by ID
router.put('/:id', unitController.updateOne);

module.exports = router;
