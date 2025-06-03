const Document = require('../models/document');
const { v4: uuidv4 } = require('uuid');

exports.getAllDocuments = async (req, res, next) => {
  try {
    const allDocuments = await Document.fetchAll();
    res.status(200).json(allDocuments);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getDocument = async (req, res, next) => {
  try {
    const id = req.params.id;
    const document = await Document.get(id);
    res.status(200).json(document);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

exports.postDocument = async (req, res, next) => {
  try {
    const id = uuidv4();
    const name = req.body.name;
    const description = req.body.description;
    const url = req.body.url;
    const idDocumentCategory = req.body.id_document_category;    

    const document = new Document({
      id,
      name,
      url,
      idDocumentCategory,
      description
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

exports.updateDocument = async (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const url = req.body.url;
    const idDocumentCategory = req.body.id_document_category;    

    const document = new Document({
      id,
      name,
      url,
      idDocumentCategory,
      description
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

exports.deleteDocument = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await Document.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

