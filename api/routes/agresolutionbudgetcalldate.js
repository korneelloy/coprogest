/**
 * Express router for associatif table agresolution/calldate related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const agResolutionBudgetCallDateController = require('../controllers/agresolutionbudgetcalldate');
const router = express.Router();

// Get all agresolution/calldate relations
router.get('/', agResolutionBudgetCallDateController.getAll);

// Create a new agresolution/calldate relation
router.post('/', agResolutionBudgetCallDateController.postOne);

// Delete a agresolution/calldate relation by ID
router.delete('/:id_ag_resolution_budget/:id_call_date', agResolutionBudgetCallDateController.deleteOne);

module.exports = router;
