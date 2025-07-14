/**
 * Express router for associatif table charge_line/charge payment related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const chargeLineChargePaymentController = require('../controllers/chargelinechargepayment');
const router = express.Router();

// Get all charge_line/charge payment relations
router.get('/', chargeLineChargePaymentController.getAll);

// Get  charge_line/charge payment relations by chargeline ID 
router.get('/bychargeline/:id_charge_line', chargeLineChargePaymentController.getAllByChargeLine);

// Get a singlecharge_line/charge payment relation by charge line ID + charge payment ID.
router.get('/:id_charge_line/:id_charge_payment', chargeLineChargePaymentController.getOne);

// Create a charge_line/charge payment relation
router.post('/', chargeLineChargePaymentController.postOne);

// Update a charge_line/charge payment relation by ID
router.put('/:id_charge_line/:id_charge_payment', chargeLineChargePaymentController.updateOne);


// Delete a charge_line/charge payment relation by ID
router.delete('/:id_charge_line/:id_charge_payment', chargeLineChargePaymentController.deleteOne);

module.exports = router;
