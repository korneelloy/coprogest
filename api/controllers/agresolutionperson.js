const AgResolutionPerson = require('../models/agresolutionperson');

/**
 * Retrieve and return all agresolution/person.
 */
exports.getAll = async (req, res, next) => {
  try {
    const all = await AgResolutionPerson.fetchAll();
    res.status(200).json(all);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return all agresolution/person for on eresolution.
 */
exports.getAllByAgResolution = async (req, res, next) => {
  try {
    const id_ag_resolution = req.params.id_ag_resolution;
    const all = await AgResolutionPerson.getAllByAgResolution(id_ag_resolution);
    res.status(200).json(all);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


/**
 * Retrieve and return a agresolution/person by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id_ag_resolution = req.params.id_ag_resolution;
    const id_person = req.params.id_person;
    const agresolutionperson = await AgResolutionPerson.get(id_ag_resolution, id_person);
    res.status(200).json(agresolutionperson);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new agresolution/person with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id_ag_resolution = req.body.id_ag_resolution;
    const id_person = req.body.id_person;
    const vote = req.body.vote;

    const unitUnitGroup = new AgResolutionPerson({
      id_ag_resolution,
      id_person,
      vote
    });
    
    const postResponse = await unitUnitGroup.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing agresolution/person identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id_ag_resolution = req.params.id_ag_resolution;
    const id_person = req.params.id_person;
    const vote = req.body.vote;

    const unit = new AgResolutionPerson({
      id_ag_resolution,
      id_person,
      vote
    });
    
    const updateResponse = await unit.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Delete all agresolution/person by its resolution ID.
 */
exports.deleteAllByAgResolution = async (req, res, next) => {
  try {
    const id_ag_resolution = req.params.id_ag_resolution;
    const deleteResponse = await AgResolutionPerson.deleteAllByAgResolution(id_ag_resolution);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Delete a agresolution/person by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id_ag_resolution = req.params.id_ag_resolution;
    const id_person = req.params.id_person;
    const deleteResponse = await AgResolutionPerson.delete(id_ag_resolution, id_person);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
