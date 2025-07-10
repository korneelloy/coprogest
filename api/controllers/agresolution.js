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
 * Get all ag resolutions/notice without minutes
 */
exports.getAllNoticesWithoutMinutes = async (req, res, next) => {
  try {
    const agResWithoutMinutes = await AgResolution.getAllNoticesWithoutMinutes();
    res.status(200).json(agResWithoutMinutes);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Get all ag resolutions/notice without minutes
 */
exports.fetchallwithactifbudget = async (req, res, next) => {
  try {
    const allWithActifBudget = await AgResolution.fetchallwithactifbudget();
    res.status(200).json(allWithActifBudget);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



/**
 * Retrieve and return a agresolutions by ag notice.
 */
exports.getByAgNotice = async (req, res, next) => {
  try {
    const id_ag_notice = req.params.id_ag_notice;
    const agResolutions = await AgResolution.getByAgNotice(id_ag_notice);
    res.status(200).json(agResolutions);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Retrieve and return a agresolutions by ag minutes.
 */
exports.getByAgMinutes = async (req, res, next) => {
  try {
    const id_ag_minutes = req.params.id_ag_minutes;
    const agResolutions = await AgResolution.getByAgMinutes(id_ag_minutes);
    res.status(200).json(agResolutions);
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
    const resolution_text = req.body.resolution_text;
    const required_majority = req.body.required_majority;
    const budget = req.body.budget;

    const id_ag_minutes = req.body.id_ag_minutes;
    const id_unit_group = req.body.id_unit_group;
    const id_ag_notice = req.body.id_ag_notice;

    const budget_amount = req.body.budget_amount;
    const budget_type = req.body.budget_type;
    const operating_budget_start = req.body.operating_budget_start;
    const operating_budget_end = req.body.operating_budget_end;
    const nb_of_instalments = req.body.nb_of_instalments;
    const budget_recup_tenant = req.body.budget_recup_tenant;
    const budget_actif = 0;
    const id_budget_category = req.body.id_budget_category;

    const agResolution = new AgResolution({
      id,
      title,
      resolution_text,
      required_majority,
      budget,
      id_ag_minutes,
      id_unit_group,
      id_ag_notice,
      budget_amount,
      budget_type,
      operating_budget_start,
      operating_budget_end,
      nb_of_instalments,
      budget_recup_tenant,
      budget_actif,
      id_budget_category
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
    const resolution_text = req.body.resolution_text;
    const required_majority = req.body.required_majority;
    const budget = req.body.budget;
    const id_ag_minutes = req.body.id_ag_minutes;
    const id_unit_group = req.body.id_unit_group;
    const id_ag_notice = req.body.id_ag_notice;
    const budget_amount = req.body.budget_amount;
    const budget_type = req.body.budget_type;
    const operating_budget_start = req.body.operating_budget_start;
    const operating_budget_end = req.body.operating_budget_end;
    const nb_of_instalments = req.body.nb_of_instalments;
    const budget_recup_tenant = req.body.budget_recup_tenant;
    const budget_actif = req.body.budget_actif;
    const id_budget_category = req.body.id_budget_category;

    const agResolution = new AgResolution({
      id,
      title,
      resolution_text,
      required_majority,
      budget,
      id_ag_minutes,
      id_unit_group,
      id_ag_notice,
      budget_amount,
      budget_type,
      operating_budget_start,
      operating_budget_end,
      nb_of_instalments,
      budget_recup_tenant,
      budget_actif,
      id_budget_category
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
 * Update the id_ag_minutes of an agresolution identified by its ID.
 */
exports.patchAgMin = async (req, res, next) => {
  try {
    const updateResponse = await AgResolution.patchAgMin(req.params.id, req.body.id_ag_minutes);
    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update the status of an agresolution identified by its ID.
 */
exports.patchStatus = async (req, res, next) => {
  try {
    const updateResponse = await AgResolution.patchStatus(req.params.id, req.params.status, req.params.budgetActifStatus);
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
