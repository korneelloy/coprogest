const ChargePayment = require('../models/chargepayment');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all charge payments.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allChargePayments = await ChargePayment.fetchAll();
    res.status(200).json(allChargePayments);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return a charge payment by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const chargePayment = await ChargePayment.get(id);
    res.status(200).json(chargePayment);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new charge payment with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const amount = req.body.amount;
    const charge_payment_date = req.body.charge_payment_date;
    const description = req.body.description;

    const chargePayment = new ChargePayment({
      id,
      amount,
      charge_payment_date,
      description
    });
    
    const postResponse = await chargePayment.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing charge payment identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const amount = req.body.amount;
    const charge_payment_date = req.body.charge_payment_date;
    const description = req.body.description;

    const chargePayment = new ChargePayment({
      id,
      amount,
      charge_payment_date,
      description
    });
    
    const updateResponse = await chargePayment.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a charge payment by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await ChargePayment.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
