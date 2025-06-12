const AgResolution = require('../models/agresolution');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all agresolutions.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allAgResolutions = await AgResolution.fetchAll();
    res.status(200).json(allAgResolutions);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return a agresolution by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const agResolution = await AgResolution.get(id);
    res.status(200).json(agResolution);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new agresolution with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const title = req.body.title;
    const resolution_text = req.body.resolution_text;
    const required_majority = req.body.required_majority;
    const budget = req.body.budget;
    const id_ag_minutes = req.body.id_ag_minutes;
    const id_unit_group = req.body.id_unit_group;
    const id_ag_notice = req.body.id_ag_notice;

    const agResolution = new AgResolution({
      id,
      title,
      resolution_text,
      required_majority,
      budget,
      id_ag_minutes,
      id_unit_group,
      id_ag_notice
    });
    
    const postResponse = await agResolution.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing agresolution identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const resolution_text = req.body.resolution_text;
    const required_majority = req.body.required_majority;
    const budget = req.body.budget;
    const id_ag_minutes = req.body.id_ag_minutes;
    const id_unit_group = req.body.id_unit_group;
    const id_ag_notice = req.body.id_ag_notice;

    const agResolution = new AgResolution({
      id,
      title,
      resolution_text,
      required_majority,
      budget,
      id_ag_minutes,
      id_unit_group,
      id_ag_notice
    });
    
    const updateResponse = await agResolution.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a agresolution by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await AgResolution.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
