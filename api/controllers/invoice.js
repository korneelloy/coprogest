const Invoice = require('../models/invoice');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all invoices.
 */
exports.getAll = async (req, res, next) => {
  try {
    const all = await Invoice.fetchAll();
    res.status(200).json(all);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


/**
 * Retrieve and return all invoices.
 */
exports.fetchByResolution = async (req, res, next) => {
  try {
    const idAgResolution = req.params.idAgResolution;
    const all = await Invoice.fetchByResolution(idAgResolution);
    res.status(200).json(all);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return an invoice by it's ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const invoice = await Invoice.get(id);
    res.status(200).json(invoice);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new invoice with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const amount = req.body.amount;
    const invoice_date = req.body.invoice_date;
    const description = req.body.description;
    const state = req.body.state;
    const id_ag_resolution = req.body.id_ag_resolution;

    const invoice = new Invoice({
      id,
      amount,
      invoice_date,
      description,
      state,
      id_ag_resolution
    });
    const postResponse = await invoice.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing invoice identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const amount = req.body.amount;
    const invoice_date = req.body.invoice_date;
    const description = req.body.description;
    const state = req.body.state;
    const id_ag_resolution = req.body.id_ag_resolution;


    const invoice = new Invoice({
      id,
      amount,
      invoice_date,
      description,
      state,
      id_ag_resolution
    });

    const updateResponse = await invoice.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a invoice by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await Invoice.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
