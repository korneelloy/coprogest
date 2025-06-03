/**
 * Express router for document-related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const documentController = require('../controllers/document');
const router = express.Router();

// Get all documents
router.get('/', documentController.getAll);

// Get a single document by ID
router.get('/:id', documentController.getOne);

// Create a new document
router.post('/', documentController.postOne);

// Update a document by ID
router.put('/:id', documentController.updateOne);

// Delete a document by ID
router.delete('/:id', documentController.deleteOne);

module.exports = router;
