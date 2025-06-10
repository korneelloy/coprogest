const AgNotice = require('../models/agnotice');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all ag notices.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allAgNotices = await AgNotice.fetchAll();
    res.status(200).json(allAgNotices);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return an ag notice by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const agNotice = await AgNotice.get(id);
    res.status(200).json(agNotice);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new ag notice with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const title = req.body.title;
    const place = req.body.place;
    const agDate = req.body.agDate;

    const agNotice = new AgNotice({
      id,
      title,
      place,
      agDate
    });
    
    const postResponse = await agNotice.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing ag notice identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const place = req.body.place;
    const agDate = req.body.agDate; 

    const agNotice = new AgNotice({
      id,
      title,
      place,
      agDate
    });
    
    const updateResponse = await agNotice.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a ag notice by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await AgNotice.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
