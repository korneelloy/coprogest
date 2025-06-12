const AgResolutionBudget = require('../models/agresolutionbudget');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all ag resolutions budgets.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allAgResolutionBudgets = await AgResolutionBudget.fetchAll();
    res.status(200).json(allAgResolutionBudgets);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return a ag resolution budget by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const agResolutionBudget = await AgResolutionBudget.get(id);
    res.status(200).json(agResolutionBudget);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new ag resolution budget with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const budget_amount = req.body.budget_amount;
    const budget_type = req.body.budget_type;
    const operating_budget_start = req.body.operating_budget_start;
    const operating_budget_end = req.body.operating_budget_end;
    const nb_of_instalments = req.body.nb_of_instalments;
    const budget_recup_tenant = req.body.budget_recup_tenant;
    const actif = req.body.actif;
    const id_budget_category = req.body.id_budget_category;
    const id_ag_resolution = req.body.id_ag_resolution;

    const agResolutionBudget = new AgResolutionBudget({
      id,
      budget_amount,
      budget_type,
      operating_budget_start,
      operating_budget_end,
      nb_of_instalments,
      budget_recup_tenant,
      actif,
      id_budget_category,
      id_ag_resolution
    });
    
    const postResponse = await agResolutionBudget.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing agresolution budget identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const budget_amount = req.body.budget_amount;
    const budget_type = req.body.budget_type;
    const operating_budget_start = req.body.operating_budget_start;
    const operating_budget_end = req.body.operating_budget_end;
    const nb_of_instalments = req.body.nb_of_instalments;
    const budget_recup_tenant = req.body.budget_recup_tenant;
    const actif = req.body.actif;
    const id_budget_category = req.body.id_budget_category;
    const id_ag_resolution = req.body.id_ag_resolution;

    const agResolutionBudget = new AgResolutionBudget({
      id,
      budget_amount,
      budget_type,
      operating_budget_start,
      operating_budget_end,
      nb_of_instalments,
      budget_recup_tenant,
      actif,
      id_budget_category,
      id_ag_resolution
    });

    const updateResponse = await agResolutionBudget.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a ag resolution budget by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await AgResolutionBudget.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
