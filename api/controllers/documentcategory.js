const DocumentCategory = require('../models/documentcategory');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all document categories.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allDocumentCategories = await DocumentCategory.fetchAll();
    res.status(200).json(allDocumentCategories);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return a document category by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const documentCategory = await DocumentCategory.get(id);
    res.status(200).json(documentCategory);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new document category with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const name = req.body.name;

    const document = new DocumentCategory({
      id,
      name
    });
    
    const postResponse = await document.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing document category identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name;

    const document = new DocumentCategory({
      id,
      name
    });
    
    const updateResponse = await document.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a document category by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await DocumentCategory.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
