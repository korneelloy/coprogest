/**
 * Express router for invoice routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const invoiceController = require('../controllers/invoice');
const router = express.Router();

// Get all invoices
router.get('/', invoiceController.getAll);

// Get all invoices by resolution
router.get('/fetchbyresolution/:idAgResolution', invoiceController.fetchByResolution);

// Get a single invoice by ID
router.get('/:id', invoiceController.getOne);

// Create a new invoice
router.post('/', invoiceController.postOne);

// Update an invoice by ID
router.put('/:id', invoiceController.updateOne);

// Delete an invoice by ID
router.delete('/:id', invoiceController.deleteOne);

module.exports = router;
