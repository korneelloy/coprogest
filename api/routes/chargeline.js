/**
 * Express router for charge line routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const chargeLineController = require('../controllers/chargeline');
const router = express.Router();

// Get all charge calls
router.get('/', chargeLineController.getAll);

// Get a single charge call by ID
router.get('/:id', chargeLineController.getOne);

// Create a new charge call
router.post('/', chargeLineController.postOne);

// Update a charge call by ID
router.put('/:id', chargeLineController.updateOne);

// Delete a document by ID
router.delete('/:id', chargeLineController.deleteOne);


module.exports = router;
