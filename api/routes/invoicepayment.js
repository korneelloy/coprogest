/**
 * Express router for invoice payment routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const invoicePaymentController = require('../controllers/invoicepayment');
const router = express.Router();

// Get all invoice payments
router.get('/', invoicePaymentController.getAll);

// Get a single invoice payment by ID
router.get('/:id', invoicePaymentController.getOne);

// Create a new invoice payment
router.post('/', invoicePaymentController.postOne);

// Update a invoice payment by ID
router.put('/:id', invoicePaymentController.updateOne);

// Delete a invoice payment by ID
router.delete('/:id', invoicePaymentController.deleteOne);


module.exports = router;
