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
    const description = req.body.description;
    const requiredMajority = req.body.requiredMajority;
    const budget = req.body.budget;
    const idAgMinutes = req.body.idAgMinutes;
    const idUnitGroup = req.body.idUnitGroup;
    const idAgNotice = req.body.idAgNotice;

    const agResolution = new AgResolution({
      id,
      title,
      description,
      requiredMajority,
      budget,
      idAgMinutes,
      idUnitGroup,
      idAgNotice
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
    const description = req.body.description;
    const requiredMajority = req.body.requiredMajority;
    const budget = req.body.budget;
    const idAgMinutes = req.body.idAgMinutes;
    const idUnitGroup = req.body.idUnitGroup;
    const idAgNotice = req.body.idAgNotice;

    const agResolution = new AgResolution({
      id,
      title,
      description,
      requiredMajority,
      budget,
      idAgMinutes,
      idUnitGroup,
      idAgNotice
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
