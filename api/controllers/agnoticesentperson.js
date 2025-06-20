const AgNoticeSentPerson = require('../models/agnoticesentperson');

/**
 * Retrieve and return all agnotice/person.
 */
exports.getAll = async (req, res, next) => {
  try {
    const all = await AgNoticeSentPerson.fetchAll();
    res.status(200).json(all);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Create a new agnotice/person with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id_person = req.body.id_person;
    const id_ag_notice = req.body.id_ag_notice;

    const agNoticeSentPerson = new AgNoticeSentPerson({
      id_person,
      id_ag_notice
    });
    
    const postResponse = await agNoticeSentPerson.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a agnotice/person by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id_person = req.params.id_person;
    const id_ag_notice = req.params.id_ag_notice;
    const deleteResponse = await AgNoticeSentPerson.delete(id_person, id_ag_notice);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
