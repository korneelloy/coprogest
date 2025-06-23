const AgMinute = require('../models/agminute');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all ag minutes.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allAgMinutes = await AgMinute.fetchAll();
    res.status(200).json(allAgMinutes);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return an ag minute by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const agMinute = await AgMinute.get(id);
    res.status(200).json(agMinute);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new ag minute with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const minutes_date = req.body.minutes_date;
    const place = req.body.place;

    const agMinute = new AgMinute({
      id,
      minutes_date,
      place
    });
    
    const postResponse = await agMinute.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing ag minute identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const minutes_date = req.body.minutes_date;
    const place = req.body.place;

    const agMinute = new AgMinute({
      id,
      minutes_date,
      place
    });
    
    const updateResponse = await agMinute.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a ag minute by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await AgMinute.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
