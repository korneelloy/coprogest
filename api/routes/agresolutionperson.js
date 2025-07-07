/**
 * Express router for associatif table agresolution/person related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const agResolutionPersonController = require('../controllers/agresolutionperson');
const router = express.Router();

// Get all agresolution/person relations
router.get('/', agResolutionPersonController.getAll);


// Get  agresolution/person relations by agresolution ID 
router.get('/byagresolution/:id_ag_resolution', agResolutionPersonController.getAllByAgResolution);

// Get a single agresolution/person relation by agresolution ID + person ID.
router.get('/:id_ag_resolution/:id_person', agResolutionPersonController.getOne);

// Create a agresolution/person relation
router.post('/', agResolutionPersonController.postOne);

// Update a agresolution/person relation by ID
router.put('/:id_ag_resolution/:id_person', agResolutionPersonController.updateOne);

// xxxxxxxxxxxxxxxxxxxxxxx Delete all agresolution/person relations by agresolution ID
router.delete('/deleteallbyagresolution/:id_ag_resolution', agResolutionPersonController.deleteAllByAgResolution);

// Delete a agresolution/person relation by ID
router.delete('/:id_ag_resolution/:id_person', agResolutionPersonController.deleteOne);

module.exports = router;
