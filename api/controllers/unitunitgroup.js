const UnitUnitGroup = require('../models/unitunitgroup');

/**
 * Retrieve and return all units / unit groups.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allUnitUnitGroups = await UnitUnitGroup.fetchAll();
    res.status(200).json(allUnitUnitGroups);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return all unit groups for one unit.
 */
exports.getUnitGroupsByUnit = async (req, res, next) => {
  try {
    const unitId = req.params.id;
    const allUnitUnitGroupsByUnit = await UnitUnitGroup.fetchAllByUnit(unitId);
    res.status(200).json(allUnitUnitGroupsByUnit);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return all units for one unit group.
 */
exports.getUnitGroupsByUnitGroup = async (req, res, next) => {
  try {
    const unitGroupId = req.params.id;
    const allUnitUnitGroupsByUnitGroup = await UnitUnitGroup.fetchAllByUnitGroup(unitGroupId);
    res.status(200).json(allUnitUnitGroupsByUnitGroup);
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
    const id_unit = req.params.id_unit;
    const id_unit_group = req.params.id_unit_group;
    const unitunitgroup = await UnitUnitGroup.get(id_unit, id_unit_group);
    res.status(200).json(unitunitgroup);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new unit / unit group with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id_unit = req.body.id_unit;
    const id_unit_group = req.body.id_unit_group;
    let adjusted_shares = req.body.adjusted_shares;

    const unitUnitGroup = new UnitUnitGroup({
      id_unit,
      id_unit_group,
      adjusted_shares
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
 * Update an existing unit / unit group identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id_unit = req.params.id_unit;
    const id_unit_group = req.params.id_unit_group;
    const adjusted_shares = req.body.adjusted_shares;

    const unit = new UnitUnitGroup({
      id_unit,
      id_unit_group,
      adjusted_shares
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
 * Delete all unit - unitgroup by its unit ID.
 */
exports.deleteAllByUnit = async (req, res, next) => {
  try {
    const id_unit = req.params.id_unit;
    const deleteResponse = await UnitUnitGroup.deleteAllByUnit(id_unit);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};



/**
 * Delete a unit - unitgroup by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id_unit = req.params.id_unit;
    const id_unit_group = req.params.id_unit_group;
    const deleteResponse = await UnitUnitGroup.delete(id_unit, id_unit_group);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
