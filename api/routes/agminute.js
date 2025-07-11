/**
 * Express router for ag minutes-related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const agMinuteController = require('../controllers/agminute');
const router = express.Router();
const docxMinuteController = require('../controllers/docxminute');

// Get all ag minutes
router.get('/', agMinuteController.getAll);

router.get('/generateminutes/:id', docxMinuteController.generateMinute);

router.get('/:id/download', agMinuteController.downloadOne);

// Get a single ag minute by ID
router.get('/:id', agMinuteController.getOne);

// Create a new ag minute
router.post('/', agMinuteController.postOne);

// Update a ag minute by ID
router.put('/:id', agMinuteController.updateOne);

// Delete a ag minute by ID
router.delete('/:id', agMinuteController.deleteOne);

module.exports = router;
