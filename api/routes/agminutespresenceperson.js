/**
 * Express router for associatif table ag minutes presence/person related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const agMinutesPresencePersonController = require('../controllers/agminutespresenceperson');
const router = express.Router();

// Get all agminutes/person relations
router.get('/', agMinutesPresencePersonController.getAll);

// Get all agminutes/person by minutes
router.get('/getbyminutes/:agMinutesId', agMinutesPresencePersonController.getByMinutes);

// Get a single agminutes/person relation by agresolution ID + person ID.
router.get('/:id_ag_minutes/:id_person', agMinutesPresencePersonController.getOne);

// Create a agminutes/person relation
router.post('/', agMinutesPresencePersonController.postOne);

// Update a ag minutes/person relation by ID
router.put('/:id_ag_minutes/:id_person', agMinutesPresencePersonController.updateOne);

// Delete a ag minutes/person relation by minutes
router.delete('/deletebyminutes/:id_ag_minutes', agMinutesPresencePersonController.deleteByMinutes);

// Delete a ag minutes/person relation by ID
router.delete('/:id_ag_minutes/:id_person', agMinutesPresencePersonController.deleteOne);

module.exports = router;
