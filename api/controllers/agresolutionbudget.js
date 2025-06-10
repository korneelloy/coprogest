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
    const budgetAmount = req.body.budgetAmount;
    const budgetType = req.body.budgetType;
    const operationBudgetStart = req.body.operationBudgetStart;
    const operationBudgetEnd = req.body.operationBudgetEnd;
    const nbOfInstalments = req.body.nbOfInstalments;
    const budgetRecupTenant = req.body.budgetRecupTenant;
    const actif = req.body.actif;
    const idBudgetCategory = req.body.idBudgetCategory;
    const idAgResolution = req.body.idAgResolution;

    const agResolutionBudget = new AgResolutionBudget({
      id,
      budgetAmount,
      budgetType,
      operationBudgetStart,
      operationBudgetEnd,
      nbOfInstalments,
      budgetRecupTenant,
      actif,
      idBudgetCategory,
      idAgResolution
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
    const budgetAmount = req.body.budgetAmount;
    const budgetType = req.body.budgetType;
    const operationBudgetStart = req.body.operationBudgetStart;
    const operationBudgetEnd = req.body.operationBudgetEnd;
    const nbOfInstalments = req.body.nbOfInstalments;
    const budgetRecupTenant = req.body.budgetRecupTenant;
    const actif = req.body.actif;
    const idBudgetCategory = req.body.idBudgetCategory;
    const idAgResolution = req.body.idAgResolution;

    const agResolutionBudget = new AgResolutionBudget({
      id,
      budgetAmount,
      budgetType,
      operationBudgetStart,
      operationBudgetEnd,
      nbOfInstalments,
      budgetRecupTenant,
      actif,
      idBudgetCategory,
      idAgResolution
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
