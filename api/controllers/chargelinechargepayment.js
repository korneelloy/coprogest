const ChargeLineChargePayment = require('../models/chargelinechargepayment');

/**
 * Retrieve and return all charge_line/charge payments
 */
exports.getAll = async (req, res, next) => {
  try {
    const all = await ChargeLineChargePayment.fetchAll();
    res.status(200).json(all);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return all charge_line/charge paymentfor one charge line.
 */
exports.getAllByChargeLine = async (req, res, next) => {
  try {
    const id_charge_line = req.params.id_charge_line;
    const all = await ChargeLineChargePayment.getAllByChargeLine(id_charge_line);
    res.status(200).json(all);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


/**
 * Retrieve and return a charge_line/charge payment by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id_charge_line = req.params.id_charge_line;
    const id_charge_payment = req.params.id_charge_payment;
    const chargeLineChargePayment = await ChargeLineChargePayment.get(id_charge_line, id_charge_payment);
    res.status(200).json(chargeLineChargePayment);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new charge_line/charge payment with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id_charge_line = req.body.id_charge_line;
    const id_charge_payment = req.body.id_charge_payment;
    const partial_payment = req.body.partial_payment;

    const chargeLineChargePayment = new ChargeLineChargePayment({
      id_charge_line,
      id_charge_payment,
      partial_payment
    });
    
    const postResponse = await chargeLineChargePayment.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing charge_line/charge payment identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id_charge_line = req.params.id_charge_line;
    const id_charge_payment = req.params.id_charge_payment;
    const partial_payment = req.body.partial_payment;

    const chargeLineChargePayment = new ChargeLineChargePayment({
      id_charge_line,
      id_charge_payment,
      partial_payment
    });
    
    const updateResponse = await chargeLineChargePayment.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Delete a charge_line/charge payment by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id_charge_line = req.params.id_charge_line;
    const id_charge_payment = req.params.id_charge_payment;
    const chargeLineChargePayment = await ChargeLineChargePayment.delete(id_charge_line, id_charge_payment);
    res.status(200).json(chargeLineChargePayment);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
