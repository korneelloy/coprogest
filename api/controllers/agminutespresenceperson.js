const AgMinutesPresencePerson = require('../models/agminutespresenceperson');

/**
 * Retrieve and return all agminutespresence/person.
 */
exports.getAll = async (req, res, next) => {
  try {
    const all = await AgMinutesPresencePerson.fetchAll();
    res.status(200).json(all);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return all agminutespresence/person by minutes
 */
exports.getByMinutes = async (req, res, next) => {
  try {
    const agMinutesId = req.params.agMinutesId;
    const all = await AgMinutesPresencePerson.getByMinutes(agMinutesId);
    res.status(200).json(all);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return an agminutespresence/person by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id_ag_minutes = req.params.id_ag_minutes;
    const id_person = req.params.id_person;
    const agminutespresenceperson = await AgMinutesPresencePerson.get(id_ag_minutes, id_person);
    res.status(200).json(agminutespresenceperson);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new agminutes/person with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id_ag_minutes = req.body.id_ag_minutes;
    const id_person = req.body.id_person;
    const presence = req.body.presence;
    const represented_by = req.body.represented_by;

    const agminutespresenceperson = new AgMinutesPresencePerson({
      id_ag_minutes,
      id_person,
      presence,
      represented_by
    });
    
    const postResponse = await agminutespresenceperson.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing agminutes/person identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id_ag_minutes = req.params.id_ag_minutes;
    const id_person = req.params.id_person;
    const presence = req.body.presence;
    const represented_by = req.body.represented_by;

    const agminutespresenceperson = new AgMinutesPresencePerson({
      id_ag_minutes,
      id_person,
      presence,
      represented_by
    });
    
    const updateResponse = await agminutespresenceperson.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a agminutes/person by its minutes.
 */
exports.deleteByMinutes = async (req, res, next) => {
  try {
    const id_ag_minutes = req.params.id_ag_minutes;
    const deleteResponse = await AgMinutesPresencePerson.deleteByMinutes(id_ag_minutes);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
}

/**
 * Delete a agminutes/person by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id_ag_minutes = req.params.id_ag_minutes;
    const id_person = req.params.id_person;
    const deleteResponse = await AgMinutesPresencePerson.delete(id_ag_minutes, id_person);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
}
