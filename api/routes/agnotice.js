/**
 * Express router for ag notice-related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const agNoticeController = require('../controllers/agnotice');
const router = express.Router();
const docxController = require('../controllers/docxconvocation');

// Get all ag notices
router.get('/', agNoticeController.getAll);

// Route to generate a Word (.docx) file for a specific AG notice
router.get('/generateconvocations/:id', docxController.generateConvocation);

// Get a single ag notice by ID
router.get('/:id', agNoticeController.getOne);

// Create a new ag notice
router.post('/', agNoticeController.postOne);

// Update a ag notice by ID
router.put('/:id', agNoticeController.updateOne);

// Delete a ag notice by ID
router.delete('/:id', agNoticeController.deleteOne);

module.exports = router;
