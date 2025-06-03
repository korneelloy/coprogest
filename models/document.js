const db = require('../util/database');
const { isValidUUIDv4, isValidURL, isStringMin2Max50, isNullOrString } = require('../util/validation');
const BaseClass = require('./baseClass');


module.exports = class Document extends BaseClass {
  constructor({id, name, url, idDocumentCategory, description = null, createdAt = null, updatedAt = null}) {
    super({ id, createdAt, updatedAt });
    this.name = name;
    this.url = url;
    this.idDocumentCategory = idDocumentCategory;
    this.description = description;
  }
  
  /*getters and setters for data validation*/

  get name() {
    return this._name;
  }

  set name(value) {
    if (!isStringMin2Max50(value)) {
      const error = new Error('Invalid name: must be a string of minimum length 2 and maximum of 50.');
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
      const error = new Error('Invalid id');
      error.statusCode = 400;
      throw error;
    }
    this._idDocumentCategory = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    if (!isNullOrString(value)) {
      const error = new Error('Invalid description: must be a string or null.');
      error.statusCode = 400;
      throw error;
    }
    this._description = value;
  }

  /*CRUD operations*/

  static async fetchAll() {
    const [allDocuments] = await db.execute('SELECT * FROM document');
    return allDocuments;
  }

  static async get(id) {
    const [rows] = await db.execute('SELECT * FROM document WHERE id = ?', [id]);
    if (rows.length === 0) {
      const error = new Error('Document not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  async post() {
    const [result] = await db.execute(
      `INSERT INTO document 
        (id, name, description, url, id_document_category) 
        VALUES (?, ?, ?, ?, ?)`, 
        [this.id, this.name, this.description, this.url, this.idDocumentCategory]
      );
    
    if (result.affectedRows === 0) {
      const error = new Error('Insert failed: no rows affected.');
      error.statusCode = 500;
      throw error;
    }
    return { message: 'Document created successfully' };
  }
  
  async update() {
    const [result] = await db.execute(
      `UPDATE document
        SET name = ?, description = ?, url = ?, id_document_category = ?
        WHERE id = ?`,
        [this.name, this.description, this.url, this.idDocumentCategory, this.id]
      );

    if (result.affectedRows === 0) {
      const error = new Error('Document not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Document updated successfully' };
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM document WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Document not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Document deleted successfully' };
  }
}
