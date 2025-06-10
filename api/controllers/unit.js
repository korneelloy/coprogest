const Unit = require('../models/unit');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all units.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allUnits = await Unit.fetchAll();
    res.status(200).json(allUnits);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return a unit by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const unit = await Unit.get(id);
    res.status(200).json(unit);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new unit with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const name = req.body.name;
    const shares = req.body.shares;
    const description = req.body.description;

    const unit = new Unit({
      id,
      name,
      shares,
      description
    });
    
    const postResponse = await unit.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing unit identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const shares = req.body.shares;
    const description = req.body.description;

    const unit = new Unit({
      id,
      name,      
      shares,
      description
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
