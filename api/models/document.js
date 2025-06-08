/**
 * Document model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4, isValidURL, isStringMin2Max50, isNullOrString } = require('../util/validation');
const BaseClass = require('./baseClass');


module.exports = class Document extends BaseClass {
  /**
   * Create a new Document instance.
   * @param {string} id - UUID of the document
   * @param {string} name - Name of the document
   * @param {string} url - URL of the document
   * @param {string} idDocumentCategory - UUID of the category
   * @param {string|null} description - Optional description
   * @param {Date|null} createdAt - creation date - set in MSQL code
   * @param {Date|null} updatedAt - last update - set in MSQ code
   * @param {string|null} category_name - Optional, loaded via JOIN
   */
  constructor({id, name, url, idDocumentCategory, description = null, createdAt = null, updatedAt = null, category_name = null }) {
    super({ id, createdAt, updatedAt });
    this.name = name;
    this.url = url;
    this.idDocumentCategory = idDocumentCategory;
    this.description = description;
    this.category_name = category_name;
  }
  
  /****************************getters and setters for data validation***********************************/

  get name() {
    return this._name;
  }

  set name(value) {
    if (typeof value !== 'string') {
      const error = new Error('Name must be a string.');
      error.statusCode = 400;
      throw error;
    }
    const trimmedValue = value.trim();

    if (!isStringMin2Max50(trimmedValue)) {
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
    const trimmedValue = value.trim();
    if (!isValidURL(trimmedValue)) {
      const error = new Error('Invalid url');
      error.statusCode = 400;
      throw error;
    }
    this._url = trimmedValue;
  }
    
  get idDocumentCategory() {
    return this._idDocumentCategory;
  }

  /**TO DO VALIDATION OF CROSS REF  */
  
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

  /**********************************CRUD operations************************************/

  /**
   * Fetch all documents from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allDocuments] = await db.execute(`SELECT 
      document.id,
      document.name,
      document.description,
      document.url,
      document.created_at,
      document.updated_at,
      document.id_document_category,
      document_category.name as category_name
      FROM document 
      JOIN document_category ON document.id_document_category = document_category.id
      ORDER BY GREATEST(
        IFNULL(document.updated_at, '1970-01-01 00:00:00'),
        document.created_at
      ) DESC;`
    );
    return allDocuments;
  }

  /**
   * Fetch a document by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT 
      document.id,
      document.name,
      document.description,
      document.url,
      document.created_at,
      document.updated_at,
      document.id_document_category,
      document_category.name as category_name
      FROM document
      JOIN document_category ON document.id_document_category = document_category.id
      WHERE document.id = ?`, [id]
    );
   
    if (rows.length === 0) {
      const error = new Error('Document not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current document into the database.
   * @returns {Promise<Object>}
   */
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
  
  /**
   * Update the current document in the database.
   * @returns {Promise<Object>}
   */
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

  /**
   * Delete a document by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
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
