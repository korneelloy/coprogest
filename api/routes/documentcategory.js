/**
 * Express router for document-category related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const documentCategoryController = require('../controllers/documentcategory');
const router = express.Router();

// Get all document categories
router.get('/', documentCategoryController.getAll);

// Get a single document category by ID
router.get('/:id', documentCategoryController.getOne);

// Create a new document category
router.post('/', documentCategoryController.postOne);

// Update a document category by ID
router.put('/:id', documentCategoryController.updateOne);

// Delete a document category by ID
router.delete('/:id', documentCategoryController.deleteOne);

module.exports = router;
