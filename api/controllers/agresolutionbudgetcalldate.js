const AgResolutionBudgetCallDate = require('../models/agresolutionbudgetcalldate');

/**
 * Retrieve and return all agresolution/calldates.
 */
exports.getAll = async (req, res, next) => {
  try {
    const all = await AgResolutionBudgetCallDate.fetchAll();
    res.status(200).json(all);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Create a new agresolution/calldate with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id_ag_resolution_budget = req.body.id_ag_resolution_budget;
    const id_call_date = req.body.id_call_date;

    const agResolutionBudgetCallDate = new AgResolutionBudgetCallDate({
      id_ag_resolution_budget,
      id_call_date
    });
    
    const postResponse = await agResolutionBudgetCallDate.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a agresolution/calldate by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id_ag_resolution_budget = req.params.id_ag_resolution_budget;
    const id_call_date = req.params.id_call_date;
    const deleteResponse = await AgResolutionBudgetCallDate.delete(id_ag_resolution_budget, id_call_date);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
