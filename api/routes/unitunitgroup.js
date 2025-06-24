/**
/**
 * Express router for associatif table unit/unit group related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const unitUnitGroupController = require('../controllers/unitunitgroup');
const router = express.Router();

// Get all unit / unit group relations
router.get('/', unitUnitGroupController.getAll);

// Get all unit groups for a particular unit
router.get('/getByUnit/:id', unitUnitGroupController.getUnitGroupsByUnit);


// Get all units for a particular unit group
router.get('/getByUnitGroup/:id', unitUnitGroupController.getUnitGroupsByUnitGroup);

// Get a single unit / unit group relation by Unit ID + Unit Group Id
router.get('/:id_unit/:id_unit_group', unitUnitGroupController.getOne);

// Create a new unit / unit group relation
router.post('/', unitUnitGroupController.postOne);

// Update a unit / unit group relation by ID
router.put('/:id_unit/:id_unit_group', unitUnitGroupController.updateOne);

// Delete a unit / unit group relations by Unit ID
router.delete('/deleteByUnit/:id_unit', unitUnitGroupController.deleteAllByUnit);

// Delete a unit / unit group relation by ID
router.delete('/:id_unit/:id_unit_group', unitUnitGroupController.deleteOne);

module.exports = router;
