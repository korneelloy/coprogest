/**
 * Express router for associatif table agnotice/person related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const agNoticeSentPersonController = require('../controllers/agnoticesentperson');
const router = express.Router();

// Get all agnotice/person relations
router.get('/', agNoticeSentPersonController.getAll);

// Create a new agnotice/person relation
router.post('/', agNoticeSentPersonController.postOne);

// Delete a agnotice/person relation by ID
router.delete('/:id_ag_notice/:id_person', agNoticeSentPersonController.deleteOne);

module.exports = router;
