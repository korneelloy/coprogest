/**
 * Express router for agresolution-budget-related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const agResolutionBudgetController = require('../controllers/agresolutionbudget');
const router = express.Router();

// Get all ag resolution budgets
router.get('/', agResolutionBudgetController.getAll);

// Get a single ag resolution budget by ID
router.get('/:id', agResolutionBudgetController.getOne);

// Create a new ag resolution budget
router.post('/', agResolutionBudgetController.postOne);

// Update a ag resolution budget by ID
router.put('/:id', agResolutionBudgetController.updateOne);

// Delete a ag resolution budget by ID
router.delete('/:id', agResolutionBudgetController.deleteOne);

module.exports = router;
