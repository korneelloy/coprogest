/**
 * Express router for charge payment routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const chargePaymentController = require('../controllers/chargepayment');
const router = express.Router();

// Get all charge calls
router.get('/', chargePaymentController.getAll);

// Get all charge calls per person
router.get('/fetchallperperson/:personId', chargePaymentController.fetchAllPerPerson);

// Get a single charge call by ID
router.get('/:id', chargePaymentController.getOne);

// Create a new charge call
router.post('/', chargePaymentController.postOne);

// Update a charge call by ID
router.put('/:id', chargePaymentController.updateOne);

// Delete a document by ID
router.delete('/:id', chargePaymentController.deleteOne);


module.exports = router;
