/**
 * Express router for unitgroup-related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const unitgroupController = require('../controllers/unitgroup');
const router = express.Router();

// Get all unitgroups
router.get('/', unitgroupController.getAll);

// Get a single unitgroup by ID
router.get('/:id', unitgroupController.getOne);

// Create a new unitgroup
router.post('/', unitgroupController.postOne);

// Update a unitgroup by ID
router.put('/:id', unitgroupController.updateOne);

// Delete a unitgroup by ID
router.delete('/:id', unitgroupController.deleteOne);

module.exports = router;
