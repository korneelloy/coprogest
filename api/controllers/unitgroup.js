const Unitgroup = require('../models/unitgroup');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all unitgroups.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allUnitGroups = await Unitgroup.fetchAll();
    res.status(200).json(allUnitGroups);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return all unique unitgroups.
 */
exports.getAllUnique = async (req, res, next) => {
  try {
    const allUnitGroups = await Unitgroup.getAllUnique();
    res.status(200).json(allUnitGroups);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return a unitgroup by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const unitGroup = await Unitgroup.get(id);
    res.status(200).json(unitGroup);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new unitgroup with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const name = req.body.name;
    const description = req.body.description;
    const special_shares = req.body.special_shares;
    const selectedUnits = req.body.selectedUnits;

    const unitGroup = new Unitgroup({
      id,
      name,
      description,
      special_shares,
      selectedUnits
    });
    
    const postResponse = await unitGroup.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing unitgroup identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const special_shares = req.body.special_shares;
    const selectedUnits = req.body.selectedUnits;

    const unitGroup = new Unitgroup({
      id,
      name,
      description,
      special_shares,
      selectedUnits
    });
    
    const updateResponse = await unitGroup.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a unitgroup by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await Unitgroup.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
