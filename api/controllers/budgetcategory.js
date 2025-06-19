const BudgetCategory = require('../models/budgetcategory');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all budget categories.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allBudgetCategories = await BudgetCategory.fetchAll();
    res.status(200).json(allBudgetCategories);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return a budget category by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const budgetCategory = await BudgetCategory.get(id);
    res.status(200).json(budgetCategory);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new budget category with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const name = req.body.name;


    const budgetCategory = new BudgetCategory({
      id,
      name
    });
    
    const postResponse = await budgetCategory.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing budget category identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name; 

    const budgetCategory = new BudgetCategory({
      id,
      name
    });
    
    const updateResponse = await budgetCategory.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a budget category by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await BudgetCategory.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
