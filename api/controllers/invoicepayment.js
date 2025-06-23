const InvoicePayment = require('../models/invoicepayment');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all invoice payments.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allInvoicePayments = await InvoicePayment.fetchAll();
    res.status(200).json(allInvoicePayments);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return a invoice payment by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const invoicePayment = await InvoicePayment.get(id);
    res.status(200).json(invoicePayment);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new invoice payment with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const amount = req.body.amount;
    const invoice_payment_date = req.body.invoice_payment_date;
    const description = req.body.description;
    const id_invoice = req.body.id_invoice;

    const invoicePayment = new InvoicePayment({
      id,
      amount,
      invoice_payment_date,
      description,
      id_invoice
    });
    
    const postResponse = await invoicePayment.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing invoice payment identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const amount = req.body.amount;
    const invoice_payment_date = req.body.invoice_payment_date;
    const description = req.body.description;
    const id_invoice = req.body.id_invoice;

    const invoicePayment = new InvoicePayment({
      id,
      amount,
      invoice_payment_date,
      description,
      id_invoice
    });
    
    
    const updateResponse = await invoicePayment.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a invoice payment by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await InvoicePayment.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
