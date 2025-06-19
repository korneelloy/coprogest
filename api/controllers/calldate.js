const CallDate = require('../models/calldate');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all call dates.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allCallDates = await CallDate.fetchAll();
    res.status(200).json(allCallDates);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return a call date by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const callDate = await CallDate.get(id);
    res.status(200).json(callDate);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new call date with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const date_call = req.body.date_call;


    const callDate = new CallDate({
      id,
      date_call
    });
    
    const postResponse = await callDate.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing call date identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const date_call = req.body.date_call; 

    const callDate = new CallDate({
      id,
      date_call
    });
    
    const updateResponse = await callDate.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a call date by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await CallDate.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
