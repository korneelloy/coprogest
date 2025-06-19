/**
 * Express router for budget category routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const budgetCategoryController = require('../controllers/budgetcategory');
const router = express.Router();

// Get all budget categories
router.get('/', budgetCategoryController.getAll);

// Get a single budget category by ID
router.get('/:id', budgetCategoryController.getOne);

// Create a new budget category
router.post('/', budgetCategoryController.postOne);

// Update a budget category by ID
router.put('/:id', budgetCategoryController.updateOne);

// Delete a budget category by ID
router.delete('/:id', budgetCategoryController.deleteOne);

module.exports = router;
