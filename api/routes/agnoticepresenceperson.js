/**
 * Express router for associatif table agnoticepresence/person related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const agNoticePresencePersonController = require('../controllers/agnoticepresenceperson');
const router = express.Router();

// Get all agresolution/person relations
router.get('/', agNoticePresencePersonController.getAll);

// Get a single agresolution/person relation by agresolution ID + person ID.
router.get('/:id_ag_notice/:id_person', agNoticePresencePersonController.getOne);

// Create a agresolution/person relation
router.post('/', agNoticePresencePersonController.postOne);

// Update a agresolution/person relation by ID
router.put('/:id_ag_notice/:id_person', agNoticePresencePersonController.updateOne);

// Delete a agresolution/person relation by ID
router.delete('/:id_ag_notice/:id_person', agNoticePresencePersonController.deleteOne);

module.exports = router;
