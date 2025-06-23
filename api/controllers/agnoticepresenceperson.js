const AgNoticePresencePerson = require('../models/agnoticepresenceperson');

/**
 * Retrieve and return all agnoticepresence/person.
 */
exports.getAll = async (req, res, next) => {
  try {
    const all = await AgNoticePresencePerson.fetchAll();
    res.status(200).json(all);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return an agnoticepresence/person by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id_ag_notice = req.params.id_ag_notice;
    const id_person = req.params.id_person;
    const agnoticepresenceperson = await AgNoticePresencePerson.get(id_ag_notice, id_person);
    res.status(200).json(agnoticepresenceperson);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new agresolution/person with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id_ag_notice = req.body.id_ag_notice;
    const id_person = req.body.id_person;
    const presence = req.body.presence;
    const represented_by = req.body.represented_by;

    const agNoticePresencePerson = new AgNoticePresencePerson({
      id_ag_notice,
      id_person,
      presence,
      represented_by
    });
    
    const postResponse = await agNoticePresencePerson.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing agresolution/person identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id_ag_notice = req.params.id_ag_notice;
    const id_person = req.params.id_person;
    const presence = req.body.presence;
    const represented_by = req.body.represented_by;

    const unit = new AgNoticePresencePerson({
      id_ag_notice,
      id_person,
      presence,
      represented_by
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
 * Delete a agresolution/person by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id_ag_notice = req.params.id_ag_notice;
    const id_person = req.params.id_person;
    const deleteResponse = await AgNoticePresencePerson.delete(id_ag_notice, id_person);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
