/**
 * Express router for agresolution-related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const agResolutionController = require('../controllers/agresolution');
const router = express.Router();

// Get all ag resolutions
router.get('/', agResolutionController.getAll);

// Get all ag resolutions by ag notice
router.get('/getbyagnotice/:id_ag_notice', agResolutionController.getByAgNotice);

// Get a single ag resolution by ID
router.get('/:id', agResolutionController.getOne);

// Create a new ag resolution
router.post('/', agResolutionController.postOne);

// Update a ag resolution by ID
router.put('/:id', agResolutionController.updateOne);

// Delete a ag resolution by ID
router.delete('/:id', agResolutionController.deleteOne);

module.exports = router;
