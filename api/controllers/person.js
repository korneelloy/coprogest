const Person = require('../models/person');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../util/hash');

/**
 * Retrieve and return all persons.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allPersons = await Person.fetchAll();
    res.status(200).json(allPersons);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return a person by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const person = await Person.get(id);
    res.status(200).json(person);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new person with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const email = req.body.email;
    const id_role = req.body.id_role;

    const person = new Person({
      id,
      email,
      id_role
    });
    const postResponse = await person.post();
    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Update an existing person identified by its ID / password dealt with in updatePw method
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const street = req.body.street;
    const postal_code = req.body.postal_code;
    const city = req.body.city;
    const telephone = req.body.telephone;
    const id_role = req.body.id_role;

    const person = new Person({
      id,
      email,
      first_name,
      last_name,
      street,
      postal_code,
      city, 
      telephone, 
      id_role
    });

    
    const updateResponse = await person.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

exports.updatePw = async (req, res, next) => {
  try {
    const email = req.params.email;

    const password = req.body.password;

    const hashedPw = await hashPassword(password);

    const updateResponse = await Person.updatePw(email, hashedPw);

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
