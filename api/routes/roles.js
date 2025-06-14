/**
 * Express router for role-related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const roleController = require('../controllers/role');
const router = express.Router();

// Get all roles
router.get('/', roleController.getAll);

// Get a single role by ID
router.get('/:id', roleController.getOne);

module.exports = router;
