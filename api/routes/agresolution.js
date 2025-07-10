/**
 * Express router for agresolution-related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const agResolutionController = require('../controllers/agresolution');
const router = express.Router();

// Get all ag resolutions
router.get('/', agResolutionController.getAll);

// Get all ag resolutions
router.get('/fetchallwithactifbudget', agResolutionController.fetchallwithactifbudget);

// Get all ag resolutions by ag notice
router.get('/getbyagnotice/:id_ag_notice', agResolutionController.getByAgNotice);

// Get all ag resolutions by ag minutes
router.get('/getbyagminutes/:id_ag_minutes', agResolutionController.getByAgMinutes);

// Get all ag resolutions/notice without minutes
router.get('/fetchAllNoticesWithoutMinutes', agResolutionController.getAllNoticesWithoutMinutes);


// Get a single ag resolution by ID
router.get('/:id', agResolutionController.getOne);

// Create a new ag resolution
router.post('/', agResolutionController.postOne);

// Update a ag resolution by ID
router.put('/:id', agResolutionController.updateOne);

// Update a ag/id_ag_minutes  by ID
router.patch('/agmin/:id', agResolutionController.patchAgMin);

// Update the status
router.patch('/status/:id/:status/:budgetActifStatus', agResolutionController.patchStatus);

// Delete a ag resolution by ID
router.delete('/:id', agResolutionController.deleteOne);



module.exports = router;
