const ChargeLine = require('../models/chargeline');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all charge lines.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allChargeLines = await ChargeLine.fetchAll();
    res.status(200).json(allChargeLines);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return a charge line by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const chargeLine = await ChargeLine.get(id);
    res.status(200).json(chargeLine);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new charge line with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const amount = req.body.amount;
    const call_date = req.body.call_date;
    const state = req.body.state;    
    const id_unit = req.body.id_unit;
    const id_charge_call = req.body.id_charge_call;
    const id_ag_resolution = req.body.id_ag_resolution;

    const chargeLine = new ChargeLine({
      id,
      amount,
      call_date,
      state,
      id_unit,
      id_charge_call,
      id_ag_resolution
    });
    
    const postResponse = await chargeLine.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing charge line identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const amount = req.body.amount;
    const call_date = req.body.call_date;
    const state = req.body.state;    
    const id_unit = req.body.id_unit;
    const id_charge_call = req.body.id_charge_call;
    const id_ag_resolution = req.body.id_ag_resolution;

    const chargeLine = new ChargeLine({
      id,
      amount,
      call_date,
      state,
      id_unit,
      id_charge_call,
      id_ag_resolution
    });
    
    const updateResponse = await chargeLine.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a charge line by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await ChargeLine.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
