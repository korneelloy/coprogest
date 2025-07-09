const ChargeCall = require('../models/chargecall');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all charge calls.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allChargeCalls = await ChargeCall.fetchAll();
    res.status(200).json(allChargeCalls);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return all charge calls.
 */
exports.getAllByPerson = async (req, res, next) => {
  try {
    const personId = req.params.personId;
    const allChargeCallsByPerson = await ChargeCall.getAllByPerson(personId);
    res.status(200).json(allChargeCallsByPerson);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


/**
 * Retrieve and return a charge call by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const chargeCall = await ChargeCall.get(id);
    res.status(200).json(chargeCall);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new charge call with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const charge_call_date = req.body.charge_call_date;
    const id_person = req.body.id_person;

    const chargeCall = new ChargeCall({
      id,
      charge_call_date,
      id_person
    });
    
    const postResponse = await chargeCall.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing charge call identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const charge_call_date = req.body.charge_call_date;
    const id_person = req.body.id_person;

    const chargeCall = new ChargeCall({
      id,
      charge_call_date,
      id_person
    });
    
    
    const updateResponse = await chargeCall.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a charge call by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await ChargeCall.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
