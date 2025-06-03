const db = require('../util/database');
const { isValidUUIDv4, isValidURL } = require('../util/validation');


module.exports = class Document {
  constructor({idDocument, name, url, idDocumentCategory, description = null, createdAt = null, updatedAt = null}) {
    this.idDocument = idDocument;
    this.name = name;
    this.url = url;
    this.idDocumentCategory = idDocumentCategory;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  
  /*getters and setters for data validation*/

  get idDocument() {
    return this._idDocument;
  }

  set idDocument(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_Document');
      error.statusCode = 400;
      throw error;
    }
    this._idDocument = value;
  }
  
  get name() {
    return this._name;
  }

  set name(value) {
    if (typeof value !== 'string' || value.length < 3) {
      const error = new Error('Invalid name: must be a string of minimum length 2.');
      error.statusCode = 400;
      throw error;
    }
    this._name = value;
  }

  get url() {
    return this._url;
  }

  set url(value) {
    if (!isValidURL(value)) {
      const error = new Error('Invalid url');
      error.statusCode = 400;
    throw error;
  }
    this._url = value;
  }
  
  get idDocumentCategory() {
    return this._idDocumentCategory;
  }

  set idDocumentCategory(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_Document');
      error.idDocumentCategory = 400;
      throw error;
    }
    this._idDocumentCategory = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    if (typeof value !== 'string') {
      const error = new Error('Invalid description: must be a string.');
      error.statusCode = 400;
      throw error;
    }
    this._description = value;
  }
  

  /*CRUD operations*/

  static async fetchAll() {
    const allDocuments = await db.execute('SELECT * FROM document');
    return allDocuments;
  }

  async post() {
    const [result] = await db.execute(
      `INSERT INTO document 
        (id_document, name, description, url, id_document_category) 
        VALUES (?, ?, ?, ?, ?)`, 
        [this.idDocument, this.name, this.description, this.url, this.idDocumentCategory]
      );
    
    if (result.affectedRows === 0) {
      const error = new Error('Insert failed: no rows affected.');
      error.statusCode = 500;
      throw error;
    }
    return { message: 'Document created successfully' };
  }

  static async get(id) {
    const [document] = await db.execute('SELECT * FROM document WHERE id_document = ?', [id]);
    return document[0];
  }
  
  async update() {
    const [result] = await db.execute(
      `UPDATE document
        SET name = ?, description = ?, url = ?, id_document_category = ?
        WHERE id_document = ?`,
        [this.name, this.description, this.url, this.idDocumentCategory, this.idDocument]
      );

    if (result.affectedRows === 0) {
      const error = new Error('Document not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Document updated successfully' };
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM document WHERE id_document = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Document not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Document deleted successfully' };
  }
}
