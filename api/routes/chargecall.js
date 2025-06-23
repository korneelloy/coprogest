/**
 * Express router for charge call routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const chargeCallController = require('../controllers/chargecall');
const router = express.Router();

// Get all charge calls
router.get('/', chargeCallController.getAll);

// Get a single charge call by ID
router.get('/:id', chargeCallController.getOne);

// Create a new charge call
router.post('/', chargeCallController.postOne);

// Update a charge call by ID
router.put('/:id', chargeCallController.updateOne);

// Delete a document by ID
router.delete('/:id', chargeCallController.deleteOne);


module.exports = router;
