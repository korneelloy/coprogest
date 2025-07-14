/**
 * Express router for charge line routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const chargeLineController = require('../controllers/chargeline');
const router = express.Router();

// Get all charge calls
router.get('/', chargeLineController.getAll);

// Get all charge calls by charge call id
router.get('/fetchbychargecallid/:chargeCallId', chargeLineController.fetchByChargeCallId);

// Get all charge calls not yet called
router.get('/fetchallnotcalled', chargeLineController.fetchAllNotCalled);

// Get all charge calls not yet called
router.get('/fetchallwithopenamounts', chargeLineController.fetchAllWithOpenAmounts);

// Get a single charge call by ID
router.get('/:id', chargeLineController.getOne);

// Create a new charge call
router.post('/', chargeLineController.postOne);

// Update a charge call by ID
router.put('/:id', chargeLineController.updateOne);

// Update a charge call by ID
router.patch('/:id', chargeLineController.updateIdChargeCall);

// Delete a document by ID
router.delete('/:id', chargeLineController.deleteOne);


module.exports = router;
