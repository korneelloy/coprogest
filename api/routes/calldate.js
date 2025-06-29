/**
 * Express router for call date routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const callDateController = require('../controllers/calldate');
const router = express.Router();

// Get all call dates
router.get('/', callDateController.getAll);

// Get all call date for one resolution
router.get('/byagresolution/:idAgResolution', callDateController.getAllByAgResolution);


// Get a single call date by ID
router.get('/:id', callDateController.getOne);

// Create a new calle date
router.post('/', callDateController.postOne);

// Update a call date by ID
router.put('/:id', callDateController.updateOne);

// Delete all call date for one resolution
router.delete('/deleteallbyagresolution/:idAgResolution', callDateController.deleteAllByAgResolution);

// Delete a call date by ID
router.delete('/:id', callDateController.deleteOne);

module.exports = router;
