const Role = require('../models/role');

/**
 * Retrieve and return all roles.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allRoles = await Role.fetchAll();
    res.status(200).json(allRoles);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return a role by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = await Role.get(id);
    res.status(200).json(role);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
